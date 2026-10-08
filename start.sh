#!/bin/sh

set -e

echo "[LUNA] Starting OpenClaw..."

openclaw --version

# Start OpenClaw in the background
openclaw gateway start &

echo "[LUNA] Starting API server..."

exec node server.js
