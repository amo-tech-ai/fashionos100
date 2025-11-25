
# 📚 Sponsor System Data Dictionary

This document outlines the database schema for the **FashionOS Sponsor Management System**.

## 1. Core Entities

### `sponsor_profiles`
The global CRM record for a brand/company.
*   **`id`**: UUID (PK)
*   **`name`**: Brand Name (e.g. "Chanel")
*   **`owner_id`**: Link to `auth.users`. If set, this user can log in to the Sponsor Portal to view this brand's data.
*   **`contact_email`**: Primary email for notifications.

### `sponsorship_packages`
Global templates for what you sell.
*   **`name`**: e.g. "Gold Tier"
*   **`deliverables_template`**: JSON Array defining what needs to be done.
    *   Example: `[{"title": "Upload Logo", "type": "logo", "due_offset_days": 7}]`

### `event_sponsors`
The central "Deal" record linking a Sponsor to an Event.
*   **`status`**:
    *   `lead`: Potential interest.
    *   `negotiating`: Terms being discussed.
    *   `signed`: Contract active (Triggers deliverables).
    *   `paid`: Financials settled.
*   **`opportunity_id`**: Link to the specific inventory slot (e.g. "Gold Tier for NYFW").

### `sponsor_activations`
Physical or Digital footprints at the event.
*   **`type`**: Booth, Lounge, Runway placement.
*   **`floorplan_coords`**: JSON for placing on the Venue Map.

### `sponsor_deliverables`
Tasks for the sponsor or internal team.
*   **`status`**: `pending` -> `uploaded` -> `approved`.
*   **`asset_url`**: Link to file in Supabase Storage (`sponsor-assets` bucket).

### `sponsor_roi_metrics`
Data points for reporting.
*   **`metric_name`**: "Booth Visits", "Logo Impressions", "Social Clicks".
*   **`source`**: Where data came from (API, Manual).

## 2. Automation Logic

### Database Triggers
*   **`on_sponsor_signed`**:
    *   **Trigger**: When `event_sponsors.status` changes to `signed`.
    *   **Action**: Reads `deliverables_template` from the linked Package and inserts rows into `sponsor_deliverables`.
    *   **Benefit**: Ops team doesn't need to manually create "Upload Logo" tasks for every deal.

### Row Level Security (RLS)
*   **Organizers**: Full access to events they own.
*   **Sponsors**: Read-only access to their Deals, Activations, and ROI. Write access to `sponsor_deliverables` (for uploads).

## 3. JSON Structures

### Deliverable Template (in `sponsorship_packages`)
```json
[
  {
    "title": "High Res Logo",
    "type": "logo",
    "description": "Vector format preferred (SVG/EPS)",
    "due_offset_days": 14
  },
  {
    "title": "Social Media Teaser",
    "type": "social_post",
    "description": "1080x1920 vertical video",
    "due_offset_days": 30
  }
]
```
