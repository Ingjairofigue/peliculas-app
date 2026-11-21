# Mapa de Arquitectura del Proyecto: frontend-peliculas
Generado: 2026-11-21 08:19

## `public\index.html`

## `src\App.css`

## `src\App.js`
- **Dependencias:** react-router-dom, lucide-react, ./pages/Home, ./pages/Generos, ./pages/Directores, ./pages/Productoras, ./pages/Tipos, ./pages/Media
- **Funciones:** App

## `src\App.test.js`
- **Dependencias:** @testing-library/react, ./App

## `src\index.css`

## `src\index.js`
- **Dependencias:** react, react-dom/client, ./App, ./reportWebVitals

## `src\reportWebVitals.js`

## `src\setupTests.js`

## `src\pages\Directores.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Directores, cargarDirectores, handleChange, handleSubmit, handleEditar

## `src\pages\Generos.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Generos, cargarGeneros, handleChange, handleSubmit, handleEditar

## `src\pages\Home.jsx`
- **Dependencias:** react, lucide-react, ../services/api
- **Funciones:** Home, fetchStats

## `src\pages\Media.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Media, cargarDatos, handleChange, handleSubmit, handleEditar

## `src\pages\Productoras.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Productoras, cargarProductoras, handleChange, handleSubmit, handleEditar

## `src\pages\Tipos.jsx`
- **Dependencias:** react, ../services/api, sweetalert2, lucide-react
- **Funciones:** Tipos, cargarTipos, handleChange, handleSubmit, handleEditar

## `src\services\api.js`
- **Dependencias:** axios
