# Backend Notes

FriendAway uses Supabase for auth, Postgres, storage-ready profile metadata, and realtime messaging.

## Responsibilities

- `users` mirrors profile fields from Supabase Auth metadata.
- `posts`, `comments`, and `messages` are stored in Postgres and streamed via Supabase Realtime.
- Row Level Security protects private data while keeping city feeds and communities discoverable.

## Recommended next steps

1. Add database migrations from `database/schema.sql` in your Supabase project.
2. Generate strongly typed database definitions with `supabase gen types typescript`.
3. Replace mock query fallbacks in `lib/supabase/queries.ts` with live queries.
