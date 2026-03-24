# Proposal: Menú hamburguesa en móvil

## Intent

En pantallas angostas, los enlaces de sección y los botones de cuenta compiten por espacio y se perciben amontonados. Centralizar la navegación secundaria en un panel accesible desde un ícono tipo hamburguesa mejora legibilidad y toque sin perder acceso a las mismas rutas que en escritorio.

## Scope

### In Scope

- Patrón móvil: botón con ícono de menú + panel deslizable (drawer) que lista enlaces principales y acciones de cuenta.
- Misma información de navegación que la barra desktop (paridad de rutas).
- Cierre del panel al elegir un enlace; áreas táctiles adecuadas; etiquetas accesibles (`aria-label` en el disparador).
- Breakpoint: navegación horizontal completa desde `md` hacia arriba; hamburguesa solo por debajo de ese punto.

### Out of Scope

- Lógica de autenticación o nuevas APIs.
- Nuevas secciones o rediseño completo del header desktop.
- Internacionalización de textos del menú (fuera de este cambio).

## Approach

Reutilizar el stack UI existente (`Sheet` de shadcn + ícono `Menu` de lucide). Mantener `SiteHeader` con dos carriles: `MobileNav` visible solo en `md:hidden` y bloque `nav` + CTAs en `hidden md:flex`. Ajustar solo si hace falta: orden de ítems, agrupación visual (enlaces vs. cuenta), y clases de espaciado para que el trigger no compita con el logo.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `components/mobile-nav.tsx` | Modified | Contenido del panel, estructura de enlaces, a11y del trigger. |
| `components/site-header.tsx` | Modified | Alineación contenedor / orden logo vs. menú móvil si aplica. |
| `app/layout.tsx` | None expected | Salvo importar componentes ya usados. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Doble scroll o foco atrapado en el Sheet | Low | Comportamiento por defecto de Radix Sheet; probar con teclado y VoiceOver. |
| Desalineación con otra rama que cambie rutas | Med | Lista de enlaces en un solo componente (`MobileNav`) para un solo lugar de verdad. |

## Rollback Plan

Revertir el commit que toque `mobile-nav.tsx` / `site-header.tsx` o restaurar archivos desde la revisión anterior a este cambio. No hay migraciones ni datos.

## Dependencies

- Ninguna externa nueva; depende de `@/components/ui/sheet` y `lucide-react` ya presentes.

## Success Criteria

- [ ] Por debajo del breakpoint `md`, solo se ve logo + botón hamburguesa (sin fila de enlaces comprimida).
- [ ] El panel incluye los mismos destinos que el nav desktop y los botones de sesión/registro.
- [ ] Al tocar un enlace, el panel se cierra y la navegación ocurre correctamente.
- [ ] Sin regresiones visuales en `md` y superior.
