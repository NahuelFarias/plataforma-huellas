# Tasks: Autenticación con Google

## Phase 1: Infraestructura y modelos

- [x] 1.1 Instalar dependencias: `pnpm add next-auth@beta @auth/prisma-adapter`
- [x] 1.2 Agregar modelos `User` y `Account` en `prisma/schema.prisma` con convención Auth.js+MongoDB (`@id @default(auto()) @map("_id") @db.ObjectId`, `@@unique` en Account para `provider`+`providerAccountId`)
- [x] 1.3 Ejecutar `pnpm prisma generate && pnpm prisma db push` para sincronizar modelos
- [x] 1.4 Crear `.env.example` con `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `DATABASE_URL`
- [x] 1.5 Modificar `next.config.mjs`: agregar `lh3.googleusercontent.com` en `images.remotePatterns`

## Phase 2: Core Auth

- [x] 2.1 Crear `lib/auth.ts`: exportar `handlers`, `auth`, `signIn`, `signOut` desde `NextAuth()` con Google provider, `PrismaAdapter(prisma)`, `session: { strategy: "jwt" }`, `pages: { signIn: "/voluntarios/login" }`
- [x] 2.2 Crear `app/api/auth/[...nextauth]/route.ts`: re-exportar `handlers.GET` y `handlers.POST` desde `lib/auth`
- [x] 2.3 Crear `middleware.ts`: usar `auth` como middleware wrapper, matcher que excluya rutas públicas (`/`, `/voluntarios/login`, `/api/auth`, `/faq`, assets estáticos), redirect a `/voluntarios/login` si no hay sesión

## Phase 3: UI — Login y navegación

- [x] 3.1 Crear `app/(public)/voluntarios/login/page.tsx`: branding Huellas, botón "Iniciar sesión con Google" que invoque `signIn("google")`, redirect a `/` si ya hay sesión vía `auth()`
- [x] 3.2 Crear `components/user-menu.tsx`: client component con `Avatar` (Radix), nombre del usuario, botón "Cerrar sesión" que invoque `signOut()` via server action
- [x] 3.3 Modificar `components/site-header.tsx`: convertir a `async`, llamar `auth()`, renderizar `<UserMenu>` si hay sesión o botones login/registro si no; pasar session a `<MobileNav>`
- [x] 3.4 Modificar `components/mobile-nav.tsx`: aceptar prop `session`, mostrar avatar+nombre+logout si hay sesión, o enlaces login/registro si no

## Phase 4: Verificación

- [x] 4.1 Ejecutar `next build` — verificar compilación sin errores
- [ ] 4.2 Verificar flujo completo: click "Iniciar sesión con Google" → consent → redirect a home con avatar en header (spec: Login exitoso, Primer login crea usuario)
- [ ] 4.3 Verificar header desktop y móvil muestra avatar+nombre con sesión activa (spec: Header con sesión activa, Menú móvil con sesión activa)
- [ ] 4.4 Verificar logout: click "Cerrar sesión" → redirect a `/` → header muestra botones login (spec: Cierre de sesión)
- [ ] 4.5 Verificar middleware: acceder a ruta protegida sin sesión → redirect a `/voluntarios/login` (spec: Acceso a ruta protegida sin sesión)
- [ ] 4.6 Verificar que `/voluntarios/login` redirige a `/` si ya hay sesión (spec: Acceso a login con sesión activa)
