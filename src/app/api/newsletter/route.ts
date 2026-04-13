import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Check for obviously fake or common "junk" emails
    const blacklistedDomains = ['123.com', 'abc.com', 'test.com', 'example.com'];
    const domain = email.split('@')[1];
    if (blacklistedDomains.includes(domain)) {
      return NextResponse.json(
        { message: 'Please use a real email address.' },
        { status: 400 }
      );
    }

    // 3. Attempt to insert into Supabase using Admin Client (Bypasses RLS)
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from('newsletter_subscriptions')
      .insert([{ email }]);

    if (error) {
      // 4. Handle duplicate email (23505 is PostgreSQL unique_violation)
      if (error.code === '23505') {
        return NextResponse.json(
          { status: 'already_subscribed', message: 'Hey! You are already in the inner circle.' },
          { status: 200 }
        );
      }
      throw error;
    }

    // 5. Success - New subscriber
    return NextResponse.json(
      { status: 'success', message: 'Congrats! Welcome to the inner circle.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter Error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
