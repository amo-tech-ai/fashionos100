# 📱 FashionOS Mobile Planner Architecture

The following diagrams and prompts define the **Mobile UI Structure** for the Fashion Show Planner. This connects high-level event phases into a concrete app experience.

## 1️⃣ Mermaid Diagram — Planner UI Structure

```mermaid
graph LR
    APP[FashionOS\nFashion Show Planner (Mobile)] --> HD[Top Bar / Header]
    APP --> NAV[Bottom Navigation]
    APP --> MAIN[Main Screens]
    APP --> COPILOT[AI Copilot Panel]

    %% HEADER
    subgraph HEADER[Header]
        HD_TITLE[Screen Title]
        HD_SUB[Subtitle / Context]
        HD_CTA[Primary CTA\n(+ New Event / + Task)]
    end
    HD --> HD_TITLE
    HD --> HD_SUB
    HD --> HD_CTA

    %% BOTTOM NAV
    subgraph NAVBAR[Bottom Navigation (Mobile)]
        NAV_HOME[Home]
        NAV_TIMELINE[Timeline]
        NAV_TASKS[Tasks]
        NAV_STAKE[Stakeholders]
        NAV_MORE[More / Settings]
    end
    NAV --> NAV_HOME
    NAV --> NAV_TIMELINE
    NAV --> NAV_TASKS
    NAV --> NAV_STAKE
    NAV --> NAV_MORE

    %% MAIN SCREENS
    subgraph MAIN_SCREENS[Main Screens]
        HOME[Home / Dashboard]
        EVT[Event Detail]
        TIME[Event Timeline]
        TASKS[Task Board]
        STAKE[Stakeholders Hub]
        VENUE[Venues & Availability]
        CAST[Models & Casting]
        DES[Designers & Brands]
        SPONS[Sponsors & Partnerships]
        SCHED[Event Schedule & Call Times]
        BACK[Backstage Planner]
        ANALYTICS[Analytics / Reports]
    end
    MAIN --> HOME
    MAIN --> EVT
    MAIN --> TIME
    MAIN --> TASKS
    MAIN --> STAKE
    MAIN --> VENUE
    MAIN --> CAST
    MAIN --> DES
    MAIN --> SPONS
    MAIN --> SCHED
    MAIN --> BACK
    MAIN --> ANALYTICS

    %% HOME CONTENT
    subgraph HOME_SCREEN[Home / Dashboard]
        H_CURR[Current Event Hero Card]
        H_KPI[Overview KPIs\n(progress cards)]
        H_QUICK[Quick Links\n(Timeline, Tasks, Backstage)]
    end
    HOME --> H_CURR
    HOME --> H_KPI
    HOME --> H_QUICK

    %% TIMELINE CONTENT
    subgraph TIMELINE_SCREEN[Timeline Screen]
        T_LIST[14-Phase Timeline\nConcept → Post-Event Review]
        T_ITEM[Phase Item Card\n(status, due date, assignees)]
    end
    TIME --> T_LIST
    T_LIST --> T_ITEM

    %% TASKS CONTENT
    subgraph TASKS_SCREEN[Tasks Screen]
        TS_FILTER[Tabs\nAll / Today / This Week]
        TS_LIST[Task Cards\n(title, tag, due, status)]
        TS_NEW[+ New Task Bottom Sheet]
    end
    TASKS --> TS_FILTER
    TASKS --> TS_LIST
    TASKS --> TS_NEW

    %% STAKEHOLDERS HUB
    subgraph STAKE_SCREEN[Stakeholders Hub]
        ST_TYPES[Stakeholder Type Grid]
        ST_LIST[People List per Type]
        ST_DETAIL[Person Detail\n(contact, tasks, schedule)]
    end
    STAKE --> ST_TYPES
    STAKE --> ST_LIST
    STAKE --> ST_DETAIL

    %% STAKEHOLDER TYPES
    subgraph ST_TYPES_LIST[Stakeholder Types]
        ST_DESIGNERS[Fashion Designers / Brands]
        ST_MODELS[Models & Agencies]
        ST_HMU[Hair & Makeup]
        ST_BACKCREW[Backstage Crew]
        ST_VENUE[Venue & Production Crew]
        ST_SPONSORS[Sponsors & Brand Partners]
        ST_MEDIA[Photographers / Videographers / PR / Social / Press]
        ST_ORG[Organizers / Producer Teams]
    end
    ST_TYPES --> ST_DESIGNERS
    ST_TYPES --> ST_MODELS
    ST_TYPES --> ST_HMU
    ST_TYPES --> ST_BACKCREW
    ST_TYPES --> ST_VENUE
    ST_TYPES --> ST_SPONSORS
    ST_TYPES --> ST_MEDIA
    ST_TYPES --> ST_ORG

    %% VENUES & AVAILABILITY
    subgraph VENUE_SCREEN[Venues & Availability]
        V_LIST[Venue List]
        V_DETAIL[Venue Detail\n(capacity, contact)]
        V_AVAIL[Venue Availability\n(calendar)]
    end
    VENUE --> V_LIST
    VENUE --> V_DETAIL
    VENUE --> V_AVAIL

    %% MODELS & CASTING
    subgraph CAST_SCREEN[Models & Casting]
        C_MODELS[Model Directory\n(agency, measurements)]
        C_AVAIL[Model Availability\n(calendar)]
        C_ASSIGN[Event Models / Looks Assigned]
    end
    CAST --> C_MODELS
    CAST --> C_AVAIL
    CAST --> C_ASSIGN

    %% DESIGNERS & BRANDS
    subgraph DESIGNER_SCREEN[Designers & Brands]
        D_BRANDS[Brand List]
        D_PROFILES[Designer Profiles]
        D_AVAIL[Designer Availability\n(meetings, fittings)]
    end
    DES --> D_BRANDS
    DES --> D_PROFILES
    DES --> D_AVAIL

    %% SPONSORS
    subgraph SPONSOR_SCREEN[Sponsors & Partnerships]
        SP_LIST[Sponsor Organizations]
        SP_EVENT[Event Sponsors\n(levels, value)]
        SP_DELIV[Deliverables & Activations]
    end
    SPONS --> SP_LIST
    SPONS --> SP_EVENT
    SPONS --> SP_DELIV

    %% SCHEDULE & CALL TIMES
    subgraph SCHEDULE_SCREEN[Event Schedule / Calendar]
        SCH_MASTER[Event Master Schedule\n(rehearsals, fittings, showtime)]
        SCH_REH[Rehearsals]
        SCH_CALL[Call Times\n(models, HMU, crew)]
    end
    SCHED --> SCH_MASTER
    SCHED --> SCH_REH
    SCHED --> SCH_CALL

    %% BACKSTAGE
    subgraph BACKSTAGE_SCREEN[Backstage Planner]
        B_CALL[Backstage Call List]
        B_LOOKS[Look Sequence & Quick Changes]
        B_ACCESS[Accessories Checklist]
        B_NOTES[Backstage Notes]
    end
    BACK --> B_CALL
    BACK --> B_LOOKS
    BACK --> B_ACCESS
    BACK --> B_NOTES

    %% ANALYTICS
    subgraph ANALYTICS_SCREEN[Analytics / Reports]
        A_TICKETS[Ticket & Attendance Stats]
        A_TASKS[Task Completion]
        A_SPONSORS[Sponsor Value]
        A_SOCIAL[Social / Media Reach]
    end
    ANALYTICS --> A_TICKETS
    ANALYTICS --> A_TASKS
    ANALYTICS --> A_SPONSORS
    ANALYTICS --> A_SOCIAL

    %% AI COPILOT
    subgraph COPILOT_PANEL[AI Copilot]
        CP_BTN[Ask AI Button]
        CP_SHEET[Bottom Sheet\n(prompt + quick actions)]
        CP_OUT[AI Suggestions → Tasks / Timeline / Notes]
    end
    COPILOT --> CP_BTN
    COPILOT --> CP_SHEET
    COPILOT --> CP_OUT

    %% NAV CONNECTIONS
    NAV_HOME --> HOME
    NAV_TIMELINE --> TIME
    NAV_TASKS --> TASKS
    NAV_STAKE --> STAKE
```

---

## 2️⃣ Google Studio / Gemini Prompt — “Design a Planner UI from This Flow”

Use this prompt in Google AI Studio to generate the full UI specification for the mobile app.

```md
You are a senior product UX designer.

Design a **mobile-first Fashion Show Planner UI** for FashionOS, using the following **flow, stakeholders, and screens**.

The goal:  
Help organizers, designers, venues, sponsors, and models plan a fashion show from **concept → runway → post-event review** using a clean, card-based mobile app.

====================================================
1️⃣ OVERALL STYLE
====================================================
- Aesthetic: high-fashion, editorial, modern.
- Colors: soft gradients (rose, lavender, cream), deep charcoal text.
- Components: white cards, 12–16px rounded corners, soft shadows.
- Typography: elegant serif headings + clean sans-serif for body.
- Motion: subtle, smooth transitions, gentle bottom-sheet animations.
- Layout: single-column mobile layout with bottom navigation.

====================================================
2️⃣ CORE UX STRUCTURE (SCREENS & NAV)
====================================================

Use this structure:

**Bottom Navigation (Mobile):**
- Home
- Timeline
- Tasks
- Stakeholders
- More / Settings

**Main Screens:**
- Home / Dashboard
- Event Detail
- Timeline
- Tasks
- Stakeholders Hub
- Venues & Availability
- Models & Casting
- Designers & Brands
- Sponsors & Partnerships
- Event Schedule & Call Times
- Backstage Planner
- Analytics / Reports
- AI Copilot (bottom sheet)

====================================================
3️⃣ SCREEN BY SCREEN — WHAT TO DESIGN
====================================================

### ⭐ Screen 1 — Home / Dashboard
Purpose: quick overview of the current event.

Content:
- Header:
  - Title: “Fashion Event Planner”
  - Subtext: “Plan every detail from concept to runway.”
  - CTA: **+ New Event**

- Current Event Hero Card:
  - Event name, date, location, status.
  - CTA: **Open Event**

- Overview Progress Cards:
  - Vision & Theme
  - Collection & Accessories
  - Casting & Fittings
  - Venue & Runway
  - Sponsors & Media
  - Backstage & Show Day
  Each card shows:
  - Icon
  - Short label
  - Progress bar
  - Tap to open section (Timeline, Tasks, or Backstage).

---

### ⭐ Screen 2 — Timeline
Purpose: show the 14-phase event journey.

Show a **vertical list of cards**, one per phase:
- Concept & Vision
- Budget & Stakeholders
- Collection & Accessories Prep
- Casting & Fittings
- Venue & Runway Planning
- Production & Lighting
- Sponsors & PR
- Marketing & Social Content
- Ticketing & Guests
- Backstage & HMU
- Rehearsals
- Showtime
- Content Capture
- Post-Event Review

Each phase card:
- Title
- 1–2 line description
- Status pill (Not Started / In Progress / Done)
- Due date
- Assignees (avatars from Stakeholders)

Tap → opens a **bottom sheet** to edit status, due date, and linked tasks.

---

### ⭐ Screen 3 — Tasks
Purpose: central task manager across all phases.

Design:
- Top filter tabs: All / Today / This Week.
- List of task cards:
  - Title (e.g. “Confirm venue lighting plot”)
  - Tag (Casting, Venue, Backstage, Sponsor, Content)
  - Due date
  - Status (To Do / In Progress / Blocked / Done)
  - Assignee avatar(s)

Floating CTA: **+ New Task**

Task creation bottom sheet:
- Fields:
  - Title
  - Description
  - Event
  - Timeline phase (optional)
  - Tag / category
  - Due date
  - Priority (Low/Medium/High)
  - Assignees (select stakeholders)
- Primary CTA: **Save Task**

---

### ⭐ Screen 4 — Stakeholders Hub
Purpose: see all people and teams in one place.

First view: **Stakeholder Type Grid**:
- Designers / Brands
- Models & Agencies
- Hair & Makeup
- Backstage Crew
- Venue & Production Crew
- Sponsors & Brand Partners
- Photographers / Videographers
- PR / Social Media / Press
- Organizer Teams

Each card:
- Icon / illustration
- Role name
- Tap → opens a list for that type.

Second view: **Stakeholder List**
- For each type (e.g., Models):
  - Profile photo
  - Name
  - Role / agency
  - Quick tags (confirmed / tentative / VIP)

Detail view:
- Contact info
- Linked events
- Tasks assigned
- Availability snippets (e.g., next call time).

---

### ⭐ Screen 5 — Venues & Availability
Purpose: manage venues and see when they’re free.

Design:
- Venue list:
  - Card: name, city, capacity, type (gallery, hotel, runway, etc.)
- Venue detail:
  - Address
  - Contact
  - Notes
  - Small availability calendar (availability blocks).
- Availability:
  - Visual representation of available vs booked slots.

---

### ⭐ Screen 6 — Models & Casting
Purpose: casting and model scheduling.

Design:
- Model directory:
  - Card: photo, name, agency, height, city.
- Filters: agency, gender, height range, availability.
- Model detail:
  - Measurements
  - Polaroid
  - Portfolio link
  - Availability list (date/time slots)
  - Events they’re assigned to (with look count).

---

### ⭐ Screen 7 — Designers & Brands
Purpose: designer and brand management.

Design:
- Brand list:
  - Logo, name, type (couture, streetwear, bridal, etc.), country.
- Designer profiles:
  - Name, brand, role (head designer, stylist).
- Availability:
  - Meeting slots
  - Fittings time slots

---

### ⭐ Screen 8 — Sponsors & Partnerships
Purpose: sponsorship management.

Design:
- Sponsor organization cards:
  - Logo, name, category (beauty, beverage, tech, fashion).
- Event sponsor panel:
  - Sponsor level (Title, Gold, Partner)
  - Cash value + in-kind value
  - Deliverables checklist
- CTA: **Add Sponsor**, **Log Deliverable Complete**

---

### ⭐ Screen 9 — Schedule & Call Times
Purpose: master calendar and call schedule.

Design:
- Master schedule:
  - Vertical timeline for the event day (or days).
  - Items: Fittings, Rehearsals, Runway Show, VIP Reception.
- Rehearsals section:
  - Cards: type (full run, lighting test, sound check)
  - Time, required models/designers/crew.
- Call times:
  - List of call-time cards:
    - Role (Model, HMU, Backstage, Sponsor Rep)
    - Time
    - Location
    - Notes

---

### ⭐ Screen 10 — Backstage Planner
Purpose: show day execution.

Design:
- Sections:
  - Call times summary
  - Look-by-look sequence
  - Quick-change notes
  - Accessories checklist
- Cards:
  - Look card: model, outfit, accessories, special instructions.
- Support checkboxes for done / not done.

---

### ⭐ Screen 11 — Analytics / Reports
Purpose: post-event review.

Design:
- KPIs:
  - Ticket sales
  - Attendance
  - Sponsor value
  - Social reach
  - Task completion rate
- Visuals:
  - Bar chart for sales over time
  - Pie chart for sponsors by category
  - Line chart for social impressions

---

### ⭐ AI Copilot (Bottom Sheet)
Purpose: AI assistant powered by Gemini.

Entry:
- “Ask AI Copilot” floating button.

Bottom sheet:
- Prompt input.
- Quick suggestions:
  - Generate Run-of-Show
  - Suggest Timeline
  - Draft PR Email
  - Create Social Content Plan
  - Check availability conflicts
  - Suggest model assignments

Responses:
- Display as cards with:
  - “Save as Task”
  - “Attach to Event”
  - “Copy”

====================================================
4️⃣ MOBILE UX BEST PRACTICES
====================================================
- Single-column, card-based layout.
- Large, finger-friendly tap targets.
- Use bottom sheets instead of full-screen modals.
- Maintain sticky bottom nav.
- Use consistent icon style and spacing.
- Show empty states, loading states, and error states.

====================================================
5️⃣ OUTPUT EXPECTATION
====================================================
Create:
- High-fidelity mobile UI mockups for all screens listed.
- A consistent design system (colors, typography, spacing, card styles).
- Clear navigation flow between screens.
- Visual examples of:
  - Stakeholder cards
  - Availability calendars
  - Task cards
  - Timeline phase cards
  - AI Copilot bottom sheet

Design the full **FashionOS Fashion Show Planner (Mobile)** UI now, using all the stakeholders and flows above.
```

---

## 3️⃣ React Component List (Mobile Fashion Show Planner)

Think in layers:

* **App shell & routing**
* **Global UI (navigation, layout, sheets)**
* **Screen components**
* **Shared building blocks (cards, lists, forms)**

### A. App Shell & Navigation

* `<AppRoot />`

  * Initializes Supabase client, auth, query client, theme.
  * Handles “logged in / logged out” gating.

* `<MobileLayout />`

  * Wraps all screens with:

    * Safe area
    * Header slot
    * Bottom navigation

* `<BottomNav />`

  * Tabs: Home, Timeline, Tasks, Stakeholders, More.
  * Props:

    * `currentTab`
    * `onTabChange(tabKey)`

* (Optional) `<RouteManager />` or router config

  * Defines routes for each screen component.

---

### B. Global UI & Utilities

* `<HeaderBar />`

  * Props: `title`, `subtitle?`, `primaryAction?`, `onBack?`.

* `<ScreenContainer />`

  * Standard padding, background, vertical scroll.

* `<FloatingActionButton />`

  * For `+ New Event`, `+ Task`, `Ask AI Copilot`.

* `<BottomSheet />`

  * Generic bottom-sheet/modal:

    * Used for: edit timeline phase, new task, stakeholder detail, AI Copilot.

* `<StatusPill />`

  * Variants: `not_started`, `in_progress`, `done`, `todo`, `blocked`.

* `<Avatar />`, `<AvatarGroup />`

  * For stakeholders, models, designers.

---

### C. Shared Cards & Lists

* `<EventHeroCard />`

  * Shows current event summary (name, date, location, status).

* `<ProgressCard />`

  * Title + description + progress bar.
  * Used for Home overview sections.

* `<TimelinePhaseCard />`

  * Phase name, description, status, due date, assignees.

* `<TaskCard />`

  * Title, tag, due date, assignees, status.

* `<StakeholderTypeCard />`

  * Icon + label (Designers, Models, Sponsors, etc).

* `<StakeholderListItem />`

  * Name, role, meta info.

* `<VenueCard />`, `<VenueDetail />`

* `<ModelCard />`, `<ModelDetail />`

* `<DesignerCard />`, `<BrandCard />`

* `<SponsorCard />`, `<EventSponsorCard />`

* `<ScheduleItemCard />`

  * For master schedule, rehearsals, call times.

* `<BackstageLookCard />`

  * Look #, model, outfit, accessories, quick-change notes.

* `<KPIStatCard />`

  * Metrics for Analytics screen.

---

### D. Screen Components

Each screen is a top-level component that composes the cards & lists above:

1. `<HomeScreen />`
2. `<EventDetailScreen />`
3. `<TimelineScreen />`
4. `<TasksScreen />`
5. `<StakeholdersScreen />`
6. `<StakeholderListScreen />` (for a specific type)
7. `<StakeholderDetailScreen />`
8. `<VenuesScreen />`
9. `<VenueDetailScreen />`
10. `<ModelsCastingScreen />`
11. `<ModelDetailScreen />`
12. `<DesignersBrandsScreen />`
13. `<SponsorsScreen />`
14. `<ScheduleCallTimesScreen />`
15. `<BackstagePlannerScreen />`
16. `<AnalyticsScreen />`

Modals / Sheets:

* `<EditPhaseSheet />`
* `<NewTaskSheet />`
* `<EditTaskSheet />`
* `<AIcopilotSheet />`
* `<EditCallTimeSheet />`
* `<EditAvailabilitySheet />`

---

### E. Data & State Hooks (recommended)

* `useCurrentEvent()`
* `useEventTimeline(eventId)`
* `useEventTasks(eventId, filters)`
* `useStakeholderTypes()`
* `useStakeholdersByType(type, eventId)`
* `useVenueAvailability(venueId)`
* `useModelAvailability(modelId)`
* `useDesignerAvailability(designerId)`
* `useEventSchedule(eventId)`
* `useBackstagePlan(eventId)`
* `useAnalytics(eventId)`
* `useAICopilot()` (wraps your Gemini calls via Edge Function)

---

## 4️⃣ Screen → Supabase Tables Mapping

Here’s how each screen maps to **“read / write”** on your Supabase schema.

I’ll reference the tables you’ve defined:

* Core: `users`, `events`, `event_phases`, `tasks`, `task_assignees`, `stakeholders`, `stakeholder_roles`, `event_stakeholders`, `notes`/`activity_log`
* Fashion entities:
  `venues`, `sponsor_organizations`, `event_sponsors`,
  `organizer_teams`, `organizer_team_members`,
  `fashion_brands`, `designer_profiles`, `event_designers`,
  `model_agencies`, `model_profiles`, `event_models`
* Availability / scheduling:
  `venue_availability`, `model_availability`, `designer_availability`,
  `event_schedule`, `event_rehearsals`, `call_times`, `backstage_items`
* Analytics: views like `event_overview_view`, `task_with_assignees_view`, etc. (optional but recommended)

---

### 1. Home / Dashboard (`<HomeScreen />`)

**Reads from:**

* `events`

  * Current event summary (status, date, location).
* `event_phases`

  * To compute progress per section (Vision, Casting, etc.).
* `tasks` + `task_assignees`

  * For “open tasks” / quick stats.
* Optional analytics views:

  * `event_overview_view` (pre-joined KPIs).

**Writes to:**

* `events`

  * When user taps “+ New Event” and creates one.

---

### 2. Event Detail (`<EventDetailScreen />`)

**Reads from:**

* `events`
* `event_phases` (phase counts / statuses)
* `tasks` (counts by status)
* `event_designers`, `event_models`, `event_sponsors`
* `venues` (via `events.venue_id`)

**Writes to:**

* `events`

  * Update event metadata (status, date, etc.).
* Maybe `notes`

  * Event-level notes / comments.

---

### 3. Timeline (`<TimelineScreen />`)

**Reads from:**

* `event_phases`
* `events` (for context: name, date)
* `event_stakeholders`, `stakeholders`

  * To show assignee avatars per phase.

**Writes to:**

* `event_phases`

  * Update `status`, `due_date`, maybe `description`.
* (Optional) `notes`

  * If you log comments per phase.

---

### 4. Tasks (`<TasksScreen />`)

**Reads from:**

* `tasks`
* `task_assignees`
* `event_phases` (link tasks to phases)
* `stakeholders` (to show assignees)
* Filters by:

  * `event_id`, `phase_id`, `status`, `due_date`.

**Writes to:**

* `tasks`

  * Create / update / change status, due date, priority, description.
* `task_assignees`

  * Adding / removing assignees.
* `notes` / `activity_log`

  * When task status changes (optional).

---

### 5. Stakeholders Hub (`<StakeholdersScreen />`, list & detail)

**Reads from:**

* `stakeholder_roles`

  * To display role types.
* `stakeholders`
* `event_stakeholders`

  * Filter stakeholders for the current event.

**Writes to:**

* `stakeholders`

  * Create / update basic person/org info.
* `event_stakeholders`

  * Attach/detach stakeholders to/from an event.

---

### 6. Venues & Availability (`<VenuesScreen />`, `<VenueDetailScreen />`)

**Reads from:**

* `venues`
* `events`

  * Show which events are tied to each venue (via `events.venue_id`).
* `venue_availability`

  * Time/slot-based availability.

**Writes to:**

* `venues`

  * Add/edit venue info.
* `events`

  * Assign `venue_id` to event.
* `venue_availability`

  * Mark available/blocked/reserved slots.

---

### 7. Models & Casting (`<ModelsCastingScreen />`, `<ModelDetailScreen />`)

**Reads from:**

* `model_profiles`
* `model_agencies`
* `event_models`
* `model_availability`
* `events` (current event context)
* `backstage_items` (optional – to show look-list per model)

**Writes to:**

* `model_profiles`

  * New models or updates (measurements, portfolio).
* `event_models`

  * Link models to events, set `look_count`, `is_opening`, `is_closing`.
* `model_availability`

  * Fittings, rehearsals, show-time availability.

---

### 8. Designers & Brands (`<DesignersBrandsScreen />`)

**Reads from:**

* `fashion_brands`
* `designer_profiles`
* `event_designers`
* `designer_availability`

**Writes to:**

* `fashion_brands`

  * Add/edit brand.
* `designer_profiles`

  * Designer user profiles.
* `event_designers`

  * Link designers/brands to event.
* `designer_availability`

  * Meeting, fitting, rehearsal availability.

---

### 9. Sponsors & Partnerships (`<SponsorsScreen />`)

**Reads from:**

* `sponsor_organizations`
* `event_sponsors`
* `events`

**Writes to:**

* `sponsor_organizations`
* `event_sponsors`

  * level, cash_value, in_kind_value, deliverables, contract_status.
* `notes` / `activity_log`

  * Sponsor-related notes.

---

### 10. Schedule & Call Times (`<ScheduleCallTimesScreen />`)

**Reads from:**

* `event_schedule`
* `event_rehearsals`
* `call_times`
* `events`
* Related stakeholders:

  * `stakeholders`, `model_profiles`, `designer_profiles`.

**Writes to:**

* `event_schedule`

  * Add/edit schedule items.
* `event_rehearsals`

  * Add/edit rehearsals.
* `call_times`

  * Add/edit call times for models, crew, HMU, etc.

---

### 11. Backstage Planner (`<BackstagePlannerScreen />`)

**Reads from:**

* `backstage_items`

  * Types: `call_time`, `look_sequence_item`, `quick_change`, `accessories_checklist_item`.
* `event_models`
* `model_profiles`
* `designer_profiles`
* `events`

**Writes to:**

* `backstage_items`

  * Create/update backstage cards and checklists.
* `call_times`

  * If you unify call times here as well.
* `notes`

  * Backstage notes / incidents.

---

### 12. Analytics / Reports (`<AnalyticsScreen />`)

**Reads from (mostly views):**

* `events`
* `tasks`
* `event_sponsors`
* Ticketing-related tables (if you add them later).
* Suggested views:

  * `event_overview_view`
  * `task_stats_view`
  * `sponsor_value_view`
  * `social_metrics_view` (if integrated)

**Writes to:**

* Usually **read-only**.
* Maybe `notes` for conclusions / post-mortem summaries.

---

### 13. AI Copilot (`<AIcopilotSheet />`)

**Reads from:**

* Supabase tables indirectly (through Edge Functions), e.g. `events`, `event_phases`, `tasks`, `stakeholders`, `availability` tables.

**Writes to:**

* `tasks`

  * When AI suggestions are converted into tasks.
* `notes`

  * AI-generated notes (run-of-show, PR draft).
* Optionally `event_phases` (AI suggests updates).

**Implementation note:**

* Frontend calls a Supabase **Edge Function**, which calls Gemini and returns structured suggestions.
* UI then maps those suggestions → `INSERT` / `UPDATE` calls.

---

### 14. More / Settings (`<MoreScreen />`)

**Reads from:**

* `users`
* `organizer_teams`
* `organizer_team_members`

**Writes to:**

* `users` (profile)
* `organizer_teams`, `organizer_team_members` (team management)

---

## 5️⃣ ⭐ **Advanced AI Features Prompt (Gemini 3)**

Copy & paste this prompt to design the **AI integrations** for the planner.

```md
You are an expert AI architect.  
Your task is to upgrade the **FashionOS Fashion Show Planner** by integrating the full set of Gemini API capabilities.

Design a complete plan + UI + workflow describing how each of the following Gemini tools will power the Fashion Show Planner:

====================================================
1️⃣ TEXT GENERATION
====================================================
Use cases to design:
• Generate event descriptions  
• Create Run-of-Show  
• Write casting notes  
• Create PR emails  
• Generate sponsor pitches  
• Draft social captions and TikTok script prompts  

UI element:
• “Ask AI” bottom sheet with quick actions.

====================================================
2️⃣ IMAGE GENERATION (Gemini Image / Nano Banana 🍌)
====================================================
Use cases:
• Generate moodboards for fashion designers  
• Create runway background concepts  
• Make sponsor booth mockups  
• Generate activation visual ideas  
• Create social media templates  

UI elements:
• “Generate Visual” card  
• Gallery with multiple resolutions  

====================================================
3️⃣ DOCUMENT UNDERSTANDING
====================================================
Use cases:
• Read & summarize contracts (PDF)  
• Extract sponsor deliverables  
• Convert casting sheets → structured data  
• Summarize run sheets, technical riders  

UI elements:
• “Upload Document” → “Process with AI”  
• Summary + structured table  

====================================================
4️⃣ GEMINI THINKING + THOUGHT SIGNATURES
====================================================
Use cases:
• Decompose tasks → timeline steps  
• Identify missing tasks in a phase  
• Detect scheduling conflicts (models, designers, venues)  
• Provide reasoning trace (optional dev mode)  

UI elements:
• “Deep Planning” mode  
• - Reasoning summary  
• - Suggested actions  
• - Risk detection  

====================================================
5️⃣ STRUCTURED OUTPUTS
====================================================
Format:
• JSON output for:  
  - Events  
  - Tasks  
  - Looks / outfits  
  - Activations  
  - Deliverables  
  - ROI reports  

UI:
• Auto-fill forms using JSON  
• Auto-generate draft tasks  

====================================================
6️⃣ FUNCTION CALLING (Gemini API)
====================================================
Design function specs for:
• createEvent()  
• createTask()  
• assignStakeholder()  
• updateSchedule()  
• generateRunOfShow()  
• searchAvailability()  
• suggestActivationIdea()  
• sponsorROIReport()  

Integrations:
• Supabase Edge Functions  
• Supabase RLS + policies  

====================================================
7️⃣ SEARCH GROUNDING (Google Search)
====================================================
Use cases:
• Search trends for fashion shows  
• Sponsor brand research  
• Venue research  
• PR angle optimization  
• Real-time fashion news inspiration  

UI:
• “Search Web Insights” sidebar  
• Cards with grounded results  

====================================================
8️⃣ CODE EXECUTION
====================================================
Use cases:
• Validate scheduling logic  
• Generate CSVs, PDFs, JSON  
• Run calculations for costs / ROI  
• Validate model measurements  
• Recalculate time blocks  

UI:
• “AI Compute” button in planner tools  

====================================================
9️⃣ URL CONTEXT
====================================================
Use cases:
• Analyze fashion designer websites  
• Extract brand palette for moodboard  
• Read sponsor sites for lead scoring  
• Parse event venue pages  

UI:
• Paste URL → “Analyze” button  
• Output: summary, palette, mood  

====================================================
🔟 FILE SEARCH (RAG)
====================================================
Use cases:
• Upload runway scripts, designer lookbooks, sponsor guidelines  
• AI retrieves relevant parts  
• Answer questions based on uploaded files  
• Build recommendations using RAG  

UI:
• File sidebar  
• Toggle: “Search within event files”  

====================================================
1️⃣1️⃣ FILES API
====================================================
Use cases:
• Upload casting photos  
• Save backstage looklists  
• Store contracts  
• Store videos/photos for AI analysis  

UI:
• File manager inside planner  
• Preview mode  

====================================================
1️⃣2️⃣ CONTEXT CACHING
====================================================
Use cases:
• Keep entire event state in cache  
• Smooth AI sessions  
• Avoid repeating context (models, designers, sponsors)  
• Faster AI planning for long events  

UI:
• “Cached Session Active” indicator  

====================================================
1️⃣3️⃣ MEDIA RESOLUTION TOOL
====================================================
Use cases:
• Generate 4K runway backgrounds  
• Create 1080p social reels  
• Auto-enhance model casting photos  
• Convert sponsor assets into optimized formats  

UI:
• “Choose Resolution” selector: 256 → 4K  


====================================================
🎯 OUTPUT REQUIRED
====================================================
Generate:

1. A full architecture plan  
2. UI mockups for each AI-powered feature  
3. Data flow diagrams  
4. Function-calling definitions for Gemini  
5. Structured JSON schemas  
6. User journeys  
7. Integration steps with Supabase  
8. Example prompts for each tool  
9. Edge Function interaction notes  
10. One combined “AI Control Center” screen in the Fashion Planner  

Use clean visual organization, elegant layout, real examples, and mobile-first design.

Begin the full design now.
```

---

# 🤖 **AI Control Center — UI Specification**

Here is the **Master Generator Prompt** to design the dedicated **AI Control Center** screen, along with its specific component architecture and flow.

## ⭐ **AI CONTROL CENTER — MASTER GENERATOR PROMPT**

### *(Copy & Paste into Google Studio / Gemini)*

```md
Design a complete **AI Control Center** UI for the FashionOS Fashion Show Planner.  
The goal is to centralize *all AI-powered tools* (Gemini 3) into one elegant screen.

STYLE:
• High-fashion aesthetic (Vogue / Prada / LVMH)
• Premium white cards on soft pastel background (lavender / rose)
• Playfair Display for headers, Inter for body
• Rounded cards, soft shadows, minimal icons
• Mobile-first with desktop expansion

====================================================
⭐ 1. SCREEN NAME  
====================================================
“AI Control Center” — a central dashboard where users run AI tasks to plan a fashion event.

====================================================
⭐ 2. LAYOUT — TOP-LEVEL STRUCTURE  
====================================================
MAIN SECTIONS (stacked cards):

1. **Quick AI Actions**
2. **Planning Assistants**
3. **Creative Generators**
4. **Document Intelligence**
5. **Smart Search & RAG**
6. **Automation & Function Calls**
7. **Event Intelligence Summary**
8. **AI History & Saved Outputs**

Use a card grid layout on desktop and vertical stack on mobile.

====================================================
⭐ 3. SECTION DETAILS (DESIGN EACH CARD)  
====================================================

### 1. QUICK AI ACTIONS  
Card with shortcut buttons:
• Generate Run-of-Show  
• Suggest Timeline Tasks  
• Create Casting Notes  
• Generate Social Posts  
• Sponsor Pitch Draft  
CTA style: pill buttons with icons.

---

### 2. PLANNING ASSISTANTS (Gemini Thinking + Thought Signatures)  
Card title: “Deep Planning Assistants”  
Includes:
• Conflict Checker (models, venues, designers)  
• Missing Tasks Finder  
• Risk Detector  
• Auto-Prioritize Tasks  
• Suggest Scheduling Windows  
Gemini Thinking enabled (show subtle “AI is analyzing” animation).

---

### 3. CREATIVE GENERATORS (Text + Image + Video)  
Card title: “Creative Suite”  
Tabs inside the card:
- Text Generation  
- Image Generation  
- Video Description → Cut Sheet  
- Lookbook Mockups  
- Runway Background Concepts  

Show an image-style preview box with “Generate Visual”.

---

### 4. DOCUMENT INTELLIGENCE (Doc Understanding + Extraction)  
Card title: “Document Tools”  
Buttons:
• Upload Contract → Summarize Deliverables  
• Upload Sponsor PDF → Extract Requirements  
• Upload Lookbook → Detect outfits + colors  
• Upload Technical Rider → Convert to Tasks  

Show a right-side panel with extracted structured JSON.

---

### 5. SMART SEARCH & RAG (Search Grounding + File Search)  
Card title: “Smart Search & RAG”  
Fields:
- URL Analyzer (brand sites, designer sites, venue pages)  
- Fashion Trend Search (Google Search)  
- File Search (RAG on lookbooks, scripts, PDFs)

Show AI-generated grounded cards:
• Industry trends  
• Sponsor audience match  
• Venue technical insights  

---

### 6. AUTOMATION & FUNCTION CALLS (Gemini Function Calling)  
Card title: “AI Actions & Automations”  
Buttons trigger backend Supabase Edge Functions:
• createEvent()  
• createTask()  
• assignStakeholder()  
• updateSchedule()  
• generateRunOfShow()  
• searchAvailability()  
• sponsorROIReport()  

Show JSON preview for function calls.

---

### 7. EVENT INTELLIGENCE SUMMARY  
Card title: “AI Event Summary”  
Fields generated by AI:
• Event readiness score  
• Schedule completeness  
• Stakeholder coverage  
• Backstage readiness  
• Sponsor deliverables risk level  

Charts:
• Bar chart for phase completion  
• Pie chart for task distribution  
• Timeline heatmap  

---

### 8. AI HISTORY & SAVED OUTPUTS  
Card title: “Previous AI Outputs”  
Columns:
• Output Type (Task, Visual, Run-of-Show, Summary)  
• Date  
• Related Event  
• CTA: “Use Again” or “Save as Task”

Add search + filters.

====================================================
⭐ 4. INTERACTION DESIGN  
====================================================
• Each AI card expands into a **Bottom Sheet** on mobile  
• Desktop: use **Side Panel Drawer**  
• All AI results push into:
  - Tasks  
  - Timeline  
  - Backstage Planner  
  - Sponsors module  
• Add **sparkle icon ✨** for AI buttons  
• Loading animation: soft gradient shimmer

====================================================
⭐ 5. COMPONENTS TO GENERATE  
====================================================
• AI Action Card  
• Creative Generator card (image, text, video)  
• Document Summary viewer  
• RAG search bar  
• Function-call JSON inspector  
• Chart pack (bar, pie, timeline)  
• AI History list  
• Tab bar for creative suite  
• Upload area component  
• “Deep Thinking” indicator  

====================================================
⭐ 6. OUTPUT REQUIRED  
====================================================
Generate:

1. High-fidelity mockups of the full AI Control Center  
2. Mobile + desktop versions  
3. A unified component library  
4. Chart visual examples  
5. User flow diagram for “Using AI to Plan a Show”  
6. Suggested color, spacing, and icon style  
7. JSON schemas for AI outputs  
8. Text examples from each tool  
9. Integration notes for Supabase + Edge Functions  

Use the FashionOS branding and premium fashion aesthetics.

Begin generating the complete AI Control Center UI now.
```

## 🌟 React Component Tree — AI Control Center

### 1) File structure (suggested)

```text
src/
  screens/
    AiControlCenter/
      AiControlCenterScreen.tsx
  components/
    layout/
      PageLayout.tsx
      SectionCard.tsx
    ai/
      AiQuickActions.tsx
      AiPlanningAssistants.tsx
      AiCreativeGenerators.tsx
      AiDocumentIntelligence.tsx
      AiSmartSearchRag.tsx
      AiAutomations.tsx
      AiEventIntelligence.tsx
      AiHistoryPanel.tsx
    ui/
      Button.tsx
      IconButton.tsx
      Tabs.tsx
      Badge.tsx
      ProgressBar.tsx
      StatTile.tsx
      Chart.tsx
      JsonPreview.tsx
      FileUpload.tsx
      Skeleton.tsx
      BottomSheet.tsx
```

### 2) Component hierarchy (JSX-style)

```tsx
// screens/AiControlCenter/AiControlCenterScreen.tsx
<PageLayout title="AI Control Center" subtitle="Plan your fashion show with Gemini">
  {/* Top summary */}
  <div className="grid gap-4 lg:grid-cols-4">
    <StatTile label="Events in planning" value="3" />
    <StatTile label="AI tasks run" value="27" />
    <StatTile label="Suggestions accepted" value="14" />
    <StatTile label="Readiness score" value="82%" />
  </div>

  {/* Main sections */}
  <div className="mt-6 grid gap-6 lg:grid-cols-2">
    <SectionCard title="Quick AI Actions" description="One-tap helpers">
      <AiQuickActions />
    </SectionCard>

    <SectionCard title="Planning Assistants" description="Deep planning & conflict checks">
      <AiPlanningAssistants />
    </SectionCard>

    <SectionCard title="Creative Generators" description="Text, images, visuals">
      <AiCreativeGenerators />
    </SectionCard>

    <SectionCard title="Document Intelligence" description="Contracts, decks, lookbooks">
      <AiDocumentIntelligence />
    </SectionCard>

    <SectionCard title="Smart Search & RAG" description="Search web + your files">
      <AiSmartSearchRag />
    </SectionCard>

    <SectionCard title="Automations & Function Calls" description="Edge Functions + actions">
      <AiAutomations />
    </SectionCard>

    <SectionCard title="Event Intelligence Summary" description="High-level AI overview">
      <AiEventIntelligence />
    </SectionCard>

    <SectionCard title="AI History & Saved Outputs" description="Reuse past results">
      <AiHistoryPanel />
    </SectionCard>
  </div>

  {/* Shared bottom sheet for details / JSON */}
  <BottomSheet>
    <JsonPreview />
  </BottomSheet>
</PageLayout>
```

## 🧭 Mermaid Diagram — AI Control Center (Structure + Flow)

```mermaid
graph TD
  U[User\n(Event Planner)] --> AC[AI Control Center Screen]

  subgraph UI[AI Control Center UI]
    AC --> QA[Quick AI Actions]
    AC --> PA[Planning Assistants]
    AC --> CG[Creative Generators\n(text / image)]
    AC --> DI[Document Intelligence]
    AC --> SR[Smart Search & RAG]
    AC --> AU[Automations & Function Calls]
    AC --> ES[Event Intelligence Summary]
    AC --> HI[AI History & Saved Outputs]
  end

  %% Back-end & tools
  QA --> GF[Gemini Text / Image APIs]
  PA --> GF
  CG --> GF
  DI --> GF
  SR --> GF
  SR --> GSE[Google Search Grounding]
  SR --> FS[File Search / RAG]

  AU --> EF[Supabase Edge Functions]
  EF --> DB[(Supabase DB)]
  EF --> ST[(Supabase Storage)]

  ES --> GF
  ES --> DB

  HI --> DB

  FS --> ST
```

* **UI section components** = React components above (AiQuickActions, AiPlanningAssistants, etc.).
* **Gemini + Edge Functions + Supabase** = where you plug in all the advanced AI tools you listed (text, image, RAG, function calling, etc.).