
# 🪄 Task 18: AI Receipt Scanner (Financials)

**Phase:** 6 (Commercial & Real-Time)
**Dependencies:** Task 06 (AI Infra), Financials Module
**Output:** Expense Automation Component

---

## 1. Context
Organizers hate manual data entry. We need to allow them to upload receipts, have AI extract the data, and auto-categorize it into their budget.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a FinTech Engineer.
Action: Implement the "Smart Receipt Scanner".

=========================================
1. EDGE FUNCTION (`supabase/functions/process-receipt/index.ts`)
=========================================
- **Input:** `fileBase64` (Image or PDF).
- **Model:** `gemini-2.5-flash`.
- **Prompt:** "Extract data from this receipt. Return JSON: { vendor, date (ISO), total_amount, currency, category (Catering|Venue|Travel|Production|Marketing), line_items[] }."
- **Constraint:** Enforce strict JSON output.

=========================================
2. FRONTEND COMPONENT (`src/components/finance/ReceiptUploader.tsx`)
=========================================
- **UI:** File upload dropzone + Camera button (for mobile).
- **State:** "Analyzing..." loading state.
- **Review Modal:** Display the AI-extracted fields in a form for user verification before saving.
- **Action:** On save, insert into `expenses` table (you may need to create this table linked to `events` and `budget`).

=========================================
3. INTEGRATION
=========================================
- Add to `DashboardFinancials.tsx` as a "Quick Action".

Output the Edge Function and the React Component.
```

---

## 3. Verification Checklist
- [ ] Uploading a receipt image returns correct JSON.
- [ ] AI correctly guesses the category (e.g., "Starbucks" -> "Catering").
- [ ] Data is saved to Supabase after user confirmation.
