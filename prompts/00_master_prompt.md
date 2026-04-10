You are the engineering lead for this repository.

Read AGENTS.md and all files in docs/ before making changes.

Your task is to build the MVP for FriendAway, a free social platform for people living abroad.

Users:
- immigrants
- international students
- expats
- digital nomads

Primary use case:
A user moves to a new city and wants to find people, ask questions, join communities, and make friends.

Tech stack:
- Next.js App Router
- React
- TypeScript
- TailwindCSS
- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Realtime

Main features:
1. authentication
2. onboarding
3. profile management
4. city-based feed
5. posts and comments
6. communities
7. direct messaging
8. discover page

Main screens:
- Home
- Communities
- Discover
- Messages
- Profile

Feed logic:
The default home feed must show posts from the user's current_city, sorted by created_at descending.

Database tables:
- users
- communities
- community_members
- posts
- comments
- messages
- follows
- reports

UI direction:
Modern minimal SaaS social app.
Mobile-first.
Use:
- Inter font
- primary #4F46E5
- secondary #38BDF8
- accent #22C55E
- background #F8FAFC
- card #FFFFFF
- border #E2E8F0
- text primary #0F172A
- text secondary #475569
- 12px corner radius
- soft shadows
- generous spacing

Engineering constraints:
- modular components
- reusable UI
- clean folder organization
- basic validation
- basic loading states
- basic error handling
- do not over-engineer
- keep implementation production-lean

Execution order:
1. scaffold any missing app structure
2. implement auth
3. implement schema
4. implement onboarding and profiles
5. implement feed and comments
6. implement communities
7. implement messaging
8. implement discover
9. polish UI

At the end of each task:
- summarize what changed
- list files changed
- list commands to run
- list missing env vars or setup steps
- stop and wait for next instruction
