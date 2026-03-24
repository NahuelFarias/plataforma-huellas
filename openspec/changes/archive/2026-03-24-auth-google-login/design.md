# Design: Autenticación con Google

## Technical Approach

Auth.js v5 (`next-auth@beta`) con Google Provider y `@auth/prisma-adapter` sobre MongoDB. Sesiones JWT (compatibles con edge middleware). `SiteHeader` pasa a `async` para leer sesión vía `auth()` y propagarla como prop a `MobileNav`. La página de login vive en `app/(public)/voluntarios/login/` reutilizando el layout compartido existente.

## Architecture Decisions

### Decision: Estrategia de sesión

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| JWT (stateless) | No requiere modelo Session; funciona en edge middleware | **Elegida** |
| Database sessions | Requiere queries por request; incompatible con edge runtime del middleware | Descartada |

**Rationale**: El middleware de Next.js corre en edge runtime. Auth.js con database sessions necesita Node runtime, lo que impide proteger rutas desde middleware. JWT elimina esa restricción.

### Decision: Sesión en header — `auth()` en Server Component vs SessionProvider

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| `auth()` en `SiteHeader` async + props | Sin provider extra; patrón RSC nativo | **Elegida** |
| `<SessionProvider>` + `useSession()` | Requiere wrapping en layout; agrega client boundary innecesario | Descartada |

**Rationale**: `SiteHeader` ya es un Server Component. Convertirlo a `async` y llamar `auth()` es el camino más directo. `MobileNav` (client) recibe session como prop serializable.

### Decision: Modelos Prisma mínimos

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| User + Account solamente | Mínimo para OAuth+JWT; sin tabla de sesiones | **Elegida** |
| User + Account + Session + VerificationToken | Completo pero innecesario sin email provider ni DB sessions | Descartada |

**Rationale**: Con JWT y solo Google Provider, Session y VerificationToken no se usan. Se agregan en un cambio futuro si se habilitan.

## Data Flow

```
Login:
  /voluntarios/login ──[click Google]──→ /api/auth/signin/google
       → Google OAuth consent → callback → /api/auth/callback/google
       → Auth.js crea/recupera User+Account en Mongo
       → Set JWT cookie → redirect /

Request autenticado:
  Browser ──[cookie]──→ middleware.ts ──[auth()]──→ ¿sesión válida?
       │ sí → continúa a ruta
       │ no → redirect /voluntarios/login

Header render (RSC):
  SiteHeader (async) ──[auth()]──→ session
       │ session? → <UserMenu name image /> + signOut
       │ null    → botones Iniciar sesión / Registrarse
       └──→ <MobileNav session={session} />
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `prisma/schema.prisma` | Modify | Agregar modelos `User` y `Account` con convención Auth.js+MongoDB |
| `lib/auth.ts` | Create | Config NextAuth: Google provider, PrismaAdapter, JWT session, callbacks |
| `app/api/auth/[...nextauth]/route.ts` | Create | Re-exporta `handlers` de `lib/auth.ts` como GET/POST |
| `middleware.ts` | Create | Protege rutas con matcher; redirige a login sin sesión |
| `app/(public)/voluntarios/login/page.tsx` | Create | Página con botón Google; redirige a `/` si ya hay sesión |
| `components/site-header.tsx` | Modify | `async`, llama `auth()`, renderiza `UserMenu` o botones login |
| `components/user-menu.tsx` | Create | Client component: avatar, nombre, botón cerrar sesión |
| `components/mobile-nav.tsx` | Modify | Recibe `session` prop; muestra user info o enlaces login |
| `next.config.mjs` | Modify | Agregar dominio `lh3.googleusercontent.com` a images (avatars) |
| `.env.example` | Create | Documentar variables requeridas |

## Interfaces / Contracts

```typescript
// lib/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [Google],
  pages: { signIn: "/voluntarios/login" },
})

// components/user-menu.tsx
type UserMenuProps = {
  name: string | null
  image: string | null
}
```

## Testing Strategy

| Layer | Qué testear | Approach |
|-------|-------------|----------|
| Build | Compilación sin errores | `next build` |
| Manual | Flujo completo login/logout | Login con cuenta Google real → verificar header → logout |
| Manual | Middleware protege rutas | Acceder a ruta protegida sin sesión → verificar redirect |

## Migration / Rollout

No data migration. Se ejecuta `prisma db push` para sincronizar modelos User/Account a MongoDB. Las colecciones se crean vacías. No afecta datos existentes de `Pedido`.

## Open Questions

- [ ] ¿Qué rutas actuales deben ser protegidas desde el inicio? (Candidatas: `/organizaciones/perfil`, `/voluntarios/calendario`)
