import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { config } from './config/index.js';
import { connectDB, disconnectDB } from './database/index.js';
import { runMigrations } from './database/runMigrations.js';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (config.isProduction) {
    const frontendDist = path.resolve(__dirname, '..', '..', '..', 'frontend', 'dist');
    app.use(express.static(frontendDist));
    app.use((req, res, next) => {
        if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
        res.sendFile(path.join(frontendDist, 'index.html'));
    });
}

const start = async () => {
    await connectDB();
    await runMigrations();

    const server = app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
    });

    const gracefulShutdown = async (signal: string) => {
        console.log(`\n${signal} received. Shutting down gracefully...`);
        const forceExit = setTimeout(() => {
            console.error('Forced shutdown after timeout');
            process.exit(1);
        }, 10000);
        forceExit.unref();
        server.close(async () => {
            clearTimeout(forceExit);
            await disconnectDB();
            console.log('Server closed');
            process.exit(0);
        });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

start();

export default app;
