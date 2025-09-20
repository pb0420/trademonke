// Dummy data for development without Supabase

export interface User {
  id: string;
  phone: string | null;
  email: string | null;
  name: string | null;
  business_name: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  is_admin: boolean;
  plan_id: string;
  subscription_status: 'active' | 'expired' | 'cancelled';
  subscription_end_date: string | null;
  posts_count: number;
  active_posts_count: number;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category_id: string;
  price: number;
  location: string;
  latitude: number | null;
  longitude: number | null;
  privacy: 'public' | 'private';
  status: 'pending' | 'approved' | 'rejected';
  is_active: boolean;
  show_business_name: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Media {
  id: string;
  post_id: string;
  url: string;
  type: 'photo' | 'video';
  order_index: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  max_active_posts: number | null;
  max_total_posts: number | null;
  priority_verification: boolean;
  features: string[];
}

// Plans
export const dummyPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'AUD',
    max_active_posts: 1,
    max_total_posts: 5,
    priority_verification: false,
    features: ['1 active listing', '5 total posts lifetime', 'Basic support']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 25,
    currency: 'AUD',
    max_active_posts: null,
    max_total_posts: null,
    priority_verification: true,
    features: ['Unlimited active listings', 'Unlimited posts', 'Priority verification', 'Premium support', 'Featured listings']
  }
];

// Dummy users
export const dummyUsers: User[] = [
  {
    id: '1',
    phone: '+61412345678',
    email: 'john@example.com',
    name: 'John Smith',
    business_name: null,
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    is_verified: false,
    verification_status: 'pending',
    is_admin: false,
    plan_id: 'free',
    subscription_status: 'active',
    subscription_end_date: null,
    posts_count: 3,
    active_posts_count: 1,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    phone: '+61423456789',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    business_name: 'Sarah\'s Electronics',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    is_verified: true,
    verification_status: 'approved',
    is_admin: false,
    plan_id: 'premium',
    subscription_status: 'active',
    subscription_end_date: '2024-12-31T23:59:59Z',
    posts_count: 8,
    active_posts_count: 3,
    created_at: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    phone: '+61434567890',
    email: 'mike@example.com',
    name: 'Mike Wilson',
    business_name: null,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    is_verified: false,
    verification_status: 'pending',
    is_admin: false,
    plan_id: 'free',
    subscription_status: 'active',
    subscription_end_date: null,
    posts_count: 1,
    active_posts_count: 1,
    created_at: '2024-01-20T09:15:00Z',
  },
  {
    id: 'admin',
    phone: '+61400000000',
    email: 'admin@trademonkey.com',
    name: 'Admin User',
    business_name: null,
    avatar_url: null,
    is_verified: true,
    verification_status: 'approved',
    is_admin: true,
    plan_id: 'premium',
    subscription_status: 'active',
    subscription_end_date: null,
    posts_count: 0,
    active_posts_count: 0,
    created_at: '2024-01-01T00:00:00Z',
  },
];

// Dummy categories
export const dummyCategories: Category[] = [
  { id: '1', name: 'Cars', icon: '🚗', created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Living', icon: '🏠', created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Furniture', icon: '🪑', created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Electronics', icon: '📱', created_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Fashion', icon: '👕', created_at: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'Sports', icon: '⚽', created_at: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'Books', icon: '📚', created_at: '2024-01-01T00:00:00Z' },
  { id: '9', name: 'Other', icon: '📦', created_at: '2024-01-01T00:00:00Z' },
];

// Service categories
export const dummyServiceCategories: Category[] = [
  { id: 's1', name: 'Web Dev', icon: '💻', created_at: '2024-01-01T00:00:00Z' },
  { id: 's2', name: 'Cleaning', icon: '🧹', created_at: '2024-01-01T00:00:00Z' },
  { id: 's3', name: 'Tutoring', icon: '📚', created_at: '2024-01-01T00:00:00Z' },
  { id: 's4', name: 'Fitness', icon: '💪', created_at: '2024-01-01T00:00:00Z' },
  { id: 's5', name: 'Beauty', icon: '💄', created_at: '2024-01-01T00:00:00Z' },
  { id: 's6', name: 'Handyman', icon: '🔧', created_at: '2024-01-01T00:00:00Z' },
  { id: 's7', name: 'Photography', icon: '📸', created_at: '2024-01-01T00:00:00Z' },
  { id: 's8', name: 'Music', icon: '🎵', created_at: '2024-01-01T00:00:00Z' },
  { id: 's9', name: 'Pet Care', icon: '🐕', created_at: '2024-01-01T00:00:00Z' },
  { id: 's10', name: 'Delivery', icon: '🚚', created_at: '2024-01-01T00:00:00Z' },
];

// Dummy posts
export const dummyPosts: Post[] = [
  {
    id: '1',
    user_id: '1',
    title: '2019 Toyota Camry - Excellent Condition',
    description: 'Well-maintained Toyota Camry with low mileage. Perfect for daily commuting. Full service history available.',
    category_id: '1',
    price: 25000,
    location: 'Sydney, NSW',
    latitude: -33.8688197,
    longitude: 151.2092955,
    privacy: 'public',
    status: 'approved',
    is_active: true,
    show_business_name: false,
    view_count: 45,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: '2',
    user_id: '2',
    title: 'iPhone 14 Pro Max - Like New',
    description: 'Barely used iPhone 14 Pro Max in pristine condition. Comes with original box and accessories.',
    category_id: '5',
    price: 1200,
    location: 'Melbourne, VIC',
    latitude: -37.8136276,
    longitude: 144.9630576,
    privacy: 'public',
    status: 'approved',
    is_active: true,
    show_business_name: true,
    view_count: 78,
    created_at: '2024-01-18T14:30:00Z',
    updated_at: '2024-01-18T14:30:00Z',
  },
  {
    id: '3',
    user_id: '1',
    title: 'Modern Dining Table Set',
    description: 'Beautiful oak dining table with 6 chairs. Perfect for family dinners. Minor wear but very sturdy.',
    category_id: '3',
    price: 800,
    location: 'Parramatta, NSW',
    latitude: -33.8150,
    longitude: 151.0000,
    privacy: 'public',
    status: 'approved',
    is_active: false,
    show_business_name: false,
    view_count: 23,
    created_at: '2024-01-19T09:15:00Z',
    updated_at: '2024-01-19T09:15:00Z',
  },
  {
    id: '4',
    user_id: '3',
    title: 'Professional Web Development Services',
    description: 'Experienced full-stack developer offering custom website development. React, Node.js, and more.',
    category_id: 's1',
    price: 100,
    location: 'Bondi, NSW',
    latitude: -33.8915,
    longitude: 151.2767,
    privacy: 'public',
    status: 'pending',
    is_active: true,
    show_business_name: false,
    view_count: 12,
    created_at: '2024-01-20T16:45:00Z',
    updated_at: '2024-01-20T16:45:00Z',
  },
  {
    id: '5',
    user_id: '2',
    title: 'Vintage Leather Jacket',
    description: 'Authentic vintage leather jacket from the 80s. Size Medium. Great condition with unique character.',
    category_id: '6',
    price: 150,
    location: 'Surry Hills, NSW',
    latitude: -33.8886,
    longitude: 151.2094,
    privacy: 'public',
    status: 'approved',
    is_active: true,
    show_business_name: false,
    view_count: 34,
    created_at: '2024-01-21T11:20:00Z',
    updated_at: '2024-01-21T11:20:00Z',
  },
  {
    id: '6',
    user_id: '1',
    title: 'Gaming Setup - RTX 4080 PC',
    description: 'High-end gaming PC with RTX 4080, 32GB RAM, and RGB lighting. Perfect for streaming and gaming.',
    category_id: '5',
    price: 3500,
    location: 'Chatswood, NSW',
    latitude: -33.7969,
    longitude: 151.1835,
    privacy: 'public',
    status: 'approved',
    is_active: false,
    show_business_name: false,
    view_count: 89,
    created_at: '2024-01-22T15:30:00Z',
    updated_at: '2024-01-22T15:30:00Z',
  },
  {
    id: '7',
    user_id: '2',
    title: 'Yoga Classes - Personal Training',
    description: 'Certified yoga instructor offering private and group sessions. All levels welcome. Flexible scheduling.',
    category_id: 's4',
    price: 80,
    location: 'Manly, NSW',
    latitude: -33.7969,
    longitude: 151.2841,
    privacy: 'public',
    status: 'approved',
    is_active: true,
    show_business_name: true,
    view_count: 45,
    created_at: '2024-01-23T08:00:00Z',
    updated_at: '2024-01-23T08:00:00Z',
  },
  {
    id: '8',
    user_id: '3',
    title: 'Mountain Bike - Trek X-Caliber',
    description: 'Excellent condition Trek mountain bike. Perfect for trails and city riding. Recently serviced.',
    category_id: '7',
    price: 650,
    location: 'Newtown, NSW',
    latitude: -33.8978,
    longitude: 151.1794,
    privacy: 'public',
    status: 'approved',
    is_active: false,
    show_business_name: false,
    view_count: 67,
    created_at: '2024-01-24T12:15:00Z',
    updated_at: '2024-01-24T12:15:00Z',
  },
];

// Dummy media
export const dummyMedia: Media[] = [
  { id: '1', post_id: '1', url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '2', post_id: '1', url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop', type: 'photo', order_index: 1 },
  { id: '3', post_id: '2', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '4', post_id: '3', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '5', post_id: '4', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '6', post_id: '5', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '7', post_id: '6', url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '8', post_id: '7', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
  { id: '9', post_id: '8', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', type: 'photo', order_index: 0 },
];

// Dummy notifications
export const dummyNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    type: 'post_approved',
    title: 'Post Approved ✅',
    content: 'Your post "2019 Toyota Camry - Excellent Condition" has been approved and is now live!',
    is_read: false,
    created_at: '2024-01-16T10:30:00Z',
  },
  {
    id: '2',
    user_id: '1',
    type: 'new_review',
    title: 'New Review Received ⭐',
    content: 'You received a 5-star review from Sarah Johnson. Great job!',
    is_read: false,
    created_at: '2024-01-17T14:15:00Z',
  },
  {
    id: '3',
    user_id: '2',
    type: 'verification_approved',
    title: 'Account Verified 🎉',
    content: 'Congratulations! Your account has been verified. You now have a verified badge.',
    is_read: true,
    created_at: '2024-01-11T09:00:00Z',
  },
  {
    id: '4',
    user_id: '3',
    type: 'welcome',
    title: 'Welcome to TradeMonkey! 🎉',
    content: 'Complete your verification to start posting items and build trust with other users.',
    is_read: false,
    created_at: '2024-01-20T09:16:00Z',
  },
];

// Current user simulation (you can change this ID to test different users)
export const currentUserId = '1'; // Change to '2', '3', or 'admin' to test different users

export const getCurrentUser = (): User | null => {
  return dummyUsers.find(user => user.id === currentUserId) || null;
};

export const getPostsWithDetails = () => {
  return dummyPosts.map(post => {
    const user = dummyUsers.find(u => u.id === post.user_id);
    const category = dummyCategories.find(c => c.id === post.category_id);
    const media = dummyMedia.filter(m => m.post_id === post.id);

    return {
      ...post,
      user: user ? {
        name: user.name || 'Anonymous',
        business_name: user.business_name,
        is_verified: user.is_verified,
      } : {
        name: 'Anonymous',
        business_name: null,
        is_verified: false,
      },
      category: category ? {
        name: category.name,
        icon: category.icon,
      } : {
        name: 'Other',
        icon: '📦',
      },
      media: media.sort((a, b) => a.order_index - b.order_index).map(m => ({
        url: m.url,
        type: m.type,
      })),
    };
  });
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

export const getUserNotifications = (userId: string) => {
  return dummyNotifications.filter(n => n.user_id === userId);
};

export const getUserPlan = (userId: string): Plan | null => {
  const user = dummyUsers.find(u => u.id === userId);
  if (!user) return null;
  return dummyPlans.find(p => p.id === user.plan_id) || null;
};

export const canUserCreatePost = (userId: string): { canCreate: boolean; reason?: string } => {
  const user = dummyUsers.find(u => u.id === userId);
  if (!user) return { canCreate: false, reason: 'User not found' };
  
  const plan = getUserPlan(userId);
  if (!plan) return { canCreate: false, reason: 'No plan found' };
  
  // Check subscription status
  if (user.subscription_status === 'expired') {
    return { canCreate: false, reason: 'Subscription expired' };
  }
  
  if (user.subscription_status === 'cancelled') {
    return { canCreate: false, reason: 'Subscription cancelled' };
  }
  
  // Check active posts limit
  if (plan.max_active_posts !== null && user.active_posts_count >= plan.max_active_posts) {
    return { canCreate: false, reason: `Maximum active posts reached (${plan.max_active_posts})` };
  }
  
  // Check total posts limit
  if (plan.max_total_posts !== null && user.posts_count >= plan.max_total_posts) {
    return { canCreate: false, reason: `Maximum total posts reached (${plan.max_total_posts})` };
  }
  
  return { canCreate: true };
};

export const getPostLimitInfo = (userId: string) => {
  const user = dummyUsers.find(u => u.id === userId);
  const plan = getUserPlan(userId);
  
  if (!user || !plan) return null;
  
  return {
    activePosts: user.active_posts_count,
    maxActivePosts: plan.max_active_posts,
    totalPosts: user.posts_count,
    maxTotalPosts: plan.max_total_posts,
    planName: plan.name,
    subscriptionStatus: user.subscription_status
  };
};