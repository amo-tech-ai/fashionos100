# 🗄️ FashionOS Supabase Infrastructure Plan

**Version:** 1.0 (Final Release)
**Target:** PostgreSQL 15+ (Supabase)
**Architecture:** Modular Monolith

This document outlines the complete database schema, storage configuration, and server-side logic required to power FashionOS. The schema is divided into 6 logical modules.

---

## 1. 🔐 Module: Core & Auth (`01_core_auth.sql`)

Handles user identity, roles, and organization mapping.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`profiles`** | Extension of `auth.users`. Public profile data. | `id` (PK, FK), `role`, `full_name`, `avatar_url` |
| **`organizations`** | (Future) Groups users into agencies or studios. | `id`, `name`, `type`, `owner_id` |

### Enums
*   `user_role`: `('designer', 'model', 'organizer', 'admin', 'sponsor')`

### RLS Policies
*   **Public Read:** Everyone can read basic profile info (needed for credits/collaborators).
*   **Owner Write:** Users can only update their own profile.

### Triggers
*   `on_auth_user_created`: Automatically inserts a row into `profiles` when a user signs up via Supabase Auth.

---

## 2. 👗 Module: Brands & Directory (`02_brands_directory.sql`)

Manages the public talent directory and the internal AI Brand Intelligence engine.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`companies`** | The legal/business entity of a user. | `id`, `owner_id`, `name`, `website_url` |
| **`brand_identities`** | AI-extracted brand DNA (Tone, Pillars). | `company_id`, `core_description`, `target_audience` (Array) |
| **`brand_visuals`** | AI-extracted visual style. | `company_id`, `colors` (Array), `moods`, `lighting_style` |
| **`production_recommendations`** | AI-generated shoot guidelines. | `company_id`, `recommended_photography` (JSONB), `campaign_ideas` (JSONB) |
| **`designer_profiles`** | Public directory listing for talent. | `id`, `owner_id`, `specialty`, `hourly_rate`, `is_verified` |

### Indexes
*   `companies(owner_id)`
*   `designer_profiles(specialty)` (For directory filtering)

### RLS Policies
*   **Brand Intelligence:** Private. Only the `owner_id` can read/write brand analysis.
*   **Directory:** Public read if `is_public = true`.

---

## 3. 📸 Module: Studio & Production (`03_studio_production.sql`)

The core booking engine for photography and video services.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`shoots`** | The main booking transaction. | `id`, `designer_id`, `status`, `shoot_type`, `brief_data` (JSONB), `estimated_quote` |
| **`shoot_items`** | Granular shot list. | `shoot_id`, `name`, `instructions`, `status` |
| **`shoot_assets`** | Deliverables (Photos/Videos). | `shoot_id`, `url`, `status` (raw/retouched/approved), `metadata` (JSONB) |
| **`qa_reviews`** | AI Visual QA results. | `asset_id`, `grade` (A/B/C), `metrics` (JSONB), `detected_issues` |
| **`payments`** | Financial audit trail. | `shoot_id`, `amount`, `status` (pending/succeeded), `provider_id` |

### Enums
*   `shoot_status`: `('requested', 'confirmed', 'production', 'post_production', 'review', 'completed', 'cancelled')`

### RLS Policies
*   **Strict Privacy:** Users can ONLY see shoots where `designer_id` matches their ID.
*   **Asset Security:** Users can only access assets belonging to their shoots.

---

## 4. 🎟️ Module: Event & Ticketing (`04_event_ticketing.sql`)

Manages the Event Wizard, Ticketing, and Schedules.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`venues`** | Physical locations. | `id`, `name`, `city`, `capacity`, `geo_lat/lng` |
| **`events`** | The master event record. | `id`, `organizer_id`, `venue_id`, `slug`, `ai_summary` |
| **`event_schedules`** | Run-of-show agenda. | `event_id`, `start_time`, `title`, `location_in_venue` |
| **`ticket_tiers`** | Pricing configurations. | `event_id`, `name`, `price`, `quantity_total`, `quantity_sold` |
| **`registrations`** | Attendee tickets. | `event_id`, `ticket_tier_id`, `qr_code_data`, `status` |
| **`event_assets`** | Media (Trailers, Banners). | `event_id`, `url`, `type` (image/video) |

### Indexes
*   `events(slug)`: Critical for public SEO pages.
*   `registrations(qr_code_data)`: Fast scanning at the door.

---

## 5. 🤝 Module: Sponsorship & CRM (`05_sponsorship_crm.sql`)

Manages the B2B deal flow and sponsor portal.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`sponsor_profiles`** | CRM record for a brand. | `id`, `owner_id` (Login Access), `name`, `industry` |
| **`event_sponsors`** | The Deal connection. | `event_id`, `sponsor_id`, `status`, `level` (Gold/Silver), `contract_url` |
| **`sponsor_activations`** | Physical/Digital footprint. | `event_sponsor_id`, `type` (Booth/Lounge), `status` |
| **`sponsor_deliverables`** | Asset requirements. | `event_sponsor_id`, `type` (Logo/Ad), `asset_url`, `due_date` |
| **`sponsor_roi_metrics`** | Reporting data points. | `event_sponsor_id`, `metric_name`, `metric_value`, `unit` |

### RLS Policies
*   **Portal Access:** If a `sponsor_profile` has an `owner_id`, that user can read (but not delete) their deals and upload deliverables.

---

## 6. 💬 Module: Communication (`06_communication_system.sql`)

Real-time chat and system notifications.

### Tables

| Table | Description | Key Columns |
| :--- | :--- | :--- |
| **`chat_rooms`** | Conversation containers. | `id`, `type` (direct/group), `updated_at` |
| **`chat_participants`** | Who is in which room. | `room_id`, `user_id` |
| **`chat_messages`** | The content. | `room_id`, `sender_id`, `content` |
| **`notifications`** | System alerts. | `user_id`, `type`, `message`, `is_read` |
| **`system_logs`** | Audit & Error logging. | `level`, `message`, `metadata`, `source` |

### Realtime
*   Enabled on `chat_messages` and `notifications` for instant UI updates.

---

## 7. 📦 Storage Buckets (`07_storage_buckets.sql`)

| Bucket Name | Privacy | RLS Policy | Usage |
| :--- | :--- | :--- | :--- |
| **`avatars`** | Public | Auth users can upload; Public can read. | User profile pictures. |
| **`event-media`** | Public | Organizers upload; Public read. | Event banners, Veo trailers. |
| **`brand-assets`** | Private | Owner only. | Logos, Brand Bibles (PDFs). |
| **`production-assets`** | Private | Owner only (Shoot Client). | Raw photos, Final deliverables. |
| **`documents`** | Private | Owner only. | Contracts, Invoices. |

---

## 8. ⚡ Edge Functions

Server-side logic deployed to Supabase Deno runtime.

| Function Name | Trigger | Description |
| :--- | :--- | :--- |
| **`generate-brand-profile`** | Manual (Button) | Analyzes URL/Text using Gemini 2.5 to populate Brand Identity tables. |
| **`generate-event-draft`** | Manual (Wizard) | Parses natural language input into structured Event JSON schema. |
| **`generate-media`** | Manual (Button) | Wraps Google Veo 3.1 API to generate event trailers (Long-running poll). |
| **`resolve-venue`** | Manual (Input) | Uses Gemini + Google Maps to find/verify real world venues. |
| **`schedule-optimizer`** | Manual (Button) | Uses Gemini Reasoning (2.0 Flash) to solve scheduling conflicts. |
| **`sponsor-ai`** | Manual (Button) | Agents for Lead Scoring, Activation Ideas, and ROI Reporting. |
| **`send-transactional-email`** | Event (Trigger) | Sends welcome emails, ticket receipts via Resend. |
| **`create-checkout`** | Manual (Pay) | Generates Stripe Payment Links for shoots/sponsors. |

---

## 9. 🚀 Deployment Guide

### Step 1: Database Migration
Run the consolidated SQL command in the Supabase SQL Editor:
`supabase/migrations/20250309_complete_schema.sql`

### Step 2: Secrets Configuration
Set the following secrets in Supabase Dashboard > Settings > Edge Functions:
*   `GEMINI_API_KEY`
*   `STRIPE_SECRET_KEY`
*   `RESEND_API_KEY`
*   `GOOGLE_MAPS_API_KEY`

### Step 3: Edge Function Deployment
From the CLI:
```bash
supabase functions deploy
```

### Step 4: Verification
Visit `/dashboard/system` in the frontend application to run the automated health check against all tables and functions.
