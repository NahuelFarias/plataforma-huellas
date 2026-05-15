# Code Review Rules

## General
- Use TypeScript strict mode — no `any` types
- Use `const`/`let`, never `var`
- No unused imports or variables
- Prefer named exports over default exports for components

## React / Next.js
- Use functional components only
- Server Components by default; add `"use client"` only when necessary (interactivity, hooks, browser APIs)
- Use `useRouter` + `router.refresh()` after mutations that affect RSC pages to avoid stale router cache
- Validate `searchParams` server-side before using them as component state

## Forms
- Use `react-hook-form` + `zodResolver` for all forms
- Define Zod schemas in `lib/validations/` — reuse them between client and API
- Always handle network errors separately from API errors

## API Routes
- Authenticate with `auth()` before any mutation
- Validate request body with Zod before touching the database
- Return consistent error shape: `{ error: string }`
- Use `export const runtime = "nodejs"` on routes that use Prisma

## Data Layer
- All DB access through `lib/prisma.ts` singleton
- Serialize Prisma models through `lib/serializers/` before returning from API routes
- Never expose raw Prisma objects to the client

## Styling
- Use Tailwind utility classes
- Use `cn()` from `lib/utils` for conditional class merging
- Use shadcn/ui components — do not reimplement primitives
- Accessible: interactive elements must have visible focus and minimum touch target `min-h-11`

## Auth
- Session carries `id`, `role`, `organizacionId` — use these, do not re-query the user on every request
- Role values: `"voluntario"` (default) | `"organizacion"`
