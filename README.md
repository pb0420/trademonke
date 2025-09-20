# TradeMonkey - Discovery Platform PWA

A full-stack Progressive Web App built with Next.js and Supabase where verified users can post items and services for sale.

## 🚀 Features

- **Phone Authentication** with email and ID/video verification
- **Post Management** with media uploads, categories, and location tracking
- **Advanced Search & Discovery** with filters and real-time results
- **User Reviews & Ratings** with public profiles
- **Premium Subscriptions** (AUD 25/year) with Stripe integration
- **Real-time Notifications** with bell icon dropdown
- **Support System** with ticket management
- **Admin Panel** for user/post verification and support

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Payments**: Stripe (AUD currency)
- **PWA**: Next-PWA for offline functionality
- **UI Components**: Shadcn/ui with Radix UI primitives

## 📁 Project Structure

```
trademonkey/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page with search & discovery
│   ├── globals.css              # Global styles with Tailwind
│   ├── auth/
│   │   ├── signin/page.tsx      # Sign in page
│   │   └── signup/page.tsx      # Sign up page
│   ├── verify/page.tsx          # Email & ID verification
│   ├── dashboard/page.tsx       # User dashboard
│   ├── posts/
│   │   ├── create/page.tsx      # Create new post
│   │   ├── edit/[id]/page.tsx   # Edit existing post
│   │   └── [id]/page.tsx        # Post detail view
│   ├── profile/[id]/page.tsx    # Public user profile
│   ├── notifications/page.tsx   # Notifications page
│   ├── support/
│   │   ├── page.tsx            # Create support ticket
│   │   └── tickets/page.tsx    # User's support tickets
│   ├── pricing/page.tsx         # Subscription plans
│   ├── billing/page.tsx         # Manage subscription
│   └── admin/
│       ├── dashboard/page.tsx   # Admin dashboard
│       ├── users/page.tsx       # User management
│       ├── posts/page.tsx       # Post approval
│       └── support/page.tsx     # Support management
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn/ui components
│   ├── providers.tsx            # Auth & theme providers
│   ├── layout/
│   │   └── navbar.tsx           # Navigation bar
│   ├── home/
│   │   ├── hero.tsx            # Hero section
│   │   └── category-grid.tsx   # Category selection
│   ├── posts/
│   │   ├── post-card.tsx       # Post preview card
│   │   ├── post-form.tsx       # Create/edit post form
│   │   └── media-upload.tsx    # File upload component
│   ├── notifications/
│   │   └── notification-dropdown.tsx # Notification bell
│   └── admin/
│       ├── user-verification.tsx     # User approval
│       └── post-approval.tsx         # Post approval
├── lib/                         # Utility functions
│   ├── utils.ts                # Tailwind merge utility
│   └── supabase/
│       ├── client.ts           # Client-side Supabase
│       └── server.ts           # Server-side Supabase
├── types/
│   └── database.ts             # TypeScript database types
├── supabase/
│   └── migrations/
│       └── 20250912095527_plain_union.sql # Database schema
├── public/                      # Static assets
│   ├── manifest.json           # PWA manifest
│   ├── favicon.ico             # Favicon
│   └── icons/                  # PWA icons
├── hooks/                       # Custom React hooks
│   └── use-toast.ts            # Toast notifications
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── components.json             # Shadcn/ui configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account
- Stripe account (for payments)

### 1. Clone and Setup Project

```bash
# Create project directory
mkdir trademonkey
cd trademonkey

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Install additional dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @hookform/resolvers react-hook-form zod date-fns lucide-react next-themes sonner vaul class-variance-authority clsx tailwind-merge cmdk next-pwa

# Install Shadcn/ui
npx shadcn-ui@latest init

# Install UI components
npx shadcn-ui@latest add button input label card badge select dropdown-menu dialog alert progress tabs accordion separator scroll-area avatar tooltip popover calendar checkbox radio-group switch slider textarea
```

### 2. Create Directory Structure

```bash
# Create main directories
mkdir -p app/{auth/{signin,signup},verify,dashboard,posts/{create,edit/[id]},profile/[id],notifications,support/{tickets},pricing,billing,admin/{dashboard,users,posts,support}}
mkdir -p components/{ui,layout,home,posts,notifications,admin}
mkdir -p lib/supabase
mkdir -p types
mkdir -p supabase/migrations
mkdir -p public/icons
mkdir -p hooks

# Create component directories
mkdir -p components/{layout,home,posts,notifications,admin}
```

### 3. Create Core Files

```bash
# Create layout and global files
touch app/layout.tsx
touch app/page.tsx
touch app/globals.css

# Create auth pages
touch app/auth/signin/page.tsx
touch app/auth/signup/page.tsx
touch app/verify/page.tsx

# Create main app pages
touch app/dashboard/page.tsx
touch app/posts/create/page.tsx
touch app/posts/edit/[id]/page.tsx
touch app/posts/[id]/page.tsx
touch app/profile/[id]/page.tsx
touch app/notifications/page.tsx
touch app/support/page.tsx
touch app/support/tickets/page.tsx
touch app/pricing/page.tsx
touch app/billing/page.tsx

# Create admin pages
touch app/admin/dashboard/page.tsx
touch app/admin/users/page.tsx
touch app/admin/posts/page.tsx
touch app/admin/support/page.tsx

# Create components
touch components/providers.tsx
touch components/layout/navbar.tsx
touch components/home/hero.tsx
touch components/home/category-grid.tsx
touch components/posts/post-card.tsx
touch components/posts/post-form.tsx
touch components/posts/media-upload.tsx
touch components/notifications/notification-dropdown.tsx
touch components/admin/user-verification.tsx
touch components/admin/post-approval.tsx

# Create lib files
touch lib/utils.ts
touch lib/supabase/client.ts
touch lib/supabase/server.ts

# Create types
touch types/database.ts

# Create hooks
touch hooks/use-toast.ts

# Create config files
touch next.config.js
touch tailwind.config.ts
touch components.json

# Create PWA files
touch public/manifest.json
```

### 4. Create PWA Icons

```bash
# Create icon directories and placeholder files
mkdir -p public/icons
touch public/icons/icon-{72x72,96x96,128x128,144x144,152x152,192x192,384x384,512x512}.png
touch public/favicon.ico
```

### 5. Environment Setup

```bash
# Create environment file
touch .env.local

# Add to .env.local (replace with your actual values):
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url" >> .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key" >> .env.local
echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key" >> .env.local
echo "STRIPE_SECRET_KEY=your_stripe_secret_key" >> .env.local
```

### 6. Database Setup

```bash
# The migration file already exists, but you can create additional ones:
touch supabase/migrations/$(date +%Y%m%d%H%M%S)_additional_changes.sql
```

## 🗄️ Database Schema

The database includes the following main tables:

- **users** - User profiles with verification status
- **posts** - User listings with admin approval workflow
- **categories** - Post categories (cars, living, furniture, etc.)
- **tags** - Flexible tagging system
- **media** - Photo/video storage references
- **reviews** - User rating and review system
- **plans** - Subscription plans (free/premium)
- **subscriptions** - User subscription tracking
- **notifications** - Real-time notification system
- **support_tickets** - Support and reporting system

## 🔐 Authentication Flow

1. **Phone Signup** - Users register with phone number
2. **Email Verification** - Optional email verification
3. **ID Upload** - Photo ID document upload
4. **Video Verification** - Short selfie video with ID
5. **Admin Approval** - Manual verification by admin
6. **Verified Badge** - Users get verified status

## 💰 Monetization

- **Free Plan**: 1 active post, 5 total posts lifetime
- **Premium Plan**: Unlimited posts, priority verification - AUD 25/year

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 PWA Features

- Offline functionality
- App-like experience
- Push notifications (ready for implementation)
- Install prompt
- Responsive design

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the migration file to set up the database schema
3. Configure Row Level Security policies
4. Set up storage buckets for media files
5. Configure authentication providers

### Stripe Setup

1. Create Stripe account
2. Set up products and prices in AUD
3. Configure webhooks for subscription management
4. Add API keys to environment variables

## 🛡️ Security Features

- Row Level Security (RLS) on all tables
- File upload validation
- Admin approval workflow
- Rate limiting (ready for implementation)
- Input sanitization

## 📊 Admin Features

- User verification management
- Post approval workflow
- Support ticket system
- Analytics dashboard (ready for implementation)
- Content moderation tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@trademonkey.com or create a support ticket in the app.

---

**TradeMonkey** - Connecting verified buyers and sellers in a trusted marketplace.