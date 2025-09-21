'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  Package,
  Star,
  Crown,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/providers';
import { PostCard } from '@/components/posts/post-card';
import { formatDistanceToNow } from 'date-fns';

interface DashboardStats {
  totalPosts: number;
  activePosts: number;
  pendingPosts: number;
  totalViews: number;
  planName: string;
  canCreatePost: boolean;
  limitInfo: any;
}

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  view_count: number;
  unique_views: number;
  created_at: string;
  category: {
    name: string;
    icon: string;
  };
  media: Array<{
    url: string;
    type: 'photo' | 'video';
  }>;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const [statsRes, postsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/posts')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        throw new Error('Failed to fetch dashboard stats');
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (err: any) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card>
          <CardContent className="text-center py-12">
            <p>Please sign in to access your dashboard.</p>
            <Button asChild className="mt-4">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-2xl" />
            ))}
          </div>
          <div className="h-96 bg-muted rounded-3xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchDashboardData} className="mt-4 w-full">
          Try Again
        </Button>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status === 'pending');
  const approvedPosts = posts.filter(p => p.status === 'approved');
  const rejectedPosts = posts.filter(p => p.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your listings and track performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            {!user.is_verified && (
              <Button asChild variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <Link href="/verify">
                  <Shield className="h-4 w-4 mr-2" />
                  Complete Verification
                </Link>
              </Button>
            )}
            
            <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <Link href="/posts/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Listing
              </Link>
            </Button>
          </div>
        </div>

        {/* Verification Alert */}
        {!user.is_verified && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Verification Required:</strong> Complete your profile verification to publish listings immediately. 
              <Link href="/verify" className="underline ml-1">Verify now</Link> or 
              <Link href="/pricing" className="underline ml-1">upgrade to Premium</Link> for priority verification.
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Posts</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.totalPosts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Active Posts</p>
                    <p className="text-2xl font-bold text-green-900">{stats.activePosts}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-900">{stats.pendingPosts}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Total Views</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalViews}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plan Info */}
        {stats && (
          <Card className="mb-8 rounded-2xl border-0 shadow-lg bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Current Plan: {stats.planName}</h3>
                    <p className="text-sm text-gray-600">
                      {stats.limitInfo?.maxActivePosts 
                        ? `${stats.limitInfo.activePosts}/${stats.limitInfo.maxActivePosts} active posts`
                        : 'Unlimited active posts'
                      }
                    </p>
                  </div>
                </div>
                
                {stats.planName === 'Free' && (
                  <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                    <Link href="/pricing">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 rounded-2xl bg-white shadow-lg">
            <TabsTrigger value="all" className="rounded-xl">
              All ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="rounded-xl">
              Live ({approvedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">
              Pending ({pendingPosts.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-xl">
              Rejected ({rejectedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <PostsList posts={posts} />
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <PostsList posts={approvedPosts} />
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <PostsList posts={pendingPosts} showPendingMessage />
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            <PostsList posts={rejectedPosts} showRejectedMessage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PostsList({ 
  posts, 
  showPendingMessage = false, 
  showRejectedMessage = false 
}: { 
  posts: Post[]; 
  showPendingMessage?: boolean;
  showRejectedMessage?: boolean;
}) {
  if (posts.length === 0) {
    return (
      <Card className="text-center py-12 rounded-3xl border-0 shadow-lg bg-white/80">
        <CardContent>
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
          <p className="text-muted-foreground mb-4">
            {showPendingMessage 
              ? "You don't have any posts waiting for approval."
              : showRejectedMessage
              ? "No rejected posts."
              : "Start by creating your first listing."
            }
          </p>
          {!showPendingMessage && !showRejectedMessage && (
            <Button asChild>
              <Link href="/posts/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Post
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showPendingMessage && (
        <Alert className="border-orange-200 bg-orange-50">
          <Clock className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            These posts are waiting for admin approval. This usually takes 24-48 hours.
            <Link href="/pricing" className="underline ml-1">Upgrade to Premium</Link> for priority review.
          </AlertDescription>
        </Alert>
      )}

      {showRejectedMessage && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            These posts were rejected. You can edit and resubmit them, or contact support for more information.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={post.media[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge 
                  variant={
                    post.status === 'approved' ? 'default' : 
                    post.status === 'pending' ? 'secondary' : 
                    'destructive'
                  }
                  className="rounded-full"
                >
                  {post.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                  {post.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                  {post.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 text-gray-700 rounded-full">
                  {post.category.icon} {post.category.name}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{post.title}</h3>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-primary">${post.price.toLocaleString()}</span>
                <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.view_count} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{post.unique_views || Math.floor(post.view_count * 0.7)} unique</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <Link href={`/posts/${post.id}`}>View</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="h-7 px-2 text-xs">
                    <Link href={`/posts/edit/${post.id}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}