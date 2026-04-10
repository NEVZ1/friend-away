#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 2: DEMO AUTH + ONBOARDING ===="
echo "1) Running ./scripts/check.sh"
./scripts/check.sh
echo "2) Running npm run build"
npm run build
echo "Phase 2 status:"
echo "- local login/signup implemented"
echo "- local route guard implemented"
echo "- onboarding persistence implemented"
echo "- verify manually in the browser"
