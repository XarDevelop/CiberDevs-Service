import { Router } from 'express';
import { reviewRouter } from './review.routes.js';

const indexRoutes = Router();

// Versionamiento V1: agrupado aquí
indexRoutes.use('/v1/reviews', reviewRouter);

export default indexRoutes;
