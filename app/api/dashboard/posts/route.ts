export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import { getCurrentUser, getPostsWithDetails } from '@/lib/data/dummy';

export async function GET() {
  try {
    // In a real app, get user from session
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = getPostsWithDetails();
    const userPosts = posts
      .filter(p => p.user_id === user.id)
      .map(post => ({
        ...post,
        unique_views: Math.floor(post.view_count * (0.6 + Math.random() * 0.3)) // Mock unique views
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(userPosts);
  } catch (error) {
    console.error('Error fetching dashboard posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}