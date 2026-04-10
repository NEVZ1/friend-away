#!/usr/bin/env bash
set -euo pipefail

echo "==== OFFLINE PHASE 3: INTERACTIVE FLOWS ===="
echo "1) Running ./scripts/check.sh"
./scripts/check.sh
echo "2) Running npm run build"
npm run build
echo "Phase 3 status:"
echo "- create post implemented in demo mode"
echo "- add comment implemented in demo mode"
echo "- join/leave communities implemented in demo mode"
echo "- send messages implemented in demo mode"
echo "- edit profile implemented in demo mode"
