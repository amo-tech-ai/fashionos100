-- ============================================================================
-- Migration: Create Event Registrations Table
-- Purpose: Event registrations/RSVPs linking users to events
-- Affected: public.event_registrations table
-- Dependencies: public.events, public.profiles, registration_type, registration_status enums
-- ============================================================================

-- Event registrations: RSVPs and attendee management
create table public.event_registrations (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete restrict,
  
  -- Registration details
  type registration_type default 'general' not null,
  status registration_status default 'registered' not null,
  qr_code_data text,
  checked_in_at timestamptz,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  unique(event_id, profile_id)
);
comment on table public.event_registrations is 'Event registrations/RSVPs linking users to events';

-- Enable RLS
alter table public.event_registrations enable row level security;



