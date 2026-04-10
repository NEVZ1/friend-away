#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "==== FriendAway Deploy Prep ===="

if [ ! -d "node_modules" ]; then
  echo "Dependencies missing. Running setup..."
  ./scripts/setup.sh
fi

echo
echo "1) Cleaning build artifacts..."
./scripts/clean.sh

echo
echo "2) Running static checks..."
./scripts/check.sh

echo
echo "3) Running tests..."
npm run test:all

echo
echo "4) Running production build..."
npm run build

echo
echo "==== Deploy Prep Passed ===="
echo "Next steps for Vercel:"
echo "1) Push changes to GitHub (main branch)"
echo "2) Import repo on https://vercel.com/new"
echo "3) Add env vars:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "4) Deploy and verify routes:"
echo "   /  /auth/login  /onboarding  /communities  /discover  /messages  /profile"
