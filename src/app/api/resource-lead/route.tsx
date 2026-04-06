import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resend } from '@/lib/resend';
import { ResourceEmailTemplate } from '@/components/EmailTemplates';
import { RESOURCES } from '@/data/resources';

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, resourceSlug } = await req.json();

    if (!email || !resourceSlug) {
      return NextResponse.json({ error: 'Email and Resource Slug are required' }, { status: 400 });
    }

    // 1. Record the lead in Supabase
    const { error: dbError } = await supabase
      .from('resource_leads')
      .insert([{ email, resource_slug: resourceSlug }]);

    if (dbError) {
      console.error('Database entry failed:', dbError);
      // We continue even if DB fails to ensure the user gets their resource
    }

    // 2. Find the resource details
    const resource = RESOURCES.find(r => r.slug === resourceSlug);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // 3. Success! (We only provide the download link on-site to save on Resend costs)
    return NextResponse.json({ success: true, downloadUrl: resource.downloadUrl }, { status: 200 });

  } catch (error: any) {
    console.error('Error in resource-lead API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
