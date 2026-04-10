# FriendAway Architecture

## Product shape

FriendAway is a location-based social network for people living abroad. The UI is centered on city feeds, communities, direct messaging, and profile context such as country of origin and arrival cohort.

## Frontend

- Next.js App Router with route segments for `Home`, `Communities`, `Discover`, `Messages`, and `Profile`
- TailwindCSS design system with rounded cards, soft shadows, and an airy SaaS-style layout
- Reusable components for feed, communities, chat, and profile rendering

## Backend

- Supabase Auth for email/password authentication
- PostgreSQL schema in [`database/schema.sql`](/Users/sevogumusboga/Desktop/FriendAway/database/schema.sql)
- Realtime channel hook for direct messages

## Data strategy

The initial scaffold uses mock data in development-facing queries so the product surface is visible before a Supabase instance is connected. Replace the mock returns in [`lib/supabase/queries.ts`](/Users/sevogumusboga/Desktop/FriendAway/lib/supabase/queries.ts) with live Supabase queries once environment variables are set.
