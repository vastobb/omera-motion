#!/data/data/com.termux/files/usr/bin/bash
# omera motion — Termux backend runner
# Runs the OpenChatCut editor stack (Node.js + ffmpeg + onnxruntime) natively
# inside Termux on Android. The Android APK (WebView) connects to this server
# over the device network so all editing/export/AI functions work on-device.
#
# Usage:
#   termux-setup-storage        # grant storage access
#   bash termux-backend/run.sh  # install deps, build, start server
#
# Then open the omera motion APK and point it at the printed URL
# (e.g. http://192.168.1.x:PORT) — or rebuild the APK with
# capacitor.config.ts `server.url` set to that origin.
set -euo pipefail

echo "=== omera motion Termux backend ==="

# 1. System dependencies
echo "[1/5] Installing system packages (nodejs, ffmpeg)..."
pkg update -y && pkg install -y nodejs ffmpeg git make clang

# 2. Node dependencies (includes native modules: onnxruntime, ffmpeg bindings, etc.)
echo "[2/5] Installing npm dependencies..."
npm ci --loglevel=error

# 3. Build the bundled web UI (Vite -> dist/)
echo "[3/5] Building web UI..."
npm run build

# 4. Start the embedded server (same stack as desktop Electron)
echo "[4/5] Starting embedded editor server..."
echo "    (leave this running; the APK connects to the URL below)"
echo ""
npx tsx server/standalone.ts
