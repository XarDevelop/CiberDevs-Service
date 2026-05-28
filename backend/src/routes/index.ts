import { Router } from 'express';
import { reviewRouter } from './review.routes.js';
import { portfolioRouter } from './portfolio.routes.js';
import { orderRouter } from './order.routes.js';
import { authRouter } from './auth.routes.js';

const indexRoutes = Router();

indexRoutes.use('/admin/auth', authRouter);
indexRoutes.use('/reviews', reviewRouter);
indexRoutes.use('/portfolio', portfolioRouter);
indexRoutes.use('/orders', orderRouter);

export default indexRoutes;
