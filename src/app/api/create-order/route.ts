import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { COURSES } from '@/data/courses';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const body = await req.json();
    const { courseId, email } = body;

    // 1. Validate inputs
    if (!courseId || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 2. Find course and get price
    const course = COURSES.find(c => c.id === courseId || c.slug === courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Capture price from the first pricing plan (Standard/Masterclass)
    const rawPrice = course.pricing[0].price.replace(/[^0-9]/g, '');
    const amount = parseInt(rawPrice);

    // 3. Initialize Razorpay SDK
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    // 4. Create Razorpay Order
    const orderOptions = {
      amount: amount * 100, // Paise
      currency: "INR",
      receipt: `pending_${Date.now()}`,
      notes: {
        courseId,
        email,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // 5. Store intent in Supabase (Pending Orders)
    const { error: dbError } = await supabaseAdmin
      .from('pending_orders')
      .insert([
        {
          email,
          course_id: courseId,
          razorpay_order_id: order.id,
          amount: amount,
          status: 'pending'
        }
      ]);

    if (dbError) {
      console.error('Database logging error:', dbError);
      // We don't block the user if logging fails, but we log it
    }

    return NextResponse.json({ order }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}
