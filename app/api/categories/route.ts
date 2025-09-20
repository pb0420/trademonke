export const dynamic = "force-static";

import { NextResponse } from 'next/server';
import { dummyCategories, dummyServiceCategories } from '@/lib/data/dummy';

export async function GET() {
  try {
    return NextResponse.json({
      categories: dummyCategories,
      services: dummyServiceCategories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}