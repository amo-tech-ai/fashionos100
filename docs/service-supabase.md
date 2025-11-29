
# 🗄️ Service Booking System - Supabase Architecture

**Version:** 1.0
**Module:** Shoot Booking (Photography & Video)
**Target:** PostgreSQL 15+ (Supabase)

---

## 1. 🏗️ High-Level Architecture

The Service Booking module handles the transactional flow of a client booking a creative production service.

### Data Model Overview
*   **Profiles:** Extended user data linked to `auth.users`.
*   **Shoots:** The core transaction record containing scope, schedule, and status.
*   **Shoot Items:** Granular product list (e.g., "Red Dress", "Blue Shoes") linked to a shoot.
*   **Assets:** Final deliverables (images/videos) linked to a shoot.
*   **Payments:** Financial audit trail.

---

## 2. 💻 Schema Definitions (DDL)

### I. Enums & Types
Strict typing ensures data integrity across the booking lifecycle.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Service Types
create type service_type as enum ('photography', 'video', 'hybrid');

-- Production Status
create type shoot_status as enum (
  'draft',          -- In wizard, not submitted
  'requested',      -- Submitted, pending deposit/approval
  'confirmed',      -- Deposit paid, scheduled
  'production',     -- Currently shooting
  'post_production',-- Editing/Retouching
  'review',         -- Assets delivered for approval
  'completed',      -- Final assets downloaded
  'cancelled'       -- Booking terminated
);

-- Retouching Levels
create type retouching_level as enum ('basic', 'high_end');

-- Payment Status
create type payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
```

### II. Core Tables

```sql
-- 1. PROFILES (Extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company_name text,
  role text default 'client', -- 'client', 'admin', 'creative'
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. SHOOTS (Main Booking Record)
create table shoots (
  id uuid default uuid_generate_v4() primary key,
  designer_id uuid references profiles(id), -- Nullable for guest checkout initially
  
  -- Scope Configuration
  shoot_type service_type not null,
  fashion_category text not null, -- 'ecomm', 'lookbook'
  style_type text not null,       -- 'ghost', 'on-model'
  product_size text default 'standard',
  
  -- Volume & Quality
  looks_count integer not null default 10,
  retouching_level retouching_level default 'basic',
  
  -- Logistics
  fulfillment_type text check (fulfillment_type in ('virtual', 'location')),
  scheduled_date date,
  scheduled_time time,
  
  -- Financials
  currency text default 'USD',
  estimated_quote decimal(10, 2) not null,
  deposit_amount decimal(10, 2),
  deposit_paid boolean default false,
  
  -- Briefing Data (Flexible JSONB)
  -- Structure: { "brief": "...", "references": [], "contact": {...} }
  brief_data jsonb default '{}'::jsonb,
  
  -- System
  status shoot_status default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. SHOOT ITEMS (The Shot List)
create table shoot_items (
  id uuid default uuid_generate_v4() primary key,
  shoot_id uuid references shoots(id) on delete cascade,
  name text not null,
  instructions text,
  reference_image_url text,
  status text default 'pending', -- 'shot', 'pending'
  created_at timestamptz default now()
);

-- 4. SHOOT ASSETS (Deliverables)
create table shoot_assets (
  id uuid default uuid_generate_v4() primary key,
  shoot_id uuid references shoots(id) on delete cascade,
  url text not null,
  filename text,
  file_type text, -- 'jpg', 'mp4'
  metadata jsonb, -- { width, height, size }
  is_final boolean default false,
  uploaded_at timestamptz default now()
);

-- 5. PAYMENTS (Audit Trail)
create table payments (
  id uuid default uuid_generate_v4() primary key,
  shoot_id uuid references shoots(id) on delete cascade,
  user_id uuid references auth.users(id),
  amount decimal(10, 2) not null,
  provider_payment_id text, -- Stripe ID
  status payment_status default 'pending',
  created_at timestamptz default now()
);
```

---

## 3. 🛡️ Row Level Security (RLS)

Security model: **Multi-Tenant (User Isolation) + Admin Oversight**.

```sql
-- Enable RLS
alter table profiles enable row level security;
alter table shoots enable row level security;
alter table shoot_items enable row level security;
alter table shoot_assets enable row level security;

-- PROFILES
create policy "Public profiles are viewable by everyone" 
  on profiles for select using (true);
create policy "Users can update own profile" 
  on profiles for update using (auth.uid() = id);

-- SHOOTS
-- Clients see only their own bookings
create policy "Clients view own shoots" 
  on shoots for select using (auth.uid() = designer_id);
create policy "Clients create shoots" 
  on shoots for insert with check (auth.uid() = designer_id);
create policy "Clients update own draft shoots" 
  on shoots for update using (auth.uid() = designer_id and status = 'draft');

-- Admins see everything (Assuming custom claim or role check function exists)
-- create policy "Admins view all" on shoots for all using ( auth.jwt() ->> 'role' = 'admin' );

-- ASSETS
-- Clients read their own assets
create policy "Clients view own assets" 
  on shoot_assets for select 
  using (exists (select 1 from shoots where id = shoot_assets.shoot_id and designer_id = auth.uid()));
```

---

## 4. ⚡ Performance & Indexes

Optimize for Dashboard filtering and sorting.

```sql
-- Shoots
create index idx_shoots_designer on shoots(designer_id);
create index idx_shoots_status on shoots(status);
create index idx_shoots_created on shoots(created_at desc);

-- Items
create index idx_shoot_items_shoot on shoot_items(shoot_id);

-- Assets
create index idx_shoot_assets_shoot on shoot_assets(shoot_id);
```

---

## 5. 🤖 Automation (Triggers & Edge Functions)

### Triggers
1.  **`update_updated_at`**: Automatically updates the `updated_at` timestamp on modification.
    ```sql
    create trigger handle_updated_at before update on shoots
    for each row execute procedure moddatetime (updated_at);
    ```

### Edge Functions
Recommended implementation for business logic.

1.  **`create-booking` (Transaction)**
    *   **Trigger:** Frontend Wizard Submit.
    *   **Logic:**
        1.  Validates pricing server-side.
        2.  Inserts `shoot` record.
        3.  Batch inserts `shoot_items`.
        4.  Initiates Stripe Payment Intent.
    *   **Why:** Ensures atomicity and pricing security.

2.  **`process-stripe-webhook`**
    *   **Trigger:** Stripe `payment_intent.succeeded`.
    *   **Logic:**
        1.  Finds `shoot` by metadata.
        2.  Updates `shoots.status` -> `confirmed`.
        3.  Inserts `payments` record.
        4.  Triggers email notification.

3.  **`send-booking-email`**
    *   **Trigger:** Database Webhook or direct call.
    *   **Logic:** Sends confirmation email to Client and "New Order" alert to Studio Admin using Resend/SendGrid.

---

## 6. 💻 Integration Best Practices

### Frontend (React + Supabase Client)
*   **Typed Data:** Generate TypeScript types from the schema using `supabase gen types`.
*   **Realtime:** Subscribe to `shoots` changes to update the dashboard status live without refreshing.
    ```ts
    supabase.channel('custom-filter')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'shoots', filter: `designer_id=eq.${userId}` }, (payload) => {
        console.log('Booking updated:', payload)
      })
      .subscribe()
    ```

### Backend (Edge Functions)
*   **Service Role:** Use `SUPABASE_SERVICE_ROLE_KEY` only within Edge Functions for admin tasks (like updating payment status). Never expose this to the client.
*   **Validation:** Use `zod` in Edge Functions to validate input JSON from the wizard before hitting the database.

---

## 7. Migration Steps

1.  Run **Extensions & Enums** SQL.
2.  Run **Create Tables** SQL.
3.  Run **RLS Policies** SQL.
4.  Run **Indexes** SQL.
5.  Deploy **Edge Functions**.
6.  Update Frontend `types/supabase.ts`.
