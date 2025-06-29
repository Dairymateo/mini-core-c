<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



# Mini-Core Backend

## Descripción
🚀 Visión General del Proyecto
Este es el backend de una aplicación diseñada para calcular comisiones de ventas. Se encarga de gestionar los datos de ventas, usuarios y reglas de comisión, y de aplicar estas reglas para determinar las comisiones.

🛠️ Tecnologías Utilizadas
NestJS: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

TypeScript: Un superconjunto tipado de JavaScript que mejora la calidad del código y la productividad del desarrollador.

MongoDB: Una base de datos NoSQL utilizada para el almacenamiento de datos, interactuando a través de Mongoose.

Mongoose: Un modelado de objetos de MongoDB para Node.js, utilizado para definir esquemas y modelos para la base de datos.

🌐 Despliegue
Este backend ha sido desplegado en Render, una plataforma unificada para construir y ejecutar tus aplicaciones y bases de datos.

📦 Dependencias Clave
Las dependencias principales del proyecto incluyen:

@nestjs/common

@nestjs/core

@nestjs/platform-express

@nestjs/mongoose

mongoose

rxjs

🚀 Configuración y Ejecución Local
Sigue estos pasos para configurar y ejecutar el proyecto localmente:

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO_BACKEND>
cd <NOMBRE_DEL_REPOSITORIO_BACKEND>

Instalar dependencias:

npm install
# o
yarn install

Configurar variables de entorno (o usar la cadena de conexión directa):
El proyecto utiliza una cadena de conexión directa a MongoDB Atlas en app.module.ts. Si necesitas usar una base de datos local o una diferente, modifica esta línea:

MongooseModule.forRoot('mongodb+srv://admintest:Udla@clusterudla01.grlj6.mongodb.net/mini-core'),

Reemplaza 'mongodb+srv://admintest:Udla@clusterudla01.grlj6.mongodb.net/mini-core' con tu propia cadena de conexión.

Ejecutar la aplicación:

npm run start:dev
# o
yarn start:dev

La aplicación se ejecutará en http://localhost:3000 (o el puerto configurado).

📊 Base de Datos y Seeding Inicial
Al iniciar la aplicación por primera vez, el backend verifica si las colecciones de Usuarios, Reglas y Ventas están vacías. Si lo están, inserta datos iniciales de ejemplo para facilitar las pruebas y el desarrollo. Esto asegura que haya datos con los que trabajar inmediatamente.

📂 Estructura de la Base de Datos
La base de datos mini-core en MongoDB contiene las siguientes colecciones principales:

reglas: Almacena las diferentes reglas de comisión aplicables.

usuarios: Contiene la información de los vendedores.

ventas: Guarda los registros de cada venta realizada, incluyendo el vendedor y el monto.

🔌 Endpoints API
A continuación se detallan los endpoints API disponibles en este backend:

Comisiones
Calcular Comisiones en un Rango de Fechas

Método: GET

Ruta: /comisiones/calcular (Asumiendo un controlador y ruta para esta funcionalidad)

Descripción: Calcula las comisiones para todas las ventas realizadas dentro de un rango de fechas específico.

Parámetros de Consulta (Query Parameters):

startDate: Fecha de inicio (formato ISO 8601, ej., 2025-05-01T00:00:00Z).

endDate: Fecha de fin (formato ISO 8601, ej., 2025-06-30T23:59:59Z).

Ejemplo de Petición:

GET /comisiones/calcular?startDate=2025-05-01T00:00:00Z&endDate=2025-06-30T23:59:59Z

Ejemplo de Respuesta (Array de Objetos):

[
    {
        "_id": "60c72b2f9b1d8f0015b8e4d2",
        "fechaVenta": "2025-05-21T00:00:00.000Z",
        "vendedor": "Perico P",
        "monto": 400,
        "reglaAplicada": 0,
        "comision": 0
    },
    {
        "_id": "60c72b2f9b1d8f0015b8e4d3",
        "fechaVenta": "2025-05-29T00:00:00.000Z",
        "vendedor": "Zoila B",
        "monto": 600,
        "reglaAplicada": 0.06,
        "comision": 36
    }
    // ... más resultados
]

Notas sobre Endpoints Adicionales (CRUD):
Aunque el servicio incluye métodos para crear, obtener todos, obtener uno, actualizar y eliminar para la entidad Comisiones (y potencialmente para Ventas, Reglas, Usuarios), estos están actualmente como stubs en el código proporcionado. Se espera que un controlador correspondiente los implemente y los exponga como endpoints RESTful (ej., /comisiones, /ventas, /reglas, /usuarios con sus métodos POST, GET, PUT, DELETE respectivos) para una funcionalidad completa de CRUD.

✨ Próximos Pasos (Frontend)
Una vez que el backend esté en funcionamiento, el frontend (que nos proporcionarás a continuación) se conectará a estos endpoints para