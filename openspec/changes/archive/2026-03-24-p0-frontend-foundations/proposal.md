# Proposal: Fundamentos Frontend P0

## Intent

Toda página repite manualmente `<SiteHeader />` y `<SiteFooter />` dentro de un wrapper idéntico; los cards de pedido y colecta se copian textualmente ~15 veces; y la lista de pedidos es HTML estático pese a existir un API REST funcional (`/api/pedidos`). Resolver esto antes de agregar features elimina deuda técnica temprana, reduce líneas duplicadas y deja la base lista para autenticación y nuevas entidades.

## Scope

### In Scope
- **Layout compartido**: Extraer `SiteHeader` + `SiteFooter` a un layout de grupo (`app/(public)/layout.tsx`) que envuelva todas las páginas públicas. Eliminar las importaciones manuales de header/footer de cada `page.tsx`.
- **Componentes reutilizables**: Crear `PedidoCard` y `ColectaCard` que reciban props tipadas y reemplacen las cards hardcodeadas en home, listado de pedidos, colectas y perfil de organización.
- **Conexión a datos reales**: La página `/voluntarios/pedidos` hace fetch a `GET /api/pedidos` y renderiza `PedidoCard` con datos de MongoDB. Los pedidos urgentes del home también consumen la API (limitados a 3, filtro `urgencia=alta`).

### Out of Scope
- Autenticación y protección de rutas (cambio posterior).
- Nuevos modelos Prisma (Colecta, Organizacion, User).
- Funcionalidad de filtros/búsqueda real (se mantiene UI existente sin lógica).
- Paginación server-side.
- Integración MercadoPago.
- Creación de páginas faltantes (login, registro org, etc.).

## Approach

1. **Route group `(public)`**: mover todas las páginas actuales bajo `app/(public)/` con un `layout.tsx` que renderice header + `<main className="flex-1">{children}</main>` + footer. Cada página solo exporta su contenido.
2. **`PedidoCard`**: componente en `components/pedido-card.tsx` que acepta un tipo `PedidoCardProps` (título, tipo, zona, urgencia, descripción, fecha, imagen opcional, href). Se usa en home y en `/voluntarios/pedidos`.
3. **`ColectaCard`**: componente en `components/colecta-card.tsx` con props tipadas (título, descripción, imagen, monto recaudado, meta, días restantes, badge). Se usa en `/colectas` y perfil de org.
4. **Data fetching**: la página de pedidos pasa a ser `async` server component que llama a `prisma.pedido.findMany()` directamente (sin fetch HTTP, ventaja de RSC). Home: query con `take: 3, where: { urgencia: "alta" }`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `app/(public)/layout.tsx` | New | Layout compartido con header + footer |
| `app/(public)/page.tsx` | Modified | Mueve desde `app/page.tsx`; elimina header/footer; usa `PedidoCard` |
| `app/(public)/voluntarios/pedidos/page.tsx` | Modified | Fetch real de pedidos; usa `PedidoCard` |
| `app/(public)/colectas/page.tsx` | Modified | Usa `ColectaCard`; elimina header/footer |
| `app/(public)/faq/page.tsx` | Modified | Solo quita header/footer |
| `app/(public)/organizaciones/perfil/page.tsx` | Modified | Usa `PedidoCard` y `ColectaCard` |
| `app/(public)/voluntarios/registro/page.tsx` | Modified | Solo quita header/footer |
| `app/(public)/voluntarios/calendario/page.tsx` | Modified | Solo quita header/footer |
| `app/(public)/organizaciones/pedidos/nuevo/page.tsx` | Modified | Solo quita header/footer |
| `components/pedido-card.tsx` | New | Card reutilizable de pedido |
| `components/colecta-card.tsx` | New | Card reutilizable de colecta |
| `app/layout.tsx` | Unchanged | Mantiene ThemeProvider y globals |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Rutas se rompen al mover a route group | Med | Route groups `(public)` no afectan URL; verificar con `next build` |
| Tipado de datos de pedido difiere entre API y card | Low | Reutilizar tipo del serializer existente en `lib/serializers/pedido.ts` |
| Regresión visual al quitar wrapper de cada página | Low | El layout reproduce el mismo markup (`flex min-h-screen flex-col`) |

## Rollback Plan

Revertir el commit. Las páginas vuelven a su ubicación original en `app/` con header/footer inline. No hay cambios de esquema de datos ni migraciones.

## Dependencies

- MongoDB accesible con datos de pedidos (ya requerido por el cambio `add-backend-crud`).
- No se necesitan dependencias nuevas de npm.

## Success Criteria

- [ ] Ninguna página importa `SiteHeader` ni `SiteFooter` directamente; el layout los provee.
- [ ] `PedidoCard` se usa en al menos 3 ubicaciones (home, listado, perfil org) sin duplicar markup.
- [ ] `ColectaCard` se usa en al menos 2 ubicaciones (colectas, perfil org).
- [ ] `/voluntarios/pedidos` muestra pedidos reales de MongoDB.
- [ ] Home muestra hasta 3 pedidos urgentes reales.
- [ ] `next build` compila sin errores.
- [ ] Sin regresiones visuales en las páginas existentes.
