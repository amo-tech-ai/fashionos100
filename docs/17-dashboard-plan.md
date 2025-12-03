
# 🗺️ FashionOS Event-First Dashboard Architecture

**Status:** 🟢 Master Plan (Corrected & Ready)
**Priority:** P1
**Owner:** Product / Engineering
**Objective:** Transition from a utility list to an **Event-First Operating System**, unifying Venue Logistics, Casting, and Sponsorship under specific Event Contexts.

---

## 1. 🧠 Strategic Shift: "Event Context"

The architecture introduces **Context Switching**:

1.  **Global Context:** High-level metrics, aggregated calendars, global directories (All Sponsors, All Venues, Master Financials).
2.  **Event Context:** When a user selects an event, the sidebar transforms to focus *only* on that event's lifecycle (Casting, Run of Show, Floorplan).

---

## 2. 🌐 Sitemap & Navigation Structure

### A. Human-Readable Hierarchy

*   **Global Command Center** (`/dashboard`)
    *   **Core:** Overview, Calendar, Messages.
    *   **Commercial:**
        *   Sponsors (Global CRM).
        *   Pipeline (Lead Kanban).
        *   Packages (Global Templates).
    *   **Logistics:**
        *   Venue Directory (Google Maps Integration).
        *   Talent Network (Global Model/Vendor Database).
    *   **Shoots (Studio):**
        *   Bookings (Photo/Video Productions).
        *   Gallery (Global Asset Library).
    *   **Finance:**
        *   Invoices.
        *   Contracts (Global Repo).
    *   **System:**
        *   Settings.

*   **Event Context** (`/dashboard/events/[id]`)
    *   *Routes relative to event ID.*
    *   **Management:**
        *   Command Center (Budget Burn, Critical Path).
        *   Timeline (14-Phase visual tracker).
        *   Run of Show (Minute-by-minute schedule).
    *   **Logistics:**
        *   Venue & Map (Floorplan editor, Load-in info).
        *   Guest List (RSVPs, Seating Chart).
    *   **Casting:**
        *   Models (Event-specific casting board).
        *   Designers (Collection management).
    *   **Commercial:**
        *   Sponsors (Active deals for *this* event).
        *   Activations (Booth/Lounge planning).
        *   Deliverables (Asset tracker).
        *   Tickets (Tiers, Pricing, Sales).

### B. JSON Navigation Configuration

```json
{
  "global": [
    {
      "category": "Core",
      "items": [
        { "label": "Overview", "path": "/dashboard", "icon": "LayoutDashboard" },
        { "label": "Calendar", "path": "/dashboard/calendar", "icon": "Calendar" },
        { "label": "Messages", "path": "/dashboard/messages", "icon": "MessageSquare" }
      ]
    },
    {
      "category": "Commercial",
      "items": [
        { "label": "Sponsors", "path": "/dashboard/sponsors", "icon": "Users" },
        { "label": "Pipeline", "path": "/dashboard/leads", "icon": "Target" },
        { "label": "Packages", "path": "/dashboard/packages", "icon": "Package" }
      ]
    },
    {
      "category": "Logistics",
      "items": [
        { "label": "Venue Directory", "path": "/dashboard/venues", "icon": "MapPin" },
        { "label": "Talent Network", "path": "/dashboard/talent", "icon": "Star" }
      ]
    },
    {
      "category": "Shoots",
      "items": [
        { "label": "Bookings", "path": "/dashboard/bookings", "icon": "Camera" },
        { "label": "Gallery", "path": "/dashboard/gallery", "icon": "Image" }
      ]
    },
    {
      "category": "Finance",
      "items": [
        { "label": "Invoices", "path": "/dashboard/invoices", "icon": "FileText" },
        { "label": "Contracts", "path": "/dashboard/contracts", "icon": "Scroll" }
      ]
    }
  ],
  "event_context": [
    {
      "category": "Management",
      "items": [
        { "label": "Command Center", "path": "", "icon": "Activity" }, 
        { "label": "Timeline", "path": "timeline", "icon": "Clock" },
        { "label": "Run of Show", "path": "schedule", "icon": "ListVideo" }
      ]
    },
    {
      "category": "Logistics",
      "items": [
        { "label": "Venue & Map", "path": "venue", "icon": "Map" },
        { "label": "Guest List", "path": "guests", "icon": "Users" }
      ]
    },
    {
      "category": "Casting",
      "items": [
        { "label": "Models", "path": "models", "icon": "Scissors" },
        { "label": "Designers", "path": "designers", "icon": "Shirt" }
      ]
    },
    {
      "category": "Commercial",
      "items": [
        { "label": "Sponsors", "path": "sponsors", "icon": "DollarSign" },
        { "label": "Activations", "path": "activations", "icon": "Zap" },
        { "label": "Deliverables", "path": "deliverables", "icon": "CheckSquare" },
        { "label": "Tickets", "path": "tickets", "icon": "Ticket" }
      ]
    }
  ]
}
```
*Note: Event Context paths are relative. `path: "venue"` becomes `/dashboard/events/[id]/venue`.*

---

## 3. 📊 Architecture Diagrams

### System Data Flow

```mermaid
flowchart LR
    subgraph GLOBAL [Global Context]
      CRM[Sponsor CRM]
      VD[Venue Directory]
      MD[Talent Network]
    end

    subgraph EVENT [Event Context (ID)]
      EC[Event Command Center]
      
      subgraph OPS [Management]
        TL[Timeline]
        RS[Run of Show]
      end
      
      subgraph LOG [Logistics]
        VN[Venue Assignment]
        GL[Guest List]
      end
      
      subgraph CAST [Casting]
        MOD[Models]
        DES[Designers]
      end
      
      subgraph COM [Commercial]
        DL[Sponsor Deals]
        AT[Activations]
        TK[Tickets]
      end
    end

    CRM --> DL
    VD --> VN
    MD --> MOD

    EC --> OPS
    EC --> LOG
    EC --> CAST
    EC --> COM
```

---

## 4. 📍 Venue Management System (Google Maps Integration)

**Goal:** Ground venue selection in real-world data using Gemini and Maps.

### Features:
1.  **Venue Scouting:**
    *   Input: "Industrial warehouse in Brooklyn for 500 people".
    *   AI: Calls `resolve-venue` (Gemini + Google Search).
    *   Output: List of real venues with address, capacity, and photos.
2.  **Map Visualization:**
    *   Embed Google Maps JavaScript API in `VenueDetail`.
    *   Markers for: The Venue, Nearby Hotels, Parking, Transit.
3.  **Logistics:**
    *   Load-in zones marked on map.
    *   Distance calculator for model transport.

---

## 5. 🔄 Migration Plan: Old → New

| Old Route | New Route | Action |
| :--- | :--- | :--- |
| `/dashboard/events` | `/dashboard/events` | **Keep.** List view of all events (Global). |
| `/dashboard/events/[id]` | `/dashboard/events/[id]` | **Update.** Becomes the "Event Command Center". |
| `/dashboard/activations` | `/dashboard/events/[id]/activations` | **Move.** Activations now scoped to Event Context. |
| `/dashboard/contracts` | `/dashboard/contracts` | **Keep.** Global repository, but linked to events. |
| `/dashboard/media` | `/dashboard/gallery` | **Merge.** Unified DAM (Digital Asset Management). |
| *(New)* | `/dashboard/venues` | **Create.** Venue Directory. |
| *(New)* | `/dashboard/events/[id]/models` | **Create.** Event Casting Board. |

---

## 6. 🛠️ Engineering Implementation Steps

### Phase 1: Router & Layout (Foundation)
1.  **Update `DashboardLayout.tsx`**:
    *   Add logic to detect if URL matches `/dashboard/events/:id/*`.
    *   If match: Render `EventSidebar` (using `event_context` JSON).
    *   Add "Back to Global Dashboard" button in Event Sidebar.
2.  **Update `routes.tsx`**: Define nested routes for events (e.g., `<Route path="events/:id/venue" ... />`).

### Phase 2: Venue Module
1.  **Database**: Ensure `venues` table has `geo_lat`, `geo_lng`, `google_place_id`.
2.  **API**: Update `resolve-venue` Edge Function to return structured map data.
3.  **UI**: Build `VenueList.tsx` (Global) and `EventVenue.tsx` (Event Context).

### Phase 3: Event Command Center
1.  **Aggregator**: Build a hook `useEventDashboard(id)` that fetches progress across all modules (Sponsors, Tasks, Tickets) in one query.
2.  **Widgets**: Build `BudgetBurnWidget`, `CriticalPathWidget`, `TicketVelocityWidget`.

### Phase 4: Tickets Module
1.  **UI:** Create `EventTickets.tsx`.
    *   Manage Tiers (VIP, GA).
    *   View Sales Velocity.
    *   Check-in List (Search/Scan).

---

## 7. ✅ Production Checks

*   [ ] **RLS Policies:** Ensure `event_stakeholders` can view the Event Dashboard.
*   [ ] **Maps API Key:** Restrict referrer to production domain.
*   [ ] **Mobile:** Ensure Sidebar acts as a Bottom Sheet menu when in Event Context on mobile.
*   [ ] **Performance:** Prefetch Event Context data when hovering over the Event Card in the global list.
