export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getCurrentUser, dummyUsers } from '@/lib/data/dummy';

export async function GET() {
  try {
    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          post:posts(title, price, media(url)),
          messages(content, created_at, is_read, sender_id),
          buyer:users!buyer_id(id, name, is_verified, avatar_url),
          seller:users!seller_id(id, name, is_verified, avatar_url)
        `)
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const conversations = data?.map(conv => {
        const otherUser = conv.buyer_id === user.id ? conv.seller : conv.buyer;
        const lastMessage = conv.messages?.[conv.messages.length - 1];
        const unreadCount = conv.messages?.filter(m => !m.is_read && m.sender_id !== user.id).length || 0;

        return {
          id: conv.id,
          post_id: conv.post_id,
          buyer_id: conv.buyer_id,
          seller_id: conv.seller_id,
          last_message: lastMessage?.content || 'No messages yet',
          last_message_at: lastMessage?.created_at || conv.created_at,
          unread_count: unreadCount,
          post: {
            title: conv.post?.title || 'Unknown Item',
            price: conv.post?.price || 0,
            media: conv.post?.media || []
          },
          other_user: {
            id: otherUser?.id || '',
            name: otherUser?.name || 'Unknown User',
            is_verified: otherUser?.is_verified || false,
            avatar_url: otherUser?.avatar_url
          }
        };
      }) || [];

      return NextResponse.json(conversations);
    } catch (supabaseError) {
      console.log('Supabase error, using mock data:', supabaseError);
    }

    // Fallback to mock data
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock conversations for verified users
    if (!user.is_verified) {
      return NextResponse.json([]);
    }

    const mockConversations = [
      {
        id: '1',
        post_id: '1',
        buyer_id: '2',
        seller_id: user.id,
        last_message: 'Is this item still available?',
        last_message_at: '2024-01-20T10:30:00Z',
        unread_count: 1,
        post: {
          title: '2019 Toyota Camry - Excellent Condition',
          price: 25000,
          media: [{ url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop' }]
        },
        other_user: {
          id: '2',
          name: 'Sarah Johnson',
          is_verified: true,
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }
      }
    ];

    return NextResponse.json(mockConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}