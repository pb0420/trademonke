export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    
    // Get user IP for unique view tracking
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(/, /)[0] : request.headers.get("x-real-ip") || 'unknown';
    
    // Try to increment view count in Supabase first
    try {
      const supabase = createServerClient();
      
      // Increment view count
      const { error } = await supabase.rpc('increment_view_count', {
        post_id: postId
      });
      
      if (!error) {
        return NextResponse.json({ 
          success: true, 
          message: 'View recorded',
          ip: ip.substring(0, 8) + '...'
        });
      }
    } catch (supabaseError) {
      console.log('Supabase error, skipping view count:', supabaseError);
    }
    
    // For dummy data, we'll just return success
    return NextResponse.json({ 
      success: true, 
      message: 'View recorded',
      ip: ip.substring(0, 8) + '...' // Partial IP for privacy
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Failed to increment view count' }, { status: 500 });
  }
}