import { type IReviewService } from './review.service.interface.js';
import { type IReviewRepository } from '../repo/review.repo.interface.js';
import { type Review, type CreateReviewDTO } from '../../models/review.model.js';
import { AppError } from '../../middleware/errorHandler.js';

export class ReviewService implements IReviewService {
    // Inyección de dependencias mediante la interface
    private readonly reviewRepo: IReviewRepository;

    constructor(reviewRepository: IReviewRepository) {
        this.reviewRepo = reviewRepository;
    }

    async getReviews(): Promise<Review[]> {
        const reviews = await this.reviewRepo.getAllActiveReviews();
        // Lógica de negocio (si la hubiera) iría aquí. 
        if (!reviews) {
            throw new AppError('No se pudieron obtener las reseñas', 500);
        }
        return reviews;
    }

    async createReview(data: CreateReviewDTO): Promise<Review> {
        // Podríamos tener reglas de negocio, como sanitizado adicional, etc.
        const newReview = await this.reviewRepo.createReview(data);
        if (!newReview) {
            throw new AppError('Error al guardar la reseña en la base de datos', 500);
        }
        return newReview;
    }
}
