# Moodistic — Developer Documentation

**Project:** Moodistic
**Type:** AI-powered mood tracking and journaling web application
**Stack:** React 19 + TypeScript + Vite + Supabase + Express.js + Groq AI
**Status:** Development / Audit-ready

---

## Overview

Moodistic helps users journal their feelings, track mood patterns, and receive empathetic AI reflections. The application combines a React frontend with a Supabase backend for auth and storage, and an Express proxy that routes AI requests through the Groq API.

This document is intended for developers who want to understand the application architecture, set up the project locally, and extend the feature set.

---

## Repository Structure

```
mindshift/
├── public/
│   └── icons/               # Static app assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Core business and AI utilities
│   ├── pages/               # Route pages
│   ├── styles/              # CSS files
│   ├── types/               # Shared TypeScript types
│   ├── App.tsx              # Root app component
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles
├── server/                  # Express backend proxy
│   ├── index.js             # API proxy and rate limiting
│   └── package.json         # server dependencies
├── package.json             # frontend dependencies and scripts
├── vite.config.ts           # Vite config
├── tsconfig.app.json        # application TypeScript config
├── tsconfig.json            # workspace TypeScript config
├── tsconfig.node.json       # node tooling TypeScript config
├── eslint.config.js         # linting config
├── README.md                # public project readme
└── PROJECT_DOCUMENTATION.md # developer documentation
```

---

## Key Areas

### Frontend
- `src/App.tsx` — routing, authenticated route handling, and layout.
- `src/main.tsx` — app bootstrap and rendering.
- `src/pages/` — main pages: `AuthPage`, `JournalPage`, `InsightsPage`, `ResetPasswordPage`.
- `src/components/` — UI building blocks: mood picker, charts, sidebar, modal, crisis support.
- `src/hooks/` — reusable logic for auth, journal storage, insights generation, and language selection.
- `src/lib/` — core utilities for AI prompts, retrieval, Supabase initialization, and session helpers.

### Backend
- `server/index.js` — Express server exposing `/api/chat` and `/api/analyze-mood-honesty`.
- `server/.env` — backend environment variables including the AI provider key.

### Data and Types
- `src/types/index.ts` — shared type definitions used across components and hooks.
- The main persisted entity is `JournalEntry`, stored in Supabase.

---

## Core Features

- Supabase authentication with email/password and Google OAuth.
- Mood journaling with a 5-point emoji mood selector.
- AI-powered conversation and session summarization.
- Mood insights and trends using charts and heatmaps.
- Multilingual UI support: English, Hindi, Marathi.
- Crisis detection and guided support flow.
- Retrieval-assisted AI context from previous entries.

---

## Developer Setup

### 1. Install dependencies

```powershell
npm install
npm --prefix server install
```

### 2. Configure environment variables

Create frontend env file:

`.env.local`
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3001
```

Create backend env file in `server/`:

`.env`
```
GROQ_API_KEY=your-groq-api-key
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### 3. Start the backend

```powershell
npm --prefix server start
```

### 4. Start the frontend

```powershell
npm run dev
```

---

## Running and Testing

- Frontend runs on `http://localhost:5173` by default.
- Backend runs on `http://localhost:3001`.
- The frontend expects `VITE_API_URL` to point to the backend API.

### Build for production

```powershell
npm run build
npm run lint
```

---

## Important Application Flows

### Authentication
- `src/hooks/useAuth.ts` handles sign in, sign up, Google OAuth, sign out, forgot password, and password reset.
- Auth state is persisted by Supabase and synced using `onAuthStateChange()`.
- The password reset redirect should use the current origin, not a hardcoded localhost URL.

### Journaling
- `src/pages/JournalPage.tsx` is the main user interface for sessions.
- Mood selection, input state, AI conversation, crisis detection, and session saving happen here.
- Journal entries are fetched and saved via `src/hooks/useJournal.ts`.

### Insights
- `src/pages/InsightsPage.tsx` displays mood statistics, trend charts, and generated insights.
- `src/hooks/useInsights.ts` computes insights and caches them in localStorage.

### AI and Retrieval
- `src/lib/ai.ts` builds prompts, enforces client-side rate limits, and requests AI chat responses.
- `src/lib/retrieval.ts` finds relevant journal history via keyword and emotion matching.
- `src/lib/prompts.ts`, `languages.ts`, `memory.ts`, and `personality.ts` support prompt construction and personalization.

---

## Database Model

### `journal_entries`

The app stores journal entries in Supabase. Each record includes:
- `id`
- `user_id`
- `content`
- `ai_response`
- `mood_score`
- `created_at`

The current design assumes a Supabase table with a foreign key reference to `auth.users`.

---

## Environment Variables

### Frontend
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_API_URL`

### Backend
- `GROQ_API_KEY`
- `PORT`
- `FRONTEND_URL`

> Note: The frontend should validate `VITE_API_URL` before using it in production.

---

## Known Improvement Areas

These are important implementation notes for developers working on the repo:

- Backend CORS should enforce allowed origins instead of allowing all origins.
- The password reset redirect must use runtime origin detection.
- The insights cache should use a unique entry key, not only the entry count.
- Batch mood honesty analysis is more efficient than sequential API calls.
- Rate limiting should be aligned between frontend and backend.
- Remove or archive unused assets such as `src/styles/index copy.css` if it is not part of the active build.

---

## Recommended Next Tasks

1. Verify and harden backend CORS handling in `server/index.js`.
2. Confirm `VITE_API_URL` is required and fail fast if missing.
3. Improve the journal entry search/filter UI in `JournalPage.tsx` or remove unused state.
4. Add error state handling in `InsightsPage.tsx`.
5. Review mobile responsiveness and accessibility attributes across interactive components.

---

## Useful Files for Developers

- `src/App.tsx`
- `src/pages/JournalPage.tsx`
- `src/lib/ai.ts`
- `src/lib/retrieval.ts`
- `src/hooks/useJournal.ts`
- `src/hooks/useInsights.ts`
- `server/index.js`
- `README.md`
- `PROJECT_DOCUMENTATION.md`

---

## References

- Supabase docs: https://supabase.com/docs
- Vite docs: https://vitejs.dev
- React docs: https://react.dev

---

**Last Updated:** April 11, 2026
