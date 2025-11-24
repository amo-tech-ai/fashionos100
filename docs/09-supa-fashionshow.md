
# 🗄️ Supabase Schema: Fashion Show Planner (Advanced)

**Module:** FashionOS Event Production  
**Database:** PostgreSQL (Supabase)  
**Version:** 2.0 (Expanded for Casting, Venues, & Logistics)

---

## 1. 🏗️ Architecture Overview

This schema transforms the simple event planner into a **comprehensive production operating system**. It handles the complex web of logistics required for a runway show: managing **Venues**, casting **Models**, tracking **Sponsors**, and scheduling **Rehearsals** down to the minute.

### Core Modules
1.  **Event Core:** The central hub (Events, Phases, Tasks).
2.  **CRM & Stakeholders:** Global directory of People (Stakeholders), Brands, Agencies, and Teams.
3.  **Casting & Talent:** Specialized data for Models (Measurements, Agencies) and Designers.
4.  **Logistics & Venues:** Physical space management and availability tracking.
5.  **Scheduling:** Granular timeline (Run of Show, Rehearsals, Call Times) + Conflict Detection.
6.  **Business:** Sponsorships and deliverables.

### Security Model (RLS)
*   **Creators/Admins:** Full access to their own "Universe" (Events, CRM, Assets).
*   **Production Team:** Read/Write access granted via `event_stakeholders` or `organizer_team_members`.
*   **Talent (Read-Only):** Models/Designers can only see their specific `call_times` and `schedule` (future scope).

---

## 2. 🛠️ SQL Definition (DDL)

Copy and paste the following into the Supabase SQL Editor.

### I. Enums & Custom Types

```sql
-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- 1. Core Statuses
create type event_status as enum ('draft', 'planning', 'locked', 'live', 'completed', 'cancelled');
create type phase_status as enum ('not_started', 'in_progress', 'blocked', 'completed');
create type task_status as enum ('todo', 'in_progress', 'review', 'done');
create type task_priority as enum ('low', 'medium', 'high', 'critical');

-- 2. Stakeholder & Roles
create type stakeholder_role_enum as enum (
  'designer', 'producer', 'model', 'model_agency', 
  'hmu_lead', 'stylist', 'backstage_crew', 
  'venue_manager', 'lighting_sound', 
  'sponsor', 'pr_agent', 'photographer', 'videographer',
  'volunteer', 'security', 'guest', 'other'
);

-- 3. Logistics Types
create type venue_type as enum ('runway', 'gallery', 'hotel', 'warehouse', 'rooftop', 'outdoor', 'studio', 'other');
create type indoor_outdoor as enum ('indoor', 'outdoor', 'mixed');
create type availability_status as enum ('available', 'reserved', 'booked', 'conflict', 'travel', 'maintenance', 'not_available');

-- 4. Commercial Types
create type sponsor_level as enum ('title', 'gold', 'silver', 'partner', 'in_kind');
create type brand_type as enum ('couture', 'streetwear', 'bridal', 'swim', 'rtw', 'avant_garde', 'menswear');
create type organizer_type as enum ('agency', 'production_house', 'freelance_collective', 'internal');

-- 5. Scheduling Types
create type schedule_type as enum ('rehearsal', 'fitting', 'hair_makeup', 'call_time', 'runway_show', 'sponsor_activation', 'vip_reception', 'teardown', 'photo_call');
create type rehearsal_type as enum ('full_run', 'lighting_test', 'sound_check', 'walk_practice', 'tech_run');
```

### II. Core Event & Planning Tables

```sql
-- 1. PROFILES (Extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamptz
);

-- 2. ORGANIZER TEAMS (Agencies/Production Houses)
create table organizer_teams (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id),
  name text not null,
  type organizer_type default 'freelance_collective',
  website_url text,
  contact_email text,
  contact_phone text,
  created_at timestamptz default now()
);

-- 3. VENUES
create table venues (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id), -- Private venue database
  name text not null,
  type venue_type,
  address text,
  city text,
  country text,
  capacity int,
  indoor_outdoor indoor_outdoor default 'indoor',
  contact_name text,
  contact_email text,
  contact_phone text,
  notes text,
  created_at timestamptz default now()
);

-- 4. EVENTS
create table events (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id) not null,
  organizer_team_id uuid references organizer_teams(id),
  venue_id uuid references venues(id),
  
  title text not null,
  description text,
  event_type text default 'runway',
  
  status event_status default 'draft',
  
  event_date date,
  start_time time,
  end_time time,
  
  cover_image_url text,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. EVENT PHASES (Timeline)
create table event_phases (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade not null,
  name text not null,
  description text,
  order_index integer not null,
  status phase_status default 'not_started',
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now()
);
```

### III. Stakeholders & CRM Tables

```sql
-- 6. STAKEHOLDERS (Global Contact List)
create table stakeholders (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id),
  name text not null,
  role stakeholder_role_enum not null,
  email text,
  phone text,
  instagram_handle text,
  notes text,
  linked_user_id uuid references auth.users(id), -- If they have app access
  created_at timestamptz default now()
);

-- 7. SPONSOR ORGANIZATIONS
create table sponsor_organizations (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id),
  name text not null,
  category text, -- beauty, tech, etc.
  logo_url text,
  website_url text,
  primary_contact_name text,
  primary_contact_email text,
  primary_contact_phone text,
  notes text,
  created_at timestamptz default now()
);

-- 8. FASHION BRANDS
create table fashion_brands (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id),
  name text not null,
  brand_type brand_type,
  logo_url text,
  website_url text,
  instagram_handle text,
  bio text,
  country text,
  created_at timestamptz default now()
);

-- 9. MODEL AGENCIES
create table model_agencies (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references auth.users(id),
  name text not null,
  city text,
  country text,
  contact_email text,
  contact_phone text,
  notes text,
  created_at timestamptz default now()
);
```

### IV. Detailed Profile Tables (Casting & Production)

```sql
-- 10. DESIGNER PROFILES
create table designer_profiles (
  id uuid default uuid_generate_v4() primary key,
  brand_id uuid references fashion_brands(id) on delete cascade,
  user_id uuid references auth.users(id), -- Optional link
  full_name text not null,
  role text default 'head_designer',
  bio text,
  created_at timestamptz default now()
);

-- 11. MODEL PROFILES
create table model_profiles (
  id uuid default uuid_generate_v4() primary key,
  stakeholder_id uuid references stakeholders(id) on delete set null, -- Link to base contact
  agency_id uuid references model_agencies(id),
  full_name text not null,
  height_cm int,
  bust int,
  waist int,
  hips int,
  shoe_size text,
  polaroid_url text,
  portfolio_url text,
  instagram_handle text,
  notes text,
  created_at timestamptz default now()
);

-- 12. ORGANIZER TEAM MEMBERS
create table organizer_team_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references organizer_teams(id) on delete cascade,
  user_id uuid references auth.users(id),
  stakeholder_id uuid references stakeholders(id),
  role_in_team text, -- producer, assistant
  created_at timestamptz default now()
);
```

### V. Event Assignments (Many-to-Many)

```sql
-- 13. EVENT STAKEHOLDERS (General Crew)
create table event_stakeholders (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  stakeholder_id uuid references stakeholders(id) on delete cascade,
  is_primary_contact boolean default false,
  custom_role_label text,
  unique(event_id, stakeholder_id)
);

-- 14. EVENT SPONSORS
create table event_sponsors (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  sponsor_id uuid references sponsor_organizations(id) on delete cascade,
  sponsor_level sponsor_level default 'partner',
  cash_value numeric,
  in_kind_value numeric,
  deliverables jsonb, -- Checklist of obligations
  contract_status text default 'draft',
  created_at timestamptz default now()
);

-- 15. EVENT DESIGNERS (Who is showing?)
create table event_designers (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  designer_id uuid references designer_profiles(id),
  brand_id uuid references fashion_brands(id),
  is_primary_designer boolean default true,
  created_at timestamptz default now()
);

-- 16. EVENT MODELS (Casting Sheet)
create table event_models (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  model_id uuid references model_profiles(id) on delete cascade,
  look_count int default 1,
  is_opening boolean default false,
  is_closing boolean default false,
  fitting_status text default 'pending', -- pending, fitted, alterations
  created_at timestamptz default now()
);
```

### VI. Work & Scheduling Tables

```sql
-- 17. TASKS
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  phase_id uuid references event_phases(id),
  created_by uuid references auth.users(id),
  title text not null,
  description text,
  status task_status default 'todo',
  priority task_priority default 'medium',
  due_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 18. TASK ASSIGNEES
create table task_assignees (
  id uuid default uuid_generate_v4() primary key,
  task_id uuid references tasks(id) on delete cascade,
  stakeholder_id uuid references stakeholders(id) on delete cascade,
  assigned_at timestamptz default now(),
  unique(task_id, stakeholder_id)
);

-- 19. EVENT SCHEDULE (Master Run of Show)
create table event_schedule (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  schedule_type schedule_type not null,
  title text not null,
  description text,
  date date not null,
  start_time time not null,
  end_time time,
  location text,
  
  -- Optional Links for Context
  stakeholder_id uuid references stakeholders(id),
  model_id uuid references model_profiles(id),
  designer_id uuid references designer_profiles(id),
  
  notes text,
  created_at timestamptz default now()
);

-- 20. EVENT REHEARSALS (Detailed Tech Run)
create table event_rehearsals (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  rehearsal_type rehearsal_type default 'walk_practice',
  date date not null,
  start_time time not null,
  end_time time,
  required_models int,
  required_designers int,
  required_crew int,
  rehearsal_lead_id uuid references stakeholders(id),
  notes text,
  created_at timestamptz default now()
);

-- 21. CALL TIMES (Individual Notifications)
create table call_times (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  
  -- Target Person
  stakeholder_id uuid references stakeholders(id),
  model_id uuid references model_profiles(id),
  designer_id uuid references designer_profiles(id),
  
  role text, -- Override role for this specific call
  date date not null,
  time time not null,
  location text,
  notes text,
  created_at timestamptz default now()
);
```

### VII. Availability & Conflict Management

```sql
-- 22. VENUE AVAILABILITY
create table venue_availability (
  id uuid default uuid_generate_v4() primary key,
  venue_id uuid references venues(id) on delete cascade,
  date date not null,
  start_time time,
  end_time time,
  status availability_status default 'available',
  notes text,
  created_at timestamptz default now()
);

-- 23. MODEL AVAILABILITY
create table model_availability (
  id uuid default uuid_generate_v4() primary key,
  model_id uuid references model_profiles(id) on delete cascade,
  date date not null,
  start_time time,
  end_time time,
  status availability_status default 'available',
  related_event_id uuid references events(id), -- If booked for an event
  notes text,
  created_at timestamptz default now()
);

-- 24. DESIGNER AVAILABILITY
create table designer_availability (
  id uuid default uuid_generate_v4() primary key,
  designer_id uuid references designer_profiles(id) on delete cascade,
  date date not null,
  start_time time,
  end_time time,
  status availability_status default 'available',
  related_event_id uuid references events(id),
  notes text,
  created_at timestamptz default now()
);
```

---

## 3. 🛡️ RLS Policies (Multi-Tenant Strategy)

**Philosophy:** Data is "owned" by the Creator (`created_by`). Others can view/edit if they are explicitly assigned to the Event or Team.

```sql
-- Enable RLS on all new tables
alter table venues enable row level security;
alter table organizer_teams enable row level security;
alter table model_profiles enable row level security;
alter table event_models enable row level security;
-- ... repeat for all 24 tables

-- POLICY EXAMPLE 1: Venues
-- Creators see their own venues. 
-- Members of an event using the venue can READ it.
create policy "Creators manage own venues"
  on venues for all using (auth.uid() = created_by);

create policy "Event team sees venue"
  on venues for select
  using (
    exists (
      select 1 from events e
      join event_stakeholders es on e.id = es.event_id
      join stakeholders s on es.stakeholder_id = s.id
      where e.venue_id = venues.id
      and s.linked_user_id = auth.uid()
    )
  );

-- POLICY EXAMPLE 2: Casting (Models)
-- Casting Directors (Creators) see full model data.
create policy "Creators manage models"
  on model_profiles for all using (auth.uid() = (select created_by from stakeholders where id = model_profiles.stakeholder_id));

-- POLICY EXAMPLE 3: Event Access
-- If you are in 'event_stakeholders' linked to your auth.uid(), you get access to the event's sub-tables.
create policy "Team access to event schedule"
  on event_schedule for select
  using (
    exists (
      select 1 from event_stakeholders es
      join stakeholders s on es.stakeholder_id = s.id
      where es.event_id = event_schedule.event_id
      and s.linked_user_id = auth.uid()
    )
  );
```

---

## 4. ⚡ Indexes for Performance

Ensure the mobile app feels native-fast by indexing foreign keys and common query columns.

```sql
-- Events & Logistics
create index idx_events_venue on events(venue_id);
create index idx_events_team on events(organizer_team_id);
create index idx_schedule_event on event_schedule(event_id);
create index idx_schedule_date on event_schedule(date);

-- Casting
create index idx_model_agency on model_profiles(agency_id);
create index idx_event_models_event on event_models(event_id);
create index idx_event_models_model on event_models(model_id);

-- Availability (Range Queries)
create index idx_venue_avail_date on venue_availability(date);
create index idx_model_avail_date on model_availability(date);
create index idx_designer_avail_date on designer_availability(date);
```

---

## 5. 🔄 Advanced Logic & Edge Functions

### Conflict Detection View (SQL)
A virtual table to instantly spot double-bookings.

```sql
create or replace view casting_conflicts as
select 
  em.event_id,
  em.model_id,
  mp.full_name as model_name,
  e.title as event_name,
  e.event_date,
  ma.status as availability_status
from event_models em
join events e on em.event_id = e.id
join model_profiles mp on em.model_id = mp.id
left join model_availability ma on ma.model_id = em.model_id and ma.date = e.event_date
where ma.status in ('booked', 'conflict', 'not_available')
and ma.related_event_id != e.id; -- Ignore if booked for *this* event
```

### Edge Functions (TypeScript)

1.  **`check-availability`**:
    *   Input: `resource_type` (model/venue), `id`, `date`, `time_range`.
    *   Logic: Queries `*_availability` tables + `events` table to find overlaps.
    *   Output: `{ available: boolean, conflict_reason: string }`.

2.  **`auto-schedule-rehearsal`**:
    *   Input: `event_id`, `duration_minutes`.
    *   Logic: Finds a time slot where `Venue` + `Key Models` + `Designer` are all available.
    *   Output: Proposed time slots.

3.  **`generate-call-sheet`**:
    *   Input: `event_id`.
    *   Logic: Aggregates `event_schedule`, `call_times`, and `location` data.
    *   Output: PDF or HTML formatted call sheet for distribution.

---

## 6. Final Checklist

- [ ] **Run DDL:** Create all 24 tables and Enums.
- [ ] **Enable RLS:** Apply policies to ensure multi-tenant safety.
- [ ] **Create Indexes:** Optimize for date-range lookups.
- [ ] **Deploy Functions:** Setup `check-availability` on Supabase Edge Functions.
- [ ] **Seed Data:** Create a few dummy Venues and Models for testing.
