# Pedidos API

## Purpose

Contrato REST para **pedidos de ayuda** (formulario de publicación). **MongoDB**. Requiere autenticación para crear pedidos.

## Resource: Pedido

| Campo | Obligatoriedad | Valores permitidos |
|-------|----------------|-------------------|
| `id` | Sistema | Identificador opaco asignado al crear |
| `tipo` | Obligatorio | `traslado`, `transito`, `entrega`, `acompanamiento`, `difusion` |
| `zona` | Obligatorio | `capital`, `gba-norte`, `gba-sur`, `gba-oeste` |
| `direccion` | Obligatorio | Texto no vacío |
| `urgencia` | Obligatorio | `baja`, `media`, `alta` |
| `fechaSugerida` | Opcional | Fecha en ISO 8601 (solo fecha) |
| `horaSugerida` | Opcional | `manana`, `mediodia`, `tarde`, `noche` |
| `descripcion` | Obligatorio | Texto no vacío |
| `contactoNombre` | Obligatorio | Texto no vacío |
| `contactoTelefono` | Obligatorio | Texto no vacío |
| `organizacionId` | Opcional | Referencia a `Organizacion` (asignado automáticamente si el creador es org) |

## Requirements

### Requirement: Listar pedidos

El sistema **DEBE** exponer `GET` de colección y **DEBE** responder `200` con lista JSON (vacía o con ítems).

#### Scenario: Lista vacía o con datos

- **GIVEN** MongoDB accesible
- **WHEN** el cliente hace `GET` al listado
- **THEN** la respuesta **DEBE** ser `200` con lista JSON de pedidos

### Requirement: Crear pedido

El sistema MUST aceptar `POST /api/pedidos` con JSON válido. MUST requerir sesión activa. Si el usuario tiene sesión activa con `role: "organizacion"`, el pedido MUST vincularse automáticamente a su `Organizacion` vía `organizacionId`.

#### Scenario: Creación por organización autenticada

- **GIVEN** un usuario con `role: "organizacion"` y sesión activa
- **WHEN** envía `POST /api/pedidos` con campos válidos
- **THEN** se crea el pedido con `organizacionId` vinculado a su organización
- **AND** la respuesta MUST ser `201`

#### Scenario: Creación sin sesión (anónimo)

- **GIVEN** una solicitud sin sesión activa
- **WHEN** envía `POST /api/pedidos`
- **THEN** la respuesta MUST ser `401`

#### Scenario: Cuerpo inválido

- **GIVEN** JSON con falta de obligatorio o enum inválido
- **WHEN** el cliente hace `POST`
- **THEN** la respuesta **DEBE** ser `400` y **NO DEBE** persistirse un pedido

### Requirement: Obtener pedido por id

El sistema **DEBE** exponer `GET` por `id` y responder `200` si existe el recurso.

#### Scenario: Pedido existente

- **GIVEN** un `id` existente
- **WHEN** el cliente hace `GET` por `id`
- **THEN** la respuesta **DEBE** ser `200` con el pedido

#### Scenario: Pedido inexistente

- **GIVEN** un `id` inexistente
- **WHEN** el cliente hace `GET` por `id`
- **THEN** la respuesta **DEBE** ser `404`

### Requirement: Actualizar pedido

El sistema **DEBE** aceptar `PATCH` por `id` con campos parciales y validar igual que en creación para lo enviado.

#### Scenario: Actualización válida

- **GIVEN** pedido existente y cambios válidos
- **WHEN** el cliente hace `PATCH`
- **THEN** la respuesta **DEBE** ser `200` con el pedido actualizado

#### Scenario: Id o cuerpo inválido

- **GIVEN** `id` inexistente o cuerpo inválido
- **WHEN** el cliente hace `PATCH`
- **THEN** la respuesta **DEBE** ser `404` o `400` según corresponda

### Requirement: Eliminar pedido

El sistema **DEBE** aceptar `DELETE` por `id` y responder `204` sin cuerpo si el borrado fue exitoso.

#### Scenario: Borrado existente

- **GIVEN** un `id` existente
- **WHEN** el cliente hace `DELETE`
- **THEN** la respuesta **DEBE** ser `204`

#### Scenario: Borrado inexistente

- **GIVEN** un `id` inexistente
- **WHEN** el cliente hace `DELETE`
- **THEN** la respuesta **DEBE** ser `404`

### Requirement: Listar pedidos de una organización

El sistema MUST exponer `GET /api/pedidos?organizacionId={id}` para filtrar pedidos por organización.

#### Scenario: Listar pedidos de org específica

- **GIVEN** una organización con 3 pedidos publicados
- **WHEN** se hace `GET /api/pedidos?organizacionId={id}`
- **THEN** la respuesta MUST ser `200` con exactamente los 3 pedidos de esa organización

### Requirement: Pedido vinculado a organización

El recurso `Pedido` MAY tener un campo `organizacionId` (`String?`). Si está presente, MUST referenciar una `Organizacion` existente.

#### Scenario: Pedido con organizacionId válido

- **GIVEN** un pedido con `organizacionId` que referencia una organización existente
- **WHEN** se consulta el pedido
- **THEN** MUST incluir `organizacionId` en la respuesta

#### Scenario: Pedidos legacy sin organizacionId

- **GIVEN** pedidos creados antes de este cambio (sin `organizacionId`)
- **WHEN** se listan todos los pedidos
- **THEN** esos pedidos MUST tener `organizacionId: null`
- **AND** MUST seguir siendo visibles en listados públicos

### Requirement: Entorno de desarrollo y MongoDB

El cambio **DEBE** documentar MongoDB local (p. ej. Docker) y la variable de entorno de URI, para aplicar el modelo de datos y pruebas manuales.

#### Scenario: Desarrollador con Mongo local

- **GIVEN** arranque documentado y URI configurada
- **WHEN** el desarrollador inicia base y app
- **THEN** el CRUD **DEBE** persistir y leer en MongoDB
