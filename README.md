# PRUEBA_TECNICA_GESTION_PRODUCTOS
Prueba técnica gestión de productos Nextjs+NextAuth+API+NestJS

# Prueba técnica: Aplicación de gestión de productos
Objetivo
Crear una aplicación web que permita a los usuarios autenticados la gestión de un listado de productos relacionados al negocio.

El usuario debe poder realizar las siguientes acciones dentro de la aplicación web: - Autenticarse - Cambiar contraseña - Visualizar los productos del sistema - Filtrar los productos del sistema - Visualizar los detalles de un producto seleccionado

Además del usuario de negocio, existe un segundo tipo de usuario denominado, administrador, que debe poder acceder a una ruta protegida únicamente para este rol que le permita visualizar y gestionar los usuarios del sistema, eso incluye: - Visualizar todos los usuarios del sistema - Desactivar un usuario del sistema - Registrar un nuevo producto - Borrar un producto

Requisitos
Las especficaciones del desarrollo de esta aplicación web, la parte del frontend debe estar completamente desarrollado mediante Next.JS y su ecosistemas de paquete; en la parte del backend se deberá de hacerse bajo el mismo framework, recalcar que la DB a utilizar puede ser cualquiera pero se debe especificar cual ha sido usada, como es desplegada en caso de necesitar pasos y facilitar un seeder de datos indicando como es este ejecutado.

Las especificaciones que deben desarrollarse son las siguientes. - Configuración y estructura del proyecto - Typescript + SASS - Sistema de autenticación basado en token a expirar en 7d, debe integrarse mediante NextAuth - Dos tipos de roles de usuario: admin y user - Rutas protegidas en base al rol en el front y back - Admin: Podrá acceder a un panel de administración donde se muestra una lista de usuarios registrados y la posibilidad de ver detalles de cada uno, así como los productos adquiridos. - User: Podrá acceder a la lista de productos y ver detalles de un producto específico así como poder comprarlo. - No autenticado: Deben ser redirigidos a la pantalla de login cuando intentan acceder a rutas protegidas.

Otros aspectos se valorarán de manera positiva como: - Aplicación web multilenguaje mediante el uso de i18n - Arquitectura de estilos utilizada - Arquitectura del proyecto - Legibilidad y mantenibilidad del codigo - Definición correcta de variables y endpoints - Correcto uso de estados e información devuelta en las peticiones

Con la finalidad de hacer la prueba técnica, deberás de hacer un fork del repositorio. Encontrarás los assets necesarios para el desarrollo de la misma. (En este caso, el diseño)
