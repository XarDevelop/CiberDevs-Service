import { Pool } from 'pg';
import { config } from '../config/index.js';

const connectionString = config.database.url.replace('sslmode=require', 'sslmode=no-verify');

const poolOptions = {
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: config.database.poolMax,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
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
    }
};

export const disconnectDB = async () => {
    await pool.end();
};
