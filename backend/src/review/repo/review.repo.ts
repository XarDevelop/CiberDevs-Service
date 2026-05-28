import { pool } from '../../database/index.js';
import { type Review, type CreateReviewDTO } from '../../models/review.model.js';
import { type IReviewRepository } from './review.repo.interface.js';

export class ReviewRepository implements IReviewRepository {
    async getAllActiveReviews(): Promise<Review[]> {
        const query = 'SELECT * FROM reviews WHERE is_active = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [true]);
        return result.rows;
    }

    async createReview(data: CreateReviewDTO): Promise<Review> {
        const query = `
            INSERT INTO reviews (name, role, content, stars)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [data.name, data.role, data.content, data.stars];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}
