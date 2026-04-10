#!/usr/bin/env bash
set -e

PROJECT_NAME="friendaway"

echo "Creating Next.js app..."
npx create-next-app@latest "$PROJECT_NAME" \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --use-npm

cd "$PROJECT_NAME"

echo "Installing core dependencies..."
npm install @supabase/supabase-js @supabase/ssr clsx lucide-react date-fns zod react-hook-form

echo "Installing optional UI helpers..."
npm install class-variance-authority tailwind-merge

echo "Creating folders..."
mkdir -p docs prompts scripts components lib hooks types backend database styles pages app

echo "Done."
