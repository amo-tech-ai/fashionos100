-- ============================================================================
-- Migration: Create Triggers
-- Purpose: Automatic updated_at timestamp management for all tables
-- Affected: All tables with updated_at column
-- Dependencies: All tables must exist
-- ============================================================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
comment on function public.handle_updated_at() is 'Trigger function to automatically update updated_at timestamp';

-- Apply updated_at triggers to all tables with updated_at column
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger update_organizations_updated_at
  before update on public.organizations
  for each row
  execute function public.handle_updated_at();

create trigger update_designer_profiles_updated_at
  before update on public.designer_profiles
  for each row
  execute function public.handle_updated_at();

create trigger update_collections_updated_at
  before update on public.collections
  for each row
  execute function public.handle_updated_at();

create trigger update_looks_updated_at
  before update on public.looks
  for each row
  execute function public.handle_updated_at();

create trigger update_studios_updated_at
  before update on public.studios
  for each row
  execute function public.handle_updated_at();

create trigger update_shoots_updated_at
  before update on public.shoots
  for each row
  execute function public.handle_updated_at();

create trigger update_payments_updated_at
  before update on public.payments
  for each row
  execute function public.handle_updated_at();

create trigger update_assets_updated_at
  before update on public.assets
  for each row
  execute function public.handle_updated_at();

create trigger update_venues_updated_at
  before update on public.venues
  for each row
  execute function public.handle_updated_at();

create trigger update_events_updated_at
  before update on public.events
  for each row
  execute function public.handle_updated_at();

create trigger update_event_registrations_updated_at
  before update on public.event_registrations
  for each row
  execute function public.handle_updated_at();



