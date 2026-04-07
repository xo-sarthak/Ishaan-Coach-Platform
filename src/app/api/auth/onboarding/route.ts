import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Find the token in the database
    const { data: onboardingData, error: tokenError } = await supabase
      .from('onboarding_tokens')
      .select('*')
      .eq('token', token)
      .is('used_at', null)
      .single();

    if (tokenError || !onboardingData) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // 2. Check if token is expired
    const expiresAt = new Date(onboardingData.expires_at);
    if (new Date() > expiresAt) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // 3. Check if user exists in Supabase Auth
    const { data: { users }, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = users.find(u => u.email === onboardingData.email);

    return NextResponse.json({ 
      success: true, 
      email: onboardingData.email,
      courseId: onboardingData.course_id,
      userExists: !!existingUser
    }, { status: 200 });

  } catch (error: any) {
    console.error('Verify Token Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
