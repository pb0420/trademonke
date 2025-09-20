export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';
import { getPostsWithDetails } from '@/lib/data/dummy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    
    // Try to get from Supabase first, fallback to dummy data
    try {
      // TODO: Implement Supabase query
      // const { data, error } = await supabase
      //   .from('posts')
      //   .select(`
      //     *,
      //     user:users(*),
      //     category:categories(*),
      //     media(*)
      //   `)
      //   .eq('id', postId)
      //   .single();
      
      // if (error) throw error;
      // return NextResponse.json(data);
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }
    
    // Fallback to dummy data
    const posts = getPostsWithDetails();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Add user verification status for demo
    const postWithVerification = {
      ...post,
      user: {
        ...post.user,
        id: post.user_id,
        verification_status: post.user.is_verified ? 'approved' : 'pending',
        avatar_url: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`
      }
    };
    
    return NextResponse.json(postWithVerification);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}