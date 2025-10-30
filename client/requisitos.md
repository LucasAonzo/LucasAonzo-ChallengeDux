## **Prueba Técnica Frontend Team - ABM de Usuarios en React**

### **¡Bienvenido a la prueba técnica para desarrolladores Frontend de Dux Software! En este proyecto, te desafiamos a construir un ABM (CRUD) de usuarios utilizando React, NextJS, Typescript y PrimeReact. Sigue las instrucciones a continuación para comenzar.**

### **Instrucciones**

#### **API** 

Tendrás disponible una API para acceder a la información, la misma es:

<https://staging.duxsoftware.com.ar/api-test/personal> 

La misma está provista por json-server, por lo que si nunca la utilizaste te dejamos debajo la documentación para que puedas interactuar con ella.


#### **CLIENT** 

Deberás crear un repositorio con el siguiente formato NombreCandidato-ChallengeDux. Dentro tendrás que crear una carpeta llamada client. Dentro de la misma deberá estar el frontend en React. Podrás usar el comando que prefieras para inicializar el proyecto. Te dejamos una sugerencia.

npx create-next-app\@latest

Deberás instalar la librería PrimeReact, donde tendrás muchos de los componentes que necesitarás para realizar el ABM. Si nunca la utilizaste, puedes consultar la documentación en la sección de recursos.\
\
npm install primereact primeicons


#### **Normas de Desarrollo** 

Desarrolla la aplicación siguiendo las especificaciones proporcionadas. Asegúrate de seguir las siguientes normas de desarrollo:

- Utiliza NextJS + React para construir la interfaz de usuario (Next 14 con AppRouter y React 18).

- La aplicación debe ser un ABM completo, permitiendo crear, leer, actualizar y eliminar usuarios.

- Implementa validaciones en los formularios para garantizar la integridad de los datos.

- En lo posible, utiliza una metodología Atomic Design para construir los componentes modulares y reutilizables

- Escribe código limpio y legible. Utiliza nombres de variables descriptivos y sigue las convenciones de estilo de PrimeReact <https://primeflex.org/>

- Gestiona el estado de la aplicación de manera eficiente y evita el uso excesivo de prop drilling.

- Comenta tu código cuando sea necesario para explicar partes complejas o importantes del mismo.

- Se debe respetar el diseño en Figma que se les adjunta en la sección de recursos.

- Se debe utilizar la librería PrimeReact y CSS/LESS/SASS en caso de ser necesario.


#### **Requerimientos del Software** 

A continuación, listamos los requerimientos del software a desarrollar. Recuerda hacer las llamadas a api desde componentes SSR siempre que sea posible y maneja el loading de componentes usando el componente Suspense de React

- Crear view inicial para Listar usuarios. (creacion de vista, implementar PrimeReact en Layout principal, creación de servicio, solicitud de data en componente server side, guardar la data en un estado local, crear componentes)

- Crear modal para creación y edición de usuarios. (crear un modal con un form reutilizable para creacion y edicion, uso de params, persistir data en estado y actualizar data

- Editar usuarios.

- Eliminar usuarios.

- Buscar por nombre o apellido por coincidencia.

- Filtrar por el estado del usuario (activo/inactivo).

- Paginado de registros utilizando \_limit & \_page (documentación de json-server).

**IMPORTANTE**: Se te otorgará un código identificador “Sector” que deberás utilizar SIEMPRE en todas las peticiones que hagas a la API. Por ejemplo, si se te asigna el sector = 6000, deberás filtrar los usuarios de la siguiente manera (tener también en cuenta en los POST): https://staging.duxsoftware.com.ar/api-test/personal?sector=6000&_limit=10&_page=1

La entidad usuario tiene 4 atributos:

- Id identificador único por cada usuario.

- Nombre de usuario, único por cada usuario.

- Estado, donde existen dos estados posibles, Habilitado y Deshabilitado. 

Al agregar, editar o eliminar un usuario, se debe actualizar la tabla de resultados posibles siempre mostrando los usuarios que cumplan con los filtros pertinentes. 


#### Entrega del Proyecto

Una vez que hayas terminado el desarrollo, hayas testeado y estes feliz con el resultado, sube tus cambios a un repositorio público y envíanos el link del mismo a <rrhh@duxsoftware.com.ar>

Eso sería todo, esperamos que disfrutes haciendo el challenge y esperamos ansiosos ver tu solución. Puedes consultarnos todo lo que necesites, recuerda que es un desafío técnico para conocer cómo te desenvuelves en estos proyectos. No hay una única manera de resolverlo. 


### **Recursos**

- **Documentacion de json-server:** <https://github.com/typicode/json-server>

- **Documentacion de Nextjs** <https://nextjs.org/docs/getting-started/installation>

- **Documentación de PrimeReact**:[ PrimeReact](https://primereact.org/installation/)

- **Documentacion de PrimeFlex**:[ ](https://primereact.org/installation/)https\://primeflex.org/

- **Diseño en Figma:** [Diseño en Figma](https://www.figma.com/design/HjDhupf4ipWvC2el9fqTse/Challange-Dux?node-id=0-1\&t=xx4L25ry9xAwmTun-1)
