# PRUEBA_TECNICA_AUTENTICACIÓN
Prueba técnica de autenticación Nextjs+NextAuth+API+NestJS

## Prueba técnica: Aplicación de autenticación
Objetivo
Crear una aplicación que permita a los usuarios loguearse.

El usuario debe poder realizar las siguientes acciones dentro de la aplicación web:
- Iniciar sesión
- Registrarse

A tener en cuenta:
- Un usuario tipo *administrador* podrá acceder y ver su información personal además de ver un listado de todos los usuarios que se han registrado en la plataforma.
- Un usuario tipo *estándar* solo podrá acceder y ver su información personal.

## Requisitos
Las especficaciones del desarrollo de esta aplicación web, la parte del frontend debe estar completamente desarrollado mediante Next.JS y su ecosistemas de paquete; en la parte del backend se deberá de hacerse bajo el mismo framework, recalcar que la DB a utilizar puede ser cualquiera pero se debe especificar cual ha sido usada, como es desplegada en caso de necesitar pasos y facilitar un seeder de datos indicando como es este ejecutado.

Las especificaciones que deben desarrollarse son las siguientes. 
- Configuración y estructura del proyecto - Typescript + SASS
- Sistema de autenticación basado en token a expirar en 7d, debe integrarse mediante NextAuth
- Dos tipos de roles de usuario: admin y user
- Rutas protegidas en base al rol en el front y back
- Admin: Podrá visualizar su perfil + listado de usuarios que se hayan registrado.
- User: Podrá visualizar su perfil
- No autenticado: Deben ser redirigidos a la pantalla de login cuando intentan acceder a rutas protegidas.

Otros aspectos se valorarán de manera positiva como:
- Aplicación web multilenguaje mediante el uso de i18n
- Arquitectura de estilos utilizada
- Arquitectura del proyecto
- Legibilidad y mantenibilidad del codigo
- Definición correcta de variables y endpoints
- Correcto uso de estados e información devuelta en las peticiones

Con la finalidad de hacer la prueba técnica, deberás de hacer un fork del repositorio.

## Diseño
Se ha generado una carpeta por cada sección que hemos desarrollado para la prueba técnica:
- Auth: pantallas de inicio de sesión y registro
- Users: Pantalla de admin, usuario.
- Colors: colores corporativos de la empresa
