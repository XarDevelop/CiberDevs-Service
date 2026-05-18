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
            INSERT INTO reviews (author_name, author_role, avatar_url, content, rating)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [data.author_name, data.author_role, data.avatar_url ?? null, data.content, data.rating];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
}
