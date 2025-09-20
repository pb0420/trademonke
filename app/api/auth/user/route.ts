export const dynamic = "force-static";


import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/data/dummy';

export async function GET() {
  try {
    // In a real app, you would get the user from the session/JWT
    const user = getCurrentUser();
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}