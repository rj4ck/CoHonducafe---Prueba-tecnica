# Proyecto Proveedores

Este proyecto es una aplicación Node.js que utiliza **TypeORM** para manejar la conexión con una base de datos **SQL Server**. Se utiliza **Docker** para levantar el servicio de SQL Server y manejar las migraciones de las tablas.

## Requisitos previos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (Versión 14.x o superior)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## 1. Instalación de dependencias

Clona el repositorio y navega al directorio del proyecto.

```bash
git clone <URL-del-repositorio>
cd <nombre-del-directorio>
```

Luego, instala las dependencias de Node.js:

```bash
npm install
```
Esto instalará todas las dependencias del proyecto, incluyendo typeorm, express, mssql, y otras necesarias para el funcionamiento.

## 2. Levantar el servicio de SQL Server con Docker
El proyecto incluye un archivo docker-compose.yml que configurará y levantará un contenedor de SQL Server.

Para iniciar el servicio de base de datos, ejecuta:

```bash
docker-compose up -d
```

Esto hará lo siguiente:
- Descargar la imagen de SQL Server (si no está ya descargada). 
- Levantar el contenedor en segundo plano con el puerto 1433 expuesto en tu máquina local. 
- Puedes verificar que el contenedor está corriendo con:
```bash
docker ps
```

## 3. Crear la base de datos
Si la base de datos aún no existe, el código se encargará de crearla automáticamente al iniciar la aplicación. No necesitas hacer nada extra para este paso, simplemente continúa con los siguientes pasos.

## 4. Generar las migraciones
Una vez que la base de datos está creada, el siguiente paso es generar las migraciones basadas en las entidades que has definido en el proyecto.

```bash
npm run migration:generate
```
Esto generará un archivo de migración en el directorio src/migrations/. Asegúrate de que las migraciones sean correctas y reflejen la estructura de la base de datos deseada.

## 5. Ejecutar las migraciones
Después de generar la migración, debes ejecutarla para crear las tablas correspondientes en la base de datos. Usa el siguiente comando:

```bash
npm run migration:run
```

Esto aplicará las migraciones y creará las tablas necesarias para la aplicación.

## 6. Ejecutar el proyecto de Node.js
Con las migraciones ejecutadas y la base de datos lista, ahora puedes arrancar el servidor Node.js. Utiliza el siguiente comando:

```bash
npm run dev
```

Esto arrancará el servidor en el puerto 1337. Puedes verificar que el servidor está corriendo visitando http://localhost:1337.

## 7. Rutas disponibles
Una vez que el servidor está corriendo, puedes interactuar con las rutas definidas en la aplicación.

### RestApi
```bash
http://localhost:3000/api/proveedores
http://localhost:3000/api/servicios
http://localhost:3000/api/reports/proveedores
```

### Vistas
Aquí podrás interactuar visualmente con la aplicación y navegar entre las vistas de Proveedores y Servicio
```bash
http://localhost:3000/
http://localhost:3000/servicios
```

## 8. Detener los servicios
Si necesitas detener los contenedores de Docker, puedes usar el siguiente comando:

```bash
docker-compose down
```

Esto detendrá y eliminará el contenedor de SQL Server.

## 9. Consideraciones adicionales
Configuración de la base de datos: Las credenciales y detalles de la base de datos están configurados en el archivo src/data-source.ts. Si necesitas cambiar el nombre de la base de datos, usuario o contraseña, asegúrate de actualizarlos en ese archivo.

Variables de entorno: Puedes usar un archivo .env para configurar los detalles del entorno, como las credenciales de SQL Server.
