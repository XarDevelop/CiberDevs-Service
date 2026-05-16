import { Router } from 'express';
import { reviewRouter } from './review.routes.js';
import { portfolioRouter } from './portfolio.routes.js';

const indexRoutes = Router();

// Versionamiento V1: agrupado aquí
indexRoutes.use('/v1/reviews', reviewRouter);
indexRoutes.use('/v1/portfolio', portfolioRouter);

export default indexRoutes;
