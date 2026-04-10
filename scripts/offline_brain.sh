#!/usr/bin/env bash
set -euo pipefail

echo "==== ARRIVO OFFLINE BUILD BRAIN LIST ===="
echo
echo "Phase 0: Baseline"
echo "- setup"
echo "- check"
echo "- build"
echo "- dev"
echo
echo "Phase 1: Demo data layer"
echo "- localStorage-backed store"
echo "- session persistence"
echo "- profile persistence"
echo "- onboarding persistence"
echo "- posts/comments persistence"
echo "- joined communities persistence"
echo "- messages persistence"
echo "- reset seed flow"
echo
echo "Phase 2: Demo auth and onboarding"
echo "- local login/signup"
echo "- local session redirects"
echo "- onboarding save flow"
echo
echo "Phase 3: Interactive product flows"
echo "- create post"
echo "- add comment"
echo "- join/leave community"
echo "- send message"
echo "- edit profile"
echo
echo "Phase 4: Discover and recommendations"
echo "- local recommendations"
echo "- search/filter"
echo
echo "Phase 5: UX polish"
echo "- empty states"
echo "- loading states"
echo "- error states"
echo "- responsive polish"
echo "- copy polish"
echo
echo "Phase 6: Verification"
echo "- tests"
echo "- reset script"
echo "- typecheck"
echo "- lint"
echo "- build"
echo
echo "Full plan:"
echo "See docs/OFFLINE_BUILD_PLAN.md"
