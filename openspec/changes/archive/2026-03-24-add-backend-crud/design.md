# Design: Backend CRUD de pedidos (MongoDB + Next.js)

## Technical Approach

Implementar el contrato de `specs/pedidos/spec.md` con **Route Handlers** de Next 15 en `app/api/pedidos`, **Prisma** (`provider = "mongodb"`) y validación con **zod** (ya en dependencias). Un solo cliente Prisma reutilizable (`lib/prisma.ts`, patrón recomendado para evitar conexiones en caliente en dev). Respuestas JSON en **camelCase** como en la spec. Arranque local: `docker compose up -d` (ya en raíz) + `DATABASE_URL` en `.env` desde `.env.example`.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| API surface | REST bajo `/api/pedidos` y `/api/pedidos/[id]` | tRPC, server actions only | Alineado a proposal/spec; fácil de consumir desde cualquier cliente |
| Persistencia | Prisma + MongoDB | Mongoose | Ya fijado en proposal; tipos generados y un solo lenguaje de modelo |
| Validación | zod en handlers | solo Prisma | Errores 400 con mensajes claros; PATCH parcial sin revalidar todo el documento obligatoriamente |
| IDs | ObjectId de Mongo | UUID string | Nativo en Prisma+Mongo; expuesto como `id` string en JSON |
| Fecha opcional | `DateTime?` en Prisma; ISO 8601 date en API | string libre | Consistencia y ordenación futura |

## Data Flow

```
  Cliente HTTP
       │
       ▼
  route.ts (GET/POST) o [id]/route.ts (GET/PATCH/DELETE)
       │
       ├─► zod (body/query) ──► 400 si falla
       │
       ▼
  prisma.pedido.* ──► MongoDB
       │
       ▼
  JSON + status (200/201/204/404/500)
```

Listado: `findMany` sin filtros en esta fase. Crear: `create`. Leer/actualizar/borrar: `findUnique` + `update` + `delete`; `id` inválido para ObjectId → 400; no encontrado → 404.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Create | Provider mongodb, model `Pedido`, enums acordes a la spec |
| `lib/prisma.ts` | Create | `PrismaClient` singleton |
| `lib/validations/pedido.ts` | Create | Schemas zod: creación completa, actualización parcial |
| `lib/serializers/pedido.ts` | Create | Map Prisma → JSON (fechas a ISO string) si hace falta |
| `app/api/pedidos/route.ts` | Create | `GET` list, `POST` create |
| `app/api/pedidos/[id]/route.ts` | Create | `GET`, `PATCH`, `DELETE` por id |
| `package.json` | Modify | Scripts `prisma generate`, deps `prisma`, `@prisma/client` |
| `.env.example` | Modify | Ya tiene `DATABASE_URL`; mantener coherente con nombre de DB |

## Interfaces / Contracts

**Rutas**

- `GET /api/pedidos` → `200` `{ pedidos: Pedido[] }` o array directo según convención única del proyecto (elegir una y documentar en verify).
- `POST /api/pedidos` → `201` cuerpo = pedido creado; `400` validación.
- `GET /api/pedidos/[id]` → `200` pedido; `404`; `400` id mal formado.
- `PATCH /api/pedidos/[id]` → `200` pedido; `400` / `404`.
- `DELETE /api/pedidos/[id]` → `204` sin cuerpo; `404`.

**Pedido (JSON)** — campos como en spec: `id`, `tipo`, `zona`, `direccion`, `urgencia`, `fechaSugerida` (string ISO o `null`), `horaSugerida`, `descripcion`, `contactoNombre`, `contactoTelefono`.

**Errores** — cuerpo JSON mínimo `{ "error": string }` o detalle zod en dev; `500` genérico sin filtrar stack al cliente.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Schemas zod (válidos/ inválidos) | Tests con `vitest` o `node --test` si se agrega dependencia; si no, manual en verify |
| Integration | Handlers + DB | Prisma + Mongo de test o `docker compose` + curl/httpie; checklist en `verify-report` |
| E2E | — | Fuera de alcance de este diseño |

## Migration / Rollout

Sin migración de datos (greenfield). **Rollout**: `pnpm prisma generate` → `prisma db push` contra Mongo con URI correcta. **Rollback**: revertir código; datos en volumen Docker son responsabilidad del dev.

## Open Questions

- [ ] ¿Envolver listado en `{ data: [...] }` o array plano? (definir en implementación y reflejar en verify.)
