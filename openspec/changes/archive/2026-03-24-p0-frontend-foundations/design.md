# Design: Fundamentos Frontend P0

## Technical Approach

Tres ejes ejecutados en orden: (1) route group para layout compartido, (2) componentes tipados para cards, (3) data fetching con Prisma directo en RSC. Se reutilizan los patrones existentes del proyecto (shadcn/ui, serializers, zod enums).

## Architecture Decisions

### Decision: Route group `(public)` para layout compartido

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Route group `(public)` | Requiere mover archivos; URLs no cambian | **Elegida** |
| Layout en `app/layout.tsx` raíz | Mezcla ThemeProvider con header/footer; futuras rutas protegidas necesitarían override | Descartada |
| Componente wrapper `<PageShell>` | No elimina imports repetidos; cada página sigue orquestando | Descartada |

**Rationale**: Route groups es el mecanismo nativo de Next.js para layouts por segmento sin afectar URLs. Cuando llegue auth, se crea `app/(protected)/layout.tsx` con middleware sin tocar `(public)`.

### Decision: Prisma directo en RSC vs fetch a `/api/pedidos`

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| `prisma.pedido.findMany()` en server component | Acopla página a Prisma; más eficiente (sin HTTP) | **Elegida** |
| `fetch("/api/pedidos")` desde RSC | Indirección HTTP innecesaria en mismo proceso | Descartada |

**Rationale**: Las páginas son server components por defecto en Next.js 15. Llamar a la propia API desde el servidor agrega latencia sin beneficio. El patrón del proyecto ya expone `prisma` como singleton en `lib/prisma.ts`.

### Decision: Tipo compartido para PedidoCard

| Opción | Tradeoff | Decisión |
|--------|----------|----------|
| Reutilizar `ReturnType<typeof pedidoToJson>` | Acoplado al serializer existente; consistente | **Elegida** |
| Tipo nuevo independiente | Duplica definición; puede divergir | Descartada |

**Rationale**: `pedidoToJson` ya define el shape exacto que sale de la API y que el card necesita. Se exporta un type alias `PedidoJson` desde `lib/serializers/pedido.ts`.

## Data Flow

```
┌─────────────────────────────────────────────┐
│  app/(public)/layout.tsx                     │
│  ┌─────────┐                ┌────────────┐  │
│  │SiteHeader│   {children}   │ SiteFooter │  │
│  └─────────┘                └────────────┘  │
└─────────────────────────────────────────────┘

Page: /voluntarios/pedidos (RSC)
  prisma.pedido.findMany() ──→ Pedido[] ──→ pedidoToJson() ──→ PedidoJson[]
                                                                    │
                                                          map → <PedidoCard />

Page: / (home, RSC)
  prisma.pedido.findMany({ where: { urgencia: "alta" }, take: 3 })
                              │
                    pedidoToJson() ──→ <PedidoCard />
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `app/(public)/layout.tsx` | Create | Header + `<main>` + footer; wrapper `flex min-h-screen flex-col` |
| `app/(public)/page.tsx` | Move | Desde `app/page.tsx`; quita header/footer; sección urgentes usa `PedidoCard` con data real |
| `app/(public)/voluntarios/pedidos/page.tsx` | Move+Modify | Fetch Prisma; renderiza `PedidoCard[]` |
| `app/(public)/voluntarios/pedidos/loading.tsx` | Move | Se mantiene (ya existe) |
| `app/(public)/voluntarios/registro/page.tsx` | Move | Quita header/footer |
| `app/(public)/voluntarios/calendario/page.tsx` | Move | Quita header/footer |
| `app/(public)/colectas/page.tsx` | Move+Modify | Quita header/footer; usa `ColectaCard` |
| `app/(public)/faq/page.tsx` | Move | Quita header/footer |
| `app/(public)/organizaciones/perfil/page.tsx` | Move+Modify | Usa `PedidoCard` y `ColectaCard` |
| `app/(public)/organizaciones/pedidos/nuevo/page.tsx` | Move | Quita header/footer |
| `components/pedido-card.tsx` | Create | Card reutilizable; acepta `PedidoJson` + `imageSrc?` |
| `components/colecta-card.tsx` | Create | Card reutilizable; acepta `ColectaCardProps` (datos estáticos por ahora) |
| `lib/serializers/pedido.ts` | Modify | Exporta `PedidoJson` type alias |
| `lib/pedido-display.ts` | Create | Maps de labels e iconos: `tipoLabel`, `tipoIcon`, `zonaLabel`, `urgenciaBadgeVariant` |
| `app/page.tsx` | Delete | Reemplazado por `app/(public)/page.tsx` |
| `app/voluntarios/` | Delete | Movido a `app/(public)/voluntarios/` |
| `app/colectas/` | Delete | Movido a `app/(public)/colectas/` |
| `app/faq/` | Delete | Movido a `app/(public)/faq/` |
| `app/organizaciones/` | Delete | Movido a `app/(public)/organizaciones/` |

## Interfaces / Contracts

```typescript
// lib/serializers/pedido.ts — tipo a exportar
export type PedidoJson = ReturnType<typeof pedidoToJson>

// components/pedido-card.tsx
type PedidoCardProps = {
  pedido: PedidoJson
  imageSrc?: string
  showImage?: boolean
}

// components/colecta-card.tsx
type ColectaCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  badge: string
  badgeVariant: "destructive" | "secondary" | "outline"
  collected: number
  goal: number
  daysLeft: number
  ctaHref?: string
}

// lib/pedido-display.ts
const tipoLabels: Record<string, string>
const tipoIcons: Record<string, LucideIcon>
const zonaLabels: Record<string, string>
function urgenciaBadgeVariant(u: string): "destructive" | "secondary" | "outline"
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Build | Todas las rutas compilan | `next build` sin errores |
| Visual | Sin regresiones en páginas | Navegación manual de todas las rutas |
| Data | Pedidos reales se muestran | Crear pedido vía API → verificar en listado y home |

## Migration / Rollout

No migration required. El movimiento de archivos es atómico en un solo commit. Las URLs no cambian gracias al route group.

## Open Questions

- [ ] El perfil de organización (`/organizaciones/perfil`) tiene pedidos y colectas hardcodeadas en tabs que no son del owner real — se dejan estáticas o se omite la data real para esa página? (Recomendación: dejar estáticas con `ColectaCard`/`PedidoCard` pero datos mock, hasta que exista modelo `Organizacion`.)
