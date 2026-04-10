# AGENTS.md

## Project
FriendAway is a free social web platform for people living abroad.
Target users: immigrants, international students, expats, digital nomads.

## Goal
Build a production-lean MVP with:
- authentication
- onboarding
- profile creation
- city-based feed
- communities
- messaging
- discover page

## Tech stack
- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime

## Product rules
- City is the primary matching axis.
- The app is social-first, not a static info portal.
- The feed should default to the user’s current city.
- Communities should support auto-generated cohorts:
  - country + city
  - arrival month + city
  - student communities if profile says student

## UX rules
- Mobile-first layout
- Clean modern SaaS UI
- Rounded corners
- Soft shadows
- Fast loading
- Minimal clutter

## UI system
- Font: Inter, sans-serif
- Primary: #4F46E5
- Secondary: #38BDF8
- Accent: #22C55E
- Background: #F8FAFC
- Card: #FFFFFF
- Border: #E2E8F0
- Text primary: #0F172A
- Text secondary: #475569
- Radius: 12px
- Shadow: 0 4px 20px rgba(0,0,0,0.06)

## Engineering rules
- Use TypeScript everywhere
- Use reusable components
- Keep files small and modular
- Prefer server components where appropriate
- Keep env variables centralized
- Add basic loading and empty states
- Add basic error handling
- Add basic form validation
- Do not break existing files when adding new features

## Output rules
When completing a task:
1. Explain what changed
2. List created/modified files
3. List commands to run
4. Note any missing env vars or manual setup
5. Stop after task completion
