-- ============================================================================
-- Migration: Create Venues Table
-- Purpose: Event venues that can be reused across multiple events
-- Affected: public.venues table
-- Dependencies: None
-- ============================================================================

-- Venues: Reusable event locations
create table public.venues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text,
  city text not null,
  state text,
  country text,
  postal_code text,
  capacity integer,
  map_url text,
  contact_email text,
  contact_phone text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  constraint venues_name_check check (char_length(name) > 0),
  constraint venues_capacity_check check (capacity is null or capacity > 0)
);
comment on table public.venues is 'Event venues that can be reused across multiple events';

-- Enable RLS
alter table public.venues enable row level security;



