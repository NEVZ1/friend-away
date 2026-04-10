#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

if [ -d ".next" ]; then
  rm -rf .next
  echo "Removed .next"
else
  echo ".next not present"
fi
