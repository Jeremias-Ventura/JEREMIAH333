# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JEREMIAH33:3 is a faith-based focus timer application that pairs a simple countdown timer with rotating Bible verses. Built with Next.js 16, it provides a peaceful, distraction-free environment for focused work while keeping Scripture front and center.

## Commands

### Development
```bash
npm run dev        # Start development server on localhost:3000
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Run ESLint
```

## Architecture

### Core Structure

This is a Next.js 16 App Router application using TypeScript with strict mode enabled.

#### Route Groups

The app uses Next.js route groups to organize pages by access level:

- **`(public)/`** - Public pages accessible without authentication
  - `/` - Main timer page (client component for timer state)
  - `/about` - About page

- **`(auth)/`** - Authentication pages
  - `/login`, `/signup` - Email/password and OAuth authentication
  - `/forgot-password`, `/reset-password` - Password recovery flow
  - `/confirm` - Email confirmation page

- **`(protected)/`** - Protected pages requiring authentication
  - `/dashboard` - User statistics and session history
  - Layout uses [useAuth](hooks/useAuth.ts) hook and redirects to `/login` if unauthenticated

#### Authentication System

The app uses Supabase Auth with a graceful degradation pattern:

- **Server Actions**: All auth logic in [app/actions/auth.ts](app/actions/auth.ts) using `'use server'`
  - Supports OAuth (Google, GitHub) and email/password authentication
  - Server actions: `signInWithOAuth()`, `signInWithEmail()`, `signUpWithEmail()`, `resetPassword()`, `updatePassword()`, `signOut()`

- **Client Hook**: [hooks/useAuth.ts](hooks/useAuth.ts) provides `{ user, loading }` for client components
  - Listens to auth state changes via Supabase's `onAuthStateChange`
  - Used in protected layouts to guard routes

- **Middleware Protection**: [lib/supabase/middleware.ts](lib/supabase/middleware.ts) handles route protection
  - Redirects unauthenticated users from `/dashboard` to `/login`
  - Redirects authenticated users from `/login` to `/dashboard`
  - Only runs when Supabase is configured (graceful degradation)

- **Mock Clients**: When `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, [lib/supabase/client.ts](lib/supabase/client.ts) and [lib/supabase/server.ts](lib/supabase/server.ts) return mock implementations. Timer still functions; session tracking silently fails.

#### Database Schema

Four Supabase migrations define the data model:

1. **[001_create_focus_sessions.sql](supabase/migrations/001_create_focus_sessions.sql)**: `focus_sessions` table with RLS policies
2. **[002_create_user_profiles.sql](supabase/migrations/002_create_user_profiles.sql)**: `user_profiles` table with auto-creation trigger on signup
3. **[003_add_user_settings.sql](supabase/migrations/003_add_user_settings.sql)**: User preferences and settings
4. **[004_deny_session_modifications.sql](supabase/migrations/004_deny_session_modifications.sql)**: Explicit policies denying UPDATE/DELETE on `focus_sessions` (immutable history)

**Key constraint**: Focus sessions are immutable once created. Users can only INSERT, never UPDATE or DELETE.

#### Server Actions

- **[app/actions/auth.ts](app/actions/auth.ts)**: All authentication operations
- **[app/actions/sessions.ts](app/actions/sessions.ts)**: Focus session CRUD
  - `createSession(durationMinutes)` - Insert new completed session
  - `getSessions(limit)` - Fetch recent sessions
  - `getSessionStats()` - Calculate totals, streaks, trends
  - Includes streak calculation logic and trend detection (up/down/neutral)

#### Client/Server Boundary

- **Server Components**: Root layout handles metadata, fonts, analytics
- **Client Components**: Interactive UI marked with `"use client"`
  - Timer, auth forms, dashboard stats all client-side
  - [components/layout/ConditionalHeader.tsx](components/layout/ConditionalHeader.tsx) shows/hides header based on route

#### State Management

- Timer state managed locally in [components/Timer.tsx](components/Timer.tsx) using `useRef` for precision timing
- Auth state via [hooks/useAuth.ts](hooks/useAuth.ts) hook synced with Supabase
- Session tracking triggered on timer completion via `onComplete` callback
- Verse auto-rotation (every 5 minutes) controlled by parent via interval and ref

### Key Components

#### Timer ([components/Timer.tsx](components/Timer.tsx))
- High-precision timing with `startTimeRef` and `durationRef` to prevent drift
- Click-to-edit time input with MM:SS format validation and auto-fix
- Keyboard shortcuts: Space (start/pause), R (reset)
- Completion sound via Web Audio API
- Callbacks: `onComplete`, `onStart`, `onPause`, `onReset`

#### Authentication Components
- **[components/auth/](components/auth/)**: Login, Signup, OAuth buttons, password reset forms
- All use server actions from [app/actions/auth.ts](app/actions/auth.ts)
- Form validation includes minimum 8-character passwords

#### Dashboard Components
- **[components/dashboard/](components/dashboard/)**: StatsCard, SessionList, charts
- Fetches real data via `getSessionStats()` and `getSessions()` server actions
- Displays trends (up/down arrows), streaks, weekly/daily totals

### Middleware

[middleware.ts](middleware.ts) calls [lib/supabase/middleware.ts](lib/supabase/middleware.ts) to:
- Refresh Supabase session on each request
- Protect `/dashboard` routes (redirect to `/login`)
- Redirect authenticated users away from `/login` (to `/dashboard`)
- Matcher excludes static files and images

### Styling

- **Tailwind CSS 4** with PostCSS
- Custom font: Lora (Google Fonts, weights 400/500/600/700)
- Dark theme (`#0a0f1e`) with slate color palette
- Global styles in [app/globals.css](app/globals.css)
- Lucide React icons for UI elements

### Environment Variables

Required for full functionality (app works without them via mock clients):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_SITE_URL` - Production site URL (defaults to https://jeremiah33-3.app)

### Path Aliases

- `@/*` maps to project root (configured in [tsconfig.json](tsconfig.json))
- Use `@/components/*`, `@/lib/*`, `@/app/*`, `@/hooks/*` for imports

### Type Definitions

- **[types/auth.ts](types/auth.ts)**: `OAuthProvider`, `AuthResponse`, `EmailAuthResponse`
- **[types/session.ts](types/session.ts)**: `FocusSession`, `SessionStats`
- **[types/database.ts](types/database.ts)**: Supabase database schema types
- **[types/index.ts](types/index.ts)**: Shared types

### Important Implementation Details

1. **Supabase is Optional**: App gracefully handles missing configuration via mock clients. Timer and UI work; session tracking requires real Supabase.

2. **Timer Precision**: Uses `Date.now()` and elapsed time calculation to avoid `setInterval` drift.

3. **Immutable Sessions**: Focus sessions cannot be modified or deleted after creation (enforced by RLS policies). This ensures accurate historical tracking.

4. **Authentication Flow**:
   - Sign up requires email confirmation (unless disabled in Supabase settings)
   - Password reset sends email with magic link to `/reset-password`
   - OAuth redirects to `AUTH_CONFIG.redirectTo` after success

5. **Protected Routes**: Both middleware-level protection (server) and layout-level protection (client) using `useAuth` hook.

6. **Session Stats Calculation**:
   - Streaks check consecutive days with at least one session
   - Trends compare current period to previous period (today vs yesterday, this week vs last week)
   - All calculations happen server-side in [app/actions/sessions.ts](app/actions/sessions.ts)

7. **Favicon Handling**: Safari-optimized with cache-busted URLs (`?v=3`) and multiple formats (SVG, PNG, ICO). SVG listed first for Safari preference.

8. **Mobile Responsive**: Flex layout switches from column (mobile) to row (desktop) at `md` breakpoint.
