-- ============================================================================
-- Migration: Create Studios Table
-- Purpose: Photography and video studios available for shoot bookings
-- Affected: public.studios table
-- Dependencies: None
-- ============================================================================

-- Studios: Photography/video studios available for booking
create table public.studios (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  city text not null,
  address text,
  contact_email text,
  contact_phone text,
  is_active boolean default true not null,
  features text[] default '{}',
  hourly_rate integer,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  constraint studios_name_check check (char_length(name) > 0),
  constraint studios_slug_check check (slug ~ '^[a-z0-9-]+$')
);
comment on table public.studios is 'Photography and video studios available for shoot bookings';

-- Enable RLS
alter table public.studios enable row level security;



