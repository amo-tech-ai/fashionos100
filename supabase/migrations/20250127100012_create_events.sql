-- ============================================================================
-- Migration: Create Events Table
-- Purpose: Fashion events including runways, pop-ups, and networking events
-- Affected: public.events table
-- Dependencies: public.profiles, public.venues, event_type, event_status enums
-- ============================================================================

-- Events: Fashion events (runways, pop-ups, etc.)
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  organizer_id uuid references public.profiles(id) on delete restrict not null,
  venue_id uuid references public.venues(id) on delete set null,
  
  -- Event details
  title text not null,
  slug text unique,
  description text,
  event_type event_type not null,
  status event_status default 'draft' not null,
  
  -- Scheduling
  start_time timestamptz not null,
  end_time timestamptz,
  
  -- Public settings
  is_public boolean default true not null,
  featured_image_url text,
  capacity_limit integer,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  published_at timestamptz,
  
  -- Constraints
  constraint events_title_check check (char_length(title) > 0),
  constraint events_end_after_start check (
    end_time is null or end_time > start_time
  ),
  constraint events_capacity_check check (
    capacity_limit is null or capacity_limit > 0
  )
);
comment on table public.events is 'Fashion events including runways, pop-ups, and networking events';

-- Enable RLS
alter table public.events enable row level security;



