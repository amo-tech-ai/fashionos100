# 📱 FashionOS Mobile Event Planner - Dev Checklist

**Status:** 🟢 Active Plan  
**Type:** Mobile-First UI Implementation  
**Goal:** Build a streamlined, touch-friendly event planning interface for fashion show organizers.

---

## 📋 Dev Checklist Table

Use this table to track progress. Copy into Notion, Jira, or GitHub Projects.

| Feature / Task | Category | Description | Status | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **App Shell & Layout** | Foundation | Setup mobile container, `SAFE_AREA` handling, and global theme provider (Tailwind config). | `Not Started` | **High** |
| **Bottom Navigation** | Foundation | Implement sticky bottom tab bar (Home, Timeline, Tasks, More). Handle active states. | `Not Started` | **High** |
| **Home Header & Hero** | Home | Create top bar with "Fashion Planner" title + `+ New Event` FAB/Button. Add Hero Card showing active event status. | `Not Started` | **High** |
| **Overview Progress Cards** | Home | specific cards: Vision, Collection, Casting, Venue, Sponsors, Backstage. Include progress bars and icons. | `Not Started` | **High** |
| **Timeline List UI** | Timeline | Vertical scrolling list of 14 phases (Concept -> Post-Event). Visual connector lines between nodes. | `Not Started` | **High** |
| **Timeline Edit Interaction** | Timeline | Bottom sheet or slide-over to change Phase Status (ToDo/Done) and Due Date. | `Not Started` | **Medium** |
| **Task List UI** | Tasks | Tabbed view: "All", "Today", "This Week". Task cards with checkboxes and priority tags. | `Not Started` | **High** |
| **Add Task Flow** | Tasks | Floating Action Button (FAB) -> Modal Form. Fields: Title, Tag, Date, Assignee. | `Not Started` | **Medium** |
| **Stakeholder Grid** | Stakeholders | Grid navigation for categories (Designers, Models, HMU, etc.). Use icons/images for tiles. | `Not Started` | **Medium** |
| **Stakeholder List** | Stakeholders | Detail view per category listing individual people (Avatar, Name, Role, Phone/Email button). | `Not Started` | **Low** |
| **Event Detail Layout** | Event Detail | Detailed view of specific event metadata (Date, Loc, Stats). Back navigation logic. | `Not Started` | **Medium** |
| **Navigation Linking** | Event Detail | Connect Home Hero Card -> Event Detail. Connect Event Detail -> Timeline/Tasks sub-views. | `Not Started` | **Medium** |
| **Backstage UI Structure** | Backstage | specialized view for Show Day. Sections: Call Times, Run of Show, Quick Changes. | `Not Started` | **Medium** |
| **Backstage Checklists** | Backstage | Interactive checkboxes for Accessories/Looks. Tagging system for quick filtering. | `Not Started` | **Low** |
| **AI Copilot Entry** | AI Copilot | Floating magical button (sparkle icon) fixed above bottom nav. | `Not Started` | **Medium** |
| **AI Chat Interface** | AI Copilot | Bottom sheet chat UI. Input field + "Quick Suggestion" chips (Run-of-Show, Emails). | `Not Started` | **Medium** |
| **AI Response Cards** | AI Copilot | render AI text responses in structured cards with "Save as Task" or "Copy" action buttons. | `Not Started` | **Low** |
| **Interaction Polish** | UX Polish | Smooth transitions between tabs. Slide-up animations for modals. Touch feedback (ripples/scale). | `Not Started` | **Low** |
| **State Handling** | UX Polish | Skeleton loaders for lists. "No Tasks" empty states. Error boundaries. | `Not Started` | **Medium** |
| **Design System Polish** | UX Polish | Enforce `Playfair Display` headers, `Inter` body. consistent rounded corners (16px/24px) and shadows. | `Not Started` | **Medium** |

---

## 🏗️ Kanban Board Suggestion

Group your tasks as follows to get started immediately.

### 📌 To Do (Sprint 1 - Foundation & Home)
*   [ ] **App Shell & Layout** (Foundation)
*   [ ] **Bottom Navigation** (Foundation)
*   [ ] **Home Header & Hero** (Home)
*   [ ] **Overview Progress Cards** (Home)

### 📂 Backlog (Sprint 2 - Core Workflows)
*   [ ] **Timeline List UI** (Timeline)
*   [ ] **Timeline Edit Interaction** (Timeline)
*   [ ] **Task List UI** (Tasks)
*   [ ] **Add Task Flow** (Tasks)
*   [ ] **Event Detail Layout** (Event Detail)
*   [ ] **Navigation Linking** (Event Detail)

### 🧊 Icebox / Later (Sprint 3 - Advanced & Details)
*   [ ] **Stakeholder Grid** (Stakeholders)
*   [ ] **Stakeholder List** (Stakeholders)
*   [ ] **Backstage UI Structure** (Backstage)
*   [ ] **Backstage Checklists** (Backstage)
*   [ ] **AI Copilot Entry** (AI Copilot)
*   [ ] **AI Chat Interface** (AI Copilot)
*   [ ] **AI Response Cards** (AI Copilot)

### 🛑 Blocked (Waiting on Core UI)
*   [ ] **Interaction Polish** (Cannot polish until UI exists)
*   [ ] **State Handling** (Needs data fetching logic first)
*   [ ] **Design System Polish** (Ongoing check)

---

## 🎨 Design Tokens Reminder

*   **Typography:**
    *   Headers: `Playfair Display` (Serif)
    *   Body/UI: `Inter` (Sans)
*   **Colors:**
    *   Background: `bg-fashion-cream` (#fbf8f5)
    *   Cards: `bg-white`
    *   Text: `text-fashion-black` (#0a0a0a)
    *   Accent: `text-fashion-purple` (#c084fc)
*   **Mobile Specifics:**
    *   Touch Targets: Min 44px height for buttons/inputs.
    *   Bottom Nav: Fixed height (~60-80px), with safe area padding.
