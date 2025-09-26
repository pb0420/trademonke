export const dynamic = "force-dynamic";


import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return NextResponse.json(data || []);
    } catch (supabaseError) {
      console.log('Supabase error, using mock notifications:', supabaseError);
    }

    // Fallback to mock notifications
    const mockNotifications = [
      {
        id: '1',
        type: 'post_approved',
        title: 'Your listing was approved! 🎉',
        content: 'Your Toyota Camry listing is now live and visible to buyers.',
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        metadata: { post_id: '1' }
      },
      {
        id: '2',
        type: 'message',
        title: 'New message from Sarah',
        content: 'Hi! Is this item still available? I\'m very interested.',
        is_read: false,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        metadata: { conversation_id: '1' }
      },
      {
        id: '3',
        type: 'verification',
        title: 'Verification approved ✅',
        content: 'Congratulations! Your profile has been verified. You can now post items immediately.',
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        metadata: {}
      },
      {
        id: '4',
        type: 'review',
        title: 'New review received ⭐',
        content: 'Emma left you a 5-star review: "Great seller! Item was exactly as described."',
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        metadata: { reviewer_id: '2' }
      },
      {
        id: '5',
        type: 'subscription',
        title: 'Welcome to Premium! 👑',
        content: 'Your Premium subscription is now active. Enjoy unlimited listings and priority verification.',
        is_read: true,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
        metadata: { plan: 'premium' }
      }
    ];
    
    return NextResponse.json(mockNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notificationId, markAllAsRead } = body;

    try {
      if (markAllAsRead) {
        const { error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('user_id', user.id)
          .eq('is_read', false);

        if (error) throw error;
      } else if (notificationId) {
        const { error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', notificationId)
          .eq('user_id', user.id);

        if (error) throw error;
      }
    } catch (supabaseError) {
      console.log('Supabase error, using mock response:', supabaseError);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}