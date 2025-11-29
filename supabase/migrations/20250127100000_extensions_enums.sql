-- ============================================================================
-- Migration: Extensions and Enums
-- Purpose: Enable required extensions and define all enum types for FashionOS
-- Affected: Extensions, Enum types
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Enable pg_trgm for fuzzy text search (useful for search functionality)
create extension if not exists "pg_trgm";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User roles in the system
create type user_role as enum (
  'designer',
  'studio_admin',
  'organizer',
  'photographer',
  'model',
  'attendee',
  'admin'
);
comment on type user_role is 'User roles in the FashionOS platform';

-- Shoot service types
create type shoot_service_type as enum ('photo', 'video', 'hybrid');
comment on type shoot_service_type is 'Type of shoot service requested';

-- Shoot status lifecycle
create type shoot_status as enum (
  'draft',
  'ready_for_payment',
  'confirmed',
  'shooting',
  'editing',
  'delivered',
  'cancelled'
);
comment on type shoot_status is 'Lifecycle status of a shoot booking';

-- Location types for shoots
create type location_mode as enum ('virtual', 'studio', 'hybrid');
comment on type location_mode is 'Location type for shoot execution';

-- Payment status
create type payment_status as enum ('pending', 'paid', 'refunded', 'failed');
comment on type payment_status is 'Status of payment transactions';

-- Asset types
create type asset_type as enum ('image', 'video', 'document');
comment on type asset_type is 'Type of media asset';

-- Distribution channels for shoots
create type distribution_channel as enum (
  'instagram_feed',
  'instagram_reels',
  'instagram_stories',
  'tiktok',
  'youtube',
  'amazon_listing',
  'shopify_pdp',
  'facebook',
  'pinterest',
  'email_campaign',
  'print'
);
comment on type distribution_channel is 'Channels where shoot assets will be used';

-- Shot style types
create type shot_style_type as enum (
  'packshot',
  'flat_lay',
  'on_model',
  'lifestyle',
  'detail',
  'creative_splash',
  'editorial',
  'beauty'
);
comment on type shot_style_type is 'Visual style of individual shots';

-- Talent types
create type talent_type as enum ('hand', 'full_body', 'pet', 'none');
comment on type talent_type is 'Type of talent/model required';

-- Event types
create type event_type as enum (
  'runway_show',
  'presentation',
  'pop_up',
  'trunk_show',
  'workshop',
  'networking',
  'party'
);
comment on type event_type is 'Type of fashion event';

-- Event status lifecycle
create type event_status as enum (
  'draft',
  'published',
  'live',
  'completed',
  'cancelled'
);
comment on type event_status is 'Lifecycle status of an event';

-- Registration status
create type registration_status as enum (
  'registered',
  'waitlist',
  'checked_in',
  'cancelled',
  'no_show'
);
comment on type registration_status is 'Status of event registration';

-- Registration types
create type registration_type as enum ('general', 'vip', 'media', 'buyer', 'staff');
comment on type registration_type is 'Type of event registration';

-- Season types for collections
create type season_type as enum (
  'ss',
  'aw',
  'resort',
  'pre_fall',
  'bridal',
  'capsule'
);
comment on type season_type is 'Fashion season classification';



