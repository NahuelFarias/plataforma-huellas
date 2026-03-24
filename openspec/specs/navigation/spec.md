# Navigation Specification

## Purpose

Comportamiento de la navegación del sitio (header desktop y menú móvil) en relación al estado de autenticación del usuario.

## Requirements

### Requirement: Header refleja estado de sesión

El site header MUST mostrar contenido diferente según el estado de autenticación del usuario.

#### Scenario: Header sin sesión activa

- GIVEN un usuario sin sesión activa
- WHEN ve el header (desktop o móvil)
- THEN ve los botones "Iniciar sesión" y "Registrarse" enlazando a `/voluntarios/login`

#### Scenario: Header con sesión activa

- GIVEN un usuario autenticado con nombre "Ana" e imagen de perfil
- WHEN ve el header (desktop o móvil)
- THEN ve su avatar e imagen de perfil
- AND ve una opción para "Cerrar sesión"
- AND NO ve los botones "Iniciar sesión" / "Registrarse"

### Requirement: Navegación móvil refleja estado de sesión

El menú móvil (hamburguesa) MUST mostrar el estado de sesión de forma consistente con el header desktop.

#### Scenario: Menú móvil con sesión activa

- GIVEN un usuario autenticado en un viewport móvil
- WHEN abre el menú hamburguesa
- THEN ve su nombre y avatar
- AND ve la opción "Cerrar sesión"

#### Scenario: Menú móvil sin sesión

- GIVEN un usuario sin sesión en un viewport móvil
- WHEN abre el menú hamburguesa
- THEN ve enlaces "Iniciar sesión" y "Registrarse"
