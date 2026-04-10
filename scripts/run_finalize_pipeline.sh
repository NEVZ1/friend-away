#!/usr/bin/env bash
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DESKTOP_DIR="$(cd "$ROOT_DIR/.." && pwd)"

OPS_REPO_DEFAULT="$DESKTOP_DIR/AI_AGENTS_AUTOMATION/agent-team-mvp"
APP_REPO_DEFAULT="$ROOT_DIR"
TASK_DIR_DEFAULT="$ROOT_DIR/scripts/autobuild-tasks"

OPS_REPO="${OPS_REPO:-$OPS_REPO_DEFAULT}"
APP_REPO="${APP_REPO:-$APP_REPO_DEFAULT}"
TASK_DIR="${TASK_DIR:-$TASK_DIR_DEFAULT}"
CYCLES="${CYCLES:-30}"

require_cmd() {
  local cmd="$1"
  local fix="$2"
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo
    echo "Preflight failed: Missing required command: $cmd"
    echo "Fix:"
    echo "  $fix"
    exit 1
  fi
}

preflight() {
  require_cmd "node" "Install Node.js 22+ and retry."
  require_cmd "npm" "Install npm (bundled with Node.js) and retry."
  require_cmd "rg" "brew install ripgrep"
  if [ ! -d "$OPS_REPO" ]; then
    echo "Preflight failed: OPS_REPO not found: $OPS_REPO"
    exit 1
  fi
  if [ ! -d "$APP_REPO" ]; then
    echo "Preflight failed: APP_REPO not found: $APP_REPO"
    exit 1
  fi
}

mkdir -p "$TASK_DIR"

TASK_01="$TASK_DIR/finalize_tasks_01.txt"
TASK_02="$TASK_DIR/finalize_tasks_02.txt"
TASK_03="$TASK_DIR/finalize_tasks_03.txt"

cat > "$TASK_01" <<'EOF'
Stabilize routing and navigation flows.
Finalize auth/session edge cases and error states.
Fix high-priority UI polish and responsive issues.
EOF

cat > "$TASK_02" <<'EOF'
Implement production build config and env validation.
Add release checks and deployment readiness report.
Improve test coverage for critical user journeys.
EOF

cat > "$TASK_03" <<'EOF'
Run final QA hardening pass across auth, feed, communities, discover, messages, profile.
Eliminate remaining high-severity bugs and regressions.
Produce final release readiness summary with blockers and go/no-go.
EOF

run_batch() {
  local policy="$1"
  local tasks_file="$2"
  local label="$3"

  echo
  echo "==== $label ===="
  echo "Policy: $policy"
  echo "Tasks:  $tasks_file"

  cd "$OPS_REPO"
  node scripts/ops.mjs autobuild-app \
    --repo "$APP_REPO" \
    --tasks "$tasks_file" \
    --policy "$policy" \
    --cycles "$CYCLES" \
    --enable-codex

  echo
  echo "---- Status after $label ----"
  node scripts/ops.mjs ops-statuscard
  cat state/autobuild-last.json
}

echo "Using OPS_REPO=$OPS_REPO"
echo "Using APP_REPO=$APP_REPO"
echo "Using TASK_DIR=$TASK_DIR"
echo "Using CYCLES=$CYCLES"

preflight

run_batch "codex_preferred" "$TASK_01" "Finalize Batch 01"
run_batch "codex_preferred" "$TASK_02" "Finalize Batch 02"
run_batch "codex_only" "$TASK_03" "Finalize Batch 03 (Certification)"

echo
echo "==== Local Verification ===="
cd "$APP_REPO"
npm run test:all
./scripts/check.sh
./scripts/clean.sh
npm run build

echo
echo "Pipeline completed."
echo "Start app manually with:"
echo "./scripts/dev.sh"
