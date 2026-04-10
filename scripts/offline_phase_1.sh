#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 1: DEMO DATA LAYER ===="
echo "1) Running ./scripts/check.sh"
./scripts/check.sh
echo "2) Running npm run build"
npm run build
echo "Phase 1 is implemented in code:"
echo "- local demo store"
echo "- localStorage persistence"
echo "- reset-to-seed action"
echo "- offline screen wiring has started"
