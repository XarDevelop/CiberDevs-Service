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

app.get('/api/health', (_req, res) => {
    res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/meta-image', async (req, res) => {
    const url = req.query.url as string;
    if (!url) {
        res.status(400).json({ success: false, message: 'URL requerida' });
        return;
    }

    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'CiberDev-Bot/1.0' },
            signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
            res.status(404).json({ success: false, message: 'No se pudo acceder a la URL' });
            return;
        }

        const html = await response.text();
        const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                   || html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
                   || html.match(/<link[^>]+rel=["']icon["'][^>]+href=["']([^"']+)["']/i)
                   || html.match(/<link[^>]+rel=["']shortcut icon["'][^>]+href=["']([^"']+)["']/i);

        if (match?.[1]) {
            const imageUrl = match[1].startsWith('http') ? match[1]
                : match[1].startsWith('//') ? `https:${match[1]}`
                : new URL(match[1], url).href;
            res.json({ success: true, image: imageUrl });
        } else {
            res.json({ success: false, message: 'No se encontró imagen' });
        }
    } catch {
        res.status(500).json({ success: false, message: 'Error al procesar la URL' });
    }
});

app.use('/api', indexRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
