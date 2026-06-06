import 'dotenv/config';

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const config = {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',

    database: {
        url: process.env.DATABASE_URL,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'ciberdevs_db',
        ssl: process.env.DB_SSL === 'true' || !!process.env.DATABASE_URL?.includes('neon.tech'),
        poolMax: parseInt(process.env.DB_POOL_MAX || '20', 10),
    },

    jwt: {
        secret: requiredEnv('JWT_SECRET'),
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },

    admin: {
        passwordHash: requiredEnv('ADMIN_PASSWORD_HASH'),
    },

    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    },
};
