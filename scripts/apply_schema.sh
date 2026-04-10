#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCHEMA_FILE="$ROOT_DIR/database/schema.sql"

if [ ! -f "$SCHEMA_FILE" ]; then
  echo "Schema file not found: $SCHEMA_FILE"
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "Missing required command: psql"
  echo "Install PostgreSQL client tools, then retry."
  exit 1
fi

if [ -z "${SUPABASE_DB_URL:-}" ]; then
  echo "Missing SUPABASE_DB_URL."
  echo "Usage:"
  echo '  export SUPABASE_DB_URL="postgresql://postgres:<password>@<host>:5432/postgres?sslmode=require"'
  echo "  ./scripts/apply_schema.sh"
  exit 1
fi

echo "Applying schema: $SCHEMA_FILE"
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f "$SCHEMA_FILE"

echo "Reloading PostgREST schema cache..."
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c "notify pgrst, 'reload schema';"

echo "Done."
echo "Verify with:"
echo "  psql \"\$SUPABASE_DB_URL\" -c 'select count(*) from public.users;'"
