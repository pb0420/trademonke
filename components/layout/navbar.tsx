'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/providers';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';
import { CreatePostButton } from '@/components/posts/create-post-button';

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleSignOut = () => {
    // In a real app, you would call the sign out API
    // For now, just reload the page
    window.location.reload();
  };
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg">
              <span className="text-xs font-bold text-white">TM</span>
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TradeMonkey
              </span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                {/* Create Post Button */}
                <Button asChild size="sm" className="hidden sm:flex shadow-lg rounded-full px-4">
                  <Link href="/posts/create">
                    <Plus className="h-4 w-4 mr-1" />
                    Post
                  </Link>
                </Button>

                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:bg-muted/80 rounded-full">
                      <User className="h-4 w-4" />
                      {user.is_verified && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user.name}
                      {user.is_verified && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    {!user.is_verified && (
                      <DropdownMenuItem asChild>
                        <Link href="/verify" className="text-orange-600">
                          <span className="mr-2">⚠️</span>
                          Complete Verification
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/posts/create" className="sm:hidden">
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="text-primary">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/support">Support</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-muted/80 rounded-full">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="shadow-lg rounded-full">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}