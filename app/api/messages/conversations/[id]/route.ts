export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/data/dummy';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conversationId = params.id;

    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return NextResponse.json(data || []);
    } catch (supabaseError) {
      console.log('Supabase error, using mock data:', supabaseError);
    }

    // Fallback to mock data
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mockMessages = [
      {
        id: '1',
        conversation_id: conversationId,
        sender_id: '2',
        content: 'Hi! Is this Toyota Camry still available?',
        created_at: '2024-01-20T10:30:00Z',
        is_read: true
      },
      {
        id: '2',
        conversation_id: conversationId,
        sender_id: user.id,
        content: 'Yes, it\'s still available! Would you like to arrange a viewing?',
        created_at: '2024-01-20T10:35:00Z',
        is_read: true
      },
      {
        id: '3',
        conversation_id: conversationId,
        sender_id: '2',
        content: 'That would be great! When would be a good time?',
        created_at: '2024-01-20T10:40:00Z',
        is_read: false
      }
    ];

    return NextResponse.json(mockMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}