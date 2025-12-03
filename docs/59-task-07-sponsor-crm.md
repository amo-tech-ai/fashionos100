
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
Define TypeScript interfaces in `src/types/sponsorship.ts`:
- `SponsorProfile`: id, name, industry, contact_info.
- `EventSponsor` (The Deal): id, event_id, sponsor_id, status ('Lead', 'Negotiating', 'Signed'), value.
- Create `MOCK_DEALS` array with 5-10 realistic fashion brand deals.

=========================================
2. COMPONENT: `SponsorCard.tsx`
=========================================
- Props: `deal: EventSponsor`.
- Visuals:
  - Sponsor Logo (circle).
  - Brand Name (Bold).
  - Deal Value (e.g. "$15k").
  - Tier Badge (Gold/Silver).
  - Last Activity (e.g. "Email 2d ago").

=========================================
3. VIEW: `SponsorKanban.tsx`
=========================================
- Layout: Horizontal scrolling container.
- Columns: "New Leads", "Contacted", "Proposal Sent", "Signed", "Paid".
- Logic:
  - Filter `MOCK_DEALS` into columns based on status.
  - Render `SponsorCard` in each column.
  - (Bonus) Add a "+ New Deal" button at the bottom of "New Leads".

=========================================
4. VIEW: `SponsorDetail.tsx`
=========================================
- A full-page view for a single sponsor.
- **Header:** Large Logo, Name, Total Pipeline Value.
- **Tabs:**
  - "Overview": Industry, Website, Description.
  - "Deals": List of all events they are sponsoring.
  - "Deliverables": Checklist (Logo Upload, Social Post).
  - "Activations": Booth/Lounge details.

=========================================
5. INTEGRATION
=========================================
- Create `src/pages/dashboard/SponsorsPage.tsx` (renders Kanban).
- Create `src/pages/dashboard/SponsorDetailPage.tsx` (renders Detail).
- Add routes to `App.tsx`.

Output the Types, SponsorCard, and Kanban component.
```

---

## 3. Verification Checklist
- [ ] Kanban columns render correctly with horizontal scroll.
- [ ] Sponsors appear in correct status columns.
- [ ] Clicking a sponsor card navigates to the detail view.
- [ ] "Value" fields are formatted as currency.
