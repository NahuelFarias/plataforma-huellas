# Proposal: Autenticación con Google

## Intent

Los voluntarios y organizaciones no pueden iniciar sesión en la plataforma. Existen enlaces a `/voluntarios/login` y `/voluntarios/registro` en el header pero no hay página, modelo de usuario ni flujo de auth implementado. Se necesita login con Google como método principal para reducir fricción de registro y evitar gestionar contraseñas.

## Scope

### In Scope
- Modelo `User` y `Account` en Prisma/MongoDB para persistir usuarios y sesiones
- Integración de **Auth.js v5** (NextAuth) con Google Provider
- Página de login (`/voluntarios/login`) con botón "Iniciar sesión con Google"
- Middleware de Next.js para proteger rutas bajo `/(protected)`
- Indicador de sesión en el header (avatar/nombre en lugar de botones login/registro)
- Flujo de logout

### Out of Scope
- Roles y permisos (admin, org, voluntario) — se defiere a un cambio posterior
- Login con email/contraseña u otros proveedores OAuth
- Página de registro separada (Google OAuth cubre registro + login)
- Panel de perfil de usuario editable
- Verificación de email

## Approach

Usar **Auth.js v5** (`next-auth@5`) con el adaptador Prisma para MongoDB. Auth.js maneja tokens, sesiones (JWT por defecto, compatible con edge/middleware), y el flujo OAuth completo con Google. Se agregan modelos `User`, `Account` y `Session` al schema Prisma siguiendo la convención de Auth.js. El middleware protege rutas agrupadas bajo `(protected)`. El header se convierte en Server Component que lee la sesión y renderiza avatar o botones de login según estado.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Modified | Agregar modelos User, Account, Session, VerificationToken |
| `lib/auth.ts` | New | Configuración central de Auth.js (providers, adapter, callbacks) |
| `app/api/auth/[...nextauth]/route.ts` | New | Route handler catch-all de Auth.js |
| `app/voluntarios/login/page.tsx` | New | Página de login con botón Google |
| `middleware.ts` | New | Protección de rutas autenticadas |
| `components/site-header.tsx` | Modified | Mostrar sesión activa o botones login |
| `components/mobile-nav.tsx` | Modified | Ídem para navegación móvil |
| `.env` | Modified | Variables GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Configuración OAuth en Google Cloud Console requiere pasos manuales | Alta | Documentar paso a paso en README o doc interna |
| Auth.js v5 aún evoluciona; posibles breaking changes | Baja | Fijar versión en package.json |
| MongoDB replica set requerido para transacciones de Prisma | Baja | Ya configurado en docker-compose.yml con rs0 |

## Rollback Plan

1. Eliminar dependencias: `pnpm remove next-auth @auth/prisma-adapter`
2. Revertir `prisma/schema.prisma` al estado sin modelos User/Account/Session
3. Eliminar `lib/auth.ts`, `app/api/auth/`, `app/voluntarios/login/`, `middleware.ts`
4. Restaurar `site-header.tsx` y `mobile-nav.tsx` a sus versiones originales con botones estáticos
5. Ejecutar `pnpm prisma generate`

## Dependencies

- Credenciales OAuth 2.0 de Google Cloud Console (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
- Variable AUTH_SECRET generada (`openssl rand -base64 32`)

## Success Criteria

- [ ] Un usuario puede hacer click en "Iniciar sesión con Google" y autenticarse
- [ ] Tras login, el header muestra nombre/avatar del usuario y opción de cerrar sesión
- [ ] Las rutas protegidas redirigen a login si no hay sesión activa
- [ ] El modelo User se persiste en MongoDB tras el primer login
- [ ] El flujo funciona tanto en desktop como en móvil
