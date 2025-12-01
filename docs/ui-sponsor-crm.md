
# 🎨 UI/UX Specification: Sponsor CRM Dashboard

**Module:** Sponsorship & Partnerships
**Style:** Premium Fashion-Tech (Clean, Airy, Data-Rich)
**Target Device:** Desktop (Primary), Tablet/Mobile (Secondary)

---

## 1. 🖌️ Visual Design System

### Color Palette
*   **Canvas:** `#FBF8F5` (Warm Cream - Main BG), `#FFFFFF` (Cards).
*   **Primary Text:** `#1A1D2D` (Soft Charcoal).
*   **Secondary Text:** `#6B7280` (Cool Grey).
*   **Accents:**
    *   *Brand:* `#C084FC` (Fashion Purple).
    *   *Success/Closed-Won:* `#10B981` (Emerald).
    *   *Attention/Risk:* `#F59E0B` (Amber).
    *   *Luxury/VIP:* `#E87C4D` (Burnt Orange).
*   **Borders:** `#F3F4F6` (Very subtle).

### Typography
*   **Headings:** *Playfair Display* (Serif). Used for Page Titles, KPI Values, and Sponsor Names.
*   **UI Elements:** *Inter* (Sans-Serif). Used for tables, buttons, labels, and body text.
*   **Hierarchy:**
    *   `text-4xl` (36px): Dashboard Greetings, KPI Numbers.
    *   `text-xl` (20px): Card Headings.
    *   `text-xs` (12px): Uppercase Tracking Labels (`font-bold tracking-widest`).

### Component Styling
*   **Cards:** `bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all`.
*   **Buttons:** Rounded-xl or Pill-shaped. `h-10` or `h-12`.
*   **Animations:** `animate-in fade-in slide-in-from-bottom-4` for all page loads.

---

## 2. 🧩 Component Library

### A. Atoms
*   **`StatusPill`**: Colored badge for Deal Stage (e.g., `bg-green-50 text-green-700` for "Signed").
*   **`FitScoreBar`**: Linear progress bar (0-100) changing color (Red < 50, Yellow < 75, Green > 75).
*   **`AvatarGroup`**: Overlapping circles for contact lists.
*   **`MediaThumbnail`**: 4:5 aspect ratio preview for deliverables (images/docs).

### B. Molecules
*   **`SponsorCard` (Kanban)**:
    *   Header: Logo + Name.
    *   Body: Deal Value + Owner Avatar.
    *   Footer: Next Action Date + Fit Score Pill.
*   **`KPICard`**:
    *   Icon (Top Left, colored background).
    *   Value (Large Serif).
    *   Label (Small Sans).
    *   Trend (Green/Red indicator).
*   **`DeliverableRow`**:
    *   Status Checkbox.
    *   Title + Due Date.
    *   Assignee + Attachments.

### C. Organisms
*   **`PipelineBoard`**: Drag-and-drop columns.
*   **`PackageBuilder`**: Split view (Form Left, Preview Right).
*   **`RoiChartWidget`**: Combined Line + Bar chart for engagement.

---

## 3. 📱 Screen Specifications

### 1. Sponsor CRM Home (`/dashboard/sponsors`)
*   **Layout:** Grid (4 columns).
*   **Hero Section:**
    *   `StatGrid`: Active Sponsors, Pipeline Value, Win Rate, Deliverables Due.
    *   `AiInsightsPanel`: "3 High-Value Leads identified matching 'Sustainable Fashion'."
*   **Main Content:**
    *   **Top Half:** `PipelineSnapshot` (Horizontal funnel visualization).
    *   **Bottom Left:** `ActivityFeed` (Vertical timeline of emails/meetings).
    *   **Bottom Right:** `UpcomingDeliverables` (List of urgent tasks).

### 2. Sponsor List View (`/dashboard/sponsors/list`)
*   **Layout:** Full-width Data Table.
*   **Toolbar:** Search input, Filter Pills (Industry, Status, Value), "Add Sponsor" FAB.
*   **Columns:**
    *   Name (with Logo).
    *   Industry (Pill).
    *   Fit Score (Visual Bar).
    *   Owner (Avatar).
    *   Status (Badge).
    *   Value (Currency).
    *   Action (Meatball menu).

### 3. Sponsor Profile (`/dashboard/sponsors/:id`)
*   **Header:** Large Banner with Logo overlay. Key stats (Lifetime Value, Active Deals).
*   **Tabs:**
    1.  **Overview:** AI Summary ("Chanel is a luxury house..."), News Feed, Fit Analysis.
    2.  **Deals:** History of `event_sponsors` records.
    3.  **Deliverables:** Kanban view of assets (`sponsor_deliverables`).
    4.  **Team:** List of `sponsor_contacts`.
    5.  **Files:** Contract PDFs, Brand Assets.
*   **Sidebar (Desktop):** Quick Actions (Email, Call, Create Deal).

### 4. Pipeline Kanban (`/dashboard/sponsors/pipeline`)
*   **Layout:** Horizontal scrolling columns.
*   **Columns:** Lead -> Qualified -> Proposal -> Negotiation -> Signed.
*   **Card Content:** Sponsor Logo, Name, Est. Value, "Last Activity: 2d ago".
*   **Interaction:** Drag & drop updates `event_sponsors.status`.

### 5. Package Builder (`/dashboard/packages/new`)
*   **Layout:** Two-pane split.
*   **Left Pane (Editor):**
    *   Inputs: Package Name, Price, Quantity.
    *   Deliverables Picker: Checkbox list of standard items (Logo on wall, 5 VIP seats).
*   **Right Pane (Preview):**
    *   Real-time PDF-style preview of the sponsorship deck card.
    *   "AI Suggest Pricing" button overlay.

### 6. ROI Dashboard (`/dashboard/sponsors/roi`)
*   **Layout:** Masonry Grid of Charts.
*   **Charts:**
    *   **Reach:** Line chart (Impressions over time).
    *   **Conversion:** Funnel chart (Views -> Clicks -> Leads).
    *   **Value:** Bar chart (Cash vs Media Value).
*   **Components:** `KpiTile` for aggregate numbers. `TopSponsorsList` ranked by ROI.

### 7. Deliverables Tracker (`/dashboard/sponsors/deliverables`)
*   **Layout:** Grouped List (by Event or Status).
*   **Row:**
    *   Thumbnail (if uploaded) or Placeholder Icon.
    *   Name + Spec (e.g., "Logo Vector EPS").
    *   Sponsor Name.
    *   Deadline (Color-coded if overdue).
    *   Status Dropdown (Pending/Review/Approved).
    *   "Upload/Download" Action.

### 8. Sponsor Portal (`/portal`)
*   **Vibe:** External-facing, polished, simplified.
*   **Navigation:** Minimal (Home, Tasks, Assets).
*   **Home:**
    *   Welcome Message ("Hello, Chanel Team").
    *   "Action Required" cards (e.g., "Sign Contract", "Upload Logo").
    *   Live Impact Stats (Impressions ticker).
*   **Asset Upload:** Drag-and-drop zone for deliverables.

---

## 4. 🛣️ User Flows

### Flow A: New Deal Creation
1.  User clicks **"New Deal"** from Pipeline.
2.  Selects **Sponsor** (or creates new).
3.  Selects **Event**.
4.  Selects **Package** (e.g., Gold).
5.  **AI Assistant:** "Based on this sponsor's history, suggest adding 'Backstage Access' to close the deal."
6.  User adjusts terms -> **"Create Deal"**.
7.  Card appears in "Proposal" column.

### Flow B: Asset Approval
1.  Sponsor uploads "Logo.eps" via **Portal**.
2.  Notification sent to Organizer.
3.  Organizer views **Deliverables Tracker**.
4.  Organizer clicks "Review" -> Preview Modal opens.
5.  Organizer clicks **"Approve"**.
6.  Status updates to "Ready for Production".

---

## 5. 📱 Responsive Strategy

| Component | Desktop (lg+) | Mobile (xs-md) |
| :--- | :--- | :--- |
| **Navigation** | Fixed Sidebar | Sticky Bottom Nav |
| **Kanban** | Horizontal Scroll | Vertical Tabs (Lead/Signed toggle) |
| **Data Tables** | Full Columns | Card List (Hide optional cols) |
| **Charts** | 2-Column Grid | Stacked 1-Column |
| **Actions** | Hover buttons | Swipe actions or Kebab menu |
