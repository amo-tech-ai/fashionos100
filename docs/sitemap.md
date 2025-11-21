# 🗺️ FashionOS Sitemap

## 🌐 Public Application
The public-facing side of FashionOS serves as the landing and discovery platform for the fashion industry.

### 1.0 Home (`/`)
*   **Hero Section**: "Operating System for Fashion" value proposition.
*   **Feature Highlights**: Links to Unified Dashboard and Global Directory.
*   **Testimonials**: Social proof.

### 2.0 Services (`/services`)
*   **Service List**: Photography, Video, Web Design, Social Media management.

### 3.0 Directory (`/directory`)
*   **Functionality**: Talent discovery network.
*   **Filters**:
    *   Category (All, Designers, Photographers, Stylists, Models, Brands, Venues).
    *   Location/Country (USA, Spain, UK, Australia).
    *   Specialty.
*   **View Modes**:
    *   **Grid View**: Visual card layout with rating and role.
    *   **List View**: Compact linear layout for rapid scanning.
*   **Profile Modal**: (Planned) Detailed view of talent portfolios.

### 4.0 Events (`/events`)
*   **Search**: Keyword search for events.
*   **Calendar Filtering**: `CalendarPicker` component for date range selection.
*   **Category Filtering**: Event type selection.
*   **Event Feed**: Chronological listing of fashion shows and meetups.

### 5.0 Social (`/social`)
*   **Marketing Overview**: Command center teaser for social media management.

---

## 🔒 Private Dashboard (`/dashboard`)
The authenticated workspace for agency owners and creators.

### Layout Structure
*   **Sidebar**: Persistent navigation.
*   **Top Bar**: Global Search, Notifications, User Profile.

### Modules

#### 1. Overview (Default)
*   **KPI Cards**: Quick stats for Upcoming Events, Bookings, Revenue, Social Growth.
*   **Analytics**:
    *   **Donut Chart**: Ticket sales breakdown.
    *   **Bar Chart**: Revenue trends (Custom SVG/CSS implementation).
*   **AI Copilot**:
    *   **Model**: `gemini-2.5-flash`.
    *   **Function**: Contextual assistant for creative direction and forecasting.

#### 2. Bookings
*   **KPIs**: Total Bookings, Tickets Sold, Earnings, Cancelled.
*   **Action**: "Add Booking" modal trigger.

#### 3. Calendar
*   **Views**: Month, Week, Content.
*   **Filtering**: Event type (Schedules, Event, Meeting, Setup, Deadlines).
*   **Interaction**: Click-to-view event details modal.

#### 4. Events (Placeholder)
*   Management list for hosted events.

#### 5. Financials (Placeholder)
*   Revenue tracking and payouts.

#### 6. Social (Placeholder)
*   Instagram/TikTok integration metrics.

#### 7. Directory (Placeholder)
*   Manage saved talent and contacts.

#### 8. Shop (Placeholder)
*   E-commerce settings.

#### 9. Settings (Placeholder)
*   Account and platform configuration.
