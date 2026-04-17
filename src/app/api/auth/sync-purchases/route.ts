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

    console.log(`🚀 Starting Robust Sync for: ${email}`);

    // SOURCE 1: Check Onboarding Tokens (The standard magic-link flow)
    const { data: tokens, error: tokensError } = await supabaseAdmin
      .from('onboarding_tokens')
      .select('*')
      .eq('email', email)
      .is('used_at', null);

    // SOURCE 2: Check Pending Orders (The Safety Net / Source of Truth)
    // If an order is marked as 'paid', they MUST have access regardless of if they have a token
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('pending_orders')
      .select('*')
      .eq('email', email)
      .eq('status', 'paid');

    if (tokensError || ordersError) {
      console.error('Database fetch error during sync:', { tokensError, ordersError });
    }

    // Combine all potential purchase sources
    const potentialPurchases = new Map<string, any>();

    // Add from tokens
    tokens?.forEach(t => {
      potentialPurchases.set(t.course_id, {
        user_id: user.id,
        email: email,
        course_id: t.course_id,
        razorpay_payment_id: t.razorpay_payment_id,
        razorpay_order_id: t.razorpay_order_id,
        created_at: t.created_at
      });
    });

    // Add from paid orders (this is the Safety Net)
    orders?.forEach(o => {
      // If we already have a record from a token for this course, skip it
      if (!potentialPurchases.has(o.course_id)) {
        potentialPurchases.set(o.course_id, {
          user_id: user.id,
          email: email,
          course_id: o.course_id,
          razorpay_payment_id: undefined, // May not be in pending_orders table directly depending on schema
          razorpay_order_id: o.razorpay_order_id,
          created_at: o.created_at || o.updated_at
        });
      }
    });

    const purchasesToInsert = Array.from(potentialPurchases.values());

    if (purchasesToInsert.length === 0) {
      return NextResponse.json({ success: true, synced: 0, message: 'No unclaimed purchases found' }, { status: 200 });
    }

    console.log(`💎 Found ${purchasesToInsert.length} candidates for sync. Upserting...`);

    // 3. Upsert into purchases table
    // onConflict: 'user_id,course_id' ensures we don't create duplicates
    const { error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .upsert(purchasesToInsert, { onConflict: 'user_id,course_id' });

    if (purchaseError) {
      console.error('Error recording purchases during robust sync:', purchaseError);
      return NextResponse.json({ error: 'Failed to sync purchases' }, { status: 500 });
    }

    // 4. Cleanup: Mark tokens as used if they existed
    if (tokens && tokens.length > 0) {
      const tokenStrings = tokens.map(t => t.token);
      await supabaseAdmin
        .from('onboarding_tokens')
        .update({ used_at: new Date().toISOString() })
        .in('token', tokenStrings);
    }

    return NextResponse.json({ 
      success: true, 
      synced: purchasesToInsert.length,
      message: `Successfully recovery ${purchasesToInsert.length} purchase(s).`
    }, { status: 200 });

  } catch (error: any) {
    console.error('Complete Robust Sync Error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
