'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Upload, Mail, Video, FileText } from 'lucide-react';
import { useAuth } from '@/components/providers';

export default function VerifyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [verificationVideo, setVerificationVideo] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const idFileRef = useRef<HTMLInputElement>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const handleEmailVerification = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      // TODO: Implement email verification API
      console.log('Email verification:', email);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };


  const handleDocumentUpload = async () => {
    if (!user || !idDocument || !verificationVideo) return;

    setLoading(true);
    setError('');
    setUploadProgress(0);

    try {
      // TODO: Implement file upload API
      console.log('Uploading documents:', { idDocument: idDocument.name, verificationVideo: verificationVideo.name });
      
      // Simulate upload progress
      setUploadProgress(25);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(50);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(75);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadProgress(90);
      await new Promise(resolve => setTimeout(resolve, 500));

      setUploadProgress(100);
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Failed to upload documents');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <Card>
          <CardContent className="text-center py-12">
            <p>Please sign in to access verification.</p>
            <Button asChild className="mt-4">
              <a href="/auth/signin">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Account Verification</CardTitle>
          <CardDescription>
            Get verified to start posting items and build trust with buyers
          </CardDescription>
          <Progress value={(step / 3) * 100} className="mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Email Verification */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Verify Email Address</h3>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This email will be used for important notifications
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button onClick={handleEmailVerification} disabled={loading || !email} className="w-full">
                {loading ? 'Verifying...' : 'Continue'}
              </Button>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Upload Verification Documents</h3>
              </div>

              {/* ID Document Upload */}
              <div>
                <Label>Photo ID Document</Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => idFileRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">
                    {idDocument ? idDocument.name : 'Click to upload driver\'s license, passport, or ID card'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </div>
                <input
                  ref={idFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                />
              </div>

              {/* Verification Video Upload */}
              <div>
                <Label>Verification Video</Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => videoFileRef.current?.click()}
                >
                  <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm">
                    {verificationVideo ? verificationVideo.name : 'Click to upload a short selfie video (15-30 seconds)'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    MP4, MOV up to 50MB
                  </p>
                </div>
                <input
                  ref={videoFileRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => setVerificationVideo(e.target.files?.[0] || null)}
                />
              </div>

              <Alert>
                <AlertDescription>
                  <strong>For the video:</strong> Please say "I am [your full name] and I want to join TradeMonkey" 
                  while clearly showing your face and holding your ID document.
                </AlertDescription>
              </Alert>

              {loading && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Uploading documents...</p>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleDocumentUpload}
                disabled={loading || !idDocument || !verificationVideo}
                className="w-full"
              >
                {loading ? 'Uploading...' : 'Submit for Review'}
              </Button>
            </div>
          )}

          {/* Step 3: Completion */}
          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <h3 className="text-xl font-semibold">Verification Submitted! 🎉</h3>
              
              <p className="text-muted-foreground">
                Your documents have been submitted for review. Our team will verify your identity 
                within 24-48 hours. You'll receive a notification once approved.
              </p>

              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Admin reviews your documents</li>
                  <li>• You'll get notified of approval/rejection</li>
                  <li>• Once verified, you can post items</li>
                  <li>• Your profile gets a verified badge</li>
                </ul>
              </div>

              <Button onClick={() => router.push('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}