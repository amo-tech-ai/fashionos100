-- ============================================================================
-- Migration: Create RLS Policies
-- Purpose: Row-level security policies for all tables
-- Affected: All tables (RLS policies)
-- Dependencies: All tables must exist
-- Note: Policies are granular - one policy per operation per role
-- ============================================================================

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Anonymous users can view profiles
create policy "anon_select_profiles"
  on public.profiles for select
  to anon
  using (true);

-- Authenticated users can view all profiles
create policy "authenticated_select_profiles"
  on public.profiles for select
  to authenticated
  using (true);

-- Users can update their own profile
create policy "authenticated_update_own_profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users can insert their own profile (via trigger)
create policy "authenticated_insert_own_profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- ============================================================================
-- DESIGNER PROFILES POLICIES
-- ============================================================================

-- Anonymous users can view public designer profiles
create policy "anon_select_public_designer_profiles"
  on public.designer_profiles for select
  to anon
  using (is_public = true);

-- Authenticated users can view public profiles and their own
create policy "authenticated_select_designer_profiles"
  on public.designer_profiles for select
  to authenticated
  using (is_public = true or owner_profile_id = auth.uid());

-- Owners can insert their own designer profiles
create policy "authenticated_insert_own_designer_profile"
  on public.designer_profiles for insert
  to authenticated
  with check (owner_profile_id = auth.uid());

-- Owners can update their own designer profiles
create policy "authenticated_update_own_designer_profile"
  on public.designer_profiles for update
  to authenticated
  using (owner_profile_id = auth.uid())
  with check (owner_profile_id = auth.uid());

-- ============================================================================
-- COLLECTIONS POLICIES
-- ============================================================================

-- Anonymous users can view public collections
create policy "anon_select_public_collections"
  on public.collections for select
  to anon
  using (is_public = true);

-- Authenticated users can view public collections and their own
create policy "authenticated_select_collections"
  on public.collections for select
  to authenticated
  using (
    is_public = true
    or exists (
      select 1 from public.designer_profiles
      where designer_profiles.id = collections.designer_profile_id
        and designer_profiles.owner_profile_id = auth.uid()
    )
  );

-- Owners can insert collections
create policy "authenticated_insert_own_collections"
  on public.collections for insert
  to authenticated
  with check (
    exists (
      select 1 from public.designer_profiles
      where designer_profiles.id = collections.designer_profile_id
        and designer_profiles.owner_profile_id = auth.uid()
    )
  );

-- Owners can update their collections
create policy "authenticated_update_own_collections"
  on public.collections for update
  to authenticated
  using (
    exists (
      select 1 from public.designer_profiles
      where designer_profiles.id = collections.designer_profile_id
        and designer_profiles.owner_profile_id = auth.uid()
    )
  );

-- ============================================================================
-- SHOOTS POLICIES
-- ============================================================================

-- Designers can view their own shoots
create policy "authenticated_select_own_shoots"
  on public.shoots for select
  to authenticated
  using (designer_id = auth.uid());

-- Studio admins can view shoots for their studios (if studio_id is set)
create policy "authenticated_select_studio_shoots"
  on public.shoots for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
        and profiles.role = 'studio_admin'
        and shoots.studio_id is not null
    )
  );

-- Designers can insert their own shoots
create policy "authenticated_insert_own_shoots"
  on public.shoots for insert
  to authenticated
  with check (designer_id = auth.uid());

-- Designers can update their own shoots
create policy "authenticated_update_own_shoots"
  on public.shoots for update
  to authenticated
  using (designer_id = auth.uid())
  with check (designer_id = auth.uid());

-- ============================================================================
-- SHOOT ITEMS POLICIES
-- ============================================================================

-- Users can view shoot items for shoots they have access to
create policy "authenticated_select_shoot_items"
  on public.shoot_items for select
  to authenticated
  using (
    exists (
      select 1 from public.shoots
      where shoots.id = shoot_items.shoot_id
        and (shoots.designer_id = auth.uid() or shoots.studio_id is not null)
    )
  );

-- Designers can insert items for their shoots
create policy "authenticated_insert_shoot_items"
  on public.shoot_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.shoots
      where shoots.id = shoot_items.shoot_id
        and shoots.designer_id = auth.uid()
    )
  );

-- ============================================================================
-- PAYMENTS POLICIES
-- ============================================================================

-- Users can view their own payments
create policy "authenticated_select_own_payments"
  on public.payments for select
  to authenticated
  using (designer_id = auth.uid());

-- Users can insert payments for their shoots
create policy "authenticated_insert_own_payments"
  on public.payments for insert
  to authenticated
  with check (designer_id = auth.uid());

-- ============================================================================
-- ASSETS POLICIES
-- ============================================================================

-- Users can view assets for shoots they have access to
create policy "authenticated_select_assets"
  on public.assets for select
  to authenticated
  using (
    exists (
      select 1 from public.shoots
      where shoots.id = assets.shoot_id
        and (shoots.designer_id = auth.uid() or shoots.studio_id is not null)
    )
  );

-- ============================================================================
-- EVENTS POLICIES
-- ============================================================================

-- Anonymous users can view published events
create policy "anon_select_published_events"
  on public.events for select
  to anon
  using (is_public = true and status in ('published', 'live', 'completed'));

-- Authenticated users can view published events and their own
create policy "authenticated_select_events"
  on public.events for select
  to authenticated
  using (
    is_public = true and status in ('published', 'live', 'completed')
    or organizer_id = auth.uid()
  );

-- Organizers can insert events
create policy "authenticated_insert_own_events"
  on public.events for insert
  to authenticated
  with check (organizer_id = auth.uid());

-- Organizers can update their events
create policy "authenticated_update_own_events"
  on public.events for update
  to authenticated
  using (organizer_id = auth.uid())
  with check (organizer_id = auth.uid());

-- ============================================================================
-- EVENT REGISTRATIONS POLICIES
-- ============================================================================

-- Users can view their own registrations
create policy "authenticated_select_own_registrations"
  on public.event_registrations for select
  to authenticated
  using (profile_id = auth.uid());

-- Organizers can view registrations for their events
create policy "authenticated_select_event_registrations"
  on public.event_registrations for select
  to authenticated
  using (
    exists (
      select 1 from public.events
      where events.id = event_registrations.event_id
        and events.organizer_id = auth.uid()
    )
  );

-- Users can insert their own registrations
create policy "authenticated_insert_own_registrations"
  on public.event_registrations for insert
  to authenticated
  with check (profile_id = auth.uid());

-- Users can update their own registrations
create policy "authenticated_update_own_registrations"
  on public.event_registrations for update
  to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());



