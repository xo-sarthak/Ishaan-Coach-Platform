import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, courseId, userId, email } = body;

    // Validate inputs
    if (!amount || !courseId || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Initialize Razorpay SDK
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    // Create the order
    // Razorpay expects amount in paise (e.g., multiply by 100)
    const orderOptions = {
      amount: parseInt(amount) * 100, // Convert to integer paise
      currency: "INR",
      receipt: `rcpt_${userId.substring(0, 5)}_${courseId}_${Date.now()}`,
      notes: {
        userId,
        courseId,
        email,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    return NextResponse.json({ order }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}
