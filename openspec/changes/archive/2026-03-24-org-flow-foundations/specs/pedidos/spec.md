# Delta for Pedidos

## MODIFIED Requirements

### Requirement: Crear pedido

El sistema MUST aceptar `POST /api/pedidos` con JSON válido. Si el usuario tiene sesión activa con `role: "organizacion"`, el pedido MUST vincularse automáticamente a su `Organizacion` vía `organizacionId`.

(Previously: POST creaba pedidos sin vínculo a ningún usuario ni organización.)

#### Scenario: Creación por organización autenticada

- GIVEN un usuario con `role: "organizacion"` y sesión activa
- WHEN envía `POST /api/pedidos` con campos válidos
- THEN se crea el pedido con `organizacionId` vinculado a su organización
- AND la respuesta MUST ser `201`

#### Scenario: Creación sin sesión (anónimo)

- GIVEN una solicitud sin sesión activa
- WHEN envía `POST /api/pedidos`
- THEN la respuesta MUST ser `401`

### Requirement: Listar pedidos de una organización

El sistema MUST exponer `GET /api/pedidos?organizacionId={id}` para filtrar pedidos por organización.

#### Scenario: Listar pedidos de org específica

- GIVEN una organización con 3 pedidos publicados
- WHEN se hace `GET /api/pedidos?organizacionId={id}`
- THEN la respuesta MUST ser `200` con exactamente los 3 pedidos de esa organización

## ADDED Requirements

### Requirement: Pedido vinculado a organización

El recurso `Pedido` MAY tener un campo `organizacionId` (`String?`). Si está presente, MUST referenciar una `Organizacion` existente.

#### Scenario: Pedido con organizacionId válido

- GIVEN un pedido con `organizacionId` que referencia una organización existente
- WHEN se consulta el pedido
- THEN MUST incluir `organizacionId` en la respuesta

#### Scenario: Pedidos legacy sin organizacionId

- GIVEN pedidos creados antes de este cambio (sin `organizacionId`)
- WHEN se listan todos los pedidos
- THEN esos pedidos MUST tener `organizacionId: null`
- AND MUST seguir siendo visibles en listados públicos
