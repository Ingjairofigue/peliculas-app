# Mapa de Arquitectura del Proyecto: Proyecto_Peliculas_Despliegue
Generado: 2026-11-21 10:27

## `frontend-peliculas\public\index.html`

## `frontend-peliculas\src\App.css`

## `frontend-peliculas\src\App.js`
- **Dependencias:** react-router-dom, lucide-react, ./pages/Home, ./pages/Generos, ./pages/Directores, ./pages/Productoras, ./pages/Tipos, ./pages/Media
- **Funciones:** App

## `frontend-peliculas\src\App.test.js`
- **Dependencias:** @testing-library/react, ./App

## `frontend-peliculas\src\index.css`

## `frontend-peliculas\src\index.js`
- **Dependencias:** react, react-dom/client, ./App, ./reportWebVitals

## `frontend-peliculas\src\reportWebVitals.js`

## `frontend-peliculas\src\setupTests.js`

## `frontend-peliculas\src\pages\Directores.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Directores, cargarDirectores, handleChange, handleSubmit, handleEditar

## `frontend-peliculas\src\pages\Generos.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Generos, cargarGeneros, handleChange, handleSubmit, handleEditar

## `frontend-peliculas\src\pages\Home.jsx`
- **Dependencias:** react, lucide-react, ../services/api
- **Funciones:** Home, fetchStats

## `frontend-peliculas\src\pages\Media.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Media, cargarDatos, handleChange, handleSubmit, handleEditar

## `frontend-peliculas\src\pages\Productoras.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Productoras, cargarProductoras, handleChange, handleSubmit, handleEditar

## `frontend-peliculas\src\pages\Tipos.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Tipos, cargarTipos, handleChange, handleSubmit, handleEditar

## `frontend-peliculas\src\services\api.js`
- **Dependencias:** axios

## `peliculas-api\server.js`
- **Dependencias:** ./src/app, ./src/models

## `peliculas-api\src\app.js`
- **Dependencias:** express, cors, dotenv, ./routes/generoRoutes, ./routes/directorRoutes, ./routes/productoraRoutes, ./routes/tipoRoutes, ./routes/mediaRoutes

## `peliculas-api\src\config\database.js`
- **Dependencias:** sequelize, dotenv

## `peliculas-api\src\controllers\directorController.js`
- **Dependencias:** ../models
- **Funciones:** listarDirectores, obtenerDirector, crearDirector, actualizarDirector, eliminarDirector

## `peliculas-api\src\controllers\generoController.js`
- **Dependencias:** ../models
- **Funciones:** listarGeneros, obtenerGenero, crearGenero, actualizarGenero, eliminarGenero

## `peliculas-api\src\controllers\mediaController.js`
- **Dependencias:** ../models, sequelize
- **Funciones:** listarMedia, obtenerMedia, crearMedia, actualizarMedia, eliminarMedia

## `peliculas-api\src\controllers\productoraController.js`
- **Dependencias:** ../models
- **Funciones:** listarProductoras, obtenerProductora, crearProductora, actualizarProductora, eliminarProductora

## `peliculas-api\src\controllers\tipoController.js`
- **Dependencias:** ../models
- **Funciones:** listarTipos, obtenerTipo, crearTipo, actualizarTipo, eliminarTipo

## `peliculas-api\src\models\Director.js`
- **Dependencias:** sequelize, ../config/database

## `peliculas-api\src\models\Genero.js`
- **Dependencias:** sequelize, ../config/database

## `peliculas-api\src\models\Media.js`
- **Dependencias:** sequelize, ../config/database, ./Genero, ./Director, ./Productora, ./Tipo

## `peliculas-api\src\models\Productora.js`
- **Dependencias:** sequelize, ../config/database

## `peliculas-api\src\models\Tipo.js`
- **Dependencias:** sequelize, ../config/database

## `peliculas-api\src\models\index.js`
- **Dependencias:** ../config/database, ./Genero, ./Director, ./Productora, ./Tipo, ./Media
- **Funciones:** syncDatabase

## `peliculas-api\src\routes\directorRoutes.js`
- **Dependencias:** express, ../controllers/directorController

## `peliculas-api\src\routes\generoRoutes.js`
- **Dependencias:** express, ../controllers/generoController

## `peliculas-api\src\routes\mediaRoutes.js`
- **Dependencias:** express, ../controllers/mediaController

## `peliculas-api\src\routes\productoraRoutes.js`
- **Dependencias:** express, ../controllers/productoraController

## `peliculas-api\src\routes\tipoRoutes.js`
- **Dependencias:** express, ../controllers/tipoController
