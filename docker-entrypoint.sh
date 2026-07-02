#!/usr/bin/env sh
set -e

# Apply database migrations before starting the app (safe to run repeatedly).
echo "Running database migrations..."
alembic upgrade head

echo "Starting application..."
exec "$@"
