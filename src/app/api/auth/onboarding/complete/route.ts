import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const { token, password, isExistingUser } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // 1. Verify token and get user email
    const { data: onboardingData, error: tokenError } = await supabase
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

    if (isExistingUser) {
      // 2a. For existing user, we just try to sign in to verify password 
      // (Normally we'd use regular auth client here, but since this is an onboarding flow 
      // after a purchase confirmation, we trust the token for email verification).
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
        email_confirm: true // Force confirmation since they've already used the magic link email
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
    // We get the courseId from onboardingData
    const course_id = onboardingData.course_id;

    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .upsert([
        { 
          user_id: userId, 
          email: email.toLowerCase(), 
          course_id: course_id,
          // We don't have the razorpay_payment_id here, but we have the link to the user
        }
      ], { onConflict: 'user_id,course_id' });

    if (purchaseError) {
      console.error('Error recording purchase:', purchaseError);
      // We don't necessarily block onboarding completion if this logging fails, 
      // but the user might not see the course in their dashboard immediately.
    }

    // 4. Mark token as used
    await supabaseAdmin
      .from('onboarding_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);

    return NextResponse.json({ 
      success: true, 
      message: isExistingUser ? 'Welcome back! Redirecting to your dashboard...' : 'Account created! Redirecting to your dashboard...' 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Complete Onboarding Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
