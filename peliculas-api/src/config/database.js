const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false, // Cambia a true si quieres ver las consultas SQL
        // SSL obligatorio en proveedores cloud como Aiven. Se activa con DB_SSL=true
        // y, si el proveedor lo exige, se valida el certificado con DB_SSL_CA.
        dialectOptions: process.env.DB_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
                ...(process.env.DB_SSL_CA ? { ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n') } : {})
            }
        } : {},
        define: {
            timestamps: false, // Manejaremos las fechas manualmente
            freezeTableName: true // Evita que Sequelize pluralice los nombres
        }
    }
);

module.exports = sequelize;