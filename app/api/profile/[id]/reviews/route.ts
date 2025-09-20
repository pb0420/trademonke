export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';
import { dummyUsers } from '@/lib/data/dummy';

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
      //   .from('reviews')
      //   .select(`
      //     *,
      //     reviewer:users!reviewer_id(name, avatar_url, is_verified)
      //   `)
      //   .eq('reviewee_id', userId)
      //   .order('created_at', { ascending: false });
      
      // if (error) throw error;
      // return NextResponse.json(data);
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }
    
    // Fallback to dummy data - generate mock reviews
    const user = dummyUsers.find(u => u.id === userId || u.name.toLowerCase().replace(/\s+/g, '-') === userId);
    if (!user || !user.is_verified) {
      return NextResponse.json([]);
    }
    
    // Generate mock reviews for verified users
    const mockReviews = [
      {
        id: '1',
        rating: 5,
        comment: 'Great seller! Item was exactly as described and delivery was quick.',
        created_at: '2024-01-15T10:00:00Z',
        reviewer: {
          name: 'Emma Wilson',
          avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          is_verified: true
        }
      },
      {
        id: '2',
        rating: 4,
        comment: 'Good communication and fair pricing. Would buy again.',
        created_at: '2024-01-10T14:30:00Z',
        reviewer: {
          name: 'James Chen',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          is_verified: false
        }
      },
      {
        id: '3',
        rating: 5,
        comment: 'Excellent service and quality items. Highly recommended!',
        created_at: '2024-01-05T09:15:00Z',
        reviewer: {
          name: 'Lisa Rodriguez',
          avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          is_verified: true
        }
      }
    ];
    
    return NextResponse.json(mockReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}