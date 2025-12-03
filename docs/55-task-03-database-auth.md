# 🪄 Task 03: Database & Authentication

**Phase:** 2 (System Build)
**Dependencies:** Supabase Project
**Output:** SQL Schema & Auth Config

---

## 1. Context
We establish the multi-tenant data layer. This includes the core `profiles` table (linked to Auth), the `organizations` table (tenancy), and the high-level work containers (`projects`, `shoots`).

## 2. Execution Prompt

**Copy and paste this into your AI assistant:**

```text
You are a Database Architect.
Action: Generate the SQL Schema for FashionOS.

=========================================
1. EXTENSIONS & ENUMS
=========================================
- Enable `uuid-ossp`.
- Create types:
  - `user_role`: 'admin', 'member', 'client'
  - `project_status`: 'lead', 'active', 'completed'
  - `shoot_type`: 'photo', 'video', 'hybrid'

=========================================
2. TABLES (With RLS Enabled)
=========================================
Write SQL for:

- **`profiles`**:
  - `id` (uuid, ref auth.users)
  - `full_name`, `avatar_url`, `role`.

- **`organizations`**:
  - `id`, `name`, `slug`.

- **`projects`**:
  - `id`, `org_id`, `title`, `status`, `deadline`.

- **`shoots`**:
  - `id`, `project_id`, `type`, `date`, `look_count`.

=========================================
3. RLS POLICIES
=========================================
- `profiles`: Users can update their own.
- `organizations`: Read-only for members.
- `projects`: Read/Write for organization members.

=========================================
4. TRIGGERS
=========================================
- Add a trigger to `auth.users` that automatically creates a `public.profiles` row on signup.

Output a single, valid `.sql` block ready for the Supabase SQL Editor.
```

---

## 3. Verification Checklist
- [ ] SQL runs without syntax errors.
- [ ] New user signup creates a profile row.
- [ ] RLS prevents accessing data from other organizations (if multi-tenant logic is tested).
