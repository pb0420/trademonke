import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Lock, UserCheck, Database, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Last updated: January 2024</p>
        </div>

        <Card className="rounded-3xl border-0 shadow-xl bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              TradeMonkey Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We collect information you provide directly to us, including:</p>
                
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-2">Personal Information:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Business name (if applicable)</li>
                    <li>Profile photo and verification documents</li>
                    <li>Government-issued ID for verification</li>
                    <li>Video verification recordings</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-2">Listing Information:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Item descriptions, photos, and pricing</li>
                    <li>Location information (city/suburb level)</li>
                    <li>Category and tags</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-2">Usage Data:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Device information and IP address</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and time spent on platform</li>
                    <li>Search queries and interaction patterns</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Provide our services:</strong> Create and manage your account, process listings, facilitate communications</li>
                  <li><strong>Verify users:</strong> Confirm identity through ID and video verification for platform safety</li>
                  <li><strong>Improve our platform:</strong> Analyze usage patterns to enhance user experience</li>
                  <li><strong>Communicate with you:</strong> Send notifications, updates, and customer support responses</li>
                  <li><strong>Ensure safety:</strong> Detect and prevent fraud, abuse, and other harmful activities</li>
                  <li><strong>Process payments:</strong> Handle subscription billing and payment processing</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-orange-600" />
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We may share your information in the following circumstances:</p>
                
                <div className="bg-orange-50 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-2">With Other Users:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your name and verification status on listings</li>
                    <li>Business name (if you choose to display it)</li>
                    <li>General location (city/suburb level)</li>
                    <li>Reviews and ratings you receive</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-2xl">
                  <h3 className="font-semibold mb-2">We DO NOT Share:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Your phone number or email address</li>
                    <li>Your exact address or precise location</li>
                    <li>Your ID documents or verification videos</li>
                    <li>Private messages between users</li>
                  </ul>
                </div>

                <p>We may also share information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With service providers who assist in platform operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-600" />
                4. Data Security
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>We implement robust security measures to protect your information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
                  <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
                  <li><strong>Regular Audits:</strong> We conduct regular security audits and assessments</li>
                  <li><strong>Secure Infrastructure:</strong> Our platform is hosted on secure, monitored servers</li>
                  <li><strong>Verification Security:</strong> ID documents and videos are stored securely and accessed only for verification purposes</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p>To exercise these rights, contact us at privacy@trademonkey.com</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Data Retention</h2>
              <div className="space-y-4 text-gray-700">
                <p>We retain your information for as long as necessary to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain platform safety and security</li>
                </ul>
                <p>
                  Verification documents are retained for 7 years after account closure for compliance purposes. 
                  Other personal data is deleted within 30 days of account deletion, unless required for legal reasons.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze platform usage and performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure platform security</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Third-Party Services</h2>
              <div className="space-y-4 text-gray-700">
                <p>We use trusted third-party services for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Payment Processing:</strong> Stripe (for subscription billing)</li>
                  <li><strong>Cloud Storage:</strong> Supabase (for data storage and authentication)</li>
                  <li><strong>Analytics:</strong> Usage analytics to improve our service</li>
                </ul>
                <p>These services have their own privacy policies and security measures.</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                TradeMonkey is not intended for users under 18 years of age. We do not knowingly collect 
                personal information from children under 18. If we become aware that we have collected 
                such information, we will take steps to delete it promptly.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any material 
                changes by email or through a prominent notice on our platform.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                11. Contact Us
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>If you have questions about this privacy policy or our data practices:</p>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p><strong>Email:</strong> privacy@trademonkey.com</p>
                  <p><strong>Phone:</strong> 1800 MONKEY (666 539)</p>
                  <p><strong>Address:</strong> TradeMonkey Pty Ltd, Sydney, NSW, Australia</p>
                </div>
              </div>
            </section>

            <div className="mt-8 p-6 bg-green-50 rounded-2xl">
              <p className="text-sm text-green-800">
                <strong>Your Privacy Matters:</strong> We are committed to protecting your privacy and being 
                transparent about how we use your information. This policy explains our practices in plain language.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}