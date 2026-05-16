import { Router } from 'express';
import { ReviewHandler } from '../handler/review.handler.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewRepository } from '../repo/review.repo.js';
import { validateSchema, createReviewSchema } from '../utils/validator.util.js';

const reviewRouter = Router();

// 1. Instanciamos las dependencias comenzando desde la capa más baja
const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);
const reviewHandler = new ReviewHandler(reviewService);

// 2. Definimos las rutas usando nuestra arquitectura orientada a objetos
reviewRouter.get('/', reviewHandler.getReviews);

// POST con Inyección del Middleware de Validación
reviewRouter.post('/', validateSchema(createReviewSchema), reviewHandler.createReview);

export { reviewRouter };
