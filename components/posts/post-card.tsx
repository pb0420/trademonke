'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Eye, CheckCircle, Navigation } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: {
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
  };
  showDistance?: boolean;
}

export function PostCard({ post, showDistance = false }: PostCardProps) {
  const displayName = post.user.business_name || post.user.name;
  const primaryImage = post.media.find(m => m.type === 'photo')?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 rounded-3xl bg-white border-0 shadow-lg hover:shadow-primary/10">
      <Link href={`/posts/${post.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={primaryImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="secondary" className="bg-white/95 backdrop-blur-md text-xs font-semibold shadow-lg rounded-full border-0">
              {post.category.icon} {post.category.name}
            </Badge>
          </div>
          
          {post.price && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-gradient-to-r from-primary to-blue-600 backdrop-blur-md text-white font-bold shadow-lg rounded-full border-0">
                ${post.price.toLocaleString()}
              </Badge>
            </div>
          )}
          
          {showDistance && post.distance !== undefined && (
            <div className="absolute bottom-3 right-3 z-10">
              <Badge variant="secondary" className="bg-white/95 backdrop-blur-md text-xs font-semibold shadow-lg rounded-full border-0">
                <Navigation className="h-3 w-3 mr-1" />
                {post.distance < 1 ? '<1km' : `${post.distance.toFixed(1)}km`}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/posts/${post.id}`}>
          <h3 className="font-bold text-base mb-2 line-clamp-2 hover:text-primary transition-colors duration-300 leading-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {post.description}
        </p>

        <div className="space-y-2">
          {/* Location */}
          {post.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0 text-primary/60" />
              <span className="truncate">{post.location}</span>
            </div>
          )}

          {/* Seller Info */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <Link
                href={`/profile/${post.user.name}`}
                className="font-semibold hover:text-primary transition-colors duration-300 truncate"
              >
                {displayName}
              </Link>
              {post.user.is_verified && (
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 drop-shadow-sm" />
              )}
            </div>
            
            <span className="text-xs text-muted-foreground/80 whitespace-nowrap ml-2">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}