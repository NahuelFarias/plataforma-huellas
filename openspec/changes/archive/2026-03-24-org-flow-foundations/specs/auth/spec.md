# Delta for Auth

## MODIFIED Requirements

### Requirement: Persistencia de usuario

El `User` MUST incluir un campo `role` con valores `voluntario` (default) o `organizacion`. El `User` MAY tener una relación con `Organizacion` (1:1 opcional).

(Previously: User solo tenía id, name, email, image. Sin campo role.)

#### Scenario: Primer login crea usuario con role default

- GIVEN un usuario con cuenta Google que nunca inició sesión
- WHEN completa el flujo OAuth con Google
- THEN se crea un `User` con `role: "voluntario"` por defecto

#### Scenario: Role persiste en sesiones subsiguientes

- GIVEN un usuario con `role: "organizacion"`
- WHEN inicia sesión nuevamente
- THEN la sesión refleja `role: "organizacion"`

## ADDED Requirements

### Requirement: JWT incluye role y organizacionId

Los callbacks de NextAuth MUST inyectar `role` y `organizacionId` (si existe) en el token JWT y en el objeto `session.user`.

#### Scenario: Sesión de organización

- GIVEN un usuario con `role: "organizacion"` y una `Organizacion` vinculada
- WHEN se genera o renueva el token JWT
- THEN el token MUST contener `role: "organizacion"` y `organizacionId: "{id}"`
- AND `session.user` MUST exponer ambos campos

#### Scenario: Sesión de voluntario

- GIVEN un usuario con `role: "voluntario"` sin organización
- WHEN se genera el token JWT
- THEN el token MUST contener `role: "voluntario"`
- AND `organizacionId` MUST ser `null`

#### Scenario: Sesión existente sin campo role

- GIVEN un token JWT creado antes de este cambio (sin campo `role`)
- WHEN el sistema lee el token
- THEN MUST asumir `role: "voluntario"` como default

### Requirement: Protección de rutas por rol

El middleware MUST proteger rutas `/organizaciones/*` (excepto `/organizaciones/registro`) requiriendo `role: "organizacion"`. Usuarios sin ese rol MUST ser redirigidos a `/`.

#### Scenario: Voluntario accede a ruta de organización

- GIVEN un usuario con `role: "voluntario"`
- WHEN navega a `/organizaciones/perfil`
- THEN MUST ser redirigido a `/`

#### Scenario: Organización accede a su registro

- GIVEN un usuario con `role: "organizacion"`
- WHEN navega a `/organizaciones/registro`
- THEN MUST ser redirigido a `/organizaciones/perfil`
