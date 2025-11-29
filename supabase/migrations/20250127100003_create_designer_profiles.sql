-- ============================================================================
-- Migration: Create Designer Profiles Table
-- Purpose: Public-facing designer/brand profiles in the fashion directory
-- Affected: public.designer_profiles table
-- Dependencies: public.profiles
-- ============================================================================

-- Designer profiles: Public-facing brand/designer pages
create table public.designer_profiles (
  id uuid default uuid_generate_v4() primary key,
  owner_profile_id uuid references public.profiles(id) on delete cascade not null,
  display_name text not null,
  slug text unique not null,
  bio text,
  website_url text,
  instagram_handle text,
  city text,
  country text,
  aesthetic_tags text[] default '{}',
  is_public boolean default false not null,
  featured_image_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  constraint designer_profiles_display_name_check check (char_length(display_name) > 0),
  constraint designer_profiles_slug_check check (slug ~ '^[a-z0-9-]+$')
);
comment on table public.designer_profiles is 'Public-facing designer/brand profiles in the fashion directory';

-- Enable RLS
alter table public.designer_profiles enable row level security;



