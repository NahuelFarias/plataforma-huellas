#!/usr/bin/env bash
# Smoke test manual del API y la página del formulario.
# Requiere: Mongo (docker compose up -d) y Next en marcha (pnpm dev).
# Uso: pnpm test:api
#      BASE_URL=http://127.0.0.1:3010 pnpm test:api

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"

echo "BASE_URL=$BASE_URL"
echo ""

echo "==> GET /organizaciones/pedidos/nuevo"
code=$(curl -sS -o /dev/null -w "%{http_code}" "$BASE_URL/organizaciones/pedidos/nuevo")
if [[ "$code" != "200" ]]; then
  echo "FAIL: esperaba 200, obtuve $code (¿corre pnpm dev?)"
  exit 1
fi
echo "OK ($code)"

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

echo ""
echo "==> POST /api/pedidos (sin auth → 401)"
http_code=$(curl -sS -o "$tmp" -w "%{http_code}" -X POST "$BASE_URL/api/pedidos" \
  -H "Content-Type: application/json" \
  -d '{"tipo":"traslado","zona":"capital","direccion":"Test script API","urgencia":"media","descripcion":"Smoke test","contactoNombre":"CI","contactoTelefono":"+54 11 0000-0000"}')
if [[ "$http_code" != "401" ]]; then
  echo "FAIL: esperaba 401, obtuve $http_code"
  cat "$tmp"
  exit 1
fi
echo "OK ($http_code) — requiere autenticación"

echo ""
echo "==> POST /api/organizaciones (sin auth → 401)"
http_code=$(curl -sS -o "$tmp" -w "%{http_code}" -X POST "$BASE_URL/api/organizaciones" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test","descripcion":"Test","zona":"capital","telefono":"123","email":"a@b.com"}')
if [[ "$http_code" != "401" ]]; then
  echo "FAIL: esperaba 401, obtuve $http_code"
  cat "$tmp"
  exit 1
fi
echo "OK ($http_code) — requiere autenticación"

echo ""
echo "==> GET /api/pedidos"
list_code=$(curl -sS -o "$tmp" -w "%{http_code}" "$BASE_URL/api/pedidos")
if [[ "$list_code" != "200" ]]; then
  echo "FAIL: esperaba 200, obtuve $list_code"
  cat "$tmp"
  exit 1
fi
echo "OK ($list_code)"

echo ""
echo "Todos los checks pasaron."
