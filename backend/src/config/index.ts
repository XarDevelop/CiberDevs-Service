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
        url: requiredEnv('DATABASE_URL'),
        ssl: process.env.DB_SSL === 'true' || process.env.DATABASE_URL?.includes('neon.tech') || false,
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
        origin: requiredEnv('CORS_ORIGIN'),
    },
};
