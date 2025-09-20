export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';
import { getPostsWithDetails, dummyUsers } from '@/lib/data/dummy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Try to get from Supabase first, fallback to dummy data
    try {
      // TODO: Implement Supabase query
      // const { data, error } = await supabase
      //   .from('posts')
      //   .select(`
      //     *,
      //     category:categories(*),
      //     media(*)
      //   `)
      //   .eq('user_id', userId)
      //   .eq('status', 'approved')
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // return NextResponse.json(data);
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }
    
    // Fallback to dummy data
    const user = dummyUsers.find(u => u.id === userId || u.name.toLowerCase().replace(/\s+/g, '-') === userId);
    if (!user) {
      return NextResponse.json([]);
    }
    
    const posts = getPostsWithDetails();
    const userPosts = posts
      .filter(p => p.user_id === user.id && p.status === 'approved')
      .map(post => ({
        id: post.id,
        title: post.title,
        description: post.description,
        price: post.price,
        location: post.location,
        created_at: post.created_at,
        view_count: post.view_count,
        category: post.category,
        media: post.media
      }));
    
    return NextResponse.json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}