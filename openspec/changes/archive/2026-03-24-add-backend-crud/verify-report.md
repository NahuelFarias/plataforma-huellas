# Verify report: add-backend-crud

## Formato GET colección

Se eligió **`{ "pedidos": [ ... ] }`** para `GET /api/pedidos`.

## MongoDB y Prisma

Prisma 6 requiere MongoDB como **replica set**. El `docker-compose.yml` levanta `mongod --replSet rs0` y el servicio `mongo-init` ejecuta `rs.initiate()`.

`DATABASE_URL` en `.env.example` incluye `replicaSet=rs0&directConnection=true`.

## Comandos de prueba manual (ejemplo)

Con `docker compose up -d` y `pnpm dev` (o puerto 3010):

```bash
curl -sS -X POST http://127.0.0.1:3000/api/pedidos \
  -H 'Content-Type: application/json' \
  -d '{"tipo":"traslado","zona":"capital","direccion":"Test 123","urgencia":"media","descripcion":"Necesito ayuda","contactoNombre":"Juan","contactoTelefono":"+54 11 1111-1111"}'

curl -sS http://127.0.0.1:3000/api/pedidos
# PATCH / DELETE / GET por id según el id devuelto en el POST
```

Verificación local ejecutada: `POST` → `201`, `GET` listado → `200`, `GET` por id → `200`, `PATCH` → `200`, `DELETE` → `204`, `GET` tras borrar → `404`, `POST` inválido → `400`.
