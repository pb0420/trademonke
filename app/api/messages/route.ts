export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/data/dummy';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversation_id, content, post_id, recipient_id } = body;

    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // If creating new conversation
      if (post_id && recipient_id && !conversation_id) {
        // Create conversation
        const { data: conversation, error: convError } = await supabase
          .from('conversations')
          .insert({
            post_id,
            buyer_id: user.id,
            seller_id: recipient_id
          })
          .select()
          .single();

        if (convError) throw convError;

        // Create message
        const { data: message, error: msgError } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            sender_id: user.id,
            content
          })
          .select()
          .single();

        if (msgError) throw msgError;
        return NextResponse.json(message);
      }

      // Add message to existing conversation
      const { data: message, error } = await supabase
        .from('messages')
        .insert({
          conversation_id,
          sender_id: user.id,
          content
        })
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json(message);
    } catch (supabaseError) {
      console.log('Supabase error, using mock response:', supabaseError);
    }

    // Fallback to mock response
    const user = getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const mockMessage = {
      id: Date.now().toString(),
      conversation_id: conversation_id || 'mock-conversation',
      sender_id: user.id,
      content,
      created_at: new Date().toISOString(),
      is_read: false
    };

    return NextResponse.json(mockMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}