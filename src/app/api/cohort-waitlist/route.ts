import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, cohortId, cohortTitle } = await req.json();

    if (!email || !cohortId) {
      return NextResponse.json({ error: 'Email and Cohort ID are required' }, { status: 400 });
    }

    // Insert into Supabase table
    const { error } = await supabase
      .from('cohort_waitlist')
      .insert([
        { 
          email: email, 
          cohort_id: cohortId, 
          cohort_title: cohortTitle 
        }
      ]);

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Failed to join waitlist. Please try again.' }, { status: 500 });
    }

    console.log(`[Waitlist Lead captured in Supabase] ${email} for ${cohortTitle}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Waitlist entry recorded successfully' 
    });

  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
