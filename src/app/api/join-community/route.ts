import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { name, email, phone, role, interest, getGuide, getNewsletter } = await req.json();

    if (!email || !name || !phone) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    let alreadyInNewsletter = false;

    // 1. Handle Newsletter Subscription
    if (getNewsletter) {
      const { error: newsletterError } = await supabaseAdmin
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (newsletterError && newsletterError.code === '23505') {
        alreadyInNewsletter = true;
      } else if (newsletterError) {
        console.error('Newsletter insert error:', newsletterError);
      }
    }

    // 2. Handle Free Guide (Resource Lead)
    if (getGuide) {
      const { error: resourceError } = await supabaseAdmin
        .from('resource_leads')
        .insert([{ email, resource_slug: 'hard-earned-lessons' }]);
        
      if (resourceError && resourceError.code !== '23505') {
        console.error('Resource lead insert error:', resourceError);
      }
    }

    // 3. Store the full profile in community_leads (if table exists)
    // We do this silently so if the user hasn't run the SQL migration yet, it doesn't break the UI
    const { error: communityError } = await supabaseAdmin
      .from('community_leads')
      .insert([{ 
        name, 
        email, 
        phone, 
        role, 
        interest,
        wants_guide: getGuide,
        wants_newsletter: getNewsletter
      }]);

    if (communityError && communityError.code !== '42P01') { // 42P01 is table does not exist
       console.error('Community lead insert error:', communityError);
    }

    return NextResponse.json({ 
      success: true, 
      alreadyInNewsletter 
    }, { status: 200 });

  } catch (error) {
    console.error('Join Community Error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
