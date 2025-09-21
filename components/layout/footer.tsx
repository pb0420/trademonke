'use client';

import Link from 'next/link';
import { Heart, Shield, Users, Zap, Mail, Phone, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 border-t border-gray-100 mt-16">
      {/* Newsletter Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Stay in the loop</h3>
            <p className="text-gray-600">Get notified about new listings and platform updates</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="rounded-full border-gray-200 focus:border-blue-500"
              />
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
                <span className="text-sm font-bold text-white">TM</span>
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  TradeMonkey
                </span>
                <div className="text-xs text-gray-500 -mt-1">Buy • Sell • Trade</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">
              Australia's most trusted marketplace connecting verified buyers and sellers. 
              Trade with confidence, backed by our verification system.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-xs text-gray-500 bg-green-50 px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 mr-1 text-green-600" />
                Verified Users
              </div>
              <div className="flex items-center text-xs text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                <Users className="h-3 w-3 mr-1 text-blue-600" />
                Safe Trading
              </div>
              <div className="flex items-center text-xs text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
                <Zap className="h-3 w-3 mr-1 text-purple-600" />
                Fast Deals
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">For Sellers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/posts/create" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">📝</span>
                  Post an Item
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">⭐</span>
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">✅</span>
                  Get Verified
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">📊</span>
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Popular Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/?category=1" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  🚗 Cars & Vehicles
                </Link>
              </li>
              <li>
                <Link href="/?category=5" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  📱 Electronics
                </Link>
              </li>
              <li>
                <Link href="/?category=3" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  🪑 Furniture & Home
                </Link>
              </li>
              <li>
                <Link href="/?category=s1" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  💻 Services
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                  View All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">🎧</span>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">🛡️</span>
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">📋</span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <span className="mr-2">🔒</span>
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <div className="flex items-center text-xs text-gray-500">
                <Mail className="h-3 w-3 mr-2" />
                support@trademonkey.com
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Phone className="h-3 w-3 mr-2" />
                1800 MONKEY (666 539)
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-2" />
                Sydney, Australia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-xs text-gray-500">
                © 2024 TradeMonkey Pty Ltd. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
                <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
                <Link href="/cookies" className="hover:text-gray-700 transition-colors">Cookies</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-2">Made with</span>
                <Heart className="h-3 w-3 text-red-500 mr-2" />
                <span>in Australia</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
                <span className="text-xs text-gray-500 ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}