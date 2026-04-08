import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, courseId } = await req.json();

    if (!email || !courseId) {
      return NextResponse.json({ error: 'Email and Course ID are required' }, { status: 400 });
    }

    // Check if the user already has a purchase record for this course
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('course_id', courseId)
      .single();

    if (purchase) {
      return NextResponse.json({ owned: true }, { status: 200 });
    }

    return NextResponse.json({ owned: false }, { status: 200 });

  } catch (error: any) {
    console.error('Check Purchase Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
