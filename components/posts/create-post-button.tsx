'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Crown, AlertCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useAuth } from '@/components/providers';

interface PlanInfo {
  canCreatePost: { canCreate: boolean; reason?: string };
  limitInfo: {
    activePosts: number;
    maxActivePosts: number | null;
    totalPosts: number;
    maxTotalPosts: number | null;
    planName: string;
    subscriptionStatus: string;
  } | null;
}

export function CreatePostButton() {
  const { user } = useAuth();
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPlanInfo();
    }
  }, []);

  const fetchPlanInfo = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const data = await response.json();
        setPlanInfo(data);
      }
    } catch (error) {
      console.error('Error fetching plan info:', error);
    }
  };

  if (!planInfo || !user) return null;

  // Check if user needs verification first
  if (!user.is_verified) {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="rounded-full px-4 border-orange-200 text-orange-700 hover:bg-orange-50">
            <Shield className="h-4 w-4 mr-1" />
            Create (Verify First)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              Verification Required
            </DialogTitle>
            <DialogDescription>
              You need to complete account verification before posting items.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <strong>You can still create listings!</strong> Your posts will be held for review until both your profile and post are verified. 
                Premium users get priority verification (24-48 hours faster).
              </AlertDescription>
            </Alert>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium">How it works:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create your listing now (it will be saved as draft)</li>
                <li>• Complete profile verification</li>
                <li>• Admin reviews both profile and post</li>
                <li>• Once approved, your listing goes live!</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button asChild className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Link href="/posts/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Listing
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/verify">
                  <Shield className="h-4 w-4 mr-2" />
                  Verify Profile
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  const { canCreatePost, limitInfo } = planInfo;

  if (canCreatePost.canCreate) {
    return (
      <Button asChild size="sm" className="shadow-lg rounded-full px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
        <Link href="/posts/create">
          <Plus className="h-4 w-4 mr-1" />
          Create
        </Link>
      </Button>
    );
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-full px-4 border-orange-200 text-orange-700 hover:bg-orange-50">
          <AlertCircle className="h-4 w-4 mr-1" />
          Post Limit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Post Limit Reached
          </DialogTitle>
          <DialogDescription>
            You've reached your posting limit for your current plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>Reason:</strong> {canCreatePost.reason}
            </AlertDescription>
          </Alert>

          {limitInfo && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Plan</span>
                <Badge variant={limitInfo.planName === 'Free' ? 'secondary' : 'default'}>
                  {limitInfo.planName}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Active Posts:</span>
                  <span>{limitInfo.activePosts}/{limitInfo.maxActivePosts || '∞'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Posts:</span>
                  <span>{limitInfo.totalPosts}/{limitInfo.maxTotalPosts || '∞'}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button asChild className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
              <Link href="/pricing">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium
              </Link>
            </Button>
            
            {limitInfo?.planName === 'Free' && limitInfo.activePosts > 0 && (
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard">
                  Manage Active Posts
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}