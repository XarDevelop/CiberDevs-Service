import { Router } from 'express';
import { reviewRouter } from './review.routes.js';
import { portfolioRouter } from './portfolio.routes.js';
import { orderRouter } from './order.routes.js';
import { authRouter } from './auth.routes.js';

const indexRoutes = Router();

// Versionamiento V1: agrupado aquí
indexRoutes.use('/v1/admin/auth', authRouter);
indexRoutes.use('/v1/reviews', reviewRouter);
indexRoutes.use('/v1/portfolio', portfolioRouter);
indexRoutes.use('/v1/orders', orderRouter);

export default indexRoutes;
