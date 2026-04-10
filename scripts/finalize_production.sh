#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "==== FriendAway Production Finalization ===="

if [ ! -d "node_modules" ]; then
  echo "Dependencies missing. Running setup..."
  ./scripts/setup.sh
fi

if [ ! -f ".env.local" ]; then
  echo "Missing .env.local. Create it first."
  exit 1
fi

echo
echo "Checking required production env vars..."
if ! grep -q '^NEXT_PUBLIC_SUPABASE_URL=' .env.local; then
  echo "Missing NEXT_PUBLIC_SUPABASE_URL in .env.local"
  exit 1
fi

if ! grep -q '^NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=' .env.local && ! grep -q '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' .env.local; then
  echo "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local"
  exit 1
fi

if ! grep -q '^NEXT_PUBLIC_PUBLIC_PREVIEW=false' .env.local; then
  echo "Set NEXT_PUBLIC_PUBLIC_PREVIEW=false for production mode."
  exit 1
fi

echo
echo "1) Clean artifacts..."
./scripts/clean.sh

echo
echo "2) Typecheck + lint..."
./scripts/check.sh

echo
echo "3) Tests..."
npm run test:all

echo
echo "4) Production build..."
npm run build

echo
echo "==== Production Finalization Passed ===="
echo "Next:"
echo "1) Push to main"
echo "2) Set same env vars in Vercel"
echo "3) Redeploy and run smoke tests on / /auth/login /communities /discover /messages /profile"
