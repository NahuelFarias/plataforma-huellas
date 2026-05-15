# Design: Organization Flow Foundations

## Technical Approach

Extender el schema Prisma con modelo `Organizacion` y campo `role` en `User`. Inyectar `role` + `organizacionId` en el JWT via callbacks de NextAuth. Proteger rutas por rol en middleware. Nuevas APIs (`/api/organizaciones`) siguen los patrones existentes (Zod + serializer + Prisma). Perfil de org pasa de datos mock a server component con query real.

## Architecture Decisions

### Decision: Organizacion como modelo separado vinculado a User

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Campos de org directo en `User` | Simple, pero mezcla dominios y no escala a múltiples miembros | Descartada |
| Modelo `Organizacion` separado + `User.role` + relación 1:1 | Separación clara, permite futuro multi-miembro | **Elegida** |
| Modelo `Organizacion` sin role en User | Requiere join para saber si el user es org | Descartada |

**Rationale**: Mantener la entidad org separada permite extender a múltiples miembros por org en el futuro. El campo `role` en `User` da acceso rápido al tipo de usuario sin joins (útil para JWT/middleware).

### Decision: Role como campo string enum en User

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Tabla `Role` separada (RBAC) | Overengineering para 2 roles | Descartada |
| Campo `role` string en `User` con default `"voluntario"` | Simple, suficiente, compatible con MongoDB | **Elegida** |

### Decision: Extender JWT con role via callbacks

NextAuth v5 permite `jwt` y `session` callbacks en la config. Se agrega `role` y `organizacionId` al token en el callback `jwt` (leyendo de DB en primer sign-in), y se expone en `session` callback. Patrón estándar de Auth.js.

## Data Flow

### Registro de organización

```
Browser (form)
  │  POST /api/organizaciones {nombre, zona, ...}
  ▼
Route Handler
  │  1. auth() → session.user.id
  │  2. Zod validate body
  │  3. prisma.$transaction:
  │     - create Organizacion {userId}
  │     - update User {role: "organizacion"}
  │  4. Return 201 + org json
  ▼
Browser → redirect /organizaciones/perfil
```

### Perfil real (server component)

```
Request /organizaciones/perfil
  │  middleware: auth check + role === "organizacion"
  ▼
Server Component
  │  1. auth() → session.user.organizacionId
  │  2. prisma.organizacion.findUnique({id})
  │  3. prisma.pedido.findMany({organizacionId})
  │  4. Render con datos reales
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Modify | Agregar `Organizacion`, `User.role`, `User.organizacion`, `Pedido.organizacionId` |
| `lib/auth.config.ts` | Modify | Agregar callbacks `jwt` y `session` para inyectar role/organizacionId |
| `middleware.ts` | Modify | Proteger `/organizaciones/*` por rol (excepto `/organizaciones/registro`) |
| `lib/validations/organizacion.ts` | Create | Schemas Zod: `organizacionCreateSchema`, `organizacionPatchSchema` |
| `lib/serializers/organizacion.ts` | Create | `organizacionToJson`, `toPrismaCreate` (sigue patrón de `pedido.ts`) |
| `app/api/organizaciones/route.ts` | Create | POST (registro) — requiere sesión, crea org + actualiza role |
| `app/api/organizaciones/[id]/route.ts` | Create | PATCH (edición) — requiere ser propietario |
| `app/(public)/organizaciones/registro/page.tsx` | Create | Formulario de registro de organización |
| `components/registro-org-form.tsx` | Create | Client component con react-hook-form (sigue patrón de `NuevoPedidoForm`) |
| `app/(public)/organizaciones/perfil/page.tsx` | Modify | Reemplazar mock por server component con datos reales |
| `app/api/pedidos/route.ts` | Modify | POST: leer sesión, vincular `organizacionId` si es org |
| `lib/serializers/pedido.ts` | Modify | Incluir `organizacionId` en `pedidoToJson` |

## Interfaces / Contracts

```typescript
// Prisma schema additions
model Organizacion {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  nombre      String
  descripcion String
  zona        String
  direccion   String?
  telefono    String
  email       String
  web         String?
  instagram   String?
  facebook    String?
  logo        String?
  userId      String   @unique @db.ObjectId
  user        User     @relation(fields: [userId], references: [id])
  pedidos     Pedido[]
  createdAt   DateTime @default(now())
}

// User additions
model User {
  // ...existing fields
  role          String?        @default("voluntario")
  organizacion  Organizacion?
}

// Pedido addition
model Pedido {
  // ...existing fields
  organizacionId  String?        @db.ObjectId
  organizacion    Organizacion?  @relation(fields: [organizacionId], references: [id])
}
```

```typescript
// NextAuth session extension
interface Session {
  user: {
    id: string
    role: "voluntario" | "organizacion"
    organizacionId: string | null
    // ...existing
  }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| API | POST/PATCH organizaciones, validación, auth | `scripts/test-api.sh` (patrón existente) |
| API | POST pedidos con orgId | Extend test script existente |
| Manual | Registro → perfil → crear pedido → ver pedido con org | Browser flow |

## Migration / Rollout

- `User.role` con default `"voluntario"` — usuarios existentes no necesitan migración
- `Pedido.organizacionId` opcional (`String?`) — pedidos existentes quedan con `null`
- `prisma db push` aplica cambios incrementales en MongoDB (no requiere migration SQL)

## Open Questions

- (Ninguna bloqueante — decisiones tomadas)
