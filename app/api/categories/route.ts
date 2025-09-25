export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { cache, CACHE_KEYS } from '@/lib/cache';

export async function GET() {
  try {
    // Check cache first
    const cachedData = cache.get(CACHE_KEYS.CATEGORIES);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Try Supabase
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data && !error) {
        // Separate categories and services
        const productCategories = ['Cars', 'Living', 'Furniture', 'Electronics', 'Fashion', 'Sports', 'Books', 'Other'];
        const categories = data.filter(cat => productCategories.includes(cat.name));
        const services = data.filter(cat => !productCategories.includes(cat.name));
        
        const result = { categories, services };
        
        // Cache for 30 minutes
        cache.set(CACHE_KEYS.CATEGORIES, result, 30);
        return NextResponse.json(result);
      }
    } catch (supabaseError) {
      console.log('Supabase error:', supabaseError);
    }

    // Fallback - return empty categories
    const fallbackResult = { categories: [], services: [] };
    return NextResponse.json(fallbackResult);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}