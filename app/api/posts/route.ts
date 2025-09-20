export const dynamic = "force-static";

import { NextRequest, NextResponse } from 'next/server';
import { getPostsWithDetails, dummyPosts, calculateDistance } from '@/lib/data/dummy';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const userLat = searchParams.get('userLat');
    const userLon = searchParams.get('userLon');
    const maxDistance = searchParams.get('maxDistance');

    let posts = getPostsWithDetails();

    // Filter by status (only approved posts for public)
    posts = posts.filter(post => post.status === 'approved' && post.is_active);

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower) ||
        post.location.toLowerCase().includes(searchLower) ||
        post.category.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (category) {
      posts = posts.filter(post => post.category_id === category);
    }

    // Apply location filter
    if (location) {
      const locationLower = location.toLowerCase();
      posts = posts.filter(post => 
        post.location.toLowerCase().includes(locationLower)
      );
    }

    // Apply distance filter if user location is provided
    if (userLat && userLon && maxDistance) {
      const userLatNum = parseFloat(userLat);
      const userLonNum = parseFloat(userLon);
      const maxDistanceNum = parseFloat(maxDistance);
      
      posts = posts.filter(post => {
        if (!post.latitude || !post.longitude) return false;
        const distance = calculateDistance(userLatNum, userLonNum, post.latitude, post.longitude);
        return distance <= maxDistanceNum;
      });
    }

    // Add distance to posts if user location is provided
    if (userLat && userLon) {
      const userLatNum = parseFloat(userLat);
      const userLonNum = parseFloat(userLon);
      
      posts = posts.map(post => ({
        ...post,
        distance: post.latitude && post.longitude 
          ? calculateDistance(userLatNum, userLonNum, post.latitude, post.longitude)
          : null
      }));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        posts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        posts.sort((a, b) => b.price - a.price);
        break;
      case 'distance':
        if (userLat && userLon) {
          posts.sort((a, b) => {
            const distanceA = (a as any).distance || Infinity;
            const distanceB = (b as any).distance || Infinity;
            return distanceA - distanceB;
          });
        }
        break;
      case 'newest':
      default:
        posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    // Limit results
    posts = posts.slice(0, 50);

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would:
    // 1. Validate the user is authenticated
    // 2. Validate the post data
    // 3. Save to database
    // 4. Handle file uploads
    
    // For now, just return success
    const newPost = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      view_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}