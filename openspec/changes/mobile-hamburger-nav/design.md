# Design: Menú hamburguesa en móvil

## Technical Approach

El encabezado global usa **dos carriles mutuamente excluyentes** por breakpoint Tailwind `md` (768px): `MobileNav` (`md:hidden`) y el bloque `nav` + CTAs (`hidden md:flex`). La navegación compacta es un **Sheet** (Radix Dialog) lateral derecho con disparador ícono `Menu`, enlaces envueltos en `SheetClose` para cumplir cierre al navegar. No hay estado de servidor ni datos remotos; el flujo es 100% cliente en `mobile-nav.tsx`.

| Aspecto | Elección |
|---------|----------|
| Panel | `Sheet` / `@radix-ui/react-dialog` (patrón shadcn ya en el repo) |
| Breakpoint | `md` alineado a `site-header.tsx` |
| Paridad rutas | Mismos `href` que en `SiteHeader` (hoy duplicados en dos archivos) |

## Architecture Decisions

### Decision: Sheet lateral frente a menú desplegable inline

| Opción | Trade-off | Decisión |
|--------|-----------|----------|
| Sheet / drawer | Ocupa overlay, foco atrapado gestionado por Radix; familiar en móvil | **Elegido** |
| Dropdown / popover | Menos espacio pero peor en touch y jerarquía | Rechazado |
| Nueva ruta `/menu` | Rompe patrón SPA y añade navegación extra | Rechazado |

**Rationale**: El proyecto ya incluye `components/ui/sheet.tsx` y `MobileNav` lo usa; mantener reduce riesgo y cumple la especificación de “región ampliada”.

### Decision: Duplicación de enlaces vs. módulo compartido

| Opción | Trade-off | Decisión |
|--------|-----------|----------|
| Lista de items en `lib/nav-items.ts` (o similar) consumida por header y móvil | Una sola fuente de verdad; refactor mínimo extra | **Recomendado** si se agregan rutas con frecuencia |
| Duplicar `href` y etiquetas en `site-header` y `mobile-nav` | Sin refactor; riesgo de desalineación | **Estado actual**; aceptable para MVP |

**Rationale**: La propuesta ya advierte desalineación entre ramas; extraer la lista es mejora opcional no bloqueante para cerrar el cambio.

### Decision: Accesibilidad del disparador

**Choice**: `Button` + `aria-label="Abrir menú de navegación"` (ya presente).  
**Alternatives**: texto visible “Menú” junto al ícono (más ancho en móvil).  
**Rationale**: El spec pide nombre accesible; el `aria-label` cumple sin consumir espacio horizontal.

## Data Flow

```
Usuario → tap ícono → SheetTrigger → Sheet open (estado Radix en cliente)
       → tap Link + SheetClose → cierre + navegación Next.js (App Router)
```

No props async ni stores; el `Sheet` encapsula estado abierto/cerrado.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `components/mobile-nav.tsx` | Modify (si hace falta) | Ajustes de layout del panel, orden, `min-h` táctil; opcional: importar items desde módulo compartido. |
| `components/site-header.tsx` | Modify (opcional) | Solo si se extrae lista compartida de enlaces para importarla aquí y en `MobileNav`. |
| `lib/nav-items.ts` | Create (opcional) | Arreglo de `{ href, label }[]` para header desktop + sheet móvil. |

## Interfaces / Contracts

```ts
// Contrato implícito actual — paridad entre dos listas de enlaces
type NavItem = { href: string; label: string }
// MobileNav: props solo { className?: string }
```

Sin contratos HTTP ni tipos exportados obligatorios salvo refactor opcional.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | Breakpoint, cierre al tocar enlace, visibilidad `md` | Redimensionar ventana / DevTools device |
| Unit | (Opcional) render de lista desde datos | Solo si se introduce `nav-items` y lógica |
| E2E | (Opcional) abrir menú → click ruta → URL | Playwright/Cypress si el proyecto los adopta después |

## Migration / Rollout

No migration required. Despliegue continuo: solo assets front.

## Open Questions

- [ ] ¿Se extrae `nav-items` en este cambio o en un follow-up para evitar duplicar rutas?
- [ ] ¿Se requiere prueba automatizada de accesibilidad (axe) en CI para el header?
