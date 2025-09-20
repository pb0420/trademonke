import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

export const supabase = createClientComponentClient<Database>();

export const getPosts = async (filters?: {
  search?: string;
  category?: string;
  location?: string;
  sortBy?: string;
  userLat?: number;
  userLon?: number;
  maxDistance?: number;
}) => {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        user:users(name, business_name, is_verified, avatar_url),
        category:categories(name, icon),
        media(url, type, order_index)
      `)
      .eq('status', 'approved')
      .eq('privacy', 'public');

    // Apply filters
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    // Apply sorting
    switch (filters?.sortBy) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'distance':
        // TODO: Implement distance sorting with PostGIS
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query.limit(50);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get posts error:', error);
    return { data: null, error };
  }
};

export const getPost = async (postId: string) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:users(id, name, business_name, is_verified, verification_status, avatar_url),
        category:categories(name, icon),
        media(url, type, order_index)
      `)
      .eq('id', postId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get post error:', error);
    return { data: null, error };
  }
};

export const incrementViewCount = async (postId: string) => {
  try {
    const { error } = await supabase.rpc('increment_view_count', {
      post_id: postId
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Increment view count error:', error);
    return { error };
  }
};

export const createPost = async (postData: {
  title: string;
  description: string;
  category_id?: string;
  price?: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  privacy?: 'public' | 'private';
  show_business_name?: boolean;
}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        user_id: user.id,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Create post error:', error);
    return { data: null, error };
  }
};