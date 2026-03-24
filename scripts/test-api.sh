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

echo ""
echo "==> POST /api/pedidos"
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT
http_code=$(curl -sS -o "$tmp" -w "%{http_code}" -X POST "$BASE_URL/api/pedidos" \
  -H "Content-Type: application/json" \
  -d '{"tipo":"traslado","zona":"capital","direccion":"Test script API","urgencia":"media","descripcion":"Smoke test","contactoNombre":"CI","contactoTelefono":"+54 11 0000-0000"}')
body=$(cat "$tmp")
if [[ "$http_code" != "201" ]]; then
  echo "FAIL: esperaba 201, obtuve $http_code"
  echo "$body"
  exit 1
fi
id=$(printf "%s" "$body" | node -e "process.stdout.write(JSON.parse(require('fs').readFileSync(0,'utf8')).id)")
echo "OK ($http_code) id=$id"

echo ""
echo "==> GET /api/pedidos"
list_code=$(curl -sS -o "$tmp" -w "%{http_code}" "$BASE_URL/api/pedidos")
list=$(cat "$tmp")
if [[ "$list_code" != "200" ]]; then
  echo "FAIL: esperaba 200, obtuve $list_code"
  echo "$list"
  exit 1
fi
if ! printf "%s" "$list" | grep -q "$id"; then
  echo "FAIL: el id $id no aparece en el listado"
  echo "$list"
  exit 1
fi
echo "OK ($list_code), listado incluye el pedido creado"

echo ""
echo "Todos los checks pasaron."
