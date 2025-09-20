'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Eye, 
  CheckCircle, 
  Clock, 
  Share2, 
  Heart, 
  MessageCircle,
  ArrowLeft,
  Star,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  created_at: string;
  view_count: number;
  status: 'pending' | 'approved' | 'rejected';
  user: {
    id: string;
    name: string;
    business_name?: string;
    is_verified: boolean;
    verification_status: 'pending' | 'approved' | 'rejected';
    avatar_url?: string;
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

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (params?.id) {
      fetchPost(params.id as string);
    }
  }, [params?.id]);

  const fetchPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        
        // Increment view count
        await fetch(`/api/posts/${postId}/view`, { method: 'POST' });
      } else if (response.status === 404) {
        setError('Post not found');
      } else {
        setError('Failed to load post');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleContact = () => {
    // In a real app, this would open a messaging interface
    toast.info('Contact feature coming soon!');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="aspect-video bg-muted rounded-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
            <div className="space-y-4">
              <div className="h-20 bg-muted rounded-2xl" />
              <div className="h-12 bg-muted rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="text-center py-12">
          <CardContent>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Post Not Found</h3>
            <p className="text-muted-foreground mb-4">
              {error || 'The post you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show verification pending state
  if (post.status === 'pending') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="text-center py-12 border-orange-200 bg-orange-50/50">
          <CardContent>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-orange-900">Under Review</h3>
            <p className="text-orange-700 mb-4">
              This post is currently being reviewed by our team and will be available soon.
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show rejected state
  if (post.status === 'rejected') {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card className="text-center py-12 border-red-200 bg-red-50/50">
          <CardContent>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-red-900">Post Unavailable</h3>
            <p className="text-red-700 mb-4">
              This post has been removed and is no longer available.
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = post.user.business_name || post.user.name;
  const images = post.media.filter(m => m.type === 'photo');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4 hover:bg-white/80 rounded-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">
              <div className="aspect-video relative">
                <Image
                  src={images[selectedImageIndex]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === selectedImageIndex 
                            ? 'bg-white shadow-lg' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 text-gray-900 border-0 shadow-lg">
                    {post.category.icon} {post.category.name}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleShare}
                    className="bg-white/95 hover:bg-white border-0 shadow-lg rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-primary shadow-lg' 
                          : 'border-transparent hover:border-muted-foreground/30'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${post.title} ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Post Details */}
            <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-2xl font-bold leading-tight">{post.title}</h1>
                  {post.price && (
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ${post.price.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {post.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.view_count} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </div>
                </div>

                <Separator />

                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {post.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card className="p-6 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <div className="space-y-4">
                <h3 className="font-semibold">Seller Information</h3>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.user.avatar_url} />
                    <AvatarFallback>
                      {displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/profile/${post.user.id}`}
                        className="font-medium hover:text-primary transition-colors truncate"
                      >
                        {displayName}
                      </Link>
                      {post.user.is_verified && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Verification Status */}
                    {post.user.verification_status === 'pending' && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Verification Pending
                      </Badge>
                    )}
                    
                    {post.user.verification_status === 'rejected' && (
                      <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Verification Failed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleContact} className="flex-1 rounded-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="rounded-full"
                  >
                    <Link href={`/profile/${post.user.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Safety Tips */}
            <Card className="p-6 rounded-3xl border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Safety Tips</h3>
                </div>
                
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Meet in a public place</li>
                  <li>• Inspect items before payment</li>
                  <li>• Use secure payment methods</li>
                  <li>• Trust your instincts</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}