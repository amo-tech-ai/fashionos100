-- ============================================================================
-- Migration: Create Shoots Table
-- Purpose: Shoot bookings linking designers to studios with full booking details
-- Affected: public.shoots table
-- Dependencies: public.profiles, public.studios, shoot_service_type, shoot_status, location_mode, distribution_channel enums
-- ============================================================================

-- Shoots: Core booking entity
create table public.shoots (
  id uuid default uuid_generate_v4() primary key,
  designer_id uuid references public.profiles(id) on delete restrict not null,
  studio_id uuid references public.studios(id) on delete set null,
  
  -- Shoot details
  shoot_type shoot_service_type not null,
  fashion_category text not null,
  looks_count integer,
  location_mode location_mode default 'studio' not null,
  
  -- Scheduling
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  
  -- Status and brief
  status shoot_status default 'draft' not null,
  brief_text text,
  polished_brief_text text,
  reference_links text[] default '{}',
  distribution_channels distribution_channel[] default '{}',
  
  -- Pricing
  estimated_price integer,
  final_price integer,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  completed_at timestamptz,
  
  -- Constraints
  constraint shoots_looks_count_check check (looks_count is null or looks_count > 0),
  constraint shoots_scheduled_end_after_start check (
    scheduled_end is null or scheduled_start is null or scheduled_end > scheduled_start
  )
);
comment on table public.shoots is 'Shoot bookings linking designers to studios with full booking details';

-- Enable RLS
alter table public.shoots enable row level security;



