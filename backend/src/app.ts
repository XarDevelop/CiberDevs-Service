import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/index.js';
import indexRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { pool } from './database/index.js';

const app = express();

app.use(cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(compression());
app.use(morgan(config.isProduction ? 'combined' : 'dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

app.use((req, _res, next) => {
    console.log(`[DEBUG] ${req.method} ${req.path} body:${JSON.stringify(req.body)}`);
    next();
});

app.get('/api/health', (_req, res) => {
    res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/diagnostics', async (_req, res) => {
    const results: Record<string, unknown> = {};

    try {
        const client = await pool.connect();
        results.dbConnect = 'ok';
        client.release();
    } catch (e: any) {
        results.dbConnect = { error: e.message, code: e.code };
    }

    try {
        const selectResult = await pool.query('SELECT COUNT(*) as count FROM reviews');
        results.select = selectResult.rows[0];
    } catch (e: any) {
        results.select = { error: e.message, code: e.code };
    }

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const insertResult = await client.query(
                "INSERT INTO reviews (name, role, content, stars) VALUES ($1, $2, $3, $4) RETURNING id",
                ['diagnostico', 'test', 'test diagnostico deploy', 5]
            );
            results.insert = { success: true, id: insertResult.rows[0]?.id };
            await client.query('ROLLBACK');
        } catch (e: any) {
            results.insert = { error: e.message, code: e.code, detail: e.detail };
            await client.query('ROLLBACK').catch(() => {});
        } finally {
            client.release();
        }
    } catch (e: any) {
        results.insert = { error: e.message, code: e.code, phase: 'connect' };
    }

    try {
        const reviewCols = await pool.query(
            "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'reviews' ORDER BY ordinal_position"
        );
        results.reviewsColumns = reviewCols.rows;
    } catch (e: any) {
        results.reviewsColumns = { error: e.message, code: e.code };
    }

    try {
        const orderCols = await pool.query(
            "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders' ORDER BY ordinal_position"
        );
        results.ordersColumns = orderCols.rows;
    } catch (e: any) {
        results.ordersColumns = { error: e.message, code: e.code };
    }

    res.json({ success: true, diagnostics: results });
});

app.post('/api/echo', (req, res) => {
    res.json({
        success: true,
        method: req.method,
        path: req.path,
        hasBody: !!req.body,
        body: req.body,
        contentType: req.get('Content-Type'),
    });
});

app.use('/api', indexRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
