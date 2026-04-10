#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 4: DISCOVER + POLISH ===="
echo "1) Running ./scripts/check.sh"
./scripts/check.sh
echo "2) Running npm run build"
npm run build
echo "Phase 4 status:"
echo "- local recommendations improved"
echo "- search/filter added to key offline screens"
echo "- base empty/loading/error states already present"
echo "- additional visual polish can continue incrementally"
