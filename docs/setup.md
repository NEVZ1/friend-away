# Setup

## Environment

Copy `.env.example` into `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Local run

1. `chmod +x ./scripts/*.sh`
2. `./scripts/setup.sh`
3. Apply [`database/schema.sql`](/Users/sevogumusboga/Desktop/FriendAway/database/schema.sql) in Supabase SQL editor.
4. `./scripts/check.sh`
5. `./scripts/dev.sh`

## Deployment

The project is Vercel-ready. Add the same environment variables in Vercel and deploy the repository as a standard Next.js app.
