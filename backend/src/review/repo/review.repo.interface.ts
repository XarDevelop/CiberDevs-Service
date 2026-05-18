import { type Review, type CreateReviewDTO } from '../../models/review.model.js';

export interface IReviewRepository {
    getAllActiveReviews(): Promise<Review[]>;
    createReview(data: CreateReviewDTO): Promise<Review>;
}
