#!/bin/sh
# Se ejecuta EN EL VPS (comando: deploy-dashpadrones). Flujo: GitHub -> VPS.
set -e
REPO=/var/www/dashpadrones-git
SITE=/var/www/dashpadrones.sembrandodatos.com

cd "$REPO"
git pull -q origin main

# Backend: dependencias y reinicio
cd "$REPO/backend"
[ -d venv ] || python3 -m venv venv
venv/bin/pip install -q -r requirements.txt
systemctl restart dashpadrones-api

# Frontend: compila y publica
cd "$REPO/frontend"
npm ci --silent
npm run build --silent
rm -rf "$SITE"/*
cp -r dist/* "$SITE"/

echo "dashpadrones desplegado: $(git -C "$REPO" log --oneline -1)"
