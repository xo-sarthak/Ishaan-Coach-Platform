import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const { token, password, isExistingUser, fullName, phone } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // 1. Verify token and get user email
    const { data: onboardingData, error: tokenError } = await supabaseAdmin
      .from('onboarding_tokens')
      .select('*')
      .eq('token', token)
      .is('used_at', null)
      .single();

    if (tokenError || !onboardingData) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const email = onboardingData.email;
    let userId = null;

    // 2. Check for active session (Passwordless path)
    if (!password) {
      const { data: { user: sessionUser }, error: sessionError } = await supabaseAdmin.auth.getUser(
        req.headers.get('Authorization')?.replace('Bearer ', '') || ""
      );

      if (!sessionError && sessionUser && sessionUser.email?.toLowerCase() === email.toLowerCase()) {
        userId = sessionUser.id;
      } else {
        return NextResponse.json({ error: 'Session verification failed or password missing.' }, { status: 401 });
      }
    } else if (isExistingUser) {
      // 3a. For existing user with password...
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
      }
      userId = signInData.user?.id;
    } else {
      // 2b. For NEW user, create the account
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Force confirmation since they've already used the magic link email
        user_metadata: {
          full_name: fullName,
          phone: phone
        }
      });

      if (createError) {
        console.error('User creation error:', createError);
        return NextResponse.json({ error: 'Failed to create account: ' + createError.message }, { status: 500 });
      }
      userId = newUser.user?.id;
    }

    if (!userId) {
      return NextResponse.json({ error: 'User processing failed' }, { status: 500 });
    }

    // 3. Link purchase to this user ID
    const course_id = onboardingData.course_id;
    const razorpay_payment_id = onboardingData.razorpay_payment_id;
    const razorpay_order_id = onboardingData.razorpay_order_id;

    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .upsert([
        { 
          user_id: userId, 
          email: email.toLowerCase(), 
          course_id: course_id,
          razorpay_payment_id,
          razorpay_order_id
        }
      ], { onConflict: 'user_id,course_id' });

    if (purchaseError) {
      console.error('Error recording purchase:', purchaseError);
      return NextResponse.json({ 
        error: 'Failed to record your purchase in our database. Please contact support.', 
        details: purchaseError.message 
      }, { status: 500 });
    }

    // 4. Mark token as used
    await supabaseAdmin
      .from('onboarding_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);

    return NextResponse.json({ 
      success: true, 
      email: email,
      message: isExistingUser ? 'Welcome back! Redirecting to your dashboard...' : 'Account created! Redirecting to your dashboard...' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Complete Onboarding Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
