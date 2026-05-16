import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { connectDB } from './database/index.js';
import indexRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Inyectar Rutas Principales
app.use('/api', indexRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Registrar Error Handler SIEMPRE al final de todas las rutas y middlewares
app.use(errorHandler);



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});

export default app;

