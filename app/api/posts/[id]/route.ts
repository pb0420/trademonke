export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { cache, CACHE_KEYS } from '@/lib/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.POST_DETAIL(postId));
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Try Supabase
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          user:users(*),
          category:categories(*),
          media(*)
        `)
        .eq('id', postId)
        .single();
      
      if (data && !error) {
        // Cache for 5 minutes
        cache.set(CACHE_KEYS.POST_DETAIL(postId), data, 5);
        return NextResponse.json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase error:', supabaseError);
    }
    
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const body = await request.json();
    
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update post
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: body.title,
        description: body.description,
        category_id: body.category_id || null,
        price: parseFloat(body.price),
        location: body.location || null,
        privacy: body.privacy || 'public',
        show_business_name: body.show_business_name || false,
        updated_at: new Date().toISOString()
      })
      .eq('id', postId)
      .eq('user_id', user.id) // Ensure user owns the post
      .select(`
        *,
        user:users(*),
        category:categories(*),
        media(*)
      `)
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 });
    }

    // Clear cache
    cache.delete(CACHE_KEYS.POST_DETAIL(postId));
    cache.clear(); // Clear all cache to refresh lists

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}