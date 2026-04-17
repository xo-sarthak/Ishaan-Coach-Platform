import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseAdmin();
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
    }

    // Verify the user via the JWT token sent from the client
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      console.error('User verification failed:', userError);
      return NextResponse.json({ error: 'Unauthorized - Invalid session' }, { status: 401 });
    }

    const email = user.email?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: 'User email not found in session' }, { status: 400 });
    }

    // 1. Find all unused onboarding tokens for this email
    const { data: tokens, error: tokensError } = await supabaseAdmin
      .from('onboarding_tokens')
      .select('*')
      .eq('email', email)
      .is('used_at', null);

    if (tokensError) {
      console.error('Error fetching onboarding tokens:', tokensError);
      return NextResponse.json({ error: 'Database error fetching tokens' }, { status: 500 });
    }

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ success: true, synced: 0, message: 'No unclaimed purchases found' }, { status: 200 });
    }

    console.log(`🔍 Found ${tokens.length} unclaimed purchases for ${email}. Syncing...`);

    // 2. Prepare and upsert into purchases table
    // Using upsert handles cases where the record might already exist but were missed
    const purchasesToInsert = tokens.map(t => ({
      user_id: user.id,
      email: email,
      course_id: t.course_id,
      razorpay_payment_id: t.razorpay_payment_id,
      razorpay_order_id: t.razorpay_order_id,
      created_at: t.created_at // Preserve original payment date if possible
    }));

    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .upsert(purchasesToInsert, { onConflict: 'user_id,course_id' });

    if (purchaseError) {
      console.error('Error recording purchases:', purchaseError);
      return NextResponse.json({ error: 'Failed to sync purchases' }, { status: 500 });
    }

    // 3. Mark the processed tokens as used to prevent double-syncing
    const tokenStrings = tokens.map(t => t.token);
    const { error: updateError } = await supabaseAdmin
      .from('onboarding_tokens')
      .update({ used_at: new Date().toISOString() })
      .in('token', tokenStrings);

    if (updateError) {
      console.error('Error marking tokens as used:', updateError);
      // We don't return 500 here because the purchases table is already updated
    }

    return NextResponse.json({ 
      success: true, 
      synced: tokens.length,
      message: `Successfully recovered ${tokens.length} purchase(s) for your account.`
    }, { status: 200 });

  } catch (error: any) {
    console.error('Complete Sync Purchase Error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
