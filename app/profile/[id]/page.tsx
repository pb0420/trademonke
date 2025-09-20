'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Star, 
  MessageCircle,
  Shield,
  Clock,
  AlertTriangle,
  Package,
  Eye
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PostCard } from '@/components/posts/post-card';

interface UserProfile {
  id: string;
  name: string;
  business_name?: string;
  avatar_url?: string;
  is_verified: boolean;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  posts_count: number;
  active_posts_count: number;
  rating?: number;
  review_count?: number;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer: {
    name: string;
    avatar_url?: string;
    is_verified: boolean;
  };
}

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  view_count: number;
  category: {
    name: string;
    icon: string;
  };
  media: Array<{
    url: string;
    type: 'photo' | 'video';
  }>;
}

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params?.id) {
      fetchProfile(params.id as string);
    }
  }, [params?.id]);

  const fetchProfile = async (userId: string) => {
    try {
      const [profileRes, postsRes, reviewsRes] = await Promise.all([
        fetch(`/api/profile/${userId}`),
        fetch(`/api/profile/${userId}/posts`),
        fetch(`/api/profile/${userId}/reviews`)
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData);
      } else {
        setError('Profile not found');
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-muted rounded-full" />
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-32" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Profile Not Found</h3>
            <p className="text-muted-foreground mb-4">
              {error || 'The profile you\'re looking for doesn\'t exist.'}
            </p>
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = profile.business_name || profile.name;
  const averageRating = profile.rating || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl font-bold">
                  {displayName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{displayName}</h1>
                    {profile.is_verified && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>

                  {/* Verification Status */}
                  <div className="flex items-center gap-3 mb-3">
                    {profile.verification_status === 'approved' && profile.is_verified && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified User
                      </Badge>
                    )}
                    
                    {profile.verification_status === 'pending' && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Verification Pending
                      </Badge>
                    )}
                    
                    {profile.verification_status === 'rejected' && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Verification Failed
                      </Badge>
                    )}

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profile.posts_count}</span>
                      <span className="text-muted-foreground">total posts</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{profile.active_posts_count}</span>
                      <span className="text-muted-foreground">active posts</span>
                    </div>

                    {averageRating > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          ({profile.review_count || 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Button className="rounded-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact {profile.business_name ? 'Business' : 'User'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="listings" className="rounded-full">
              Listings ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full">
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            {posts.length === 0 ? (
              <Card className="text-center py-12 rounded-3xl border-0 shadow-lg bg-white/80">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Listings Yet</h3>
                  <p className="text-muted-foreground">
                    This user hasn't posted any items for sale yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={{
                      ...post,
                      user: {
                        name: profile.name,
                        business_name: profile.business_name,
                        is_verified: profile.is_verified
                      }
                    }} 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            {reviews.length === 0 ? (
              <Card className="text-center py-12 rounded-3xl border-0 shadow-lg bg-white/80">
                <CardContent>
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground">
                    This user hasn't received any reviews yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="rounded-2xl border-0 shadow-lg bg-white/80">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.reviewer.avatar_url} />
                          <AvatarFallback>
                            {review.reviewer.name?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.reviewer.name}</span>
                              {review.reviewer.is_verified && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-current'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {review.comment && (
                            <p className="text-muted-foreground">{review.comment}</p>
                          )}

                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}