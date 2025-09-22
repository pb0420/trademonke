export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { getPostsWithDetails, dummyUsers } from '@/lib/data/dummy';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    
    // Try to get from Supabase first, fallback to dummy data
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
        return NextResponse.json(data);
      }
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }
    
    // Fallback to dummy data
    const posts = getPostsWithDetails();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Find the user data for verification status
    const user = dummyUsers.find(u => u.id === post.user_id);
    
    const postWithVerification = {
      ...post,
      user: {
        ...post.user,
        id: post.user_id,
        verification_status: user?.verification_status || 'pending',
        avatar_url: user?.avatar_url || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      }
    };
    
    return NextResponse.json(postWithVerification);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}