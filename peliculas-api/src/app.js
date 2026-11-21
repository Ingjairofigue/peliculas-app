const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configurable: en producción (Vercel) restringimos al dominio del frontend
// mediante la variable CORS_ORIGIN (admite varios orígenes separados por coma).
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors(corsOrigin ? { origin: corsOrigin.split(',').map((o) => o.trim()) } : { origin: '*' }));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Películas funcionando correctamente 🎬' });
});

// Rutas de los módulos
app.use('/api/generos', require('./routes/generoRoutes'));
app.use('/api/directores', require('./routes/directorRoutes'));
app.use('/api/productoras', require('./routes/productoraRoutes'));
app.use('/api/tipos', require('./routes/tipoRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));

module.exports = app;