-- ============================================================================
-- Migration: Create Organizations Table
-- Purpose: Organizations that can have multiple users (studios, agencies, brands)
-- Affected: public.organizations table
-- Dependencies: None
-- ============================================================================

-- Organizations: Optional for multi-user brands/studios
create table public.organizations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  type text check (type in ('studio', 'agency', 'brand')) not null,
  description text,
  website_url text,
  logo_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  
  -- Constraints
  constraint organizations_name_check check (char_length(name) > 0),
  constraint organizations_slug_check check (slug ~ '^[a-z0-9-]+$')
);
comment on table public.organizations is 'Organizations that can have multiple users (studios, agencies, brands)';

-- Enable RLS
alter table public.organizations enable row level security;



