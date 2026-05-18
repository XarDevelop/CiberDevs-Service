import { type Review, type CreateReviewDTO } from '../../models/review.model.js';

export interface IReviewService {
    getReviews(): Promise<Review[]>;
    createReview(data: CreateReviewDTO): Promise<Review>;
}
