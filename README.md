# Información del Proyecto Ultra Hotels

## 1. Arquitectura del Proyecto

El proyecto se ha desarrollado bajo el enfoque arquitectónico Clean Architecture, que permite mantener una separación clara de responsabilidades entre las diferentes capas de la aplicación, favoreciendo el desacoplamiento y la mantenibilidad del sistema.

### Estructura de la Arquitectura

**Core:**

- **Tipado de Mappers:** Facilita la conversión de datos entre diferentes capas de la aplicación.
- **Clases Base Compartidas:** Componentes reutilizables y fundamentales que son utilizados por diferentes módulos.
- **Configuración y Constantes:** Centralización de configuraciones globales y valores constantes que son críticos para el comportamiento del sistema.
- **Fábricas de los diferentes proveedores de conexión a datos.**

**Dominio:**

- **Entidades del Dominio:** Objetos principales de la aplicación como Hotel, Habitación, Reserva, etc.
- **Casos de Uso:** Contienen la lógica de negocio que maneja las operaciones clave de la aplicación.
- **Interfaces:** Definen los contratos entre las diferentes capas, asegurando un bajo acoplamiento.

**Data:**

- **Repositorios:** Manejan el acceso a datos de la app, encapsulando la interacción con la base de datos y otros sistemas de almacenamiento como Supabase.
- **Adapters:** Actúan como puentes entre los sistemas externos como Supabase para enviar y recopilar datos y la lógica interna de la aplicación, garantizando que los cambios en sistemas externos no afecten la lógica de negocio.
- **Servicios de Lógica de Negocio:** Implementaciones que manejan lógica compleja relacionada con la persistencia de datos y la comunicación con APIs externas.

**Presentación:**

- **Componentes:** Elementos reutilizables de la UI, desarrollados con Atomic Design.
- **Layouts:** Estructuras de páginas que dictan la disposición visual de los elementos.
- **Páginas:** Representan vistas completas que combinan múltiples componentes y layouts.
- **Gestión del Estado (NGXS):** Manejo del estado global de la aplicación, facilitando la sincronización de datos entre componentes.
- **Guardianes de Rutas, Pipes y Directivas:** Aseguran la protección de rutas, transformaciones de datos y comportamientos personalizados dentro de la UI.

## 2. Tecnologías Utilizadas

- **Angular:** Framework principal que soporta la construcción modular de la aplicación.
- **PrimeNG:** Biblioteca de componentes UI que permite el desarrollo de interfaces ricas y dinámicas.
- **Tailwind CSS:** Utilizado para estilizar la aplicación de manera eficiente y conforme a los principios de BEM.
- **Supabase:** Solución backend para la gestión en tiempo real de bases de datos y autenticación de usuarios.
- **NGXS:** Biblioteca utilizada para la gestión del estado global, permitiendo que la aplicación se vea fluida.
- **TypeScript:** Proporciona tipado estático, mejorando la robustez y la mantenibilidad del código.
- **Eslint y Prettier:** Herramientas de linters y formateadores que aseguran la consistencia del código a lo largo de todo el proyecto, integrados dentro del proceso de CI/CD a través de Husky.
- **Husky:** Implementado para asegurar que todos los commits cumplen con las normas de codificación y estilo establecidos.
- **Docker**
- **Azure**
- **Github Actions**

## 3. Patrones de Diseño Implementados

- **Singleton:** Se utiliza para instanciar Supabase una sola vez en la aplicación, permitiendo que la sesión del usuario y otras configuraciones globales se mantengan centralizadas.
- **Adapter:** Este patrón ha sido clave para la integración con servicios externos, como la autenticación. Permitió la interacción con diferentes APIs, asegurando que la aplicación pueda cambiar fácilmente de proveedor si es necesario.
- **Repository:** Implementado para acceder a los datos, encapsulando la lógica de consulta y manteniendo la coherencia en la interacción con la base de datos.
- **Observador:** Utilizado junto con NGXS para la gestión del estado global, permitiendo que los cambios en el estado se propaguen de manera eficiente a través de la aplicación.
- **Strategy:** Implementado en el sistema de notificaciones, donde se delega a un intermediario la decisión de cómo manejar cada tipo de notificación, permitiendo así la escalabilidad para soportar futuros medios de comunicación como OTP.
- **Factory:** Facilita la creación de instancias de adaptadores y otros servicios, asegurando una correcta inyección de dependencias y la adherencia a los principios SOLID.

## 4. Proceso de CI/CD

El proceso de CI/CD se ha diseñado para asegurar la calidad del código y la eficiencia en el despliegue de la aplicación:

- **Eslint y Prettier** están configurados para correr en cada commit, garantizando que el código cumpla con las normas de estilo y no contenga errores de formato.
- **Husky** se utiliza para automatizar la ejecución de estos checks, así como para gestionar los mensajes de commit.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
