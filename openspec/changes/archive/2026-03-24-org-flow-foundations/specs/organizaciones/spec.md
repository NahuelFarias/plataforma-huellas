# Organizaciones Specification

## Purpose

Gestión de organizaciones de rescate animal: registro, perfil y edición de datos.

## Resource: Organizacion

| Campo | Obligatoriedad | Descripción |
|-------|----------------|-------------|
| `id` | Sistema | Identificador opaco |
| `nombre` | MUST | Nombre de la organización |
| `descripcion` | MUST | Texto descriptivo de la organización |
| `zona` | MUST | `capital`, `gba-norte`, `gba-sur`, `gba-oeste` |
| `direccion` | SHOULD | Dirección física |
| `telefono` | MUST | Teléfono de contacto |
| `email` | MUST | Email de contacto |
| `web` | MAY | URL del sitio web |
| `instagram` | MAY | Handle de Instagram |
| `facebook` | MAY | Handle/URL de Facebook |
| `logo` | MAY | URL de imagen/logo |
| `userId` | Sistema | Vínculo al User creador (1:1) |
| `createdAt` | Sistema | Fecha de creación |

## Requirements

### Requirement: Registro de organización

El sistema MUST permitir que un usuario autenticado sin organización registre una nueva organización. Al registrar, el `User.role` MUST actualizarse a `organizacion`.

#### Scenario: Registro exitoso

- GIVEN un usuario autenticado con `role: "voluntario"` en `/organizaciones/registro`
- WHEN envía el formulario con todos los campos obligatorios válidos
- THEN se crea una `Organizacion` vinculada al `User`
- AND el `User.role` se actualiza a `organizacion`
- AND se redirige a `/organizaciones/perfil`

#### Scenario: Campos obligatorios faltantes

- GIVEN un usuario en `/organizaciones/registro`
- WHEN envía el formulario sin algún campo obligatorio
- THEN la respuesta MUST ser `400` con detalle del error
- AND no se crea ninguna `Organizacion`

#### Scenario: Usuario ya tiene organización

- GIVEN un usuario con `role: "organizacion"` que ya tiene una organización vinculada
- WHEN intenta acceder a `/organizaciones/registro`
- THEN MUST ser redirigido a `/organizaciones/perfil`

### Requirement: Perfil de organización

El sistema MUST mostrar el perfil con datos reales de la organización del usuario autenticado.

#### Scenario: Ver perfil propio

- GIVEN un usuario con `role: "organizacion"` autenticado
- WHEN navega a `/organizaciones/perfil`
- THEN ve los datos de su organización (nombre, descripción, contacto, redes)
- AND ve las tabs de pedidos activos, colectas y adopciones

#### Scenario: Acceso sin ser organización

- GIVEN un usuario con `role: "voluntario"`
- WHEN intenta acceder a `/organizaciones/perfil`
- THEN MUST ser redirigido a `/` con un mensaje informativo

### Requirement: Edición de perfil

El sistema MUST permitir que la organización edite sus datos vía `PATCH /api/organizaciones/[id]`.

#### Scenario: Edición válida

- GIVEN una organización existente y un usuario autenticado como su creador
- WHEN envía `PATCH` con campos válidos
- THEN la respuesta MUST ser `200` con la organización actualizada

#### Scenario: Edición por usuario no propietario

- GIVEN un usuario que NO es el creador de la organización
- WHEN envía `PATCH /api/organizaciones/[id]`
- THEN la respuesta MUST ser `403`

#### Scenario: Campos inválidos

- GIVEN un PATCH con enum de zona inválido
- WHEN se procesa la solicitud
- THEN la respuesta MUST ser `400`

### Requirement: API de registro

El sistema MUST exponer `POST /api/organizaciones` que crea la organización y actualiza el rol del usuario. MUST requerir sesión activa.

#### Scenario: POST sin sesión

- GIVEN una solicitud sin sesión activa
- WHEN se envía `POST /api/organizaciones`
- THEN la respuesta MUST ser `401`
