#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "Preparing FriendAway for final local verification..."

if [ ! -d "node_modules" ]; then
  echo "Dependencies missing. Running setup first..."
  ./scripts/setup.sh
fi

echo "Cleaning stale Next.js artifacts..."
./scripts/clean.sh

echo "Running automated checks..."
./scripts/check.sh

echo "Running production build..."
npm run build

echo
echo "Finalize pass complete."
echo "Next:"
echo "1) Run ./scripts/dev.sh to launch locally"
echo "2) If ready, connect Supabase later by filling .env.local and applying database/schema.sql"
