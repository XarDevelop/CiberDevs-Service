import { Pool } from 'pg';
import { config } from '../config/index.js';

const poolOptions = config.database.url
    ? {
        connectionString: config.database.url,
        ssl: config.database.ssl ? { rejectUnauthorized: true } : false,
        max: config.database.poolMax,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
    : {
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
        max: config.database.poolMax,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };

export const pool = new Pool(poolOptions);

pool.on('error', (err) => {
    console.error('Unexpected error on idle database client', err);
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected successfully');
        client.release();
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await pool.end();
};
