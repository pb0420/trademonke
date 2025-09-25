export const dynamic = "force-dynamic";


import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Try Supabase
    try {
      const supabase = createServerClient();
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      if (user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          // User exists in auth but not in users table, create profile
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              phone: user.phone,
              name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
              is_verified: false,
              verification_status: 'pending'
            })
            .select()
            .single();
            
          if (createError) throw createError;
          return NextResponse.json({ user: newProfile });
        }
        
        return NextResponse.json({ user: profile });
      }
      
      return NextResponse.json({ user: null });
    } catch (supabaseError) {
      console.log('Supabase error:', supabaseError);
    }

    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}