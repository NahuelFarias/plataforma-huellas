# Tasks: Backend CRUD de pedidos

## Phase 1: Infraestructura y Prisma

- [x] 1.1 Añadir en `package.json` dependencias `prisma`, `@prisma/client` y scripts `postinstall` o `db:generate` / `db:push` según convención del repo.
- [x] 1.2 Crear `prisma/schema.prisma` con `provider = "mongodb"`, enums alineados a la spec (`tipo`, `zona`, `urgencia`, `horaSugerida`) y model `Pedido` con `id` ObjectId y campos obligatorios/opcionales.
- [x] 1.3 Crear `lib/prisma.ts` con instancia única de `PrismaClient` y guard global en desarrollo (patrón Next.js).
- [x] 1.4 Copiar `.env.example` a `.env`, levantar Mongo con `docker compose up -d`, ejecutar `pnpm prisma generate` y `pnpm prisma db push` hasta aplicar esquema sin error.

## Phase 2: Validación y serialización

- [x] 2.1 Crear `lib/validations/pedido.ts` con zod: schema de creación (todos los obligatorios + enums) y schema de actualización parcial (`.partial()` o campos opcionales explícitos).
- [x] 2.2 Crear `lib/serializers/pedido.ts` (o helpers en el mismo archivo de rutas si es mínimo) para mapear modelo Prisma a JSON: `fechaSugerida` como string ISO o `null`, `id` como string.

## Phase 3: Route Handlers

- [x] 3.1 Crear `app/api/pedidos/route.ts`: `GET` → `findMany`, respuesta `200` con formato único elegido (array o `{ pedidos: [...] }`); `POST` → parse body con schema creación, `create`, `201` o `400`.
- [x] 3.2 Crear `app/api/pedidos/[id]/route.ts`: validar formato ObjectId; `GET` → `findUnique`, `200` / `404` / `400`; `PATCH` → merge validado, `update`, `200` / `400` / `404`; `DELETE` → `delete`, `204` / `404`.
- [x] 3.3 Unificar respuestas de error: `{ error: string }` (y detalle de zod solo si se decide en código, sin filtrar stack en prod).

## Phase 4: Verificación manual y cierre

- [x] 4.1 Con app en `pnpm dev` y Mongo activo, verificar con `curl`/HTTPie: POST válido → `201` con `id`; GET colección → `200`; GET por `id` → `200`; PATCH → `200`; DELETE → `204`; GET/PATCH/DELETE con id inexistente → `404`; POST/PATCH con body inválido → `400`.
- [x] 4.2 Registrar en `openspec/changes/add-backend-crud/verify-report.md` (cuando exista) el formato elegido para el listado y los comandos de prueba usados.
