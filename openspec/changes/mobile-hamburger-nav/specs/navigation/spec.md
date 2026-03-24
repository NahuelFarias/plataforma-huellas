# Navigation Specification (mobile global header)

## Purpose

Definir el comportamiento de la navegación principal del sitio en **viewports estrechos**, de modo que los usuarios accedan a las mismas secciones y acciones de cuenta que en escritorio sin que los controles compitan por espacio horizontal.

## Requirements

### Requirement: Breakpoint de navegación compacta

En viewports por debajo del breakpoint de referencia del layout global (`md`), el sistema **DEBE** mostrar solo la marca del sitio y un control dedicado para abrir el resto de la navegación. El sistema **NO DEBE** mostrar en la misma fila del encabezado una lista horizontal de enlaces de sección ni los botones de cuenta a ancho completo.

#### Scenario: Vista estrecha sin fila de enlaces

- GIVEN un viewport por debajo del breakpoint `md`
- WHEN el usuario ve el encabezado global
- THEN los enlaces de sección y las acciones de cuenta **NO** aparecen como fila visible junto al logo
- AND existe un control explícito para abrir la navegación ampliada

#### Scenario: Vista ancha sin menú compacto

- GIVEN un viewport en `md` o superior
- WHEN el usuario ve el encabezado global
- THEN los enlaces de sección y las acciones de cuenta están disponibles en la barra sin usar el control de navegación compacta
- AND el control de navegación compacta **NO** está visible

### Requirement: Paridad de destinos

El sistema **DEBE** ofrecer en la navegación compacta los mismos destinos de enlace que la barra de escritorio para secciones públicas y las mismas acciones de “iniciar sesión” y “registrarse” (o equivalentes definidos en el producto).

#### Scenario: Mismas rutas que escritorio

- GIVEN la lista de rutas expuestas en el encabezado en `md` o superior
- WHEN el usuario abre la navegación compacta en un viewport estrecho
- THEN cada una de esas rutas es alcanzable desde el panel de navegación compacta

### Requirement: Apertura y cierre del panel

El sistema **DEBE** permitir abrir y cerrar la región de navegación ampliada mediante el control dedicado. El sistema **DEBE** cerrar esa región cuando el usuario activa un enlace que provoca navegación a otra página del sitio.

#### Scenario: Cierre al seguir un enlace

- GIVEN la navegación compacta está abierta
- WHEN el usuario activa un enlace interno del sitio listado en el panel
- THEN el panel **NO** permanece abierto tras completarse la navegación

#### Scenario: Cierre al usar acción de cuenta

- GIVEN la navegación compacta está abierta
- WHEN el usuario activa el control que lleva a iniciar sesión o registrarse
- THEN el panel se cierra al iniciar la navegación hacia esa ruta

### Requirement: Accesibilidad del control

El control que abre la navegación compacta **DEBE** tener un nombre accesible (p. ej. etiqueta asociada o texto equivalente) que describa su función. Los destinos dentro del panel **DEBEN** ser activables con interacción táctil sin solaparse de forma que impidan el toque.

#### Scenario: Nombre accesible del disparador

- GIVEN tecnologías de asistencia o inspección de accesibilidad
- WHEN el foco o el lector alcanza el control de apertura
- THEN el nombre expuesto identifica que abre el menú de navegación

### Requirement: Sin regresión en escritorio

El sistema **NO DEBE** alterar el orden visual ni la disponibilidad de la navegación horizontal en `md` y superior salvo cambios explícitos posteriores a este alcance.

#### Scenario: Encabezado estable en pantallas grandes

- GIVEN un viewport en `md` o superior
- WHEN se compara con el comportamiento previo a este cambio
- THEN la disposición de enlaces y botones en la barra permanece reconocible para el usuario
