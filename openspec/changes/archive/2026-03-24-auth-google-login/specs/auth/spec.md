# Auth Specification

## Purpose

Sistema de autenticación basado en Google OAuth para voluntarios y organizaciones de la plataforma Huellas.

## Requirements

### Requirement: Persistencia de usuario

El sistema MUST persistir modelos `User`, `Account` y `Session` en MongoDB siguiendo la convención de Auth.js/Prisma Adapter. Un `User` MUST tener `id`, `name`, `email`, `image`. El `email` MUST ser único.

#### Scenario: Primer login crea usuario

- GIVEN un usuario con cuenta Google que nunca inició sesión
- WHEN completa el flujo OAuth con Google
- THEN se crea un registro `User` con name, email e image de su cuenta Google
- AND se crea un registro `Account` vinculado al User con el provider "google"

#### Scenario: Login subsiguiente reutiliza usuario

- GIVEN un usuario que ya inició sesión previamente
- WHEN completa el flujo OAuth con Google usando la misma cuenta
- THEN el sistema recupera el `User` existente sin crear duplicado

### Requirement: Flujo OAuth con Google

El sistema MUST implementar el flujo OAuth 2.0 con Google Provider vía Auth.js v5. El route handler MUST estar en `app/api/auth/[...nextauth]/route.ts`.

#### Scenario: Login exitoso

- GIVEN un usuario en la página de login
- WHEN hace click en "Iniciar sesión con Google"
- THEN se redirige a la pantalla de consentimiento de Google
- AND tras autorizar, se redirige de vuelta a la plataforma con sesión activa

#### Scenario: Usuario cancela consentimiento

- GIVEN un usuario redirigido a la pantalla de consentimiento de Google
- WHEN cancela o cierra el diálogo de Google
- THEN regresa a la página de login sin sesión activa
- AND se muestra un mensaje informativo

### Requirement: Página de login

El sistema MUST servir una página en `/voluntarios/login` con un botón para iniciar sesión con Google. La página SHOULD mostrar el branding de la plataforma. Si el usuario ya tiene sesión activa, la página SHOULD redirigir a la home.

#### Scenario: Acceso a login sin sesión

- GIVEN un usuario sin sesión activa
- WHEN navega a `/voluntarios/login`
- THEN ve la página de login con el botón "Iniciar sesión con Google"

#### Scenario: Acceso a login con sesión activa

- GIVEN un usuario con sesión activa
- WHEN navega a `/voluntarios/login`
- THEN se redirige a `/`

### Requirement: Protección de rutas

El sistema MUST proteger rutas autenticadas mediante middleware de Next.js. Las rutas bajo el grupo `(protected)` MUST redirigir a `/voluntarios/login` si no hay sesión. Las rutas públicas MUST NOT requerir autenticación.

#### Scenario: Acceso a ruta protegida sin sesión

- GIVEN un usuario sin sesión activa
- WHEN intenta acceder a una ruta protegida
- THEN se redirige a `/voluntarios/login`

#### Scenario: Acceso a ruta protegida con sesión

- GIVEN un usuario con sesión activa
- WHEN accede a una ruta protegida
- THEN ve el contenido normalmente

### Requirement: Logout

El sistema MUST permitir cerrar sesión. Al cerrar sesión, la sesión MUST ser invalidada y el usuario MUST ser redirigido a `/`.

#### Scenario: Cierre de sesión

- GIVEN un usuario con sesión activa
- WHEN hace click en "Cerrar sesión"
- THEN la sesión se invalida
- AND se redirige a `/`
