
# 🪄 Task 13: Security Audits & Documentation

**Phase:** 4 (Infrastructure & QA)
**Dependencies:** Task 03 (Schema)
**Output:** SQL Audit Script, README, CONTRIBUTING

---

## 1. Context
We need to ensure the project is secure by design and well-documented for handover. The RLS audit script provides a way to verify data isolation policies.

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Security Engineer and Technical Writer.
Action: Create security verification scripts and project documentation.

=========================================
1. RLS AUDIT SCRIPT
=========================================
Create `supabase/tests/security.sql`:
- Write SQL comments and queries (using pgTAP conceptual style) to verify:
  - **Project Isolation:** User A should not see User B's projects.
  - **Public Access:** Anon users should see events where `is_public = true`.
  - **Admin Access:** Admins should see all data.
- Include dummy insert statements to test these policies (wrapped in a transaction that rolls back).

=========================================
2. PROJECT DOCUMENTATION
=========================================
Create `README.md`:
- **Title:** FashionOS 2.0.
- **Architecture:** Explain the React 19 (CDN) + Supabase stack.
- **Setup:**
  - `npm install`
  - Copy `.env.example` to `.env`.
  - Run `supabase start`.
- **Key Features:** List Booking Wizard, Event Manager, Sponsor CRM.

Create `CONTRIBUTING.md`:
- **Code Style:** Functional React, Tailwind utility classes.
- **Git Flow:** Feature branches -> PR -> Main.
- **Conventions:** Conventional Commits (feat, fix, chore).

Output the content for these 3 files.
```

---

## 3. Verification Checklist
- [ ] `README.md` provides clear instructions for a new developer.
- [ ] `security.sql` logic holds up (conceptually tests RLS).
