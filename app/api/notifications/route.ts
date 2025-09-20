export const dynamic = "force-static";


import { NextRequest, NextResponse } from 'next/server';
import { getUserNotifications, currentUserId } from '@/lib/data/dummy';

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would get the user ID from the session/auth
    const notifications = getUserNotifications(currentUserId);
    
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, markAllAsRead } = body;

    // In a real app, you would update the database
    // For now, just return success
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}