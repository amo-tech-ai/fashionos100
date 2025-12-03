
# 🧪 Testing & QA Strategy

**Version:** 1.0
**Approach:** Pyramid (Unit > Integration > E2E > AI Eval)

---

## 1. Testing Pyramid

| Level | Scope | Tool | CI Gate? |
| :--- | :--- | :--- | :--- |
| **Unit** | Utilities, Hooks, Components | Vitest + Testing Library | Yes |
| **Integration** | Edge Functions + DB | Supabase Local Test | Yes |
| **E2E** | User Flows (Booking, Login) | Playwright | Yes (Staging) |
| **AI Eval** | Gemini Output Quality | Custom Scripts (Golden Set) | No (Nightly) |

---

## 2. Unit Testing Specs

### 2.1 Critical Logic to Test
*   `pricing.ts`: Verify `calculateTotal()` handles volume discounts and tax correctly.
*   `booking-steps.ts`: Verify step progression logic.
*   `utils/format.ts`: Currency and date formatting helpers.

### 2.2 Component Testing
*   Test `Button` states (loading, disabled).
*   Test Form inputs (validation errors display).

---

## 3. Integration Testing (Backend)

### 3.1 RLS Policy Verification
Create a test suite `tests/rls.test.sql` that:
1.  Creates User A and User B.
2.  User A creates a Shoot.
3.  **Assert:** User B selecting shoots returns 0 rows.
4.  **Assert:** Admin selecting shoots returns 1 row.

### 3.2 Edge Functions
Mock `GoogleGenAI` calls to test the wrapper logic:
*   Verify `generate-event-draft` parses JSON correctly.
*   Verify `create-checkout` calls Stripe and returns a URL.

---

## 4. E2E Testing (Playwright)

### Critical Path: Guest Booking
1.  Navigate to `/start-project`.
2.  Select "Photography" -> "Lookbook".
3.  Click "Next" -> Validate Step 2 loads.
4.  Enter "10" looks -> Verify Sidebar Price updates.
5.  Fill Brief -> Click "AI Polish" -> Verify Textarea updates.
6.  Click "Pay" -> Verify redirection to Dashboard (Mock Payment).

---

## 5. AI Evaluation Strategy (The "Vibe Check")

AI outputs are non-deterministic. We test them using a **Golden Dataset** comparison.

### Test Dataset (`tests/ai/golden_prompts.json`)
```json
[
  {
    "input": "Runway show in Brooklyn, 500 people",
    "expected_keys": ["venue", "capacity", "budget_estimate"],
    "forbidden_words": ["error", "undefined", "[Insert Name]"]
  }
]
```

### Evaluation Script (`tests/ai/eval.ts`)
1.  Run prompt through `generate-event-draft` function.
2.  **Structure Check:** Does output JSON match Zod schema?
3.  **Quality Check:** Is `budget_estimate` > 0? Is `location` mapped to "New York"?
4.  **Latency Check:** Did response take < 15s?

Run this nightly to detect model drift or prompt regressions.

