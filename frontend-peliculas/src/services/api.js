import axios from 'axios';

// URL del backend configurable por entorno.
// En local cae a http://localhost:3000/api; en producción (Vercel)
// se inyecta REACT_APP_API_URL en el panel de variables de entorno.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;