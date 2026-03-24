# Tasks: Menú hamburguesa en móvil

## Phase 1: Comprobación frente a spec (baseline)

- [x] 1.1 En `components/site-header.tsx`, confirmar que `MobileNav` usa `className` que lo oculta desde `md` (`md:hidden`) y que el bloque con `nav` + botones usa `hidden md:flex` (sin fila de enlaces visible en móvil).
- [x] 1.2 En `components/mobile-nav.tsx`, confirmar `Sheet` + `SheetTrigger` con ícono `Menu`, `SheetContent side="right"`, y cada `Link` envuelto en `SheetClose asChild` (incl. CTAs login/registro).
- [x] 1.3 Confirmar que el botón disparador tiene `type="button"` y `aria-label` descriptivo (p. ej. “Abrir menú de navegación”).
- [x] 1.4 Comparar `href` y textos de `site-header.tsx` con los del panel móvil; anotar cualquier divergencia y corregirla en el mismo PR si existe.

## Phase 2: Ajustes visuales / UX (solo si falla 1.x)

- [x] 2.1 Ajustar clases en `SheetContent` o contenedor interno (`gap`, `py`, `border-t`) para separar enlaces de sección de bloque de cuenta sin solapar targets táctiles.
- [x] 2.2 Revisar `min-h-11` / padding de filas del menú para cumplir toque cómodo en el rango de anchos móvil objetivo.

## Phase 3: Refactor opcional (fuente única de rutas)

- [x] 3.1 Crear `lib/nav-items.ts` exportando un arreglo tipado `{ href: string; label: string }[]` con Pedidos, Colectas, FAQ (mismas rutas que hoy).
- [x] 3.2 Reemplazar los tres `Link` duplicados en `components/site-header.tsx` por un `.map` sobre ese arreglo (manteniendo clases actuales por ítem).
- [x] 3.3 Reemplazar los tres `SheetClose`+`Link` de sección en `components/mobile-nav.tsx` por el mismo arreglo (misma estructura `SheetClose asChild`).

## Phase 4: Verificación manual (criterios de éxito)

- [ ] 4.1 Viewport por debajo de `md`: solo logo + botón menú; abrir sheet → mismas rutas que barra desktop; tocar un enlace → sheet cerrado y navegación correcta.
- [ ] 4.2 Viewport `md` o superior: barra horizontal visible; botón hamburguesa no visible; layout reconocible respecto al estado previo al cambio.
- [ ] 4.3 (Opcional) Teclado: abrir menú con disparador, foco dentro del panel, `Escape` cierra (comportamiento Radix Sheet por defecto).
