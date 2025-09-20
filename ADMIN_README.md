# TradeMonkey Admin Controls & Management

## 🔐 Admin Access

### Admin User Credentials
- **Email**: admin@trademonkey.com
- **Phone**: +61400000000
- **User ID**: `admin`
- **Status**: Verified Admin

### Accessing Admin Features
1. Sign in with admin credentials
2. Admin-specific menu items appear in navigation
3. Access admin dashboard at `/admin/dashboard`

## 👥 User Management

### User Verification Process
1. **Pending Users**: New users start with `verification_status: 'pending'`
2. **Document Review**: Admin reviews uploaded ID documents and verification videos
3. **Approval/Rejection**: Admin can approve or reject verification requests
4. **Verified Badge**: Approved users get verified status and badge

### User Status Management
- **Verification Status**: `pending`, `approved`, `rejected`
- **Account Status**: Active, suspended, banned
- **Admin Privileges**: Grant/revoke admin access

### User Data Access
```javascript
// View all users
GET /api/admin/users

// Update user verification
PATCH /api/admin/users/{userId}
{
  "verification_status": "approved",
  "is_verified": true
}
```

## 📝 Post Management

### Post Approval Workflow
1. **Submission**: Users create posts with `status: 'pending'`
2. **Review Queue**: Admin sees all pending posts
3. **Content Moderation**: Review for inappropriate content, spam, etc.
4. **Approval/Rejection**: Approve or reject with reasons

### Post Status Types
- **Pending**: Awaiting admin approval
- **Approved**: Live and visible to public
- **Rejected**: Hidden with rejection reason

### Post Moderation Features
- Content review and editing
- Image/video moderation
- Spam detection and removal
- Category reassignment
- Price validation

## 💳 Subscription Management

### Plan Types
```javascript
// Free Plan Limits
{
  max_active_posts: 1,
  max_total_posts: 5,
  priority_verification: false
}

// Premium Plan ($25 AUD/year)
{
  max_active_posts: null, // unlimited
  max_total_posts: null,  // unlimited
  priority_verification: true
}
```

### Subscription Controls
- View all user subscriptions
- Manual subscription activation/deactivation
- Refund processing
- Plan upgrades/downgrades
- Expired subscription handling

### Post Limit Enforcement
```javascript
// Check if user can create post
const canCreate = canUserCreatePost(userId);
if (!canCreate.canCreate) {
  // Show upgrade prompt or limit message
  console.log(canCreate.reason);
}
```

## 🎫 Support System

### Support Ticket Management
- **Ticket Status**: `open`, `closed`
- **Priority Levels**: Low, medium, high, urgent
- **Categories**: Technical, billing, content, verification
- **Response Tracking**: Admin responses and resolution times

### Support Features
- Ticket assignment to admin staff
- Automated responses for common issues
- Escalation procedures
- User communication history

## 📊 Analytics & Reporting

### Key Metrics Dashboard
- **User Statistics**: Total users, verified users, new signups
- **Post Analytics**: Total posts, pending approvals, active listings
- **Revenue Tracking**: Subscription revenue, conversion rates
- **Engagement Metrics**: Views, searches, user activity

### Reports Available
- Daily/weekly/monthly user growth
- Post approval rates and times
- Subscription conversion funnel
- Support ticket resolution metrics

## 🛡️ Security & Moderation

### Content Moderation
- **Automated Filters**: Spam detection, inappropriate content
- **Manual Review**: Admin approval for sensitive categories
- **User Reports**: Community reporting system
- **Blacklist Management**: Blocked words, phrases, users

### Security Features
- **Rate Limiting**: API request limits per user
- **IP Blocking**: Block malicious IP addresses
- **Account Verification**: Multi-step verification process
- **Data Protection**: GDPR compliance, data retention policies

## 🔧 System Configuration

### Feature Flags
```javascript
// Enable/disable features
const features = {
  user_verification: true,
  post_approval: true,
  premium_subscriptions: true,
  location_services: true,
  push_notifications: false
};
```

### System Settings
- **Verification Requirements**: ID types accepted, video requirements
- **Post Guidelines**: Content policies, pricing rules
- **Notification Settings**: Email templates, push notification config
- **Payment Processing**: Stripe configuration, currency settings

## 📱 Mobile App Management

### PWA Configuration
- **Install Prompts**: Device-specific installation guidance
- **Offline Functionality**: Cached content management
- **Push Notifications**: User engagement campaigns
- **App Updates**: Version management and rollout

### Performance Monitoring
- **Load Times**: Page performance metrics
- **Error Tracking**: JavaScript errors and crashes
- **User Experience**: Navigation patterns, drop-off points
- **Device Analytics**: Platform usage, screen sizes

## 🚀 Deployment & Updates

### Environment Management
- **Development**: Local testing environment
- **Staging**: Pre-production testing
- **Production**: Live application
- **Database Migrations**: Schema updates and data migrations

### Update Procedures
1. **Code Review**: All changes reviewed by admin
2. **Testing**: Comprehensive testing in staging
3. **Deployment**: Gradual rollout to production
4. **Monitoring**: Post-deployment health checks

## 📞 Emergency Procedures

### Critical Issues
- **Site Down**: Emergency contact procedures
- **Security Breach**: Incident response plan
- **Data Loss**: Backup and recovery procedures
- **Payment Issues**: Stripe support escalation

### Contact Information
- **Technical Support**: tech@trademonkey.com
- **Security Issues**: security@trademonkey.com
- **Business Inquiries**: business@trademonkey.com
- **Emergency Hotline**: +61 1800 MONKEY

## 📋 Daily Admin Tasks

### Morning Checklist
- [ ] Review overnight user registrations
- [ ] Check pending post approvals
- [ ] Monitor support ticket queue
- [ ] Review system health metrics

### Weekly Tasks
- [ ] User verification batch processing
- [ ] Content moderation review
- [ ] Subscription renewal processing
- [ ] Analytics report generation

### Monthly Tasks
- [ ] Revenue reconciliation
- [ ] User engagement analysis
- [ ] System performance review
- [ ] Security audit and updates

---

## 🔍 Quick Admin Commands

### User Management
```bash
# View user details
GET /api/admin/users/{userId}

# Verify user
PATCH /api/admin/users/{userId}/verify

# Suspend user
PATCH /api/admin/users/{userId}/suspend
```

### Post Management
```bash
# Approve post
PATCH /api/admin/posts/{postId}/approve

# Reject post
PATCH /api/admin/posts/{postId}/reject

# Feature post
PATCH /api/admin/posts/{postId}/feature
```

### System Health
```bash
# Check system status
GET /api/admin/health

# View error logs
GET /api/admin/logs

# Database statistics
GET /api/admin/stats
```

This admin system provides comprehensive control over all aspects of the TradeMonkey platform while maintaining security and user experience standards.