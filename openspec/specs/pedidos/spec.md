# Pedidos API

## Purpose

Contrato REST para **pedidos de ayuda** (formulario de publicación). **MongoDB**. Sin auth por rol en esta fase.

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

## Requirements

### Requirement: Listar pedidos

El sistema **DEBE** exponer `GET` de colección y **DEBE** responder `200` con lista JSON (vacía o con ítems).

#### Scenario: Lista vacía o con datos

- **GIVEN** MongoDB accesible
- **WHEN** el cliente hace `GET` al listado
- **THEN** la respuesta **DEBE** ser `200` con lista JSON de pedidos

### Requirement: Crear pedido

El sistema **DEBE** aceptar `POST` con JSON válido según la tabla, persistir y responder `201` con el pedido creado (incl. `id`).

#### Scenario: Creación válida

- **GIVEN** JSON con obligatorios y enums válidos
- **WHEN** el cliente hace `POST`
- **THEN** la respuesta **DEBE** ser `201` con el pedido con `id`

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

### Requirement: Entorno de desarrollo y MongoDB

El cambio **DEBE** documentar MongoDB local (p. ej. Docker) y la variable de entorno de URI, para aplicar el modelo de datos y pruebas manuales.

#### Scenario: Desarrollador con Mongo local

- **GIVEN** arranque documentado y URI configurada
- **WHEN** el desarrollador inicia base y app
- **THEN** el CRUD **DEBE** persistir y leer en MongoDB
