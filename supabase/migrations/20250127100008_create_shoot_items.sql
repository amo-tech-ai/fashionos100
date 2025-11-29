-- ============================================================================
-- Migration: Create Shoot Items Table
-- Purpose: Individual items/garments to be shot in a shoot booking
-- Affected: public.shoot_items table
-- Dependencies: public.shoots, shot_style_type, talent_type enums
-- ============================================================================

-- Shoot items: Individual items/garments in a shoot
create table public.shoot_items (
  id uuid default uuid_generate_v4() primary key,
  shoot_id uuid references public.shoots(id) on delete cascade not null,
  item_number integer not null,
  description text not null,
  special_instructions text,
  shot_styles shot_style_type[] default '{}',
  talent_type talent_type default 'none' not null,
  created_at timestamptz default now() not null,
  
  -- Constraints
  constraint shoot_items_item_number_check check (item_number > 0),
  unique(shoot_id, item_number)
);
comment on table public.shoot_items is 'Individual items/garments to be shot in a shoot booking';

-- Enable RLS
alter table public.shoot_items enable row level security;



