import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { fetchYouTubeShorts } from '@/lib/youtube';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === 'true';
  
  console.log(`--- Starting Video Sync (Force: ${force}) ---`);
  try {
    const supabase = getSupabaseAdmin();
    
    // 1. Check current DB state
    const { data: recentVideos, error: fetchError } = await supabase
      .from('social_videos')
      .select('*')
      .eq('platform', 'youtube')
      .order('published_at', { ascending: false })
      .limit(10);

    if (fetchError) {
      console.error('DB Fetch Error:', fetchError);
      throw fetchError;
    }

    const oneHourAgo = new Date(Date.now() - 3600000);
    // Check if the LATEST sync was successful recently
    const latestSyncTime = recentVideos && recentVideos.length > 0 
      ? new Date(Math.max(...recentVideos.map(v => new Date(v.updated_at).getTime())))
      : new Date(0);
    
    const isDataFresh = latestSyncTime > oneHourAgo;
    console.log('Data Freshness Check:', { latestSyncTime, isDataFresh, force });

    // 2. If data is fresh AND not forced, return it immediately
    if (isDataFresh && !force && recentVideos && recentVideos.length > 0) {
      return NextResponse.json({ 
        success: true, 
        source: 'cache',
        timestamp: new Date().toISOString(),
        data: recentVideos 
      });
    }

    // 3. If data is stale or missing, fetch from YouTube API
    console.log('Fetching fresh data from YouTube API...');
    const youtubeVideos = await fetchYouTubeShorts();
    console.log(`YouTube API returned ${youtubeVideos.length} videos.`);

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
        .upsert(upsertData, { 
          onConflict: 'external_id',
          ignoreDuplicates: false // Ensure we update existing records too
        });

      if (upsertError) {
        console.error('Critical Upsert Error:', upsertError);
        throw upsertError; // Don't swallow this, we need to know
      }

      console.log('Successfully upserted videos to DB.');

      return NextResponse.json({ 
        success: true, 
        source: 'api',
        timestamp: new Date().toISOString(),
        data: upsertData 
      });
    }

    return NextResponse.json({ 
      success: true, 
      source: 'cache_fallback',
      timestamp: new Date().toISOString(),
      data: recentVideos || [] 
    });

  } catch (error: any) {
    console.error('Final Sync Route Error:', error.message);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
