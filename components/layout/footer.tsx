'use client';

import Link from 'next/link';
import { Heart, Shield, Users, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">TM</span>
              </div>
              <span className="font-bold text-lg">TradeMonkey</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Australia's trusted marketplace for verified buyers and sellers.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-xs text-muted-foreground">
                <Shield className="h-3 w-3 mr-1" />
                Verified Users
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                Safe Trading
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/posts/create" className="text-muted-foreground hover:text-foreground transition-colors">
                  Post an Item
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Premium Plans
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-muted-foreground hover:text-foreground transition-colors">
                  Get Verified
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=1" className="text-muted-foreground hover:text-foreground transition-colors">
                  🚗 Cars
                </Link>
              </li>
              <li>
                <Link href="/?category=5" className="text-muted-foreground hover:text-foreground transition-colors">
                  📱 Electronics
                </Link>
              </li>
              <li>
                <Link href="/?category=3" className="text-muted-foreground hover:text-foreground transition-colors">
                  🪑 Furniture
                </Link>
              </li>
              <li>
                <Link href="/?category=4" className="text-muted-foreground hover:text-foreground transition-colors">
                  ⚙️ Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 TradeMonkey. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground mr-2">Made with</p>
            <Heart className="h-3 w-3 text-red-500 mr-2" />
            <p className="text-xs text-muted-foreground">in Australia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}