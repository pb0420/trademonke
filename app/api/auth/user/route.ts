export const dynamic = "force-dynamic";


import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/data/dummy';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (user && !error) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile && !profileError) {
          return NextResponse.json({ user: profile });
        }
      }
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }

    // Fallback to dummy data
    const user = getCurrentUser();
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}