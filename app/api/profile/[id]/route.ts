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
      //   .from('users')
      //   .select('*')
      //   .eq('id', userId)
      //   .single();
      
      // if (error) throw error;
      // return NextResponse.json(data);
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }
    
    // Fallback to dummy data
    const user = dummyUsers.find(u => u.id === userId || u.name.toLowerCase().replace(/\s+/g, '-') === userId);
    
    if (!user) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    // Add mock rating data
    const profileWithRating = {
      ...user,
      rating: user.is_verified ? 4.5 + Math.random() * 0.5 : undefined,
      review_count: user.is_verified ? Math.floor(Math.random() * 20) + 5 : 0,
      avatar_url: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1472099645785-5658abf4ff4e' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`
    };
    
    return NextResponse.json(profileWithRating);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}