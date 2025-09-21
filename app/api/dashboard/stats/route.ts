export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import { getCurrentUser, getPostsWithDetails, getUserPlan, canUserCreatePost, getPostLimitInfo } from '@/lib/data/dummy';

export async function GET() {
  try {
    // In a real app, get user from session
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const posts = getPostsWithDetails();
    const userPosts = posts.filter(p => p.user_id === user.id);
    
    const totalPosts = userPosts.length;
    const activePosts = userPosts.filter(p => p.status === 'approved').length;
    const pendingPosts = userPosts.filter(p => p.status === 'pending').length;
    const totalViews = userPosts.reduce((sum, post) => sum + post.view_count, 0);
    
    const plan = getUserPlan(user.id);
    const canCreate = canUserCreatePost(user.id);
    const limitInfo = getPostLimitInfo(user.id);

    return NextResponse.json({
      totalPosts,
      activePosts,
      pendingPosts,
      totalViews,
      planName: plan?.name || 'Free',
      canCreatePost: canCreate.canCreate,
      limitInfo
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}