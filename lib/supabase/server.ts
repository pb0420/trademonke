import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

export const createServerClient = () => {
  try {
    return createServerComponentClient<Database>({ cookies });
  } catch (error) {
    console.error('Failed to create Supabase server client:', error);
    throw error;
  }
};