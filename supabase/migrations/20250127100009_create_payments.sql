-- ============================================================================
-- Migration: Create Payments Table
-- Purpose: Payment transactions for shoot bookings, integrated with Stripe
-- Affected: public.payments table
-- Dependencies: public.shoots, public.profiles, payment_status enum
-- ============================================================================

-- Payments: Payment transactions for shoots
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  shoot_id uuid references public.shoots(id) on delete cascade,
  designer_id uuid references public.profiles(id) on delete restrict not null,
  amount integer not null,
  currency text default 'usd' not null,
  status payment_status default 'pending' not null,
  provider text default 'stripe',
  provider_payment_id text,
  provider_customer_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  paid_at timestamptz,
  
  -- Constraints
  constraint payments_amount_check check (amount > 0)
);
comment on table public.payments is 'Payment transactions for shoot bookings, integrated with Stripe';

-- Enable RLS
alter table public.payments enable row level security;



