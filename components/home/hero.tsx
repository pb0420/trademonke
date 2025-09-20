'use client';

import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LocationService } from '@/components/location/location-service';

interface HeroProps {
  onLocationUpdate: (location: any) => void;
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

export function Hero({ onLocationUpdate, onSearch, isSearching = false }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  return (
    <div className="bg-gradient-to-br from-background via-background to-primary/5 pt-4 pb-6">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center">
              {isSearching ? (
                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
              ) : (
                <Search className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <Input
              type="search"
              placeholder="Search for anything..."
              className="pl-12 pr-4 h-14 text-base rounded-3xl border-0 shadow-xl bg-white/95 backdrop-blur-sm focus:bg-white focus:shadow-2xl transition-all duration-300 placeholder:text-muted-foreground/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location Service */}
          <div className="flex justify-center">
            <LocationService onLocationUpdate={onLocationUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}