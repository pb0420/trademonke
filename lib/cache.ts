// Simple in-memory cache with TTL
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class SimpleCache {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T, ttlMinutes: number = 5): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000, // Convert to milliseconds
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

export const cache = new SimpleCache();

// Auto cleanup every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000);
}

// Cache keys
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  USER_PROFILE: (id: string) => `user_profile_${id}`,
  USER_POSTS: (id: string) => `user_posts_${id}`,
  POST_DETAIL: (id: string) => `post_detail_${id}`,
  POSTS_LIST: (params: string) => `posts_list_${params}`,
  DASHBOARD_STATS: (userId: string) => `dashboard_stats_${userId}`,
  NOTIFICATIONS: (userId: string) => `notifications_${userId}`,
} as const;