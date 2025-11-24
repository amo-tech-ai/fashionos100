# Fashion Show Organizer System Plan - Google AI Studio Prompt

This document contains a comprehensive prompt designed for Google AI Studio to generate a full system plan for the Fashion Show Organizer Platform.

---

## **“Create a Full Plan for a Fashion Show Organizer System”**

**You are an expert product strategist, system architect, and AI workflow designer.
Your task is to create a complete plan for a Fashion Show Organizer System.**

The system manages **pre-event planning, casting, schedule creation, venue layout, backstage operations, runway control, sponsors, media, and post-event ROI analytics**, powered by **Gemini tools** and **Supabase backend**.

---

## **1. System Overview**

Create a detailed overview describing:

* What the Fashion Show Organizer system is
* Who uses it (organizers, designers, production, models, sponsors, press)
* Primary modules of the system
* How AI (Gemini 3) enhances each module
* End-to-end workflow: **Before → During → After the show**

---

## **2. Core Features to Design**

Design a complete plan for these modules:

### **2.1 Event Creator + Timeline**

* Create event
* Auto-generate timeline
* AI-generated run-of-show
* JSON structured timeline output

### **2.2 Venues**

* Venue search
* Venue detail
* Floorplan designer
* Runway designer (AI-assisted)
* Availability & bookings
* Technical riders + contract processing

### **2.3 Casting & Stakeholders**

* Designers
* Models & agencies
* Stylists
* HMU teams
* Backstage crew
* Sponsors
* VIP guests

### **2.4 Scheduling**

* Fittings
* Rehearsals
* Quick changes
* Model walk order
* Show timing calculator (AI)

### **2.5 Sponsorship System**

* Leads
* Sponsor profiles
* Sponsorship packages
* Activations
* Deliverables
* Sponsor Portal

### **2.6 Media + Social**

* Content planning
* AI social captions
* AI image generation for teasers & story frames

### **2.7 Backstage + Runway Control**

* Live cues
* Scene/lighting triggers
* Model call times
* Checklist automation

### **2.8 Reports & ROI**

* Post-event analytics
* Sponsor ROI dashboard
* Season archive (RAG)

---

## **3. Map Each Module → Gemini Tools**

Explain how to use:

* **Text generation** (scripts, captions, emails)
* **Image generation** (moodboards, runway layouts, sponsor mockups)
* **Document understanding** (contracts, riders, floorplans)
* **Gemini thinking** (concept reasoning)
* **Thought signatures** (debug reasoning)
* **Structured outputs** (JSON for Supabase)
* **Function calling** (trigger edge functions)
* **Google Search grounding** (venue research)
* **Code execution** (schedule calculations, ROI)
* **URL context** (read venue sites)
* **File Search (RAG)** (past events, riders, floorplans)
* **Files API** (store docs, media)
* **Context caching** (retain show context)
* **Media resolution** (resize images for web, LED, print)

---

## **4. Database Layer (Supabase)**

Ask Gemini to:

* Propose **tables**
* Show **relationships**
* Add **indexes**
* Add **RLS policies**
* Add **Edge Functions** you need (e.g., schedule optimizer, conflict detection, AI layout generator)

Tables include:

* events
* event_phases
* tasks
* stakeholders
* event_stakeholders
* venues
* venue_availability
* venue_floorplans
* sponsor_leads
* sponsor_profiles
* event_sponsors
* sponsor_activations
* model_profiles
* designer_profiles
* media_assets
* reports
* analytics

---

## **5. UI/UX System**

Ask Gemini to design:

### **5.1 Main dashboard**

* KPIs
* Next actions
* Upcoming events
* Deliverables summary

### **5.2 Screens (merged & optimized)**

Generate Figma-ready UI plans for:

1. **Event Dashboard**
2. **Venue + Runway Designer**
3. **Casting Director**
4. **Backstage Control**
5. **Sponsor Suite**
6. **Media Library**
7. **AI Control Center**

Include:

* Layouts
* Component lists
* Navigation model
* Adaptive mobile vs desktop design
* Modern fashion-brand visual style

---

## **6. Mermaid Diagrams**

Ask Gemini to generate:

* **Site Map**
* **Navigation Flow**
* **ERD (Entity Relationship Diagram)**
* **End-to-end workflow**

---

## **7. Output Requirements**

Your response must include:

* System architecture
* Database schema
* Suggested edge functions
* AI workflow integrations
* Feature list
* Figma-ready UI structures
* Mermaid diagrams
* Recommendations for scalability

Make everything clean, structured, and beginner-friendly.