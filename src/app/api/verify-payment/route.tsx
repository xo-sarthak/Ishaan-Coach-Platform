import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { resend } from '@/lib/resend';
import { COURSES } from '@/data/courses';
import { COHORTS } from '@/data/cohorts';
import { CohortWelcomeEmailTemplate } from '@/components/EmailTemplates';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      courseId
    } = body;

    // 1. Verify Razorpay Signature
    const secret = process.env.RAZORPAY_SECRET;

    if (!secret) {
      console.error('RAZORPAY_SECRET is missing from environment variables!');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(bodyString)
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      console.error('Signature Mismatch!', {
        expected: expectedSignature,
        received: razorpay_signature,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    console.log('✅ Signature verified for:', email);

    // 2. Update Database: Mark Pending Order as Paid
    await supabaseAdmin
      .from('pending_orders')
      .update({ status: 'paid', updated_at: new Date().toISOString() })
      .eq('razorpay_order_id', razorpay_order_id);

    // 3. Generate Magic Token for Onboarding
    const magicToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

    await supabaseAdmin
      .from('onboarding_tokens')
      .insert([{
        token: magicToken,
        email,
        course_id: courseId,
        razorpay_payment_id,
        razorpay_order_id,
        expires_at: expiresAt.toISOString()
      }]);

    // 4. Send Onboarding / Welcome Email
    const item = COURSES.find(c => c.id === courseId || c.slug === courseId)
      || COHORTS.find(c => c.id === courseId || c.slug === courseId);

    const host = req.headers.get('host') || process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '') || 'ishaanlive.in';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const onboardingUrl = `${protocol}://${host}/onboarding?token=${magicToken}`;

    if (resend && item) {
      try {
        await resend.emails.send({
          from: 'Ishaan Singh <hello@ishaanlive.in>',
          to: email,
          subject: `Access Granted: ${item.title}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #333;">Welcome to the inner circle! 🚀</h2>
              <p style="font-size: 16px; color: #555;">
                Your purchase was successful. You now have access to <strong>${item.title}</strong>.
              </p>
              <p style="font-size: 16px; color: #555;">
                Click the button below to set up your account and start learning immediately.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${onboardingUrl}" style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Claim Your Access
                </a>
              </div>
              <p style="font-size: 14px; color: #888;">
                This link will expire in 24 hours. If you have any trouble, just reply to this email!
              </p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Failed to send onboarding email:', emailError);
      }
    }

    return NextResponse.json({ success: true, token: magicToken }, { status: 200 });

  } catch (error: any) {
    console.error('Error in verify-payment:', error);
    return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
  }
}
