import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, service, message } = data;

    // 1. Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
    }

    // 2. Insert into Supabase
    const { error: dbError } = await supabase
      .from('contact_inquiries')
      .insert([
        { 
          name, 
          email, 
          phone, 
          service, 
          message,
          created_at: new Date().toISOString()
        }
      ]);

    if (dbError) {
      console.error('Database insertion error:', dbError);
    }

    // 3. Send Email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'IshaanLive <onboarding@resend.dev>',
          to: 'hello@ishaanlive.in',
          subject: `New Inquiry: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
              <h2 style="color: #B05C46; border-bottom: 2px solid #F2E3E0; padding-bottom: 10px;">New Website Inquiry</h2>
              
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Interested In:</strong> ${service}</p>
              
              <div style="background-color: #FCF8F7; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin-top: 0;"><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message || 'No additional message.'}</p>
              </div>
              
              <p style="font-size: 12px; color: #999; margin-top: 30px; border-top: 1px solid #eee; pt: 10px;">
                Sent from your website contact form.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
