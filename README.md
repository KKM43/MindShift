# Moodistic

Moodistic is a React + TypeScript journaling app with AI-powered mood tracking, insights, and language support. It uses Supabase for authentication and database storage, along with a small Express backend for AI request proxying.

## Features

- Journal entry creation with AI-driven reflection and mood analysis
- Mood tracking and history view
- Insights page with charts, sentiment summaries, and mood trends
- Multi-language support (English, Hindi, Marathi)
- Supabase authentication and secure session handling
- Backend proxy for AI model requests and mood honesty analysis

## Repository Structure

- `src/`
  - `App.tsx` - app routing and authenticated route handling
  - `main.tsx` - React app entry point
  - `pages/` - page components for auth, journal, insights, and password reset
  - `components/` - reusable UI components like mood selectors, charts, sidebar, and modals
  - `hooks/` - custom hooks for auth, journal state, insights, and language selection
  - `lib/` - AI prompt generation, retrieval utilities, Supabase helpers, and app constants
  - `styles/` - shared style tokens and theme variables
- `server/`
  - `index.js` - Express backend proxying AI requests and handling mood honesty analysis
- `public/` - static assets like icons

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` files:

- Frontend: `.env` or `.env.local`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_API_URL`

- Backend: `server/.env`
  - `OPENAI_API_KEY` (or equivalent for the AI provider used by the backend)

3. Start development servers:

```bash
npm run dev
npm --prefix server install
npm --prefix server start
```

## Deployment Notes

- Ensure `VITE_API_URL` points to the deployed backend endpoint.
- The backend proxy is required for AI requests to avoid exposing API keys in the frontend.
- Supabase auth and DB must be configured with the correct project URL and anon key.

## Important Files

- `src/lib/api.ts` - centralizes API URL validation
- `server/index.js` - handles API proxying and rate-limited AI requests
- `src/hooks/useJournal.ts` - manages journal entry submission and retrieval
- `src/hooks/useInsights.ts` - computes insights and caching logic



