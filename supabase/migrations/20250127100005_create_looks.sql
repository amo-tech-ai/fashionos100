-- ============================================================================
-- Migration: Create Looks Table
-- Purpose: Individual fashion looks/outfits within a collection
-- Affected: public.looks table
-- Dependencies: public.collections
-- ============================================================================

-- Looks: Individual outfits/items in a collection
create table public.looks (
  id uuid default uuid_generate_v4() primary key,
  collection_id uuid references public.collections(id) on delete cascade not null,
  look_number integer,
  name text,
  category text,
  description text,
  image_url text,
  product_links jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
comment on table public.looks is 'Individual fashion looks/outfits within a collection';

-- Enable RLS
alter table public.looks enable row level security;



