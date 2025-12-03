
# 🪄 Task 07: Sponsor CRM Module

**Phase:** 2 (System Build)
**Dependencies:** Task 02 (UI), Task 03 (DB)
**Output:** Kanban Board & Sponsor Profiles

---

## 1. Context
Organizers need to track sponsorship deals. This requires a Kanban board visualization (Lead -> Negotiating -> Signed) and a detail view for managing sponsor relationships.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Product Engineer.
Action: Build the Sponsor CRM Dashboard.

=========================================
1. TYPES & MOCK DATA
=========================================
Define TypeScript interfaces in `src/types/sponsor.ts`:
- `Sponsor`: id, name, industry, tier (Gold/Silver), status, value, logo_url.
- Create a `MOCK_SPONSORS` array with 5-10 realistic fashion brands.

=========================================
2. KANBAN BOARD (`src/components/crm/SponsorPipeline.tsx`)
=========================================
- Layout: Horizontal scrolling container.
- Columns: "New Leads", "Contacted", "Proposal Sent", "Signed".
- **Card Component:**
  - Display Logo, Name, Estimated Value.
  - Simple "Move to Next Stage" button (for MVP, instead of complex drag-and-drop).
- Logic: Filter `MOCK_SPONSORS` by status into columns.

=========================================
3. SPONSOR PROFILE (`src/components/crm/SponsorProfile.tsx`)
=========================================
- A detail view for a single sponsor.
- **Header:** Large Logo, Name, Current Status.
- **Tabs:**
  - "Overview": Description, Contact Info.
  - "Deliverables": Checklist of assets (Logo, Video).
  - "Activations": Booth/Lounge details.
- **AI Action:** Add a button "Draft Pitch Email" that logs "Calling AI..." to console.

=========================================
4. PAGE INTEGRATION
=========================================
- Update `src/pages/dashboard/SponsorsPage.tsx` to render the Pipeline by default.
- Add a way to click a card and open the Profile view (modal or navigation).

Output the Types, Pipeline component, and Profile component.
```

---

## 3. Verification Checklist
- [ ] Kanban columns render correctly.
- [ ] Sponsors appear in correct columns.
- [ ] Clicking a sponsor opens the detail view.
- [ ] Layout handles overflow (horizontal scroll) on mobile.
