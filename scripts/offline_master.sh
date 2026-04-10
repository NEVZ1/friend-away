#!/usr/bin/env bash
set -euo pipefail

echo "==== ARRIVO OFFLINE MASTER PLAN ===="
echo
bash ./scripts/offline_brain.sh
echo
echo "Executing the runnable baseline now..."
bash ./scripts/offline_phase_0.sh
echo
echo "Executing implemented offline phases..."
bash ./scripts/offline_phase_1.sh
echo
bash ./scripts/offline_phase_2.sh
echo
bash ./scripts/offline_phase_3.sh
echo
bash ./scripts/offline_phase_4.sh
echo
bash ./scripts/offline_phase_5.sh
echo
if [ "${RUN_DEV:-0}" = "1" ]; then
  echo "Starting the local server..."
  ./scripts/dev.sh
else
  echo "Set RUN_DEV=1 to start the local server at the end."
fi
