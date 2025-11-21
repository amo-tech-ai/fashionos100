# 🎛️ Dashboard Architecture & Documentation

## Overview
The **FashionOS Dashboard** is a React-based single-page application (SPA) module residing within the main `App` structure. It functions as the command center for users, integrating real-time data visualization, calendar management, and AI assistance.

**File Path**: `pages/DashboardPage.tsx`

---

## 🧩 Core Components

### 1. Layout Wrapper
The dashboard uses a dedicated layout separate from the public website `Navbar` and `Footer`.
*   **Sidebar**: Fixed width (`w-64`), hidden on mobile, contains navigation `menuItems`.
*   **Header**: Sticky top bar with `backdrop-blur`, search input, and user profile.
*   **Main Content Area**: Flex-grow container handling the switching of sub-views.

### 2. State Management
*   `activeTab`: Controls which module is currently rendered (Overview, Bookings, Calendar, etc.).
*   `onViewChange`: Callback prop to return to the public site (Home).

---

## 🤖 AI Integration (Copilot)

The dashboard features an embedded **AI Copilot Widget** powered by Google's Gemini API.

*   **Component**: `AICopilotWidget`
*   **Model**: `gemini-2.5-flash`
*   **Setup**:
    ```typescript
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    ```
*   **Behavior**:
    *   Accepts natural language queries from the user.
    *   System instruction enforces a "fashion creative director assistant" persona.
    *   Responses are capped at ~30 words for conciseness fitting a widget UI.
*   **Visuals**: Uses a gradient background (`from-indigo-500 to-purple-600`) with glassmorphism effects (`backdrop-blur`) to stand out from standard UI cards.

---

## 📊 Data Visualization Modules

### Overview Module
Displays high-level health metrics of the agency.
*   **DonutChart**: Pure SVG implementation (`stroke-dasharray` trick) visualizing Ticket categories.
*   **CustomBarChart**: CSS-based flexible column chart using percentage heights (`style={{height: ...}}`) and hover effects.
*   **KPI Cards**: Reusable components displaying Icon + Label + Value + Trend.

### Calendar Module
A complex interactive calendar system.
*   **State**:
    *   `viewMode`: Switch between 'Month', 'Week', 'Content'.
    *   `selectedEvent`: Controls the "Edit Event" side-drawer/modal.
*   **Rendering**: Grid layout generating 31 days.
*   **Filtering**: Top bar filter pills (All Schedules, Event, Meeting, etc.) toggle visibility of specific event types.
*   **Interactivity**: Clicking a day or event entry sets `selectedEvent`, triggering the slide-over details panel.

### Bookings Module
Focuses on transactional data.
*   **KPIs**: Specific metrics for Bookings/Tickets/Earnings.
*   **Visuals**: Uses Lucide icons with color-coded backgrounds (Indigo, Pink, Blue, Amber, Red) to indicate status health.

---

## 🎨 Design System Usage
The dashboard adheres to the **FashionOS Premium** aesthetic:
*   **Font**: Serif headings (`font-serif`) for section titles, Sans-serif (`Inter`) for data.
*   **Spacing**: Generous padding (`p-6`, `gap-8`) to maintain a clean, luxury feel.
*   **Motion**: `animate-in`, `fade-in`, and `slide-in` classes are used on mount to provide a smooth entry experience.
*   **Glassmorphism**: Used in the Header and AI Widget for modern texture.

---

## ⚠️ Current Limitations / TODOs
1.  **Data Persistence**: Currently uses hardcoded arrays (`kpis`, `events`, `data`). Needs Supabase hook integration.
2.  **Responsive Sidebar**: Mobile menu trigger (`<Menu />`) is present but logic to toggle a mobile sidebar drawer is pending.
3.  **Empty States**: Tabs like Financials, Social, and Shop currently render nothing when active.
