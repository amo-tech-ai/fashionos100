
# Changelog

## [2.0.1] - 2025-03-10 (Hotfix)
### 🐛 Bug Fixes
- **Build Pipeline:** Fixed Vercel build error `ENOENT: tsconfig.node.json` by ensuring the file is present and correctly configured for Vite 5/6 ecosystem.
- **Configuration:** Verified `vite.config.ts` path resolution for ESM compatibility.

## [2.0.0] - 2025-03-10 (Gold Master)
### 🚀 Feature Complete
- **Sponsor CRM:** Full suite of tools for managing sponsors, including AI lead scoring, contract generation, activation tracking, and a dedicated external portal.
- **Event Wizard:** Production-ready event creation with AI drafting, Google Maps venue verification, and schedule optimization.
- **Studio Operations:** Complete booking wizard, visual QA system, and asset delivery portal.
- **Infrastructure:** System Health dashboard for monitoring database, storage, and AI service connectivity.

### 🔒 Security & Performance
- **Edge Functions:** All AI interactions (Gemini, Veo) are secured behind Supabase Edge Functions.
- **RLS:** Row Level Security policies implemented for multi-tenant data isolation.
- **Realtime:** Optimized WebSocket subscriptions for live updates on dashboards.

## [1.7.0] - 2025-03-09
### 🚀 Sponsor CRM Enhancements
- **Sponsor Profile:** Added "Contact Sponsor", "Activity Feed" tab, and "Contracts" management section.
- **Sponsor List:** Added advanced filtering (Type, Status, Partnership Level) and sorting options.
- **AI Lead Scoring:** Visualized Lead Score and Category on Sponsor Cards.
- **Contracts:** Integrated contract management directly into Sponsor Detail view.
- **Types:** Updated TypeScript definitions for extended CRM features.

## [1.6.0] - 2025-03-09
### 🚀 Production Polish & Standardization
- **UI Standardization:** Implemented reusable `StatusBadge` and `EmptyState` components across all dashboards (Events, Financials, Sponsors) to ensure visual consistency.
- **Code Quality:** Refactored `ErrorBoundary` to a class component to resolve TypeScript strict mode issues.
- **Mobile Optimization:** Verified table responsiveness and safe-area handling for sticky navigation elements.
- **Verification:** Confirmed all AI Edge Functions are correctly wired to frontend services with proper error handling.