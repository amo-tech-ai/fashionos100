# FashionOS 2.0 Sitemaps

## 1. Core Sitemap (Unified)

*   **Dashboard**
    *   Overview (KPIs, Active Projects, Calendar)
    *   Notifications
    *   Quick Actions (AI Wizards)
*   **Services (Booking & Management)**
    *   **Photography** (Lookbook, E-comm, Campaign)
    *   **Video Production** (Social, Commercial, Event)
    *   **Web Design** (Shopify, Custom, Landing Pages)
    *   **eCommerce** (Product Mgmt, Inventory, SEO)
    *   **Social Media** (Planning, Posting, Analytics)
    *   **Marketing** (Ads, Email, Funnels)
    *   **Events** (Runway, Pop-up, Corporate)
*   **Projects**
    *   Active Projects
    *   Archived
    *   Deliverables Review
*   **Clients / CRM**
    *   Client Directory
    *   Leads Pipeline
    *   Sponsors (for Events)
*   **Talent & Vendors**
    *   Model Directory
    *   Creative Talent (Photographers, Stylists)
    *   Venues (Maps Integrated)
    *   Production Vendors (AV, Catering)
*   **Media Library**
    *   Assets (Photos, Videos)
    *   Documents (Contracts, Briefs)
*   **Finance**
    *   Invoices & Estimates
    *   Payments
    *   Budget Tracking
*   **Settings**
    *   Team & Permissions
    *   Brand Profile (AI DNA)

## 2. Advanced Sitemap (AI Modules)

*   **AI Insights Hub**
    *   Trend Forecasting (Search Grounding)
    *   Competitor Analysis
    *   Performance Predictions
*   **AI Generators**
    *   **Brief Generator:** Text-to-Spec
    *   **Moodboard Generator:** Text-to-Image
    *   **Scriptwriter:** Video scripts & Storyboards
    *   **Copywriter:** Web & Social text
    *   **SEO Optimizer:** Product descriptions
*   **Event Intelligence**
    *   **Timeline Architect:** Auto-scheduling
    *   **Venue Scout:** Maps-based search
    *   **Sponsor Matchmaker:** Lead scoring
*   **RAG Document Center**
    *   Contract Analyzer
    *   Brand Bible Chat
    *   Technical Rider Parsing

## 3. JSON Navigation Schema

```json
{
  "nav_groups": [
    {
      "title": "Core",
      "items": [
        { "label": "Dashboard", "path": "/dashboard", "icon": "Home" },
        { "label": "Projects", "path": "/dashboard/projects", "icon": "Folder" },
        { "label": "Calendar", "path": "/dashboard/calendar", "icon": "Calendar" }
      ]
    },
    {
      "title": "Services",
      "items": [
        { "label": "Photography", "path": "/dashboard/services/photo", "icon": "Camera" },
        { "label": "Video", "path": "/dashboard/services/video", "icon": "Video" },
        { "label": "Web & Ecom", "path": "/dashboard/services/web", "icon": "Monitor" },
        { "label": "Social & Marketing", "path": "/dashboard/services/marketing", "icon": "Share2" },
        { "label": "Events", "path": "/dashboard/services/events", "icon": "Ticket" }
      ]
    },
    {
      "title": "Intelligence",
      "items": [
        { "label": "AI Hub", "path": "/dashboard/ai", "icon": "Sparkles" },
        { "label": "Maps Scout", "path": "/dashboard/maps", "icon": "Map" },
        { "label": "Talent Network", "path": "/dashboard/talent", "icon": "Users" }
      ]
    }
  ]
}
```
