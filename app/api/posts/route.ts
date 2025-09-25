export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { cache, CACHE_KEYS } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const userLat = searchParams.get('userLat');
    const userLon = searchParams.get('userLon');
    const maxDistance = searchParams.get('maxDistance');

    // Create cache key
    const cacheKey = CACHE_KEYS.POSTS_LIST(searchParams.toString());
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Try Supabase
    try {
      const supabase = createServerClient();
      let query = supabase
        .from('posts')
        .select(`
          *,
          user:users(name, business_name, is_verified, avatar_url),
          category:categories(name, icon),
          media(url, type, order_index)
        `)
        .eq('status', 'approved')
        .eq('privacy', 'public');

      // Count total for pagination
      let countQuery = supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')
        .eq('privacy', 'public');

      // Apply filters
      if (search) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
        countQuery = countQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      }
      if (category) {
        query = query.eq('category_id', category);
        countQuery = countQuery.eq('category_id', category);
      }
      if (location) {
        query = query.ilike('location', `%${location}%`);
        countQuery = countQuery.ilike('location', `%${location}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      // Get total count
      const { count, error: countError } = await countQuery;
      if (countError) throw countError;

      // Get paginated data
      const { data, error } = await query
        .range(offset, offset + limit - 1);
      
      if (data && !error) {
        const result = {
          posts: data,
          total: count || 0,
          page,
          limit,
          hasMore: (count || 0) > offset + limit
        };
        
        // Cache for 2 minutes
        cache.set(cacheKey, result, 2);
        return NextResponse.json(result);
      }
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }

    // Fallback - return empty results
    const fallbackResult = {
      posts: [],
      total: 0,
      page,
      limit,
      hasMore: false
    };
    
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create post in Supabase
    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title: body.title,
        description: body.description,
        category_id: body.category_id || null,
        price: parseFloat(body.price),
        location: body.location || null,
        privacy: body.privacy || 'public',
        show_business_name: body.show_business_name || false,
        status: 'pending' // All posts start as pending
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    // Clear cache
    cache.clear();
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}