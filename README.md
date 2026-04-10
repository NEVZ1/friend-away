# FriendAway

FriendAway is a modern social networking web application for immigrants, international students, expats, and digital nomads living abroad.

## Included

- Next.js App Router project structure
- TailwindCSS SaaS-style UI
- Supabase client/server setup
- Auth server actions for login and signup
- Onboarding and editable profile flows
- Location-first feed, communities, discover, messages, and profile screens
- PostgreSQL schema and RLS starter policies
- Terminal scripts for setup, checks, and local development

## Structure

- `app/`
- `components/`
- `lib/`
- `hooks/`
- `pages/`
- `styles/`
- `backend/`
- `database/`
- `docs/`
- `prompts/`
- `scripts/`

## Codex Workflow

Persistent repo instructions live in [`AGENTS.md`](/Users/sevogumusboga/Desktop/FriendAway/AGENTS.md).

Planning and execution docs:
- [`docs/PRODUCT_SPEC.md`](/Users/sevogumusboga/Desktop/FriendAway/docs/PRODUCT_SPEC.md)
- [`docs/UI_SYSTEM.md`](/Users/sevogumusboga/Desktop/FriendAway/docs/UI_SYSTEM.md)
- [`docs/TASKS.md`](/Users/sevogumusboga/Desktop/FriendAway/docs/TASKS.md)

Prompt packs:
- [`prompts/00_master_prompt.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/00_master_prompt.md)
- [`prompts/01_auth.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/01_auth.md)
- [`prompts/02_schema.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/02_schema.md)
- [`prompts/03_profiles.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/03_profiles.md)
- [`prompts/04_feed.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/04_feed.md)
- [`prompts/05_communities.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/05_communities.md)
- [`prompts/06_messages.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/06_messages.md)
- [`prompts/07_discover.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/07_discover.md)
- [`prompts/08_ui_polish.md`](/Users/sevogumusboga/Desktop/FriendAway/prompts/08_ui_polish.md)

Helper scripts:
- [`scripts/bootstrap.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/bootstrap.sh)
- [`scripts/setup.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/setup.sh)
- [`scripts/check.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/check.sh)
- [`scripts/clean.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/clean.sh)
- [`scripts/dev.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/dev.sh)
- [`scripts/run_all.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/run_all.sh)
- [`scripts/finalize.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/finalize.sh)
- [`scripts/finalize_and_run.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/finalize_and_run.sh)
- [`scripts/deploy_prep.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/deploy_prep.sh)
- [`scripts/offline_brain.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_brain.sh)
- [`scripts/offline_master.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_master.sh)
- [`scripts/offline_phase_0.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_0.sh)
- [`scripts/offline_phase_1.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_1.sh)
- [`scripts/offline_phase_2.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_2.sh)
- [`scripts/offline_phase_3.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_3.sh)
- [`scripts/offline_phase_4.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_4.sh)
- [`scripts/offline_phase_5.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/offline_phase_5.sh)
- [`scripts/codex_phase_1.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/codex_phase_1.sh)
- [`scripts/codex_phase_2.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/codex_phase_2.sh)
- [`scripts/codex_phase_3.sh`](/Users/sevogumusboga/Desktop/FriendAway/scripts/codex_phase_3.sh)

## Local Run

```bash
chmod +x ./scripts/*.sh
./scripts/setup.sh
./scripts/clean.sh
./scripts/check.sh
./scripts/dev.sh
```

Or run the full local flow in one command:

```bash
./scripts/run_all.sh
```

For a final verification pass:

```bash
./scripts/finalize.sh
```

To finalize and immediately start the app:

```bash
./scripts/finalize_and_run.sh
```

To run a full pre-deploy pass before Vercel:

```bash
./scripts/deploy_prep.sh
```

For the full offline build checklist and step order:

```bash
./scripts/offline_master.sh
```

To print the reasoning checklist only:

```bash
./scripts/offline_brain.sh
```
