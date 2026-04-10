import { getSupabaseAdmin } from './src/lib/supabaseAdmin.ts';

async function checkDb() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('social_videos').select('*');
    if (error) {
      console.error('DB Error:', error);
    } else {
      console.log('Videos in DB:', data?.length || 0);
      console.log('Sample Video:', data?.[0] || 'None');
    }
  } catch (e) {
    console.error('Script Error:', e);
  }
}

checkDb();
