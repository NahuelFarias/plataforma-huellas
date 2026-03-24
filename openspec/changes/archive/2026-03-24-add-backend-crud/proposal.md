# Proposal: Backend CRUD básico (Plataforma Huellas)

## Intent

La app es Next.js sin persistencia ni API. Se necesita un backend mínimo con CRUD para sustentar flujos ya maquetados (p. ej. pedidos de ayuda) y permitir evolución hacia autenticación y más entidades.

## Scope

### In Scope
- API REST bajo el mismo repo: **Route Handlers** en `app/api/` (Next.js 15).
- **Prisma** (`mongodb`); **Mongo local** en dev (URI típica `mongodb://127.0.0.1:27017/...` o Docker). Prod: cluster Mongo (`MONGODB_URI` / `DATABASE_URL`).
- CRUD sobre un recurso acotado al dominio: **pedidos** (campos alineados al formulario en `organizaciones/pedidos/nuevo`).
- Validación de entrada en servidor (p. ej. **zod**, ya usado en el front).
- Documentación mínima de contrato (rutas y códigos HTTP) en specs siguientes.

### Out of Scope
- Autenticación/autorización por rol (solo validaciones básicas o sin auth en esta fase).
- Integración de todas las pantallas con la API (cambio posterior).
- Infraestructura de deploy (Docker, CI) salvo variables de entorno documentadas.

## Approach

Mantener **TypeScript end-to-end**: Prisma genera tipos; los handlers devuelven JSON estable. Patrón REST: `GET/POST /api/pedidos`, `GET/PATCH/DELETE /api/pedidos/[id]`. Con Mongo: **`prisma db push`** (sin migraciones SQL). Front: `/api/...` en dev.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/api/` | New | Handlers REST y validación |
| `prisma/` | New | `schema.prisma` (Mongo), `db push` |
| `package.json` | Modified | Scripts y deps: `prisma`, `@prisma/client` |
| `app/organizaciones/pedidos/` | Future | Wire del formulario al POST (opcional en este cambio si el alcance lo permite) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Esquema de datos incompleto vs. formulario UI | Med | Revisar campos del formulario antes de `db push` final; iterar en spec |
| Mongo caído en local | Med | Documentar arranque en spec del cambio |

## Rollback Plan

Revertir merge/commit del cambio; eliminar carpeta `prisma/` y `app/api/` añadidas; quitar dependencias Prisma de `package.json` y lockfile; datos locales en Mongo se pierden al borrar volumen/DB si aplica.

## Dependencies

- Node compatible con Next 15; **MongoDB accesible** (local) y URI en env.
- Sin otros servicios obligatorios para el CRUD mínimo.

## Success Criteria

- [ ] `prisma db push` aplica y el modelo `Pedido` persiste en MongoDB.
- [ ] CRUD completo vía HTTP con respuestas y errores coherentes (4xx/5xx).
- [ ] Tests o verificación manual documentada (sdd-verify) para crear/listar/editar/borrar.
