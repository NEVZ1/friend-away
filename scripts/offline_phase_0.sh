#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 0: BASELINE ===="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "1) Running ./scripts/setup.sh"
./scripts/setup.sh

echo "2) Running ./scripts/check.sh"
./scripts/check.sh

echo "3) Running npm run build"
npm run build

if [ "${RUN_DEV:-0}" = "1" ]; then
  echo "4) Running ./scripts/dev.sh"
  ./scripts/dev.sh
else
  echo "4) Skipping ./scripts/dev.sh"
  echo "Set RUN_DEV=1 to start the local server at the end."
fi
