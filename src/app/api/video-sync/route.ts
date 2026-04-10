import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { fetchYouTubeShorts } from '@/lib/youtube';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    
    // 1. Check if we have fresh data in the DB
    const { data: recentVideos, error: fetchError } = await supabase
      .from('social_videos')
      .select('*')
      .eq('platform', 'youtube')
      .order('published_at', { ascending: false })
      .limit(10);

    if (fetchError) throw fetchError;

    const oneHourAgo = new Date(Date.now() - 3600000);
    const isDataFresh = recentVideos && recentVideos.length > 0 && new Date(recentVideos[0].updated_at) > oneHourAgo;

    // 2. If data is fresh, return it immediately
    if (isDataFresh) {
      return NextResponse.json({ 
        success: true, 
        source: 'cache',
        data: recentVideos 
      });
    }

    // 3. If data is stale or missing, fetch from YouTube API
    const youtubeVideos = await fetchYouTubeShorts();

    if (youtubeVideos.length > 0) {
      // 4. Upsert into Supabase
      const upsertData = youtubeVideos.map(video => ({
        platform: 'youtube',
        external_id: video.id,
        title: video.title,
        thumbnail_url: video.thumbnail,
        video_url: video.url,
        published_at: video.publishedAt,
        updated_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabase
        .from('social_videos')
        .upsert(upsertData, { onConflict: 'external_id' });

      if (upsertError) {
        console.error('Sync error:', upsertError);
      }

      return NextResponse.json({ 
        success: true, 
        source: 'api',
        data: upsertData 
      });
    }

    return NextResponse.json({ 
      success: true, 
      source: 'cache_fallback',
      data: recentVideos || [] 
    });

  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
