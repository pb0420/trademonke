import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

export const supabase = createClientComponentClient<Database>();

export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Get post counts
    const { count: totalPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: activePosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'approved');

    // Get average rating
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewee_id', userId);

    const averageRating = reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    return {
      data: {
        ...data,
        posts_count: totalPosts || 0,
        active_posts_count: activePosts || 0,
        rating: averageRating,
        review_count: reviews?.length || 0
      },
      error: null
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return { data: null, error };
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        description,
        price,
        location,
        created_at,
        view_count,
        category:categories(name, icon),
        media(url, type, order_index)
      `)
      .eq('user_id', userId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get user posts error:', error);
    return { data: null, error };
  }
};

export const getUserReviews = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        reviewer:users!reviewer_id(name, avatar_url, is_verified)
      `)
      .eq('reviewee_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Get user reviews error:', error);
    return { data: null, error };
  }
};

export const updateProfile = async (userId: string, updates: {
  name?: string;
  business_name?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { data: null, error };
  }
};