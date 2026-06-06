# Safari Camp Booking System - Deployment Guide

## Project Overview

A complete safari lodge booking platform built with Next.js 16, featuring guest booking management, admin dashboard, payment processing, and transfer management.

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Neon (PostgreSQL), Drizzle ORM
- **Authentication**: Better Auth
- **Forms**: React Server Components, native HTML forms
- **Deployment**: Vercel (recommended)

## Architecture

### Directory Structure
```
/app
  /(marketing)/        # Public pages (/, contact, accommodations, etc)
  /admin/              # Admin dashboard (protected routes)
  /api/auth/           # Better Auth endpoints
  /actions/            # Server actions (admin, payments, etc)
/components
  /ui/                 # shadcn components (button, card, input, etc)
  /landing/            # Landing page components
  admin-sidebar.tsx    # Admin navigation component
/lib
  /db/                 # Drizzle schema, migrations, seed data
  auth.ts              # Better Auth config
  db.ts                # Database connection
/public               # Static assets
```

### Database Schema
- **users**: User profiles with auth
- **bookings**: Booking records with dates, pricing
- **accommodations**: Lodge/tent inventory
- **guides**: Safari guide profiles
- **vehicles**: Transfer vehicles (jeeps, buses)
- **drivers**: Vehicle drivers
- **transfers**: Airport/transfer requests

## Deployment Steps

### 1. Environment Setup

Create `.env.local` with:
```env
# Neon Database
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]

# Better Auth
BETTER_AUTH_SECRET=openssl rand -base64 32  # Generate a secret

# Optional: Payment & Communication
STRIPE_SECRET_KEY=sk_test_...          # For Stripe payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
MPESA_API_KEY=...                       # For M-Pesa integration
SENDGRID_API_KEY=...                    # For email notifications
TWILIO_ACCOUNT_SID=...                  # For SMS

# URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Database Setup

```bash
# Create tables
npm run db:generate    # Generate migrations
npm run db:migrate     # Apply migrations

# Seed initial data (optional)
npm run db:seed
```

### 3. Deploy to Vercel

#### Option A: GitHub Connection (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Connect your GitHub repository
5. Add environment variables in project settings
6. Deploy

#### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel env add DATABASE_URL
vercel env add BETTER_AUTH_SECRET
vercel deploy --prod
```

### 4. Post-Deployment

1. **Verify Database**: Check Neon dashboard for tables
2. **Test Auth**: Sign up and log in at `/sign-up`
3. **Test Booking**: Try booking at `/book`
4. **Test Admin**: Log in as admin and visit `/admin`
5. **Monitor**: Set up Vercel analytics and error tracking

## Feature Documentation

### Guest Features
- **Browse**: Accommodations, experiences, guides
- **Book**: Multi-step booking form with payment
- **Manage**: View bookings, profile, cancellations
- **Contact**: Contact form for inquiries

### Admin Features
- **Dashboard**: KPIs, revenue, recent bookings
- **Bookings**: Manage all bookings, status updates
- **Accommodations**: Manage inventory, pricing
- **Guides**: Staff management
- **Vehicles**: Fleet management, drivers
- **Transfers**: Airport pickups, transfers
- **Analytics**: Revenue reports, occupancy rates
- **Settings**: System configuration

## Integration Checklist

### Payment Processing
- [ ] Set up Stripe account
- [ ] Add STRIPE_SECRET_KEY to env vars
- [ ] Update `confirmPayment()` to call Stripe API
- [ ] Implement `initiatePayment()` webhook handler
- [ ] Add payment page at `/checkout`

### Email Notifications
- [ ] Set up SendGrid/Resend account
- [ ] Add SENDGRID_API_KEY to env vars
- [ ] Update `sendConfirmationEmail()` function
- [ ] Create email templates
- [ ] Set up email triggers in booking flow

### SMS Notifications (Optional)
- [ ] Set up Twilio account
- [ ] Add TWILIO_ACCOUNT_SID to env vars
- [ ] Create SMS templates
- [ ] Add SMS triggers for bookings, transfers

### Analytics
- [ ] Set up Google Analytics 4
- [ ] Add tracking to booking completion
- [ ] Monitor admin page usage
- [ ] Track user engagement

## Key Files to Know

### Core Business Logic
- `/app/actions/admin.ts` - Admin queries (KPIs, bookings, accommodations, etc)
- `/app/actions/payments.ts` - Payment processing infrastructure
- `/lib/auth.ts` - Authentication config
- `/lib/db/schema.ts` - Database schema

### Pages
- `/app/page.tsx` - Homepage
- `/app/(marketing)/contact/page.tsx` - Contact page
- `/app/admin/page.tsx` - Admin dashboard
- `/app/admin/[section]/page.tsx` - Admin modules

### Components
- `/components/admin-sidebar.tsx` - Navigation for admin
- `/components/landing/site-header.tsx` - Main navigation
- `/components/landing/landing-footer.tsx` - Footer with links

## Development

### Local Setup
```bash
# Install dependencies
npm install

# Set up .env.local
cp .env.example .env.local
# Edit .env.local with your database and auth credentials

# Run migrations
npm run db:migrate

# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Database Migrations
```bash
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Reset database (development only)
npm run db:reset
```

### Build & Test
```bash
# Build for production
npm run build

# Run production build locally
npm run start

# Run linting
npm run lint
```

## Scaling Considerations

### Performance
- Database query optimization (indexes on bookings, accommodations)
- Implement caching for accommodations data
- Add CDN for static assets
- Image optimization for accommodation photos

### Reliability
- Set up error tracking (Sentry)
- Monitor API endpoints (Datadog)
- Automated backups for database
- Staging environment for testing

### Growth
- Add booking confirmation emails
- Implement review/rating system
- Create mobile app or PWA
- Add multi-language support
- Implement referral system

## Troubleshooting

### Build Errors
- Clear `.next` cache: `rm -rf .next`
- Check Node version: `node --version` (v18+ required)
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Database Connection Issues
- Verify DATABASE_URL in env vars
- Check Neon dashboard for connection issues
- Ensure migrations have been run
- Test connection: `npm run db:check`

### Authentication Issues
- Verify BETTER_AUTH_SECRET is set
- Check session cookies in browser DevTools
- Clear cookies and try signing in again

### Deployment Issues
- Check Vercel deployment logs
- Verify all env vars are set
- Ensure database is accessible from Vercel
- Check for TypeScript errors: `npm run type-check`

## Support & Next Steps

### Immediate (Week 1)
1. Deploy to staging environment
2. Test complete booking flow
3. Configure email notifications
4. Set up error tracking

### Short Term (Month 1)
1. Integrate payment processor (Stripe)
2. Implement SMS notifications
3. Add analytics
4. Create admin onboarding guide

### Medium Term (Months 2-3)
1. Mobile-responsive admin dashboard
2. Advanced reporting and exports
3. Multi-user admin support with roles
4. Booking customization options

### Long Term
1. Mobile app (React Native)
2. Social features (reviews, ratings)
3. Dynamic pricing
4. Integration with booking aggregators

## Production Checklist

Before going live:
- [ ] Database backed up
- [ ] SSL/TLS certificate active
- [ ] All env vars secured in Vercel
- [ ] Payment processor live (not test mode)
- [ ] Email notifications working
- [ ] Admin users created
- [ ] Logging/monitoring configured
- [ ] Terms of service and privacy policy published
- [ ] Phone support number active
- [ ] Error tracking enabled
- [ ] Performance monitoring active

## Contact & Support

For deployment issues or questions:
- Email: dev@safaricamp.com
- Docs: Internal wiki/Notion
- Issues: GitHub Issues

---

**Built with ❤️ for Safari Camp Lodge**
