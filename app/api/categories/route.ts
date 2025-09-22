export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { dummyCategories, dummyServiceCategories } from '@/lib/data/dummy';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Try Supabase first
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data && !error) {
        // Separate categories and services based on naming convention
        const categories = data.filter(cat => !cat.name.toLowerCase().includes('service'));
        const services = data.filter(cat => cat.name.toLowerCase().includes('service'));
        
        return NextResponse.json({
          categories: categories.length > 0 ? categories : dummyCategories,
          services: services.length > 0 ? services : dummyServiceCategories
        });
      }
    } catch (supabaseError) {
      console.log('Supabase error, using dummy data:', supabaseError);
    }

    // Fallback to dummy data
    return NextResponse.json({
      categories: dummyCategories,
      services: dummyServiceCategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}