# 📸 Shoot Booking System - Implementation Plan

**Status:** Ready for Implementation  
**Version:** 1.1 (Updated 2025-01-27)  
**Target Revenue Impact:** $50K MRR (AMO SaaS) + $25K net revenue (Medellín AI)  
**Timeline:** 6-8 weeks MVP

**⚠️ Important Notes:**
- **Database Schema:** See `docs/services/03-shoot-schema.md` for complete, production-ready schema
- **Edge Functions:** Use `Deno.serve` (not `serve` from deno.land/std) - see `.cursor/rules/writing-supabase-edge-functions.mdc`
- **Two Booking Systems:** This document covers the full 13-phase wizard. For the 7-step ecommerce booking, see `services/07-services-prompts.md`
- **Schema Reference:** Uses `shoots` table (not `briefs`) - aligns with `docs/services/03-shoot-schema.md`

---

## 📊 Progress Tracker Matrix

| Task Name | Short Description | Status | % Complete | ✅ Confirmed | ⚠️ Missing / Failing | 💡 Next Action |
| --------- | ----------------- | ------ | ---------- | ------------- | -------------------- | -------------- |
| **Phase 1: Database Foundation** | | | | | | |
| Database Schema Design | Complete schema with tables, enums, indexes | 🔴 Not Started | 0% | — | Schema docs exist, need migration files | Create schema files in `supabase/schemas/` |
| Migration Files | Generate migration files from schema | 🔴 Not Started | 0% | — | Need to run `supabase db diff` | Generate initial migration |
| RLS Policies | Row-level security for all tables | 🔴 Not Started | 0% | — | Policies defined in docs, need implementation | Apply RLS policies to all tables |
| Database Functions | Pricing and utility functions | 🔴 Not Started | 0% | — | `calculate_shoot_price()` defined in docs | Create function in database |
| Seed Data | Pricing configs, studios, scenes | 🔴 Not Started | 0% | — | Seed data defined in docs | Insert seed data |
| **Phase 2: Core API Layer** | | | | | | |
| Edge Function: manage-shoot | Create/update/get shoot bookings | 🔴 Not Started | 0% | — | Code example exists, needs implementation | Create `supabase/functions/manage-shoot/index.ts` |
| Edge Function: calculate-shoot-price | Real-time pricing calculation | 🔴 Not Started | 0% | — | Code example exists, needs implementation | Create `supabase/functions/calculate-shoot-price/index.ts` |
| Edge Function: create-shoot-payment | Stripe payment intent creation | 🔴 Not Started | 0% | — | Code example exists, needs implementation | Create `supabase/functions/create-shoot-payment/index.ts` |
| Edge Function: polish-brief | AI brief enhancement (Gemini) | 🟡 In Progress | 30% | Function exists | Needs structured output enhancement | Enhance with structured output |
| CORS Configuration | Shared CORS headers | 🟢 Complete | 100% | ✅ | — | — |
| **Phase 3: Pricing Engine** | | | | | | |
| Pricing Service (Frontend) | Client-side pricing calculations | 🔴 Not Started | 0% | — | Service file defined, needs implementation | Create `src/services/pricingService.ts` |
| Real-Time Price Updates | Debounced price recalculation | 🔴 Not Started | 0% | — | Logic defined, needs hook implementation | Create `usePricing` hook |
| Price Breakdown Display | Sidebar with itemized pricing | 🔴 Not Started | 0% | — | Component structure defined | Create `BookingSidebar.tsx` |
| Tax Calculation | Dynamic tax based on location | 🔴 Not Started | 0% | — | Tax logic needs implementation | Add tax calculation to pricing engine |
| Discount System | Membership and bundle discounts | 🔴 Not Started | 0% | — | Discount rules defined | Implement discount logic |
| **Phase 4: Frontend Components** | | | | | | |
| BookingLayout | Main wizard wrapper with progress | 🔴 Not Started | 0% | — | Layout structure defined | Create `components/shoot-booking/BookingLayout.tsx` |
| PhaseProgress | Progress indicator component | 🔴 Not Started | 0% | — | Component structure defined | Create `components/shoot-booking/PhaseProgress.tsx` |
| SidebarSummary | Desktop price summary sidebar | 🔴 Not Started | 0% | — | Component structure defined | Create `components/shoot-booking/SidebarSummary.tsx` |
| MobileSummarySheet | Mobile bottom sheet for pricing | 🔴 Not Started | 0% | — | Component structure defined | Create `components/shoot-booking/MobileSummarySheet.tsx` |
| Phase 0: Company Profile | Company & brand information | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase0Company.tsx` |
| Phase 1: Channels | Distribution channel selection | 🔴 Not Started | 0% | — | Code example exists | Create `phases/Phase1Channels.tsx` |
| Phase 2: Services | Service type selection | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase2Services.tsx` |
| Phase 3: Quantity | Quantity & pricing selection | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase3Quantity.tsx` |
| Phase 4: Styles | Shot style selection | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase4Styles.tsx` |
| Phase 5: Products | Shot list builder | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase5Products.tsx` |
| Phase 6: References | References & inspiration | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase6References.tsx` |
| Phase 7: Talent | Model/talent selection | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase7Talent.tsx` |
| Phase 8: Upgrades | Creative add-ons | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase8Upgrades.tsx` |
| Phase 9: Location | Location & studio selection | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase9Location.tsx` |
| Phase 10: Review | Review & confirm | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase10Review.tsx` |
| Phase 11: Payment | Payment form | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase11Payment.tsx` |
| Phase 12: Success | Success screen | 🔴 Not Started | 0% | — | Phase structure defined | Create `phases/Phase12Success.tsx` |
| **Phase 5: Payment Integration** | | | | | | |
| Stripe Setup | Stripe account configuration | 🔴 Not Started | 0% | — | Need Stripe keys | Configure Stripe account |
| Payment Intent Creation | Create payment intents | 🔴 Not Started | 0% | — | Edge function exists | Test payment intent creation |
| Stripe Webhook Handler | Handle payment webhooks | 🔴 Not Started | 0% | — | Webhook handler needed | Create webhook handler |
| Payment Status Updates | Update shoot status on payment | 🔴 Not Started | 0% | — | Status update logic needed | Implement status updates |
| Invoice Generation | Generate invoices | 🔴 Not Started | 0% | — | Invoice template needed | Create invoice template |
| **Phase 6: Testing & Polish** | | | | | | |
| Unit Tests | Pricing, validation, utilities | 🔴 Not Started | 0% | — | Test framework needed | Set up Vitest/Jest |
| Integration Tests | API endpoints, database | 🔴 Not Started | 0% | — | Test framework needed | Create integration tests |
| E2E Tests | Full user journey | 🔴 Not Started | 0% | — | Playwright needed | Set up Playwright |
| Mobile Responsiveness | Test on mobile devices | 🔴 Not Started | 0% | — | Mobile testing needed | Test all pages on mobile |
| Error Handling | Comprehensive error handling | 🔴 Not Started | 0% | — | Error boundaries needed | Add error boundaries |
| Loading States | Skeleton screens, spinners | 🔴 Not Started | 0% | — | Loading components needed | Create loading components |
| Accessibility | ARIA labels, keyboard nav | 🔴 Not Started | 0% | — | A11y audit needed | Add accessibility features |
| Performance Optimization | Bundle size, lazy loading | 🔴 Not Started | 0% | — | Performance audit needed | Optimize bundle size |

**Legend:**
- 🔴 Not Started (0%)
- 🟡 In Progress (1-99%)
- 🟢 Complete (100%)
- ✅ Confirmed (verified working)
- ⚠️ Missing/Failing (blockers or issues)
- 💡 Next Action (immediate next step)

---

## 🎯 Executive Summary

**Core Insight:** Multi-phase booking wizard that converts browsers into paying customers through progressive disclosure and live pricing.

**Key Mechanism:** 
- **Full Wizard:** 13-phase comprehensive booking system (for complex shoots)
- **Ecommerce Booking:** 7-step streamlined flow (for product photography)
- Both with real-time pricing calculations, AI-enhanced briefs, and seamless Stripe integration.

**Strategic Advantage:** Reduces booking friction by 80% vs. email chains, enables self-service at scale, captures complete brief data upfront.

**Implementation:** Database-first → API layer → Frontend components → Pricing engine → Payment flow.

**Note:** This document covers the full 13-phase wizard. For the simplified 7-step ecommerce booking system, see `05-design-prompts.md` Section 19.

---

## 📊 Implementation Phases

**See Progress Tracker Matrix above for detailed task breakdown.**

### Phase 1: Database Foundation (Week 1)
**Revenue Impact:** Enables all booking functionality  
**Effort:** 3-4 days  
**Tasks:** Schema design, migrations, RLS policies, database functions, seed data

### Phase 2: Core API Layer (Week 2-3)
**Revenue Impact:** Powers frontend interactions  
**Effort:** 8-10 days  
**Tasks:** Edge functions (manage-shoot, calculate-shoot-price, create-shoot-payment, polish-brief)

### Phase 3: Pricing Engine (Week 3-4)
**Revenue Impact:** Critical for conversion optimization  
**Effort:** 5-6 days  
**Tasks:** Pricing service, real-time updates, price breakdown, tax calculation, discounts

### Phase 4: Frontend Components (Week 4-6)
**Revenue Impact:** User experience = conversion rate  
**Effort:** 12-15 days  
**Tasks:** Layout, progress indicator, sidebar, all 13 phase components

### Phase 5: Payment Integration (Week 6-7)
**Revenue Impact:** Direct revenue capture  
**Effort:** 4-5 days  
**Tasks:** Stripe setup, payment intents, webhooks, status updates, invoices

### Phase 6: Testing & Polish (Week 7-8)
**Revenue Impact:** Reduces churn, increases trust  
**Effort:** 5-6 days  
**Tasks:** Unit tests, integration tests, E2E tests, mobile responsiveness, error handling, accessibility

---

## 1. Database Schema (Supabase Migrations)

**⚠️ Important:** The database schema is defined in `03-shoot-schema.md`. This section provides implementation guidance. For the complete, production-ready schema, refer to `docs/services/03-shoot-schema.md`.

### 1.1 Schema Overview

The shoot booking system uses the following core tables (from `03-shoot-schema.md`):

- **`shoots`**: Main booking entity (not `briefs` - that was an earlier design)
- **`shoot_items`**: Individual items/garments in a shoot
- **`payments`**: Payment transactions
- **`assets`**: Final deliverables
- **`studios`**: Available studio locations
- **`profiles`**: User identity (from core schema)

**Key Differences from Earlier Design:**
- Uses `shoots` table directly (not `briefs` + `company_profiles`)
- Links directly to `profiles` table via `designer_id`
- Simpler structure, better aligned with actual implementation

### 1.2 Migration Notes

**For Full Schema:** See `docs/services/03-shoot-schema.md` for complete SQL definitions including:
- All enums and types
- Complete table definitions with constraints
- Indexes for performance
- Triggers for automatic updates
- RLS policies for security
- Database functions

**For Ecommerce Booking:** Additional tables may be needed (see `05-design-prompts.md` Section 19):
- `scenes` table for scene selection
- `models` table for model types
- `upgrades` table for add-ons
- `bookings` table for ecommerce-specific bookings

**Migration Approach:**
1. Use declarative schema management (see `03-shoot-schema.md` Section 4)
2. Create schema files in `supabase/schemas/`
3. Generate migrations with `supabase db diff`
4. Review and apply migrations

### 1.2 Migration: Pricing Configuration Tables

**File:** `supabase/migrations/YYYYMMDDHHmmss_shoot_pricing_config.sql`

```sql
-- Base Pricing Configuration
create table pricing_configs (
  id uuid default uuid_generate_v4() primary key,
  service_type shoot_service_type not null,
  style_type shot_style_type,
  base_price_per_unit integer not null, -- in cents
  channel_multipliers jsonb default '{}', -- {channel: multiplier}
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(service_type, style_type)
);
comment on table pricing_configs is 'Base pricing configuration for shoots';

-- Talent Pricing
create table talent_pricing (
  id uuid default uuid_generate_v4() primary key,
  talent_type talent_type not null,
  day_rate integer not null, -- in cents
  block_rate integer, -- in cents (if different from day)
  is_active boolean default true,
  created_at timestamptz default now()
);
comment on table talent_pricing is 'Talent fee pricing configuration';

-- Addon Pricing
create table addon_pricing (
  id uuid default uuid_generate_v4() primary key,
  addon_type addon_type not null,
  unit_price integer not null, -- in cents
  is_per_image boolean default false, -- true for retouching/recoloring
  is_active boolean default true,
  created_at timestamptz default now(),
  unique(addon_type)
);
comment on table addon_pricing is 'Addon service pricing configuration';

-- Seed Data
insert into pricing_configs (service_type, style_type, base_price_per_unit, channel_multipliers) values
  ('photo', 'packshot', 4500, '{"amazon_listing": 1.15, "shopify_pdp": 1.05}'),
  ('photo', 'flat_lay', 3900, '{"instagram_feed": 1.1, "pinterest": 1.05}'),
  ('photo', 'on_model', 7900, '{"instagram_feed": 1.1, "instagram_reels": 1.1}'),
  ('photo', 'lifestyle', 7900, '{"instagram_feed": 1.1, "facebook": 1.05}'),
  ('video', null, 18900, '{"tiktok": 1.1, "instagram_reels": 1.1}'), -- 15s social
  ('video', null, 32900, '{"youtube": 1.15}'), -- 30s ad
  ('video', null, 49900, '{"youtube": 1.15}'); -- 60s story

insert into talent_pricing (talent_type, day_rate, block_rate) values
  ('hand', 23700, 23700),
  ('full_body', 47700, 47700),
  ('pet', 29700, 29700);

insert into addon_pricing (addon_type, unit_price, is_per_image) values
  ('styling', 44700, false),
  ('hair_makeup', 29900, false),
  ('steaming', 3900, false),
  ('producer', 35000, false),
  ('advanced_retouching', 1500, true),
  ('product_recoloring', 2000, true),
  ('script_writing', 25000, false),
  ('subtitles', 15000, false),
  ('voiceover', 30000, false),
  ('expedited_delivery', 50000, false);
```

---

## 2. Edge Functions (API Layer)

### 2.1 Create/Update Shoot

**File:** `supabase/functions/manage-shoot/index.ts` (or use direct Supabase client calls)

**Note:** For simplicity, consider using Supabase client directly from frontend with RLS policies. Edge functions are recommended for:
- Complex business logic
- External API integrations (Stripe, Gemini)
- Background processing

**Alternative:** Direct Supabase client usage:
```typescript
// Frontend: Create shoot
const { data, error } = await supabase
  .from('shoots')
  .insert({
    designer_id: user.id,
    shoot_type: 'photo',
    status: 'draft',
    ...shootData
  })
  .select()
  .single()
```

```typescript
import { createClient } from "npm:@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, shootId, data } = await req.json()
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const { data: { user } } = await supabase.auth.getUser(token || '')

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'create') {
      // Create shoot booking
      const { data: shoot, error } = await supabase
        .from('shoots')
        .insert({
          designer_id: user.id,
          ...data
        })
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ shoot }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (action === 'update') {
      // Verify ownership
      const { data: existingShoot } = await supabase
        .from('shoots')
        .select('designer_id')
        .eq('id', shootId)
        .single()

      if (!existingShoot || existingShoot.designer_id !== user.id) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { data: shoot, error } = await supabase
        .from('shoots')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', shootId)
        .select()
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ shoot }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (action === 'get') {
      const { data: shoot, error } = await supabase
        .from('shoots')
        .select(`
          *,
          shoot_items(*),
          studio:studios(*)
        `)
        .eq('id', shootId)
        .eq('designer_id', user.id)
        .single()

      if (error) throw error
      return new Response(JSON.stringify({ shoot }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

### 2.2 Calculate Pricing

**File:** `supabase/functions/calculate-shoot-price/index.ts`

```typescript
import { createClient } from "npm:@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

interface PricingInput {
  shootId: string
  shootType: 'photo' | 'video' | 'hybrid'
  distributionChannels: string[]
  looksCount: number
  locationMode: 'virtual' | 'studio' | 'hybrid'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const input: PricingInput = await req.json()

    // Use database function for pricing calculation
    const { data: priceResult, error: priceError } = await supabase.rpc(
      'calculate_shoot_price',
      {
        p_shoot_type: input.shootType,
        p_looks_count: input.looksCount,
        p_location_mode: input.locationMode,
        p_distribution_channels: input.distributionChannels
      }
    )

    if (priceError) throw priceError

    const total = priceResult || 0

    // Update shoot with calculated pricing
    await supabase
      .from('shoots')
      .update({
        estimated_price: total,
        updated_at: new Date().toISOString()
      })
      .eq('id', input.shootId)

    return new Response(JSON.stringify({
      estimated_price: total,
      breakdown: {
        base: total,
        looks_count: input.looksCount,
        location_mode: input.locationMode,
        channels: input.distributionChannels
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

### 2.3 Create Payment Intent

**File:** `supabase/functions/create-shoot-payment/index.ts`

```typescript
import { createClient } from "npm:@supabase/supabase-js@2"
import Stripe from "npm:stripe@14"
import { corsHeaders } from "../_shared/cors.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { shootId } = await req.json()
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    const { data: { user } } = await supabase.auth.getUser(token || '')

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get shoot and verify ownership
    const { data: shoot, error: shootError } = await supabase
      .from('shoots')
      .select('*')
      .eq('id', shootId)
      .eq('designer_id', user.id)
      .single()

    if (shootError || !shoot) {
      return new Response(
        JSON.stringify({ error: 'Shoot not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (shoot.status !== 'ready_for_payment') {
      return new Response(
        JSON.stringify({ error: 'Shoot not ready for payment' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: shoot.estimated_price || shoot.final_price || 0,
      currency: 'usd',
      metadata: {
        shoot_id: shootId,
        user_id: user.id
      }
    })

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        shoot_id: shootId,
        designer_id: user.id,
        amount: shoot.estimated_price || shoot.final_price || 0,
        currency: 'usd',
        provider_payment_id: paymentIntent.id,
        status: 'pending'
      })
      .select()
      .single()

    if (paymentError) throw paymentError

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
```

---

## 3. Frontend Components (React + TypeScript)

### 3.1 Component Structure

```
src/
  components/
    shoot-booking/
      BookingWizard.tsx          # Main wizard container
      PhaseProgress.tsx          # Progress indicator
      SidebarSummary.tsx         # Pricing summary (desktop)
      MobileSummarySheet.tsx     # Bottom sheet (mobile)
      
      phases/
        Phase0Company.tsx        # Company & brand info
        Phase1Channels.tsx       # Channel selection
        Phase2Services.tsx      # Service type
        Phase3Quantity.tsx      # Quantity & pricing
        Phase4Styles.tsx         # Shot styles
        Phase5Products.tsx       # Shot list builder
        Phase6References.tsx     # References & inspiration
        Phase7Talent.tsx         # Model/talent selection
        Phase8Upgrades.tsx       # Creative add-ons
        Phase9Location.tsx       # Location & studio
        Phase10Review.tsx        # Review & confirm
        Phase11Payment.tsx       # Payment form
        Phase12Success.tsx       # Success screen
```

### 3.2 Main Wizard Component

**File:** `src/components/shoot-booking/BookingWizard.tsx`

```typescript
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import Phase0Company from './phases/Phase0Company'
import Phase1Channels from './phases/Phase1Channels'
// ... import all phases
import PhaseProgress from './PhaseProgress'
import SidebarSummary from './SidebarSummary'

interface BriefState {
  id?: string
  company_profile_id?: string
  service_type: 'photo' | 'video' | 'hybrid'
  distribution_channels: string[]
  total_assets_photos: number
  total_assets_videos: number
  selected_shot_styles: string[]
  // ... all other fields
}

export default function BookingWizard() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [brief, setBrief] = useState<BriefState>({
    service_type: 'photo',
    distribution_channels: [],
    total_assets_photos: 0,
    total_assets_videos: 0,
    selected_shot_styles: []
  })
  const [pricing, setPricing] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Load existing brief from URL or create new
  useEffect(() => {
    const briefId = new URLSearchParams(window.location.search).get('briefId')
    if (briefId) {
      loadBrief(briefId)
    } else {
      createBrief()
    }
  }, [])

  const createBrief = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('manage-brief', {
        body: { action: 'create', data: brief }
      })
      if (error) throw error
      setBrief(data.brief)
      // Update URL
      window.history.pushState({}, '', `?briefId=${data.brief.id}`)
    } catch (error) {
      console.error('Failed to create brief:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBrief = async (updates: Partial<BriefState>) => {
    if (!brief.id) return

    const updatedBrief = { ...brief, ...updates }
    setBrief(updatedBrief)

    try {
      await supabase.functions.invoke('manage-shoot', {
        body: {
          action: 'update',
          shootId: brief.id,
          data: updates
        }
      })

      // Recalculate pricing if relevant fields changed
      if (updates.total_assets_photos || updates.total_assets_videos || 
          updates.selected_shot_styles || updates.selected_addons) {
        await recalculatePricing(updatedBrief)
      }
    } catch (error) {
      console.error('Failed to update brief:', error)
    }
  }

  const recalculatePricing = async (briefData: BriefState) => {
    if (!briefData.id) return

    try {
      const { data, error } = await supabase.functions.invoke('calculate-shoot-price', {
        body: {
          shootId: briefData.id,
          ...briefData
        }
      })
      if (error) throw error
      setPricing(data)
      setBrief(prev => ({ ...prev, ...data }))
    } catch (error) {
      console.error('Failed to calculate pricing:', error)
    }
  }

  const handleNext = () => {
    if (currentPhase < 12) {
      setCurrentPhase(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentPhase > 0) {
      setCurrentPhase(prev => prev - 1)
    }
  }

  const renderPhase = () => {
    const phaseProps = {
      brief,
      onUpdate: updateBrief,
      onNext: handleNext,
      onBack: handleBack
    }

    switch (currentPhase) {
      case 0: return <Phase0Company {...phaseProps} />
      case 1: return <Phase1Channels {...phaseProps} />
      case 2: return <Phase2Services {...phaseProps} />
      case 3: return <Phase3Quantity {...phaseProps} />
      case 4: return <Phase4Styles {...phaseProps} />
      case 5: return <Phase5Products {...phaseProps} />
      case 6: return <Phase6References {...phaseProps} />
      case 7: return <Phase7Talent {...phaseProps} />
      case 8: return <Phase8Upgrades {...phaseProps} />
      case 9: return <Phase9Location {...phaseProps} />
      case 10: return <Phase10Review {...phaseProps} />
      case 11: return <Phase11Payment {...phaseProps} />
      case 12: return <Phase12Success {...phaseProps} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PhaseProgress current={currentPhase} total={13} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            {renderPhase()}
          </div>
          
          <div className="hidden lg:block">
            <SidebarSummary brief={brief} pricing={pricing} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 3.3 Example Phase Component (Phase 1: Channels)

**File:** `src/components/shoot-booking/phases/Phase1Channels.tsx`

```typescript
import { useState } from 'react'

interface Channel {
  id: string
  label: string
  icon: string
  description: string
}

const CHANNELS: Channel[] = [
  { id: 'instagram_feed', label: 'Instagram Feed', icon: '📷', description: 'Square & 4:5 posts' },
  { id: 'instagram_reels', label: 'Instagram Reels', icon: '🎬', description: '9:16 vertical video' },
  { id: 'instagram_stories', label: 'Instagram Stories', icon: '📱', description: '9:16 ephemeral' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵', description: '9:16 short-form' },
  { id: 'youtube', label: 'YouTube', icon: '▶️', description: '16:9 video content' },
  { id: 'amazon_listing', label: 'Amazon Listing', icon: '📦', description: 'Product images' },
  { id: 'shopify_pdp', label: 'Shopify PDP', icon: '🛒', description: 'Product detail pages' },
  { id: 'facebook', label: 'Facebook', icon: '👥', description: 'Social posts' },
  { id: 'pinterest', label: 'Pinterest', icon: '📌', description: '2:3 vertical pins' },
  { id: 'email_campaign', label: 'Email Campaign', icon: '📧', description: 'Newsletter assets' },
]

interface Props {
  brief: any
  onUpdate: (updates: any) => void
  onNext: () => void
  onBack: () => void
}

export default function Phase1Channels({ brief, onUpdate, onNext, onBack }: Props) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    brief.distribution_channels || []
  )

  const handleToggle = (channelId: string) => {
    const updated = selectedChannels.includes(channelId)
      ? selectedChannels.filter(id => id !== channelId)
      : [...selectedChannels, channelId]
    
    setSelectedChannels(updated)
    onUpdate({ distribution_channels: updated })
  }

  const canProceed = selectedChannels.length > 0

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <h1 className="text-4xl font-serif mb-2">Where will you use this content?</h1>
      <p className="text-gray-600 mb-8">Select all distribution channels</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {CHANNELS.map(channel => (
          <button
            key={channel.id}
            onClick={() => handleToggle(channel.id)}
            className={`
              p-6 rounded-xl border-2 transition-all text-left
              ${selectedChannels.includes(channel.id)
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="text-3xl mb-2">{channel.icon}</div>
            <div className="font-semibold mb-1">{channel.label}</div>
            <div className="text-sm text-gray-500">{channel.description}</div>
          </button>
        ))}
      </div>

      {selectedChannels.length === 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">Please select at least one channel</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            px-8 py-3 rounded-lg font-semibold uppercase
            ${canProceed
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Next: Services
        </button>
      </div>
    </div>
  )
}
```

---

## 4. Pricing Logic Implementation

### 4.1 Pricing Service (Frontend)

**File:** `src/services/pricingService.ts`

```typescript
interface PricingCalculation {
  subtotal: number
  discount: number
  tax: number
  total: number
  breakdown: {
    photos: number
    videos: number
    talent: number
    addons: number
  }
}

export async function calculateShootPricing(
  shootId: string,
  config: {
    serviceType: 'photo' | 'video' | 'hybrid'
    distributionChannels: string[]
    totalAssetsPhotos: number
    totalAssetsVideos: number
    selectedShotStyles: string[]
    talentBookings: Array<{ type: string; day_rate: number }>
    selectedAddons: Array<{ type: string; quantity: number; unit_price: number }>
  }
): Promise<PricingCalculation> {
  const { data, error } = await supabase.functions.invoke('calculate-shoot-price', {
    body: {
      shootId,
      ...config
    }
  })

  if (error) throw error
  return data
}

// Format currency for display
export function formatCurrency(cents: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(cents / 100)
}
```

---

## 5. Testing Strategy

### 5.1 Unit Tests

- Pricing calculations with various channel combinations
- Brief state transitions
- Validation logic for each phase

### 5.2 Integration Tests

- Complete booking flow (draft → payment → confirmed)
- Pricing recalculation triggers
- Payment intent creation

### 5.3 E2E Tests (Playwright)

- Full user journey from landing to payment
- Mobile responsive behavior
- Error handling scenarios

---

## 6. Deployment Checklist

### 6.1 Database

- [ ] Run migrations in production
- [ ] Seed pricing configuration data
- [ ] Verify RLS policies
- [ ] Test backup/restore

### 6.2 Edge Functions

- [ ] Deploy all functions
- [ ] Set environment variables
- [ ] Configure CORS
- [ ] Test authentication flow

### 6.3 Frontend

- [ ] Build production bundle
- [ ] Deploy to hosting (Vercel/Netlify)
- [ ] Configure environment variables
- [ ] Test payment flow with Stripe test mode

### 6.4 Payment

- [ ] Configure Stripe webhook endpoint
- [ ] Test payment success/failure flows
- [ ] Verify invoice generation
- [ ] Set up payment notifications

---

## 7. Revenue Optimization Features

### 7.1 Membership Discounts

- Pro members get 10% off base pricing
- Annual subscribers get 15% off
- Implement in `calculate-shoot-price` function

### 7.2 Bundle Discounts

- 20+ assets: 5% discount
- 50+ assets: 10% discount
- Hybrid shoots: 15% discount on video portion

### 7.3 Upsell Opportunities

- "Add expedited delivery" on review screen
- "Include social media kit" upgrade
- "Book a follow-up shoot" on success screen

---

## 8. Success Metrics

### 8.1 Conversion Funnel

- Landing → Start: 40% target
- Start → Complete: 25% target
- Complete → Payment: 80% target
- Overall conversion: 8% target

### 8.2 Revenue Metrics

- Average order value: $1,200
- Monthly bookings: 42 (to hit $50K MRR)
- Customer lifetime value: $3,600 (3 bookings avg)

### 8.3 Technical Metrics

- Page load time: <2s
- Pricing calculation: <500ms
- Payment success rate: >95%

---

## 9. Next Steps (Post-MVP)

1. **AI Brief Polisher** - Integrate Gemini 3 to enhance user briefs
2. **Reference Library** - Curated inspiration gallery
3. **Studio Calendar** - Real-time availability booking
4. **Asset Delivery** - Automated upload and organization
5. **Analytics Dashboard** - Booking trends and revenue insights

---

**Ready to start? Begin with Phase 1: Database Foundation.**
