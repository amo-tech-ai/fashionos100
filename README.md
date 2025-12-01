
# FashionOS - Fashion Event & Production Platform

FashionOS is a comprehensive operating system for the fashion industry, streamlining shoot bookings, event planning, sponsorship management, and asset delivery using AI.

## 🚀 Features

*   **Studio Booking Wizard:** 13-step flow for booking photography/video shoots with AI brief polishing.
*   **Event Management:** AI-powered event creation from text/URL, including schedule optimization and Veo trailer generation.
*   **Sponsorship CRM:** Manage leads, contracts (PDF gen), and deliverables.
*   **Studio Operations:** Visual QA, Delivery Portal, and Asset Gallery.
*   **Brand Intelligence:** AI analysis of brand DNA (visuals, tone) from URL.
*   **Real-time Communication:** Integrated chat and notification system.

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime)
*   **Edge Logic:** Supabase Edge Functions (Deno)
*   **AI:** Google Gemini 1.5 Pro, Gemini 2.5 Flash, Veo 3.1

## 🏗️ Getting Started

### 1. Prerequisites

*   Node.js 18+
*   Supabase CLI
*   Docker (for local Supabase development)

### 2. Installation

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Supabase URL and Anon Key from your Supabase Project Settings.

### 4. Database Setup

This project uses a consolidated migration file to set up the complete schema.

1.  **Local Development:**
    ```bash
    supabase start
    # The migration in supabase/migrations/ should run automatically.
    ```

2.  **Production Deployment:**
    Go to your Supabase Dashboard -> SQL Editor and paste the content of `supabase/migrations/20250309_complete_schema.sql` to initialize the database.

### 5. Edge Functions

Deploy the backend logic to Supabase:

```bash
# Login
supabase login

# Set Secrets (Required for AI features)
supabase secrets set GEMINI_API_KEY=your_gemini_key
supabase secrets set STRIPE_SECRET_KEY=your_stripe_key
supabase secrets set RESEND_API_KEY=your_resend_key
supabase secrets set GOOGLE_MAPS_API_KEY=your_maps_key

# Deploy
supabase functions deploy
```

### 6. Run Application

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 🧪 Verification

Navigate to `/dashboard/system` within the app to run a health check on the database connection, storage buckets, and AI services.

## 📦 Storage Buckets

The migration script attempts to create these, but if they are missing, ensure they exist in your Supabase Dashboard > Storage:
*   `event-media` (Public)
*   `avatars` (Public)
*   `documents` (Private)
*   `production-assets` (Private)
*   `brand-assets` (Private)

## 📡 Realtime

Ensure Realtime is enabled for the following tables in Supabase Dashboard -> Database -> Replication:
*   `shoots`
*   `events`
*   `notifications`
*   `chat_messages`
*   `payments`
*   `event_sponsors`
*   `sponsor_deliverables`
