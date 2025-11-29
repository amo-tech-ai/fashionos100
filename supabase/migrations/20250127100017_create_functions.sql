-- ============================================================================
-- Migration: Create Database Functions
-- Purpose: Reusable database functions for common operations
-- Affected: Database functions
-- Dependencies: All tables must exist
-- ============================================================================

-- Function: Get user's shoots with status filter
create or replace function public.get_user_shoots(
  user_id uuid,
  status_filter shoot_status default null
)
returns table (
  id uuid,
  shoot_type shoot_service_type,
  fashion_category text,
  status shoot_status,
  scheduled_start timestamptz,
  estimated_price integer,
  studio_name text,
  created_at timestamptz
)
language plpgsql
security invoker
set search_path = ''
stable
as $$
begin
  return query
  select
    s.id,
    s.shoot_type,
    s.fashion_category,
    s.status,
    s.scheduled_start,
    s.estimated_price,
    st.name as studio_name,
    s.created_at
  from public.shoots s
  left join public.studios st on s.studio_id = st.id
  where s.designer_id = get_user_shoots.user_id
    and (get_user_shoots.status_filter is null or s.status = get_user_shoots.status_filter)
  order by s.created_at desc;
end;
$$;
comment on function public.get_user_shoots(uuid, shoot_status) is 'Get all shoots for a user, optionally filtered by status';

-- Function: Calculate shoot price based on parameters
create or replace function public.calculate_shoot_price(
  p_shoot_type shoot_service_type,
  p_looks_count integer,
  p_location_mode location_mode,
  p_distribution_channels distribution_channel[]
)
returns integer
language plpgsql
security invoker
set search_path = ''
immutable
as $$
declare
  base_price integer := 0;
  looks_multiplier numeric := 1.0;
  location_multiplier numeric := 1.0;
  channel_multiplier numeric := 1.0;
begin
  -- Base prices by shoot type
  case p_shoot_type
    when 'photo' then base_price := 500;
    when 'video' then base_price := 1000;
    when 'hybrid' then base_price := 1200;
  end case;
  
  -- Looks multiplier (bulk discount)
  if p_looks_count > 10 then
    looks_multiplier := 0.85;
  elsif p_looks_count > 5 then
    looks_multiplier := 0.90;
  end if;
  
  -- Location multiplier
  if p_location_mode = 'virtual' then
    location_multiplier := 0.75;
  end if;
  
  -- Channel multiplier (more channels = higher price)
  if array_length(p_distribution_channels, 1) > 5 then
    channel_multiplier := 1.15;
  elsif array_length(p_distribution_channels, 1) > 3 then
    channel_multiplier := 1.10;
  end if;
  
  return round(base_price * p_looks_count * looks_multiplier * location_multiplier * channel_multiplier);
end;
$$;
comment on function public.calculate_shoot_price(shoot_service_type, integer, location_mode, distribution_channel[]) is 'Calculate estimated price for a shoot based on parameters';

-- Function: Get event registration count
create or replace function public.get_event_registration_count(
  p_event_id uuid
)
returns integer
language plpgsql
security invoker
set search_path = ''
stable
as $$
declare
  reg_count integer;
begin
  select count(*)
  into reg_count
  from public.event_registrations
  where event_id = p_event_id
    and status in ('registered', 'checked_in');
  
  return coalesce(reg_count, 0);
end;
$$;
comment on function public.get_event_registration_count(uuid) is 'Get count of active registrations for an event';



