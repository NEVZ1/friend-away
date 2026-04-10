# OFFLINE_BUILD_PLAN

## Goal

Finish FriendAway as a complete offline-capable MVP before connecting Supabase.

This plan treats Supabase as a later backend swap, not a blocker.

## Build order

### Phase 0: Baseline
- install dependencies
- create `.env.local`
- verify typecheck, lint, and build
- run local dev server

### Phase 1: Demo data layer
- create a client-side demo store
- persist demo session in `localStorage`
- persist profile data
- persist onboarding state
- persist posts
- persist comments
- persist joined communities
- persist messages
- add demo reset capability

### Phase 2: Demo auth and onboarding
- make login work in demo mode
- make signup work in demo mode
- create a local session model
- redirect based on demo auth state
- redirect based on onboarding completion
- make onboarding save locally

### Phase 3: Interactive product flows
- create post
- create comment
- join community
- leave community
- send message
- edit profile
- update profile stats from local data

### Phase 4: Discover and recommendations
- compute people-like-you locally
- compute recent arrivals locally
- compute suggested communities locally
- add search/filter for communities
- add search/filter for discover

### Phase 5: UX polish
- improve empty states
- improve loading states
- improve error states
- tighten responsive layout
- improve mobile nav ergonomics
- polish copy and prompts

### Phase 6: Verification
- add tests for demo flows
- add a seed/reset script
- run typecheck
- run lint
- run production build

## Brain list

When working through the offline build, think in this order:

1. State model
- What data must exist locally?
- What is derived vs persisted?
- What can be shared between pages?

2. Session model
- How does a user become "logged in" without Supabase?
- What marks onboarding complete?
- What redirects depend on auth state?

3. Action model
- What actions mutate data?
- Where should each action write?
- How do pages refresh after a mutation?

4. UX model
- What happens when data is empty?
- What happens on first launch?
- What happens after reset?

5. Swap model
- Can this logic be replaced later by Supabase without rewriting the whole UI?
- Are data shapes aligned with the future backend schema?

## Success criteria

FriendAway is "offline-complete" when:
- a user can sign up locally
- onboarding persists locally
- profile edits persist locally
- posts/comments persist locally
- community membership persists locally
- messages persist locally
- discover recommendations derive from local state
- reset returns the app to a clean seeded state
- checks and build pass
