#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 5: VERIFICATION ===="
echo "0) Running npm test"
npm test
echo "1) Running ./scripts/finalize.sh"
./scripts/finalize.sh
echo "Phase 5 status:"
echo "- finalize verification complete"
echo "- demo-mode state tests are now included"
