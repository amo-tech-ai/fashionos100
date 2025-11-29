-- ============================================================================
-- Migration: Create Collections Table
-- Purpose: Fashion collections grouping looks by season and year
-- Affected: public.collections table
-- Dependencies: public.designer_profiles, season_type enum
-- ============================================================================

-- Collections: Grouping of looks (e.g., "Spring/Summer 2025")
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  designer_profile_id uuid references public.designer_profiles(id) on delete cascade not null,
  name text not null,
  season season_type not null,
  year integer not null,
  theme text,
  lookbook_url text,
  is_public boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  constraint collections_name_check check (char_length(name) > 0),
  constraint collections_year_check check (year >= 2000 and year <= 2100)
);
comment on table public.collections is 'Fashion collections grouping looks by season and year';

-- Enable RLS
alter table public.collections enable row level security;



