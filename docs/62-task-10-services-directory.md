# 🪄 Task 10: Services & Directory

**Phase:** 3 (Public Site)
**Dependencies:** Task 09
**Output:** Reusable Service Templates & Talent Directory

---

## 1. Context
We need to scale the marketing site. Instead of building individual pages for every service (Photo, Video, Web), we build a **Template**. We also build the **Directory**, which acts as the public-facing marketplace for talent.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a React Component Engineer.
Action: Build the Service Template and Directory.

=========================================
1. SERVICE TEMPLATE (`src/components/templates/ServiceTemplate.tsx`)
=========================================
A reusable page layout.
- **Props:**
  - `title`, `subtitle`, `heroImage`
  - `features`: Array<{ title, description }>
  - `pricing`: Array<{ name, price, features[] }>
- **UI:**
  - Hero: `h-[60vh]` with parallax effect.
  - Pricing: Grid of `Card` components.
  - CTA: "Book [Service Name]" button linking to `/start-project`.

=========================================
2. PHOTOGRAPHY PAGE (`src/pages/site/services/PhotographyPage.tsx`)
=========================================
Implement the template.
- Title: "Premium Fashion Photography"
- Features: "E-Commerce", "Editorial", "Lookbook".
- Pricing: "Half Day ($800)", "Full Day ($1500)".

=========================================
3. DIRECTORY (`src/pages/site/DirectoryPage.tsx`)
=========================================
The "LinkedIn for Fashion" view.
- **`TalentCard.tsx`**:
  - Image (Aspect 3:4).
  - Name (Bold Serif).
  - Role (Small Sans).
  - Rate ("$150/hr").
- **Page Layout:**
  - Top: Search bar and Filter pills (Visual only).
  - Grid: Responsive grid of `TalentCard`.
  - **Mock Data:** Create an array of 6 diverse fashion creatives (Models, Photographers, Stylists).

=========================================
4. ROUTING
=========================================
Update `src/router.tsx` to include:
- `/services/photography`
- `/directory`

Output the code for `ServiceTemplate.tsx`, `PhotographyPage.tsx`, `TalentCard.tsx`, and `DirectoryPage.tsx`.
```

---

## 3. Verification Checklist
- [ ] Visiting `/services/photography` renders the template with correct data.
- [ ] Directory page shows a grid of talent cards.
- [ ] Images in the directory use the 3:4 aspect ratio.