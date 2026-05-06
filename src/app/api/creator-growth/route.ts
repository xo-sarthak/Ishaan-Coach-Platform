import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const body = await req.json();
    const { name, email, phone, followerCount, profession, challenge } = body;

    if (!name || !email || !phone || !followerCount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseAdmin
      .from('creator_growth_leads')
      .insert([
        {
          name,
          email,
          phone,
          follower_count: followerCount,
          profession,
          biggest_challenge: challenge,
          status: 'waitlist'
        }
      ]);

    if (dbError) {
      console.error('Database logging error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save lead', details: dbError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('Error saving creator lead:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
