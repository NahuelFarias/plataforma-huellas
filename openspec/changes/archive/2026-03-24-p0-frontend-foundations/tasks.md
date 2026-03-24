# Tasks: Fundamentos Frontend P0

## Phase 1: Foundation — Tipos, helpers y layout

- [x] 1.1 Exportar `PedidoJson` type alias en `lib/serializers/pedido.ts`: `export type PedidoJson = ReturnType<typeof pedidoToJson>`
- [x] 1.2 Crear `lib/pedido-display.ts` con `tipoLabels`, `tipoIcons` (lucide), `zonaLabels`, y `urgenciaBadgeVariant()`
- [x] 1.3 Crear `app/(public)/layout.tsx` con `SiteHeader` + `<main className="flex-1">{children}</main>` + `SiteFooter` dentro de `<div className="flex min-h-screen flex-col">`

## Phase 2: Componentes reutilizables

- [x] 2.1 Crear `components/pedido-card.tsx` — acepta `PedidoCardProps { pedido: PedidoJson; imageSrc?: string; showImage?: boolean }`. Renderiza Card con badge urgencia, icono tipo, título, zona, descripción, fecha y CTA. Usa helpers de `lib/pedido-display.ts`
- [x] 2.2 Crear `components/colecta-card.tsx` — acepta `ColectaCardProps { title, description, imageSrc, imageAlt, badge, badgeVariant, collected, goal, daysLeft, ctaHref? }`. Renderiza Card con imagen, Progress bar, badge y botón donar

## Phase 3: Migrar páginas al route group

- [x] 3.1 Mover `app/page.tsx` → `app/(public)/page.tsx`. Quitar imports de `SiteHeader`/`SiteFooter` y el wrapper `div.flex.min-h-screen`. Mantener solo el contenido de `<main>`
- [x] 3.2 Mover `app/voluntarios/pedidos/page.tsx` → `app/(public)/voluntarios/pedidos/page.tsx`. Quitar header/footer y wrapper
- [x] 3.3 Mover `app/voluntarios/pedidos/loading.tsx` → `app/(public)/voluntarios/pedidos/loading.tsx`
- [x] 3.4 Mover `app/voluntarios/registro/page.tsx` → `app/(public)/voluntarios/registro/page.tsx`. Quitar header/footer y wrapper
- [x] 3.5 Mover `app/voluntarios/calendario/page.tsx` → `app/(public)/voluntarios/calendario/page.tsx`. Quitar header/footer y wrapper
- [x] 3.6 Mover `app/colectas/page.tsx` → `app/(public)/colectas/page.tsx`. Quitar header/footer y wrapper
- [x] 3.7 Mover `app/faq/page.tsx` → `app/(public)/faq/page.tsx`. Quitar header/footer y wrapper
- [x] 3.8 Mover `app/organizaciones/perfil/page.tsx` → `app/(public)/organizaciones/perfil/page.tsx`. Quitar header/footer y wrapper
- [x] 3.9 Mover `app/organizaciones/pedidos/nuevo/page.tsx` → `app/(public)/organizaciones/pedidos/nuevo/page.tsx`. Quitar header/footer y wrapper
- [x] 3.10 Eliminar directorios originales vacíos: `app/voluntarios/`, `app/colectas/`, `app/faq/`, `app/organizaciones/`, `app/page.tsx`

## Phase 4: Data fetching y reemplazo de cards

- [x] 4.1 `app/(public)/voluntarios/pedidos/page.tsx` — convertir a `async` RSC; `prisma.pedido.findMany({ orderBy: { createdAt: "desc" } })`; mapear con `pedidoToJson` y renderizar `PedidoCard` por cada item. Mostrar mensaje vacío si no hay pedidos
- [x] 4.2 `app/(public)/page.tsx` — sección "Pedidos urgentes": `async` RSC; query `prisma.pedido.findMany({ where: { urgencia: "alta" }, take: 3, orderBy: { createdAt: "desc" } })`; renderizar `PedidoCard` con `showImage={true}`. Fallback a sección oculta si no hay resultados
- [x] 4.3 `app/(public)/colectas/page.tsx` — reemplazar cards hardcodeadas por `ColectaCard` con los mismos datos estáticos (no hay modelo Colecta aún)
- [x] 4.4 `app/(public)/organizaciones/perfil/page.tsx` — reemplazar cards de colectas en tab "Colectas" por `ColectaCard` (datos mock). Cards de pedidos en tab "Pedidos activos" se mantienen con markup propio (tienen botones Editar/Cancelar específicos de org)

## Phase 5: Verificación

- [x] 5.1 `next build` — compilación sin errores
- [x] 5.2 Verificar que ningún `page.tsx` dentro de `app/(public)/` importe `SiteHeader` ni `SiteFooter`
- [ ] 5.3 Navegar todas las rutas (`/`, `/voluntarios/pedidos`, `/voluntarios/registro`, `/voluntarios/calendario`, `/colectas`, `/faq`, `/organizaciones/perfil`, `/organizaciones/pedidos/nuevo`) y confirmar que header/footer aparecen y no hay regresión visual
- [ ] 5.4 Crear un pedido vía `POST /api/pedidos` y verificar que aparece en `/voluntarios/pedidos` y en home (si urgencia=alta)
