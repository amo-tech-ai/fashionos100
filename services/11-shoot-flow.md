
# 📸 FashionOS MVP Booking Flow — UI/UX Specification

**Status:** Draft  
**Version:** 1.0  
**Target User:** Fashion Designers & Brand Managers  
**Vibe:** Minimalist Luxury, Editorial, "Airbnb for Fashion"

---

## 1. 🎨 Visual Style System

Before diving into screens, we define the "FashionOS Premium" design tokens.

### Color Palette
*   **Canvas (Backgrounds):**
    *   `#FBF8F5` (Fashion Cream) - Main page background. Warm, paper-like.
    *   `#FFFFFF` (White) - Cards and input fields.
*   **Ink (Typography):**
    *   `#0A0A0A` (Fashion Black) - Primary headings and body.
    *   `#525252` (Neutral 600) - Secondary text, labels.
*   **Accent (Digital):**
    *   `#C084FC` (Fashion Purple) - Primary buttons, active states, AI moments.
    *   `#F3E8FF` (Purple 100) - Hover states, selected backgrounds.
*   **Semantic:**
    *   `#EF4444` (Red) - Errors.
    *   `#10B981` (Emerald) - Success/Confirmed.

### Typography
*   **Headings:** *Playfair Display* (Serif). Used for "Step X of Y" and major questions.
    *   *H1:* 48px/1.1 (Desktop), 36px/1.1 (Mobile)
    *   *H2:* 32px/1.2
*   **Body/UI:** *Inter* (Sans-serif). Used for inputs, buttons, prices.
    *   *Body:* 16px/1.6
    *   *Label:* 12px/1.0, Uppercase, Tracking 0.1em, Bold.

### Component Styling
*   **Cards:** White background, `border-1` (`border-gray-100`), `rounded-xl` (16px).
    *   *Hover:* `shadow-lg`, `border-gray-200`, `scale-[1.01]`.
*   **Buttons:**
    *   *Primary:* Fashion Black background, White text, Sharp corners or slightly rounded (4px). Uppercase text.
    *   *Secondary:* White background, Black border.
*   **Inputs:** Large touch targets (56px height), no background (`bg-transparent` or `bg-white`), clear bottom border or full border.

---

## 2. 📱 Screen-by-Screen UX Design

### Screen 0: Entry / Hero CTA
**Goal:** The "Hook". Convince the user to start immediately.
*   **Layout:** Split screen (Desktop) / Stacked (Mobile).
*   **Visuals:** Left side is pure text + CTA. Right side is a cinematic video loop of a studio shoot (model posing, flash firing).
*   **Copy:**
    *   *H1:* "Book a fashion shoot in days, not weeks."
    *   *Sub:* "Editorial quality photo & video tailored to your collection."
    *   *Primary CTA:* "Start Your Shoot" (Arrow Right icon).
    *   *Secondary:* "View Pricing".

### Screen 1: Shoot Type (The Wizard Starts)
**Goal:** High-level scope.
*   **Layout:** 3-Card Grid.
*   **Cards:**
    1.  **Photography:** Icon (Camera). "Lookbooks & E-comm."
    2.  **Video:** Icon (Play Button). "TikToks, Reels & Campaigns."
    3.  **Hybrid (Best Value):** Icon (Sparkles). "Photo + Video Package."
*   **Interaction:** Selecting a card highlights it with a `ring-2 ring-purple-500` and a light purple background.
*   **Toggle:** "Remote / Virtual Shoot" vs "In-Person Studio" (Pill toggle at bottom).

### Screen 2: Fashion Category
**Goal:** Context setting.
*   **Layout:** Grid of Aspect Ratio Cards (3:4 vertical).
*   **Visuals:** Each card has a subtle background image of that category (e.g., a sneaker for E-comm, a model for Lookbook) with a dark overlay and white text.
*   **Options:**
    *   Lookbook (Editorial vibe)
    *   Ecommerce (White background, crisp)
    *   Social Campaign (Lifestyle, motion)
    *   Runway / Event
*   **Helper:** "What is the primary goal?" (Dropdown: Launch, Content Refresh, PR).

### Screen 3: Quantity & Scope
**Goal:** Pricing anchor.
*   **Layout:** Horizontal slider or Segmented Control.
*   **UI:**
    *   "1-3 Looks" (Test Shoot)
    *   "4-8 Looks" (Capsule)
    *   "9-15 Looks" (Collection)
    *   "16+ Looks" (Enterprise)
*   **Dynamic Feedback:** As they click, the "Estimated Price" in the Summary Sidebar updates instantly.

### Screen 4: Location & Time
**Goal:** Logistics.
*   **Layout:** Two columns.
*   **Left:** Location Selector.
    *   *Studio A (Brooklyn)* - Map thumbnail.
    *   *Studio B (Manhattan)* - Map thumbnail.
    *   *Virtual* - "Ship us your items".
*   **Right:** Custom Calendar Component.
    *   Minimalist grid. Available dates in Black circles. Selected date fills Purple.
    *   Time slots below: "Morning (9am-1pm)", "Afternoon (2pm-6pm)".

### Screen 5: The Brief (AI Powered)
**Goal:** Input reduction.
*   **Layout:** Clean form.
*   **Input 1 (The Magic Box):** Large textarea.
    *   *Placeholder:* "Describe your collection... e.g. 'SS25 edgy streetwear, dark mood, neon lighting...'"
    *   *AI Feature:* Button "✨ Polish Brief with Gemini". (Clicking this reformats their messy notes into a structured shot list).
*   **Input 2:** Link pasting (Pinterest, Instagram, Drive).
*   **Checkboxes:** "Need hair/makeup?", "Need models?", "Need stylist?".

### Screen 6: Summary & Review
**Goal:** Trust & Verification.
*   **Layout:** "Receipt" style visual.
*   **Visuals:** A long paper-like card with a jagged bottom edge css effect.
*   **Content:**
    *   Line items (Shoot type, Quantity, Studio fee).
    *   Subtotal.
    *   Service Fee.
    *   **Total (Large Serif Font).**
*   **Input:** Promo Code field (Understated).

### Screen 7: Payment
**Goal:** Conversion.
*   **Layout:** Split view. Left: Form. Right: locked summary.
*   **Components:**
    *   Stripe Element (Card number, CVC).
    *   "Save card for future bookings" toggle.
*   **CTA:** "Pay & Book $1,250" (Lock icon).

### Screen 8: Confirmation
**Goal:** Reassurance.
*   **Visuals:** High-fashion image (maybe a polaroid style) of the specific studio they booked.
*   **Copy:** "You're booked, [Name]. See you on [Date]."
*   **Actions:**
    *   "Add to Calendar" (Outline button).
    *   "Go to Dashboard" (Primary button).

---

## 3. 🧱 JSON UI Specification

This JSON object defines the structure for the frontend implementation.

```json
{
  "flow": "shoot_booking_v1",
  "theme": "fashion_os_premium",
  "steps": [
    {
      "id": "intro",
      "type": "hero_cta",
      "copy": {
        "h1": "Book a fashion shoot in days, not weeks.",
        "sub": "Photo + video shoots tailored to your collection.",
        "cta_primary": "Start your shoot"
      },
      "assets": {
        "background_video": "studio_session_loop_4k"
      }
    },
    {
      "id": "step_1",
      "title": "Shoot Type",
      "component": "CardSelectionGrid",
      "options": [
        { "id": "photo", "icon": "camera", "label": "Photography" },
        { "id": "video", "icon": "video", "label": "Video Production" },
        { "id": "hybrid", "icon": "sparkles", "label": "Photo + Video" }
      ],
      "sidebar_summary": false
    },
    {
      "id": "step_2",
      "title": "Category",
      "component": "ImageCardGrid",
      "options": [
        { "id": "lookbook", "image": "img_lookbook_vibe", "label": "Lookbook" },
        { "id": "ecomm", "image": "img_product_white_bg", "label": "E-commerce" },
        { "id": "campaign", "image": "img_lifestyle_outdoor", "label": "Campaign" }
      ]
    },
    {
      "id": "step_3",
      "title": "Quantity",
      "component": "SegmentedControl",
      "options": ["1-3 Looks", "4-8 Looks", "9-15 Looks", "16+ Looks"],
      "ai_estimator": {
        "enabled": true,
        "model": "gemini-3-flash",
        "prompt": "Estimate shoot duration based on look count"
      }
    },
    {
      "id": "step_5",
      "title": "The Brief",
      "component": "SmartForm",
      "fields": [
        {
          "type": "textarea",
          "label": "Creative Direction",
          "ai_enhance": true
        },
        {
          "type": "url_list",
          "label": "Moodboard Links"
        }
      ]
    }
  ]
}
```

---

## 4. 💡 Gemini 3 Integration Logic

### Text Generation (Brief Polish)
*   **Input:** User types: "I want it to look like the new Balenciaga campaign, kinda dark, street vibes."
*   **Gemini Action:** Calls `generateContent` with a system prompt to act as a Creative Director.
*   **Output:** "Aesthetic: High-contrast street style. Mood: Moody, Industrial, Edgy. Reference: Balenciaga-inspired visuals."
*   **UI Result:** The messy text is replaced (with animation) by the structured brief.

### Image Understanding (Moodboard Analysis)
*   **Input:** User pastes an Instagram URL.
*   **Gemini Action:** `googleSearch` tool or `fetch` to get the image, then Vision capabilities to analyze it.
*   **Output:** Tags: `["studio_lighting", "minimalist", "neutral_tones"]`.
*   **UI Result:** Recommended "Studio Scenes" are automatically filtered to match these tags in the background.

---

## 5. 📱 Responsive Strategy

*   **Desktop:**
    *   **Split View:** Left 60% is the Question/Form. Right 40% is a Sticky Summary Card that updates in real-time with pricing.
    *   **Navigation:** "Back" button is text on the left. "Next" is a large button on the right.
*   **Mobile:**
    *   **Single Column:** Form takes full width.
    *   **Summary:** Collapsed into a "Bottom Sheet" or "Accordion" at the bottom of the screen, showing only "Total: $XXX". Clicking it expands the details.
    *   **Navigation:** "Next" button is fixed/sticky at the bottom of the viewport (thumb zone).

---

## 6. 🖼️ Image Generation Prompts (for implementation)

If using AI to generate assets for this flow:

*   **Entry Hero:** *"Cinematic wide shot of a high-end fashion photography studio, white cyclorama wall, professional lighting equipment, soft focus, minimalist aesthetic, 4k."*
*   **Step 2 Card (Lookbook):** *"Fashion model posing in a minimalist studio, wearing avant-garde streetwear, neutral colors, editorial lighting, high grain."*
*   **Step 2 Card (Ecomm):** *"Clean product photography of a leather handbag on a pure white background, sharp focus, commercial lighting."*
*   **Success Page:** *"Polaroid photo resting on a marble table, showing a fashion studio set, warm sunlight casting shadows, luxury vibe."*
