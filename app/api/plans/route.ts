export const dynamic = "force-static";


import { NextResponse } from 'next/server';
import { dummyPlans, getUserPlan, canUserCreatePost, getPostLimitInfo, currentUserId } from '@/lib/data/dummy';

export async function GET() {
  try {
    const userPlan = getUserPlan(currentUserId);
    const canCreate = canUserCreatePost(currentUserId);
    const limitInfo = getPostLimitInfo(currentUserId);
    
    return NextResponse.json({
      plans: dummyPlans,
      currentPlan: userPlan,
      canCreatePost: canCreate,
      limitInfo
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}