# Mapa de Arquitectura del Proyecto: peliculas-api
Generado: 2026-11-21 08:19

## `server.js`
- **Dependencias:** ./src/app, ./src/models

## `src\app.js`
- **Dependencias:** express, cors, dotenv, ./routes/generoRoutes, ./routes/directorRoutes, ./routes/productoraRoutes, ./routes/tipoRoutes, ./routes/mediaRoutes

## `src\config\database.js`
- **Dependencias:** sequelize, dotenv

## `src\controllers\directorController.js`
- **Dependencias:** ../models
- **Funciones:** listarDirectores, obtenerDirector, crearDirector, actualizarDirector, eliminarDirector

## `src\controllers\generoController.js`
- **Dependencias:** ../models
- **Funciones:** listarGeneros, obtenerGenero, crearGenero, actualizarGenero, eliminarGenero

## `src\controllers\mediaController.js`
- **Dependencias:** ../models, sequelize
- **Funciones:** listarMedia, obtenerMedia, crearMedia, actualizarMedia, eliminarMedia

## `src\controllers\productoraController.js`
- **Dependencias:** ../models
- **Funciones:** listarProductoras, obtenerProductora, crearProductora, actualizarProductora, eliminarProductora

## `src\controllers\tipoController.js`
- **Dependencias:** ../models
- **Funciones:** listarTipos, obtenerTipo, crearTipo, actualizarTipo, eliminarTipo

## `src\models\Director.js`
- **Dependencias:** sequelize, ../config/database

## `src\models\Genero.js`
- **Dependencias:** sequelize, ../config/database

## `src\models\Media.js`
- **Dependencias:** sequelize, ../config/database, ./Genero, ./Director, ./Productora, ./Tipo

## `src\models\Productora.js`
- **Dependencias:** sequelize, ../config/database

## `src\models\Tipo.js`
- **Dependencias:** sequelize, ../config/database

## `src\models\index.js`
- **Dependencias:** ../config/database, ./Genero, ./Director, ./Productora, ./Tipo, ./Media
- **Funciones:** syncDatabase

## `src\routes\directorRoutes.js`
- **Dependencias:** express, ../controllers/directorController

## `src\routes\generoRoutes.js`
- **Dependencias:** express, ../controllers/generoController

## `src\routes\mediaRoutes.js`
- **Dependencias:** express, ../controllers/mediaController

## `src\routes\productoraRoutes.js`
- **Dependencias:** express, ../controllers/productoraController

## `src\routes\tipoRoutes.js`
- **Dependencias:** express, ../controllers/tipoController
