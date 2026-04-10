#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "Installing npm dependencies..."
npm install

if [ ! -f ".env.local" ]; then
  cp ".env.example" ".env.local"
  echo "Created .env.local from .env.example"
else
  echo ".env.local already exists"
fi

echo "Setup complete."
echo "Next:"
echo "1) Fill in .env.local"
echo "2) Apply database/schema.sql in Supabase"
echo "3) Run ./scripts/dev.sh"
