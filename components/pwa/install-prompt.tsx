'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    
    if (!standalone && !dismissed) {
      if (iOS) {
        // Show iOS install instructions after a delay
        setTimeout(() => setShowPrompt(true), 3000);
      } else {
        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
          e.preventDefault();
          setDeferredPrompt(e as BeforeInstallPromptEvent);
          setTimeout(() => setShowPrompt(true), 2000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
      }
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-2 border-primary/20 shadow-lg bg-background/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
              {isIOS ? <Smartphone className="h-5 w-5 text-primary" /> : <Download className="h-5 w-5 text-primary" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1">
                Install TradeMonkey
              </h3>
              
              {isIOS ? (
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>Add to your home screen for the best experience:</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>Tap the share button <span className="inline-block w-4 h-4 bg-blue-500 rounded text-white text-center leading-4">↗</span></li>
                    <li>Select "Add to Home Screen"</li>
                    <li>Tap "Add" to confirm</li>
                  </ol>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground mb-3">
                  Get the full app experience with offline access and notifications.
                </p>
              )}
              
              <div className="flex gap-2 mt-3">
                {!isIOS && (
                  <Button size="sm" onClick={handleInstall} className="text-xs h-8">
                    Install App
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs h-8">
                  {isIOS ? 'Got it' : 'Maybe later'}
                </Button>
              </div>
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}