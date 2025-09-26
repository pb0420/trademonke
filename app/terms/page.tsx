import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-lg">Last updated: January 2024</p>
        </div>

        <Card className="rounded-3xl border-0 shadow-xl bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">TradeMonkey Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using TradeMonkey ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TradeMonkey is an online marketplace platform that connects verified buyers and sellers in Australia. Our service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>User verification system with ID and video verification</li>
                <li>Listing creation and management tools</li>
                <li>Secure messaging system between users</li>
                <li>Premium subscription services</li>
                <li>Review and rating system</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Accounts and Verification</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Account Creation:</strong> Users must provide accurate, current, and complete information during registration.
                </p>
                <p>
                  <strong>Verification Process:</strong> To maintain platform safety, users must complete our verification process including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Phone number verification</li>
                  <li>Email verification (optional)</li>
                  <li>Government-issued ID document upload</li>
                  <li>Video verification with ID document</li>
                </ul>
                <p>
                  <strong>Account Security:</strong> Users are responsible for maintaining the confidentiality of their account credentials.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Listing Guidelines</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>Permitted Items:</strong> Users may list legal items and services for sale within Australia.</p>
                <p><strong>Prohibited Items:</strong> The following items are strictly prohibited:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Illegal drugs or controlled substances</li>
                  <li>Weapons, firearms, or ammunition</li>
                  <li>Stolen goods or counterfeit items</li>
                  <li>Adult content or services</li>
                  <li>Live animals (except through approved channels)</li>
                  <li>Items that violate intellectual property rights</li>
                </ul>
                <p><strong>Content Standards:</strong> All listings must contain accurate descriptions and genuine photos.</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Premium Subscriptions</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Premium Features:</strong> Premium subscribers receive unlimited listings, priority verification, and enhanced visibility.
                </p>
                <p>
                  <strong>Billing:</strong> Premium subscriptions are billed annually at AUD $25 per year.
                </p>
                <p>
                  <strong>Cancellation:</strong> Users may cancel their subscription at any time through their account settings.
                </p>
                <p>
                  <strong>Refunds:</strong> Refunds are provided on a case-by-case basis within 30 days of purchase.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">6. User Conduct</h2>
              <div className="space-y-4 text-gray-700">
                <p>Users agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the service for any unlawful purpose</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Post false, misleading, or deceptive content</li>
                  <li>Attempt to circumvent our verification systems</li>
                  <li>Engage in spam or unsolicited communications</li>
                  <li>Interfere with the proper functioning of the platform</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </Link>{' '}
                to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TradeMonkey acts as a platform connecting buyers and sellers. We are not responsible for the quality, safety, 
                legality, or accuracy of listings. Users engage in transactions at their own risk.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend accounts that violate these terms or engage in harmful behavior. 
                Users may also terminate their accounts at any time.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these terms from time to time. Users will be notified of significant changes via email or 
                platform notifications.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
              <div className="space-y-2 text-gray-700">
                <p>For questions about these terms, please contact us:</p>
                <p><strong>Email:</strong> legal@trademonkey.com</p>
                <p><strong>Phone:</strong> 1800 MONKEY (666 539)</p>
                <p><strong>Address:</strong> Sydney, NSW, Australia</p>
              </div>
            </section>

            <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These terms constitute a legally binding agreement. By using TradeMonkey, 
                you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}