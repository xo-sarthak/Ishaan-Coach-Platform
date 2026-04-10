import { createClient } from '@supabase/supabase-js';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_HANDLE = process.env.YOUTUBE_CHANNEL_HANDLE;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export interface YoutubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
}

export async function fetchYouTubeShorts(): Promise<YoutubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YOUTUBE_API_KEY missing in environment variables');
  }

  const MAX_RETRIES = 3;
  let lastError: any;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await performYouTubeFetch();
    } catch (error) {
      lastError = error;
      console.warn(`YouTube fetch attempt ${attempt} failed:`, error);
      if (attempt < MAX_RETRIES) {
        // Wait a bit before retrying (exponential backoff)
        const delay = Math.pow(2, attempt) * 500;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

async function performYouTubeFetch(): Promise<YoutubeVideo[]> {
  let channelId = YOUTUBE_CHANNEL_ID;

  const fetchHeaders = {
    'Referer': 'https://ishaanlive.in'
  };

  // 1. Resolve Channel ID if not provided directly
  if (!channelId) {
    if (!YOUTUBE_CHANNEL_HANDLE) {
      throw new Error('Neither YOUTUBE_CHANNEL_ID nor YOUTUBE_CHANNEL_HANDLE is provided');
    }

    const handle = YOUTUBE_CHANNEL_HANDLE.startsWith('@') 
      ? YOUTUBE_CHANNEL_HANDLE 
      : `@${YOUTUBE_CHANNEL_HANDLE}`;
    
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?forHandle=${encodeURIComponent(handle)}&part=id,contentDetails&key=${YOUTUBE_API_KEY}`,
      { headers: fetchHeaders }
    );
    const channelData = await channelRes.json();

    if (!channelData.items || channelData.items.length === 0) {
      // Fallback: Try without the @ if it was added
      const handleWithoutAt = handle.slice(1);
      const retryRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?forHandle=${encodeURIComponent(handleWithoutAt)}&part=id,contentDetails&key=${YOUTUBE_API_KEY}`,
        { headers: fetchHeaders }
      );
      const retryData = await retryRes.json();
      
      if (!retryData.items || retryData.items.length === 0) {
        throw new Error(`Channel not found for handle: ${handle}`);
      }
      channelData.items = retryData.items;
    }
    
    channelId = channelData.items[0].id;
  }

  // Now that we definitely have a channelId (or threw an error)
  // We need the contentDetails to get the uploads playlist
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=contentDetails&key=${YOUTUBE_API_KEY}`,
    { headers: fetchHeaders }
  );
  
  if (!detailsRes.ok) {
    const errorBody = await detailsRes.text();
    console.error('YouTube API Error (Details):', detailsRes.status, errorBody);
    throw new Error(`YouTube API returned ${detailsRes.status}: ${errorBody}`);
  }

  const detailsData = await detailsRes.json();
  
  if (!detailsData.items || detailsData.items.length === 0) {
    console.error('YouTube API Error: No channel found for ID', channelId, detailsData);
    throw new Error(`No channel found for ID: ${channelId}. Check your API key restrictions.`);
  }

  const uploadsPlaylistId = detailsData.items[0].contentDetails.relatedPlaylists.uploads;

  // 2. Fetch latest videos from the Uploads playlist
  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${uploadsPlaylistId}&part=snippet,contentDetails&maxResults=20&key=${YOUTUBE_API_KEY}`,
    { headers: fetchHeaders }
  );
  const videosData = await videosRes.json();

  if (!videosData.items) {
    return [];
  }

  // 3. Map to our format
  return videosData.items.map((item: any) => ({
    id: item.contentDetails.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    url: `https://www.youtube.com/shorts/${item.contentDetails.videoId}`, 
    publishedAt: item.snippet.publishedAt,
  }));
}
