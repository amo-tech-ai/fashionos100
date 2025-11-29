-- ============================================================================
-- Migration: Create Indexes
-- Purpose: Performance indexes for all tables
-- Affected: All tables (indexes only)
-- Dependencies: All tables must exist
-- ============================================================================

-- Profiles indexes
create index idx_profiles_role on public.profiles(role);
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_created_at on public.profiles(created_at desc);

-- Designer profiles indexes
create index idx_designer_profiles_owner on public.designer_profiles(owner_profile_id);
create index idx_designer_profiles_slug on public.designer_profiles(slug);
create index idx_designer_profiles_public on public.designer_profiles(is_public) where is_public = true;
create index idx_designer_profiles_city on public.designer_profiles(city);
create index idx_designer_profiles_tags on public.designer_profiles using gin(aesthetic_tags);

-- Collections indexes
create index idx_collections_designer on public.collections(designer_profile_id);
create index idx_collections_season_year on public.collections(season, year desc);
create index idx_collections_public on public.collections(is_public) where is_public = true;

-- Looks indexes
create index idx_looks_collection on public.looks(collection_id);
create index idx_looks_category on public.looks(category);

-- Studios indexes
create index idx_studios_city on public.studios(city);
create index idx_studios_active on public.studios(is_active) where is_active = true;
create index idx_studios_slug on public.studios(slug);

-- Shoots indexes
create index idx_shoots_designer on public.shoots(designer_id);
create index idx_shoots_studio on public.shoots(studio_id);
create index idx_shoots_status on public.shoots(status);
create index idx_shoots_scheduled_start on public.shoots(scheduled_start) where scheduled_start is not null;
create index idx_shoots_created_at on public.shoots(created_at desc);
create index idx_shoots_designer_status on public.shoots(designer_id, status);
create index idx_shoots_studio_scheduled on public.shoots(studio_id, scheduled_start) where scheduled_start is not null;

-- Shoot items indexes
create index idx_shoot_items_shoot on public.shoot_items(shoot_id);

-- Payments indexes
create index idx_payments_shoot on public.payments(shoot_id);
create index idx_payments_designer on public.payments(designer_id);
create index idx_payments_status on public.payments(status);
create index idx_payments_provider_id on public.payments(provider_payment_id) where provider_payment_id is not null;
create index idx_payments_created_at on public.payments(created_at desc);

-- Assets indexes
create index idx_assets_shoot on public.assets(shoot_id);
create index idx_assets_type on public.assets(asset_type);
create index idx_assets_status on public.assets(status);
create index idx_assets_tags on public.assets using gin(tags);

-- Venues indexes
create index idx_venues_city on public.venues(city);

-- Events indexes
create index idx_events_organizer on public.events(organizer_id);
create index idx_events_venue on public.events(venue_id);
create index idx_events_status on public.events(status);
create index idx_events_start_time on public.events(start_time);
create index idx_events_public on public.events(is_public, start_time) where is_public = true;
create index idx_events_type_status on public.events(event_type, status);
create index idx_events_slug on public.events(slug) where slug is not null;

-- Event registrations indexes
create index idx_event_registrations_event on public.event_registrations(event_id);
create index idx_event_registrations_profile on public.event_registrations(profile_id);
create index idx_event_registrations_status on public.event_registrations(status);
create index idx_event_registrations_event_status on public.event_registrations(event_id, status);

-- Event designers indexes
create index idx_event_designers_event on public.event_designers(event_id);
create index idx_event_designers_designer on public.event_designers(designer_profile_id);



