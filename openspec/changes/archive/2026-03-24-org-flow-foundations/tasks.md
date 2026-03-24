# Tasks: Organization Flow Foundations

## Phase 1: Schema & Foundation

- [x] 1.1 Agregar modelo `Organizacion` en `prisma/schema.prisma` (campos: nombre, descripcion, zona, direccion?, telefono, email, web?, instagram?, facebook?, logo?, userId unique, createdAt)
- [x] 1.2 Agregar campo `role String? @default("voluntario")` y relación `organizacion Organizacion?` en modelo `User`
- [x] 1.3 Agregar campo `organizacionId String? @db.ObjectId` y relación `organizacion Organizacion?` en modelo `Pedido`
- [x] 1.4 Ejecutar `prisma db push` y verificar que genera sin errores

## Phase 2: Auth — JWT & Middleware

- [x] 2.1 Modificar `lib/auth.config.ts`: agregar callback `jwt` que lee `role` y `organizacionId` de DB y los inyecta en el token (default `"voluntario"` si no existe)
- [x] 2.2 Modificar `lib/auth.config.ts`: agregar callback `session` que expone `role` y `organizacionId` desde token a `session.user`
- [x] 2.3 Crear archivo de tipos `types/next-auth.d.ts` para extender las interfaces `Session`, `JWT` y `User` de NextAuth
- [x] 2.4 Modificar `middleware.ts`: `/organizaciones/registro` requiere solo sesión; `/organizaciones/*` requiere sesión + `role === "organizacion"`; si es org en `/organizaciones/registro` → redirect a `/organizaciones/perfil`

## Phase 3: API Organizaciones

- [x] 3.1 Crear `lib/validations/organizacion.ts` con `organizacionCreateSchema` y `organizacionPatchSchema` (Zod, sigue patrón de `pedido.ts`)
- [x] 3.2 Crear `lib/serializers/organizacion.ts` con `organizacionToJson` y `toPrismaCreate` (sigue patrón de `pedido.ts`)
- [x] 3.3 Crear `app/api/organizaciones/route.ts` — `POST`: validar sesión (`auth()`), validar body, `prisma.$transaction` (crear Organizacion + update User.role), retornar 201
- [x] 3.4 Crear `app/api/organizaciones/[id]/route.ts` — `PATCH`: validar sesión, verificar propiedad (userId === session.user.id), validar body, actualizar, retornar 200

## Phase 4: UI — Registro de Organización

- [x] 4.1 Crear `components/registro-org-form.tsx` — client component con react-hook-form + zodResolver (sigue patrón de `NuevoPedidoForm`), POST a `/api/organizaciones`, redirect a `/organizaciones/perfil` on success
- [x] 4.2 Crear `app/(public)/organizaciones/registro/page.tsx` — layout con Card + título + `RegistroOrgForm`

## Phase 5: UI — Perfil Real & Pedidos Vinculados

- [x] 5.1 Modificar `app/(public)/organizaciones/perfil/page.tsx` — convertir a server component async, leer sesión con `auth()`, query `prisma.organizacion.findUnique` + `prisma.pedido.findMany({organizacionId})`, reemplazar datos mock por datos reales
- [x] 5.2 Modificar `app/api/pedidos/route.ts` — `POST`: leer sesión con `auth()`, si `role === "organizacion"` agregar `organizacionId` al crear pedido; retornar 401 si no hay sesión
- [x] 5.3 Modificar `lib/serializers/pedido.ts` — incluir `organizacionId` en `pedidoToJson`
- [x] 5.4 Modificar `app/api/pedidos/route.ts` — `GET`: soportar query param `?organizacionId=` para filtrar pedidos por organización

## Phase 6: Verificación

- [x] 6.1 Build exitoso — todas las rutas compilan
- [x] 6.2 Lint — sin errores en archivos modificados/creados
- [ ] 6.3 Test manual: registrar org → verificar User.role actualizado → ver perfil con datos reales
- [ ] 6.4 Test manual: crear pedido como org → verificar pedido tiene organizacionId
- [ ] 6.5 Test manual: acceder a `/organizaciones/perfil` como voluntario → verificar redirect
