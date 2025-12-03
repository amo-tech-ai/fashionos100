# FashionOS Sitemaps

## 1. Core Sitemap (Essential / MVP)
*Designed for the creative producer to execute the show.*

*   **Dashboard / Overview:** Global calendar, active events list, critical alerts.
*   **Event Wizard:** AI-led creation flow.
*   **Event Command Center:** Specific event dashboard (Time/Budget/Tasks).
*   **Timeline & Run of Show:** Gantt charts and minute-by-minute schedules.
*   **Venue Planning:** Location details, floorplans, maps.
*   **Casting & Models:** Model boards, agency contacts, measurements.
*   **Designers & Collections:** Look lists, fitting schedules.
*   **Sponsors:** Basic list of partners and deliverables.
*   **Vendors:** Crew list (AV, Lighting, Security).
*   **Tasks:** Kanban board for production tasks.
*   **Media Library:** Asset storage (Moodboards, Logos, Press Kits).

## 2. Advanced Sitemap (Enterprise / Full OS)
*Includes CRM, Finance, and Deep AI Intelligence.*

*   **Sponsor CRM:**
    *   Lead Pipeline & Scoring
    *   Package Builder
    *   Activation Planner
    *   ROI Dashboard
*   **Vendor Directory:** Global database with ratings and technical capabilities.
*   **Guest Experience:**
    *   Seating Charts (Drag & Drop)
    *   RSVP Management / Ticketing
    *   Front-of-House App
*   **Finance & Budget:** Invoice tracking, P&L, Payment processing.
*   **Deliverables Tracker:** Granular asset tracking for all stakeholders.
*   **AI Insights Hub:** Predictive analytics, Trend forecasting.
*   **Maps Intelligence:** Logistics routing, Venue scouting via Google Maps.
*   **RAG Document Center:** Contract analysis, Technical rider parsing.
*   **Settings & Team:** Permissions, Brand DNA configuration.

## 3. JSON Navigation Schema

```json
{
  "global_navigation": [
    {
      "label": "Dashboard",
      "path": "/dashboard",
      "icon": "LayoutDashboard"
    },
    {
      "label": "Events",
      "path": "/events",
      "icon": "Ticket"
    },
    {
      "label": "Sponsor CRM",
      "path": "/sponsors",
      "icon": "DollarSign",
      "children": [
        { "label": "Pipeline", "path": "/sponsors/pipeline" },
        { "label": "Packages", "path": "/sponsors/packages" }
      ]
    },
    {
      "label": "Directories",
      "path": "/directory",
      "children": [
        { "label": "Venues", "path": "/directory/venues" },
        { "label": "Talent", "path": "/directory/talent" },
        { "label": "Vendors", "path": "/directory/vendors" }
      ]
    }
  ],
  "event_context_navigation": [
    {
      "label": "Command Center",
      "path": "/events/:id/dashboard",
      "icon": "Activity"
    },
    {
      "label": "Production",
      "children": [
        { "label": "Timeline", "path": "/events/:id/timeline" },
        { "label": "Run of Show", "path": "/events/:id/run-of-show" },
        { "label": "Tasks", "path": "/events/:id/tasks" }
      ]
    },
    {
      "label": "Casting",
      "path": "/events/:id/casting",
      "icon": "Users"
    },
    {
      "label": "Logistics",
      "children": [
        { "label": "Venue Map", "path": "/events/:id/venue" },
        { "label": "Seating", "path": "/events/:id/seating" },
        { "label": "Backstage", "path": "/events/:id/backstage" }
      ]
    },
    {
      "label": "Commercial",
      "children": [
        { "label": "Sponsors", "path": "/events/:id/sponsors" },
        { "label": "Budget", "path": "/events/:id/budget" }
      ]
    },
    {
      "label": "AI & Media",
      "path": "/events/:id/ai-hub",
      "icon": "Sparkles"
    }
  ]
}
```