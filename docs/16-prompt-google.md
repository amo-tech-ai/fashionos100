# Google AI Studio - Multistep Implementation Prompts

## 📋 Overview

This document contains **6 sequential prompts** to implement the FashionOS Shoot Booking System. Each prompt is self-contained with clear objectives, success criteria, and production-ready checklists.

**Project:** FashionOS - Fashion Event Management & Shoot Booking Platform  
**Tech Stack:** React 19 + TypeScript + Vite + Supabase + Stripe + Gemini API  
**Repository:** https://github.com/amo-tech-ai/fashionos100.git  
**Reference Docs:** `docs/services/001-service-plan.md` (complete implementation plan)

---

## 🎯 Step 1: Database Foundation

### Objective
Create Supabase migrations for the shoot booking system with proper schema, RLS policies, and seed data.

### Requirements

**1.1 Core Tables Migration**
- File: `supabase/migrations/YYYYMMDDHHmmss_shoot_booking_core.sql`
- Create all enums: `shoot_service_type`, `shoot_status`, `distribution_channel`, `shot_style_type`, `talent_type`, `location_mode`, `addon_type`
- Create tables: `company_profiles`, `brand_guidelines`, `briefs`, `shot_list_items`, `shot_style_configs`, `shoot_payments`, `studios`
- Add proper indexes for performance
- Enable RLS on all tables
- Create RLS policies (users can only see/manage their own data)
- Add table comments for documentation

**1.2 Pricing Configuration Migration**
- File: `supabase/migrations/YYYYMMDDHHmmss_shoot_pricing_config.sql`
- Create tables: `pricing_configs`, `talent_pricing`, `addon_pricing`
- Seed base pricing data (see pricing logic in service plan)
- Add indexes and RLS policies

**1.3 Reference Implementation**
- Follow patterns from existing migrations: `supabase/migrations/20250304000000_sponsor_system.sql`
- Use lowercase SQL keywords
- Include comprehensive comments
- Follow naming conventions (snake_case)

### Success Criteria

✅ **Database Schema:**
- [ ] All 7 core tables created with proper relationships
- [ ] All 7 enum types defined
- [ ] Foreign key constraints properly set
- [ ] Indexes created for frequently queried columns
- [ ] All tables have RLS enabled

✅ **Security:**
- [ ] RLS policies prevent users from accessing other users' data
- [ ] Policies cover SELECT, INSERT, UPDATE, DELETE operations
- [ ] Policies use `auth.uid()` for user identification

✅ **Data Integrity:**
- [ ] Foreign keys have proper cascade rules
- [ ] Unique constraints where needed (e.g., one company profile per user)
- [ ] Default values set appropriately
- [ ] Timestamps (created_at, updated_at) on all tables

✅ **Pricing Configuration:**
- [ ] Base pricing seeded for all service types
- [ ] Channel multipliers configured
- [ ] Talent pricing seeded
- [ ] Addon pricing seeded with per-image flags

✅ **Migration Execution:**
- [ ] Migrations run without errors
- [ ] No duplicate table/enum names
- [ ] All tables visible in Supabase dashboard

### Production-Ready Checklist

- [ ] **Naming Convention:** Migration files use `YYYYMMDDHHmmss_description.sql` format
- [ ] **SQL Style:** All keywords lowercase, proper indentation
- [ ] **Comments:** Every table and complex constraint has a comment
- [ ] **RLS Coverage:** Every table has policies for all CRUD operations
- [ ] **Indexes:** All foreign keys and frequently queried columns indexed
- [ ] **Testing:** Can create/read/update/delete records via Supabase dashboard
- [ ] **Backup:** Migration files committed to git
- [ ] **Documentation:** Schema matches `docs/services/03-shoot-schema.md`

### Verification Commands

```bash
# Test migration locally
cd /home/sk/fashionos100
supabase db reset
supabase migration list

# Verify tables exist
supabase db diff

# Check RLS policies
# In Supabase dashboard: Authentication > Policies
```

---

## 🎯 Step 2: Core API Layer (Edge Functions)

### Objective
Create three Supabase Edge Functions for managing briefs, calculating pricing, and processing payments.

### Requirements

**2.1 Manage Brief Function**
- File: `supabase/functions/manage-brief/index.ts`
- Actions: `create`, `update`, `get`
- Handles company profile creation if missing
- Validates user ownership
- Returns brief with related data (shot_list_items, etc.)
- Proper error handling and CORS

**2.2 Calculate Pricing Function**
- File: `supabase/functions/calculate-shoot-price/index.ts`
- Reads pricing configs from database
- Calculates base pricing with channel multipliers
- Adds talent fees and addon costs
- Applies discounts (membership/bundle)
- Calculates tax
- Updates brief with calculated totals
- Returns detailed breakdown

**2.3 Create Payment Function**
- File: `supabase/functions/create-shoot-payment/index.ts`
- Validates brief ownership and status
- Creates Stripe payment intent
- Creates payment record in database
- Returns client secret for frontend
- Proper error handling

**2.4 Code Standards**
- Use `npm:@supabase/supabase-js@2.39.3` (with version)
- Import CORS from `../_shared/cors.ts`
- Use `Deno.serve` (not deprecated serve)
- Proper TypeScript types
- Follow patterns from existing functions

### Success Criteria

✅ **Manage Brief Function:**
- [ ] Can create new brief (auto-creates company profile if needed)
- [ ] Can update existing brief
- [ ] Can retrieve brief with all related data
- [ ] Returns 401 for unauthorized users
- [ ] Returns 404 for non-existent briefs
- [ ] Proper CORS headers

✅ **Calculate Pricing Function:**
- [ ] Calculates photo pricing correctly with channel multipliers
- [ ] Calculates video pricing correctly
- [ ] Adds talent fees correctly
- [ ] Adds addon costs (handles per-image vs flat rate)
- [ ] Applies tax calculation
- [ ] Updates brief record with totals
- [ ] Returns detailed breakdown

✅ **Create Payment Function:**
- [ ] Validates brief ownership
- [ ] Checks brief status (must be `ready_for_payment`)
- [ ] Creates Stripe payment intent successfully
- [ ] Creates payment record in database
- [ ] Returns client secret
- [ ] Handles Stripe API errors gracefully

✅ **Code Quality:**
- [ ] All functions use proper TypeScript types
- [ ] Error handling with try/catch blocks
- [ ] CORS headers on all responses
- [ ] No hardcoded values (use environment variables)
- [ ] Follows existing code patterns

### Production-Ready Checklist

- [ ] **Dependencies:** All imports use versioned packages (`npm:package@version`)
- [ ] **Error Handling:** All functions have comprehensive try/catch
- [ ] **CORS:** All functions use shared CORS utility
- [ ] **Authentication:** All functions verify user authentication
- [ ] **Validation:** Input validation before database operations
- [ ] **Logging:** Console.error for errors, console.info for important events
- [ ] **Type Safety:** Proper TypeScript interfaces for all data structures
- [ ] **Testing:** Functions can be invoked via Supabase dashboard
- [ ] **Documentation:** Functions match specifications in service plan

### Verification Commands

```bash
# Test edge functions locally
cd /home/sk/fashionos100
supabase functions serve manage-brief
supabase functions serve calculate-shoot-price
supabase functions serve create-shoot-payment

# Test with curl
curl -X POST http://localhost:54321/functions/v1/manage-brief \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "create", "data": {...}}'
```

---

## 🎯 Step 3: Pricing Engine Integration

### Objective
Implement real-time pricing calculations that update as users make selections in the booking wizard.

### Requirements

**3.1 Pricing Service (Frontend)**
- File: `src/services/pricingService.ts`
- Function: `calculateShootPricing(briefId, config)`
- Function: `formatCurrency(cents, currency)`
- Calls `calculate-shoot-price` edge function
- Handles errors gracefully

**3.2 Pricing Logic Implementation**
- Base pricing per service type and style
- Channel multipliers (Instagram +0.1, Amazon +0.15, etc.)
- Talent fees (day rates or block rates)
- Addon costs (per-image vs flat rate)
- Tax calculation (8% default, configurable)
- Discount application (membership/bundle)

**3.3 Real-Time Updates**
- Pricing recalculates when:
  - Channels selected/deselected
  - Quantity changed
  - Shot styles changed
  - Talent added/removed
  - Addons selected/deselected
- Updates sidebar summary component
- Shows loading state during calculation

### Success Criteria

✅ **Pricing Calculations:**
- [ ] Photo pricing: base × quantity × channel multiplier
- [ ] Video pricing: base × quantity × channel multiplier
- [ ] Multiple channels: multipliers averaged correctly
- [ ] Talent fees: day rates added correctly
- [ ] Addons: per-image addons multiply by photo count
- [ ] Tax: calculated on (subtotal - discount)
- [ ] Total: subtotal - discount + tax

✅ **Integration:**
- [ ] Pricing service calls edge function correctly
- [ ] Brief state updates with new pricing
- [ ] Sidebar summary shows updated totals
- [ ] Loading states displayed during calculation
- [ ] Error messages shown if calculation fails

✅ **User Experience:**
- [ ] Pricing updates within 500ms
- [ ] No flickering or layout shifts
- [ ] Clear breakdown shown (photos, videos, talent, addons)
- [ ] Currency formatted correctly ($1,234.56)

### Production-Ready Checklist

- [ ] **Performance:** Pricing calculation completes in <500ms
- [ ] **Error Handling:** Graceful fallback if calculation fails
- [ ] **Loading States:** User sees loading indicator during calculation
- [ ] **Currency Formatting:** Proper locale-aware formatting
- [ ] **Edge Cases:** Handles zero quantities, empty selections
- [ ] **Validation:** Prevents negative or invalid pricing
- [ ] **Caching:** Consider caching pricing configs (optional optimization)
- [ ] **Testing:** Test with various channel combinations
- [ ] **Documentation:** Pricing logic matches service plan section 4

### Verification Tests

```typescript
// Test pricing calculations
const testCases = [
  { photos: 10, channels: ['instagram_feed'], expected: ~4290 },
  { photos: 5, channels: ['amazon_listing'], expected: ~2587 },
  { videos: 2, channels: ['youtube'], expected: ~75670 },
  // Add more test cases
];
```

---

## 🎯 Step 4: Frontend Components (Booking Wizard)

### Objective
Build the 13-phase booking wizard with all UI components, state management, and user interactions.

### Requirements

**4.1 Main Wizard Component**
- File: `src/components/shoot-booking/BookingWizard.tsx`
- Manages wizard state and phase navigation
- Handles brief creation/updates
- Integrates pricing calculations
- Progress indicator
- Mobile-responsive layout

**4.2 Phase Components (13 phases)**
- `Phase0Company.tsx` - Company & brand info
- `Phase1Channels.tsx` - Distribution channel selection
- `Phase2Services.tsx` - Service type (photo/video/hybrid)
- `Phase3Quantity.tsx` - Quantity & pricing display
- `Phase4Styles.tsx` - Shot style selection
- `Phase5Products.tsx` - Shot list builder
- `Phase6References.tsx` - References & inspiration
- `Phase7Talent.tsx` - Model/talent selection
- `Phase8Upgrades.tsx` - Creative add-ons
- `Phase9Location.tsx` - Location & studio
- `Phase10Review.tsx` - Review & confirm
- `Phase11Payment.tsx` - Payment form (Stripe Elements)
- `Phase12Success.tsx` - Success screen

**4.3 Supporting Components**
- `PhaseProgress.tsx` - Progress indicator (Step X of 13)
- `SidebarSummary.tsx` - Pricing summary (desktop)
- `MobileSummarySheet.tsx` - Bottom sheet (mobile)

**4.4 Design Requirements**
- Follow FashionOS design system (colors, fonts, spacing)
- Mobile-first responsive design
- Proper form validation
- Loading states
- Error handling
- Accessibility (ARIA labels, keyboard navigation)

### Success Criteria

✅ **Wizard Functionality:**
- [ ] Can navigate forward/backward through phases
- [ ] Progress indicator shows current phase
- [ ] Brief state persists across navigation
- [ ] Can create new brief or resume existing
- [ ] URL updates with brief ID

✅ **Phase Components:**
- [ ] All 13 phases render correctly
- [ ] Form validation prevents invalid submissions
- [ ] Required fields clearly marked
- [ ] Helpful error messages
- [ ] Can skip optional phases

✅ **State Management:**
- [ ] Brief updates saved to backend
- [ ] Pricing recalculates on relevant changes
- [ ] No data loss on navigation
- [ ] Optimistic updates for better UX

✅ **User Experience:**
- [ ] Mobile-responsive (85% mobile users)
- [ ] Loading states during API calls
- [ ] Error messages user-friendly
- [ ] Success feedback on actions
- [ ] Smooth transitions between phases

✅ **Integration:**
- [ ] Calls `manage-brief` function correctly
- [ ] Calls `calculate-shoot-price` on changes
- [ ] Integrates with Stripe for payments
- [ ] Uses Supabase auth for user identification

### Production-Ready Checklist

- [ ] **Responsive Design:** Works on mobile (320px+) and desktop (1024px+)
- [ ] **Form Validation:** All required fields validated
- [ ] **Error Boundaries:** React error boundaries catch component errors
- [ ] **Accessibility:** WCAG 2.1 AA compliance
- [ ] **Performance:** No unnecessary re-renders
- [ ] **Type Safety:** All props and state properly typed
- [ ] **Code Organization:** Components in logical folder structure
- [ ] **Reusability:** Shared components extracted (Button, Input, etc.)
- [ ] **Testing:** Manual testing of complete flow
- [ ] **Documentation:** Component props documented

### Verification Checklist

- [ ] Complete booking flow from start to payment
- [ ] Test on mobile device (Chrome DevTools)
- [ ] Test error scenarios (network failures, validation errors)
- [ ] Test browser back/forward navigation
- [ ] Verify pricing updates in real-time
- [ ] Check accessibility with screen reader

---

## 🎯 Step 5: Payment Integration

### Objective
Integrate Stripe payment processing with proper error handling, webhooks, and invoice generation.

### Requirements

**5.1 Stripe Setup**
- Install Stripe React components
- Configure Stripe publishable key
- Set up Stripe Elements for card input
- Handle payment method collection

**5.2 Payment Flow**
- Create payment intent via `create-shoot-payment` function
- Display Stripe Elements form
- Handle payment submission
- Process payment confirmation
- Update brief status to `confirmed`
- Show success screen

**5.3 Webhook Handler** (Optional for MVP)
- File: `supabase/functions/stripe-webhook/index.ts`
- Handle payment success/failure events
- Update payment records
- Send confirmation emails

**5.4 Error Handling**
- Handle card declined errors
- Handle network failures
- Handle expired payment intents
- Provide retry mechanisms

### Success Criteria

✅ **Payment Processing:**
- [ ] Payment intent created successfully
- [ ] Stripe Elements form renders correctly
- [ ] Card validation works (test cards)
- [ ] Payment submission successful
- [ ] Brief status updates to `confirmed`
- [ ] Payment record created in database

✅ **User Experience:**
- [ ] Clear payment form with instructions
- [ ] Loading state during payment processing
- [ ] Success confirmation shown
- [ ] Error messages user-friendly
- [ ] Can retry failed payments

✅ **Security:**
- [ ] No sensitive data in frontend
- [ ] Payment intents use proper metadata
- [ ] Webhook signature verification (if implemented)
- [ ] Proper error messages (don't expose internals)

### Production-Ready Checklist

- [ ] **Stripe Keys:** Environment variables configured
- [ ] **Test Mode:** Test with Stripe test cards
- [ ] **Error Handling:** All error scenarios handled
- [ ] **Security:** No API keys exposed in frontend
- [ ] **Webhooks:** Payment status updates correctly
- [ ] **Invoices:** Invoice URLs stored in database
- [ ] **Logging:** Payment events logged for debugging
- [ ] **Testing:** Test successful and failed payments
- [ ] **Documentation:** Payment flow documented

### Test Cards (Stripe)

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

---

## 🎯 Step 6: Testing & Production Polish

### Objective
Ensure the booking system is production-ready with comprehensive testing, error handling, and performance optimization.

### Requirements

**6.1 Unit Tests**
- Pricing calculation tests
- Form validation tests
- State management tests
- Utility function tests

**6.2 Integration Tests**
- Complete booking flow (draft → payment → confirmed)
- Pricing recalculation triggers
- Payment intent creation
- Brief state transitions

**6.3 E2E Tests (Playwright)**
- Full user journey from landing to payment
- Mobile responsive behavior
- Error handling scenarios
- Cross-browser testing

**6.4 Performance Optimization**
- Code splitting for wizard phases
- Lazy loading of components
- Image optimization
- Bundle size analysis

**6.5 Error Handling**
- Error boundaries for React components
- API error handling
- Network failure handling
- User-friendly error messages

**6.6 Documentation**
- Component documentation
- API documentation
- User guide
- Deployment guide

### Success Criteria

✅ **Testing:**
- [ ] Unit tests pass (>80% coverage)
- [ ] Integration tests pass
- [ ] E2E tests pass on Chrome, Firefox, Safari
- [ ] Mobile tests pass

✅ **Performance:**
- [ ] Page load time <2s
- [ ] Pricing calculation <500ms
- [ ] No layout shifts (CLS <0.1)
- [ ] Bundle size optimized

✅ **Error Handling:**
- [ ] All error scenarios handled gracefully
- [ ] User-friendly error messages
- [ ] Error logging for debugging
- [ ] Retry mechanisms where appropriate

✅ **Accessibility:**
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast ratios >4.5:1

### Production-Ready Checklist

- [ ] **Code Quality:** No linter errors, proper TypeScript types
- [ ] **Security:** All RLS policies tested, no data leaks
- [ ] **Performance:** Lighthouse score >90
- [ ] **Accessibility:** Accessibility audit passed
- [ ] **Browser Support:** Works on Chrome, Firefox, Safari, Edge
- [ ] **Mobile:** Tested on iOS and Android
- [ ] **Error Handling:** All error paths tested
- [ ] **Documentation:** Complete user and developer docs
- [ ] **Monitoring:** Error tracking set up (Sentry, etc.)
- [ ] **Backup:** Database backups configured
- [ ] **Deployment:** CI/CD pipeline configured
- [ ] **Environment:** Production environment variables set

### Final Verification

```bash
# Run all tests
npm run test
npm run test:e2e

# Build for production
npm run build

# Check bundle size
npm run build -- --analyze

# Run linter
npm run lint

# Type check
npm run type-check
```

---

## 📊 Overall Success Metrics

### Technical Metrics
- ✅ All 6 steps completed
- ✅ Zero critical bugs
- ✅ <2s page load time
- ✅ >95% payment success rate
- ✅ 100% test coverage for pricing logic

### Business Metrics
- ✅ Booking flow completion rate >25%
- ✅ Payment conversion rate >80%
- ✅ Average booking value: $1,200
- ✅ Target: 42 bookings/month for $50K MRR

### User Experience Metrics
- ✅ Mobile usability score >90
- ✅ Accessibility score >95
- ✅ Error rate <1%
- ✅ User satisfaction >4.5/5

---

## 🚀 Quick Start Guide

**For Google AI Studio:**

1. **Start with Step 1** - Copy the "Step 1: Database Foundation" section
2. **Verify success criteria** - Check each item after completion
3. **Move to next step** - Only proceed when previous step is 100% complete
4. **Use production checklist** - Ensure each item is checked before moving on

**For Developers:**

```bash
# 1. Create database migrations
cd /home/sk/fashionos100
supabase migration new shoot_booking_core
supabase migration new shoot_pricing_config

# 2. Create edge functions
supabase functions new manage-brief
supabase functions new calculate-shoot-price
supabase functions new create-shoot-payment

# 3. Install dependencies
npm install @stripe/stripe-js @stripe/react-stripe-js

# 4. Start development
npm run dev
```

---

## 📚 Reference Documents

- `docs/services/001-service-plan.md` - Complete implementation plan with code examples
- `docs/services/01-shoot-booking-plan.md` - Original booking plan
- `docs/services/02-shoot-flow.md` - User flow specifications
- `docs/services/03-shoot-schema.md` - Database schema details
- `.cursor/rules/create-migration.mdc` - Migration guidelines
- `.cursor/rules/writing-supabase-edge-functions.mdc` - Edge function guidelines

---

**Ready to start? Begin with Step 1: Database Foundation.**