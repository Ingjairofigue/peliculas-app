# Sistema de Gestión de Películas

Aplicación web para la administración de un catálogo de películas, con gestión de géneros, directores, productoras, tipos y registros multimedia. Está compuesta por un frontend en React y un backend en Node.js/Express con Sequelize sobre MySQL.

## Descripción general

El sistema permite crear, consultar, actualizar y eliminar información relacionada con películas y sus catálogos asociados mediante una API REST. El frontend consume la API y ofrece una interfaz para operar sobre los distintos recursos.

- **Frontend:** React (Create React App), consumiendo la API mediante `REACT_APP_API_URL`.
- **Backend:** Node.js + Express + Sequelize (ORM) con MySQL como base de datos.
- **API REST:** expuesta por defecto en el puerto `3000`.

## Estructura de carpetas

```
proyecto/
├── frontend-peliculas/     # Aplicación React
│   ├── public/
│   ├── src/
│   └── package.json
├── peliculas-api/          # API REST (Node/Express/Sequelize)
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── README.md
```

- `frontend-peliculas`: contiene la interfaz de usuario y la configuración de consumo de la API.
- `peliculas-api`: contiene modelos de Sequelize, rutas de Express y la configuración de conexión a MySQL.

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior
- MySQL 8 (local o remoto)
- Git (opcional, para clonar el repositorio)

## Ejecución en local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

### 2. Backend (`peliculas-api`)

```bash
cd peliculas-api
npm install
```

Configurar el archivo `.env` (puede basarse en `.env.example`):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=peliculas
DB_USER=root
DB_PASSWORD=tu_password
```

Crear la base de datos en MySQL si aún no existe:

```sql
CREATE DATABASE peliculas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Levantar el servidor en modo desarrollo (puerto `3000`):

```bash
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

### 3. Frontend (`frontend-peliculas`)

En otra terminal:

```bash
cd frontend-peliculas
npm install
```

Crear un archivo `.env` en la raíz del frontend con la URL de la API:

```env
REACT_APP_API_URL=http://localhost:3000
```

Levantar la aplicación:

```bash
npm start
```

El frontend se abrirá por defecto en `http://localhost:3001` (o el puerto que indique la consola).

## Variables de entorno

### Backend (`peliculas-api/.env`)

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `PORT` | Puerto donde escucha la API | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_NAME` | Nombre de la base de datos | `peliculas` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `********` |

### Frontend (`frontend-peliculas/.env`)

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `REACT_APP_API_URL` | URL base de la API REST | `http://localhost:3000` |

## Endpoints de la API

Base URL: `http://localhost:3000`

| Recurso | Método | Endpoint | Descripción |
| --- | --- | --- | --- |
| Géneros | GET | `/generos` | Lista todos los géneros |
| Géneros | GET | `/generos/:id` | Obtiene un género por ID |
| Géneros | POST | `/generos` | Crea un género |
| Géneros | PUT | `/generos/:id` | Actualiza un género |
| Géneros | DELETE | `/generos/:id` | Elimina un género |
| Directores | GET | `/directores` | Lista todos los directores |
| Directores | GET | `/directores/:id` | Obtiene un director por ID |
| Directores | POST | `/directores` | Crea un director |
| Directores | PUT | `/directores/:id` | Actualiza un director |
| Directores | DELETE | `/directores/:id` | Elimina un director |
| Productoras | GET | `/productoras` | Lista todas las productoras |
| Productoras | GET | `/productoras/:id` | Obtiene una productora por ID |
| Productoras | POST | `/productoras` | Crea una productora |
| Productoras | PUT | `/productoras/:id` | Actualiza una productora |
| Productoras | DELETE | `/productoras/:id` | Elimina una productora |
| Tipos | GET | `/tipos` | Lista todos los tipos |
| Tipos | GET | `/tipos/:id` | Obtiene un tipo por ID |
| Tipos | POST | `/tipos` | Crea un tipo |
| Tipos | PUT | `/tipos/:id` | Actualiza un tipo |
| Tipos | DELETE | `/tipos/:id` | Elimina un tipo |
| Media | GET | `/media` | Lista todo el contenido multimedia |
| Media | GET | `/media/:id` | Obtiene un registro de media por ID |
| Media | POST | `/media` | Crea un registro de media |
| Media | PUT | `/media/:id` | Actualiza un registro de media |
| Media | DELETE | `/media/:id` | Elimina un registro de media |

## Despliegue

### Backend (Render) y base de datos (Aiven / Railway)

1. Crear una instancia de MySQL remota en **Aiven** o **Railway** y anotar los datos de conexión (host, puerto, base de datos, usuario y contraseña).
2. En **Render**, crear un nuevo **Web Service** apuntando al repositorio del backend.
3. Configurar el comando de inicio (`npm start`) y las variables de entorno:

```env
PORT=3000
DB_HOST=<host-remoto>
DB_PORT=<puerto-remoto>
DB_NAME=<base-de-datos>
DB_USER=<usuario>
DB_PASSWORD=<contraseña>
```

4. Render asignará una URL pública para la API (por ejemplo, `https://peliculas-api.onrender.com`).

### Frontend (Vercel)

1. Importar el repositorio del frontend en **Vercel**.
2. Configurar la variable de entorno `REACT_APP_API_URL` con la URL pública del backend desplegado en Render:

```env
REACT_APP_API_URL=https://peliculas-api.onrender.com
```

3. Ejecutar el despliegue. Vercel publicará la aplicación y esta consumirá la API remota.

> **Importante:** la URL del API del frontend se configura exclusivamente mediante `REACT_APP_API_URL`. Si se modifica el backend, es necesario actualizar esta variable y volver a desplegar el frontend.

## Notas

- Asegurarse de que el host de MySQL remoto permita conexiones desde los servicios de Render.
- Mantener las credenciales fuera del repositorio usando variables de entorno.
- Para cambios de esquema, sincronizar los modelos de Sequelize o aplicar migraciones según corresponda.
