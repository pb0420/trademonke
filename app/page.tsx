'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Filter, SlidersHorizontal, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PostCard } from '@/components/posts/post-card';
import { CategoryGrid } from '@/components/home/category-grid';
import { Hero } from '@/components/home/hero';
import { LocationService } from '@/components/location/location-service';

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  distance?: number;
  user: {
    name: string;
    is_verified: boolean;
    business_name?: string;
  };
  category: {
    name: string;
    icon: string;
  };
  media: Array<{
    url: string;
    type: 'photo' | 'video';
  }>;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [location, setLocation] = useState<string>('');
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [maxDistance, setMaxDistance] = useState<string>('50');
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string>('');
  
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get('search') || '';

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);


  // Memoize fetchPosts to avoid infinite update loop
  const fetchPosts = useCallback(async () => {
    setError('');
    // Set loading state only if posts are empty (initial load), else searching
    if (posts.length === 0) setLoading(true);
    else setSearching(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedCategory) params.append('category', selectedCategory);
      if (location.trim()) params.append('location', location.trim());
      if (sortBy) params.append('sortBy', sortBy);
      if (userLocation) {
        params.append('userLat', userLocation.latitude.toString());
        params.append('userLon', userLocation.longitude.toString());
        if (maxDistance) params.append('maxDistance', maxDistance);
      }

      const response = await fetch(`/api/posts?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again.');
      setPosts([]); // Clear posts on error
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }, [searchQuery, selectedCategory, sortBy, location, userLocation, maxDistance, posts.length]);

  // Debounced effect for fetching posts
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) fetchPosts();
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fetchPosts]);

  // ...existing code...

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationUpdate = (locationData: LocationData | null) => {
    setUserLocation((prev) => {
      // Only update if locationData is different from previous
      if (
        !prev ||
        prev.latitude !== locationData?.latitude ||
        prev.longitude !== locationData?.longitude ||
        prev.address !== locationData?.address
      ) {
        // Only setSortBy if not already 'distance'
        setSortBy((currentSort) => {
          if (locationData && currentSort === 'newest') {
            return 'distance';
          }
          return currentSort;
        });
        return locationData;
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setLocation('');
    setSortBy('newest');
    setMaxDistance('50');
  };
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory) count++;
    if (location.trim()) count++;
    if (userLocation) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero 
        onLocationUpdate={handleLocationUpdate} 
        onSearch={handleSearch}
        isSearching={searching}
      />

      {/* Categories */}
      <CategoryGrid 
        onCategorySelect={setSelectedCategory} 
        selectedCategory={selectedCategory}
      />

      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <Card className="mb-6 shadow-xl border-0 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardContent className="p-4 space-y-4">
            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 rounded-full bg-gradient-to-r from-white to-gray-50 border-0 hover:from-gray-50 hover:to-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              
              {/* Quick Sort - Always Visible */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 rounded-full border-0 bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-0 shadow-2xl">
                  <SelectItem value="newest">🕒 Newest</SelectItem>
                  <SelectItem value="price-low">💰 Price ↑</SelectItem>
                  <SelectItem value="price-high">💎 Price ↓</SelectItem>
                  {userLocation && (
                    <SelectItem value="distance">📍 Distance</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="space-y-4 pt-4 border-t border-gray-200/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700">📍 Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter location"
                        className="pl-10 rounded-2xl border-0 bg-white shadow-lg focus:shadow-xl transition-all duration-300"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Distance Filter */}
                  {userLocation && (
                    <div>
                      <label className="text-sm font-semibold mb-2 block text-gray-700">📏 Max Distance</label>
                      <Select value={maxDistance} onValueChange={setMaxDistance}>
                        <SelectTrigger className="rounded-2xl border-0 bg-white shadow-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-0 shadow-2xl">
                          <SelectItem value="5">5 km</SelectItem>
                          <SelectItem value="10">10 km</SelectItem>
                          <SelectItem value="25">25 km</SelectItem>
                          <SelectItem value="50">50 km</SelectItem>
                          <SelectItem value="100">100 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {searchQuery && (
                        <Badge 
                          variant="secondary" 
                          className="cursor-pointer rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors px-3 py-1" 
                          onClick={() => setSearchQuery('')}
                        >
                          🔍 "{searchQuery}" ×
                        </Badge>
                      )}
                      {location && (
                        <Badge 
                          variant="secondary" 
                          className="cursor-pointer rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors px-3 py-1" 
                          onClick={() => setLocation('')}
                        >
                          📍 {location} ×
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge 
                          variant="secondary" 
                          className="cursor-pointer rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors px-3 py-1" 
                          onClick={() => setSelectedCategory('')}
                        >
                          🏷️ Category ×
                        </Badge>
                      )}
                      {userLocation && (
                        <Badge variant="secondary" className="rounded-full bg-orange-100 text-orange-700 px-3 py-1">
                          <Navigation className="h-3 w-3 mr-1" />
                          📍 {maxDistance}km radius
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters} 
                      className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors ml-2"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-base font-semibold">
              {loading ? 'Loading...' : searching ? 'Searching...' : `${posts.length} items found`}
            </p>
            {userLocation && (
              <p className="text-sm text-muted-foreground">
                Near {userLocation.address || 'your location'}
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {error ? (
          <Card className="text-center py-12 rounded-3xl bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardContent>
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-red-600">Error Loading Posts</h3>
                <p className="text-muted-foreground">{error}</p>
                <Button onClick={fetchPosts} className="rounded-full shadow-sm">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : loading || searching ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array(12).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse rounded-3xl shadow-lg">
                <div className="bg-muted h-40" />
                <CardContent className="p-4 space-y-2">
                  <div className="bg-muted h-4 rounded" />
                  <div className="bg-muted h-4 rounded w-2/3" />
                  <div className="bg-muted h-3 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Card className="text-center py-12 rounded-3xl bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardContent>
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No items found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearAllFilters} className="rounded-full shadow-sm">
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showDistance={!!userLocation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}