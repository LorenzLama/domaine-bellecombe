#!/bin/bash
set -e

cd "$(dirname "$0")"

echo ""
echo "🏰  Domaine de Bellecombe — Dev Setup"
echo "───────────────────────────────────────"

# 1. Homebrew
if ! command -v brew >/dev/null 2>&1; then
  echo "→ Installing Homebrew (first time only, ~3 min)…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Add brew to PATH for this session (Apple Silicon + Intel)
  if [ -f /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -f /usr/local/bin/brew ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  echo "✓ Homebrew installed"
fi

# 2. Node + npm
if ! command -v node >/dev/null 2>&1; then
  echo "→ Installing Node.js (first time only, ~1 min)…"
  brew install node
else
  echo "✓ Node.js installed ($(node -v))"
fi

# 3. Project dependencies
if [ ! -d "node_modules" ]; then
  echo "→ Installing project dependencies (first time only, ~1 min)…"
  npm install
else
  echo "✓ Dependencies installed"
fi

# 4. Launch
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "")

echo ""
echo "🚀  Starting dev server…"
echo "───────────────────────────────────────"
echo "    Mac:     http://localhost:8080"
if [ -n "$LOCAL_IP" ]; then
  echo "    iPhone:  http://$LOCAL_IP:8080"
  echo "             (must be on the same Wi-Fi)"
fi
echo "───────────────────────────────────────"
echo "    Ctrl+C to stop"
echo ""
npm run dev
