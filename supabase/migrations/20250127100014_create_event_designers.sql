-- ============================================================================
-- Migration: Create Event Designers Table
-- Purpose: Junction table linking designer profiles to events they participate in
-- Affected: public.event_designers table
-- Dependencies: public.events, public.designer_profiles
-- ============================================================================

-- Event designers: Linking directory to events
create table public.event_designers (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  designer_profile_id uuid references public.designer_profiles(id) on delete cascade not null,
  role text default 'showcasing' not null,
  created_at timestamptz default now() not null,
  
  -- Constraints
  unique(event_id, designer_profile_id)
);
comment on table public.event_designers is 'Junction table linking designer profiles to events they participate in';

-- Enable RLS
alter table public.event_designers enable row level security;



