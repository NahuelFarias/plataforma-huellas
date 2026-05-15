# Proposal: Organization Flow Foundations

## Intent

Las organizaciones de rescate son el actor principal de Huellas, pero hoy no existen como entidad en el sistema. No hay modelo `Organizacion`, no hay registro, no hay roles, y los pedidos se crean sin dueño. El perfil es una maqueta estática. El CTA "Soy una organización" en la home lleva a `/organizaciones/registro` que no existe.

Este cambio establece los cimientos para que una organización pueda registrarse, tener un perfil real, y que sus pedidos queden vinculados a ella.

## Scope

### In Scope
- Modelo `Organizacion` en Prisma (nombre, descripción, contacto, zona, redes, logo)
- Campo `role` en `User` (`voluntario` | `organizacion`)
- Relación `User` → `Organizacion` (1:1, el user creador)
- Relación `Pedido` → `Organizacion` (N:1)
- Página `/organizaciones/registro` con formulario + API `POST /api/organizaciones`
- Perfil `/organizaciones/perfil` con datos reales de la org del usuario logueado
- Edición de perfil (`PATCH /api/organizaciones/[id]`)
- Autorización: middleware y APIs validan rol `organizacion` para rutas de org
- Los pedidos creados desde org se vinculan automáticamente a la organización

### Out of Scope
- Colectas (modelo, CRUD, páginas) — cambio futuro separado
- Adopciones (modelo, CRUD, páginas) — cambio futuro separado
- Verificación/aprobación de organizaciones por admin
- Dashboard con estadísticas reales
- Integración MercadoPago
- Listado público de organizaciones

## Approach

1. **Schema**: agregar modelo `Organizacion` y campo `role` en `User`, relación `Pedido.organizacionId`
2. **Auth callbacks**: extender NextAuth para incluir `role` y `organizacionId` en el token JWT y la sesión
3. **Registro**: nueva página + API que crea `Organizacion` y actualiza `User.role`
4. **Perfil real**: reemplazar datos mock por query a la org del usuario autenticado
5. **Autorización**: middleware protege `/organizaciones/*`; APIs de pedidos vinculan `organizacionId`

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Modified | Modelo `Organizacion`, campo `role` en `User`, FK en `Pedido` |
| `lib/auth.ts`, `lib/auth.config.ts` | Modified | JWT callbacks con role + organizacionId |
| `middleware.ts` | Modified | Protección por rol para rutas `/organizaciones/*` |
| `app/api/organizaciones/` | New | POST (registro) y PATCH (edición) |
| `app/api/pedidos/route.ts` | Modified | Vincular `organizacionId` al crear pedido |
| `app/(public)/organizaciones/registro/` | New | Página de registro de organización |
| `app/(public)/organizaciones/perfil/page.tsx` | Modified | Datos reales en vez de mock |
| `components/nuevo-pedido-form.tsx` | Modified | Enviar sesión/orgId al crear pedido |
| `lib/validations/` | New | Schema Zod para organización |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Migración de datos: pedidos existentes sin `organizacionId` | Med | Campo opcional (`String?`), migración gradual |
| Sesiones JWT existentes sin `role` | Med | Default `voluntario` si no existe en token |
| Complejidad del registro (multi-step) | Low | Formulario simple en un paso, edición posterior |

## Rollback Plan

1. Revertir el branch `feature/org-flow` (no se mergeó a main)
2. `prisma db push` con schema anterior restaura el esquema
3. Pedidos existentes no se pierden (`organizacionId` es opcional)

## Dependencies

- Prisma 6 + MongoDB (ya configurados)
- NextAuth v5 beta con PrismaAdapter (ya configurado)
- Sesión JWT (ya configurada)

## Success Criteria

- [ ] Una organización puede registrarse desde `/organizaciones/registro`
- [ ] El `User` queda con `role: "organizacion"` y vinculado a una `Organizacion`
- [ ] El perfil en `/organizaciones/perfil` muestra datos reales de la org
- [ ] La organización puede editar su perfil
- [ ] Los pedidos creados por una org quedan vinculados a ella
- [ ] Un voluntario NO puede acceder a `/organizaciones/perfil`
- [ ] Las APIs validan autorización (rol + sesión)
