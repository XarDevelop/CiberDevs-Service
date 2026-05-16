import { Pool } from 'pg';

// Configuración de la conexión mediante un Pool para reutilizar conexiones, que es considerado una buena práctica
export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'supersecretpassword',
    database: process.env.DB_NAME || 'ciberdevs_db',
    // Configuraciones óptimas para producción
    max: 20, // Máximo número de clientes en el pool
    idleTimeoutMillis: 30000, // Tiempo máximo que un cliente puede estar inactivo
    connectionTimeoutMillis: 2000, // Tiempo máximo para conectar
});

// Función para inicializar y verificar la base de datos en el arranque de la app
export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Base de datos PostgreSQL conectada exitosamente');
        client.release(); // Siempre debemos liberar el cliente back al pool
    } catch (error) {
        console.error('❌ Error conectando a la base de datos PostgreSQL:', error);
        process.exit(1); // Detiene el proceso con error si no puede conectar
    }
};
