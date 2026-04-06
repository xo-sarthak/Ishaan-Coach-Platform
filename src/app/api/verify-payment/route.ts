import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      userId,
      email,
      courseId
    } = body;

    // 1. Verify Razorpay Signature
    const secret = process.env.RAZORPAY_SECRET!;
    const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(bodyString.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      console.error('Invalid payment signature', { expectedSignature, razorpay_signature });
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // 2. Insert secure record into Supabase
    const { error: insertError } = await supabase
      .from('purchases')
      .insert([
        {
          user_id: userId,
          email: email,
          course_id: courseId,
          razorpay_payment_id: razorpay_payment_id
        }
      ]);

    if (insertError) {
      console.error('Error inserting purchase:', insertError);
      return NextResponse.json(
        { error: 'Failed to record purchase in database', details: insertError },
        { status: 500 }
      );
    }

    // 3. Success!
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Error in verify-payment:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
