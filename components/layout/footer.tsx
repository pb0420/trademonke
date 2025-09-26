'use client';

import Link from 'next/link';
import { Heart, Shield, Users, Zap, Mail, Phone, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white mt-16 pb-20 md:pb-0">
      {/* App Download Section */}
      <div className="border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
                <span className="text-lg font-bold text-white">TM</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Get the TradeMonkey App</h3>
                <p className="text-gray-300 text-sm">Trade on the go with our mobile app</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex gap-2">
                <Button className="rounded-2xl bg-black hover:bg-gray-800 text-white px-6 py-3 h-auto">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📱</div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </Button>
                
                <Button className="rounded-2xl bg-black hover:bg-gray-800 text-white px-6 py-3 h-auto">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>
              
              <div className="text-sm text-gray-400">
                Or use our PWA - install directly from your browser!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl text-white">TradeMonkey</h3>
            
            <p className="text-sm text-gray-300 leading-relaxed">
              Australia's most trusted marketplace connecting verified buyers and sellers. 
              Trade with confidence, backed by our verification system.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-xs text-green-300 bg-green-900/30 px-3 py-1 rounded-full">
                <Shield className="h-3 w-3 mr-1" />
                Verified Users
              </div>
              <div className="flex items-center text-xs text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
                <Users className="h-3 w-3 mr-1" />
                Safe Trading
              </div>
              <div className="flex items-center text-xs text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full">
                <Zap className="h-3 w-3 mr-1" />
                Fast Deals
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">For Sellers</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/posts/create" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">📝</span>
                  Post an Item
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">⭐</span>
                  Premium Plans
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">✅</span>
                  Get Verified
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">📊</span>
                  Seller Dashboard
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Popular Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/?category=1" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  🚗 Cars & Vehicles
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/?category=5" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  📱 Electronics
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/?category=3" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  🪑 Furniture & Home
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/?category=s1" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  💻 Services
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center group">
                  View All Categories →
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/support" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">🎧</span>
                  Help Center
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">🛡️</span>
                  Safety Tips
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">📋</span>
                  Terms of Service
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="mr-2">🔒</span>
                  Privacy Policy
                  <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>

            <div className="pt-4 space-y-2">
              <div className="flex items-center text-xs text-gray-400">
                <Mail className="h-3 w-3 mr-2" />
                support@trademonkey.com
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Phone className="h-3 w-3 mr-2" />
                1800 MONKEY (666 539)
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="h-3 w-3 mr-2" />
                Sydney, Australia
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-xs text-gray-400">
                © 2024 TradeMonkey Pty Ltd. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <Link href="/terms" className="hover:text-gray-200 transition-colors">Terms</Link>
                <Link href="/privacy" className="hover:text-gray-200 transition-colors">Privacy</Link>
                <Link href="/cookies" className="hover:text-gray-200 transition-colors">Cookies</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-400">
                <span className="mr-2">Made with</span>
                <Heart className="h-3 w-3 text-red-500 mr-2" />
                <span>in Australia</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                ))}
                <span className="text-xs text-gray-400 ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}