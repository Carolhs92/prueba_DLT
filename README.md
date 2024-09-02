
![Logo](https://dltcode.es/img/logo/DLT_TAGLINE_DARK.svg)


# Prueba técnica de Front-end con Next.js + Next-Auth “El santuario”

## Descripción general

El objetivo de esta prueba técnica es desarrollar una aplicación web donde los usuarios puedan registrarse, iniciar sesión y gestionar su colección personal de criaturas mágicas.

Habrá dos tipos de usuarios: Cuidadores y Maestros, cada uno con permisos específicos.

## Requisitos de la prueba

### Tipos de usuario

#### Cuidadores

- Pueden crear, leer y actualizar criaturas mágicas.
- No pueden eliminar criaturas.

#### Maestros de criaturas

- Tienen todos los permisos de cuidadores.
- Pueden eliminar criaturas.

### Funcionalidades de la aplicación

#### Autenticación de usuario

- Implementa autenticación (pj: next-auth)
- Permite a los usuarios registrarse como Cuidador o Maestro.
- Redirige al usuario a su página correspondiente según el rol del usuario.

#### Gestión de criaturas mágicas

- CRUD completo para las criaturas.
- Cada criatura debe de tener:
  - Nombre
  - Tipo (dragón, fénix, golem, vampiro, unicornio)
  - Nivel de poder  
- Cada usuario solo puede ver y gestionar sus propias criaturas.

### Interfaz de usuario

- Para los estilos se deberá de utilizar SASS.
- Implementar una página de inicio de sesión.
- Implementar una página de registro.
- Mostrar una lista de criaturas mágicas en la página principal después de iniciar sesión.
- Implementar un formulario para crear y editar una criatura (tanto para Maestros como para Cuidadores).
- Incluye la opción eliminar (sólo para los usuarios Maestros).
- Crea una sección especial para los Maestros, dónde verás información adicional. (Total de criaturas creadas).


### Protección de rutas

- Protege las rutas para que solo los usuarios autenticados puedan acceder a las páginas de la aplicación.
- Redirige automáticamente a la página de inicio de sesión si un usuario intenta acceder a una página protegida sin estar autenticado.
- Diferencia el acceso y las funcionalidades basadas en el tipo de usuario.

## Requisitos técnicos

- Next.js + TypeScript
- NextAuth
- SCSS

## Aspectos que se valorarán de forma positiva
- Aplicación web multilenguaje mediante el uso de i18n
- Arquitectura de estilos utilizada
- Arquitectura del proyecto
- Legibilidad y mantenibilidad del codigo
- Definición correcta de variables y endpoints
- Correcto uso de estados e información devuelta en las peticiones

## Diseño
### Assets
En la carpeta assets tendrás el diseño de la prueba, además, las imágenes correspondientes para poder realizar el diseño.
### Colores

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary | ![#9C5CE1](https://via.placeholder.com/10/9C5CE1?text=+) #9C5CE1 |
| Secondary | ![#C77E01](https://via.placeholder.com/10/C77E01?text=+) #C77E01 |
| Dark | ![#222222](https://via.placeholder.com/10/222222?text=+) #222222 |
| Light | ![#777777](https://via.placeholder.com/10/777777?text=+) #777777 |

### Tipografías
* [Sedan SC](https://fonts.google.com/specimen/Sedan+SC?query=seda)
* [Sedan](https://fonts.google.com/specimen/Sedan?query=seda)

Con la finalidad de hacer la prueba técnica, haz un fork del repositorio, ¡mucha suerte! 🙌

