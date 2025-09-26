'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User, Plus, Sparkles, Menu, X, Chrome as Home, Grid3x3 as Grid3X3, MessageCircle, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/components/providers';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-2xl border-b border-gray-100/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-xs font-bold text-white">TM</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-sm" />
            </div>
            <div className="hidden md:block">
              <span className="font-bold text-lg bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                TradeMonkey
              </span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                {/* Create Post Button */}
                <Button 
                  asChild 
                  size="sm" 
                  className="h-9 w-9 p-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/posts/create" title="Create Listing">
                    <Plus className="h-4 w-4" />
                  </Link>
                </Button>

                {/* Notifications */}
                <NotificationDropdown />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 rounded-full h-9 w-9 p-0">
                      <User className="h-4 w-4" />
                      {user.is_verified && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2">
                    <div className="px-3 py-2 border-b border-gray-100 mb-2">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.is_verified ? (
                        <Badge variant="secondary" className="mt-1 text-xs bg-green-100 text-green-700">
                          ✓ Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="mt-1 text-xs bg-orange-100 text-orange-700">
                          ⏳ Pending Verification
                        </Badge>
                      )}
                    </div>
                    
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    
                    {!user.is_verified && (
                      <DropdownMenuItem asChild>
                        <Link href="/verify" className="cursor-pointer text-orange-600">
                          <span className="mr-2">⚠️</span>
                          Complete Verification
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer text-blue-600">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem asChild>
                      <Link href="/support" className="cursor-pointer">
                        Support
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild className="hover:bg-gray-100 rounded-full">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="shadow-lg rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

      </div>
      
      {/* Bottom Navigation for Mobile */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg">
          <div className="flex items-center justify-around py-2">
            <Link 
              href="/" 
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link 
              href="/categories" 
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === '/categories' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
              <span className="text-xs mt-1">Browse</span>
            </Link>
            
            <Link 
              href="/posts/create" 
              className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs mt-1">Post</span>
            </Link>
            
            {user.is_verified && (
              <Link 
                href="/messages" 
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  pathname === '/messages' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs mt-1">Messages</span>
              </Link>
            )}
            
            <Link 
              href="/dashboard" 
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === '/dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}