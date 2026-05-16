import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { pool } from '../../src/database/index.js';
import { ReviewRepository } from '../../src/repo/review.repo.js';

describe('ReviewRepository - Unit Tests', () => {
    const reviewRepo = new ReviewRepository();

    afterEach(() => {
        jest.restoreAllMocks(); // Limpiamos los mocks después de cada test
    });

    it('[GET] debería ejecutar el query correcto y retornar las reseñas activas', async () => {
        const mockRows = [
            { id: 1, author_name: 'Juan Perez', content: 'Genial', rating: 5, is_active: true }
        ];

        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: mockRows } as never);

        const result = await reviewRepo.getAllActiveReviews();

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM reviews WHERE is_active = $1 ORDER BY created_at DESC',
            [true]
        );
        expect(result).toEqual(mockRows);
    });

    it('[POST] debería insertar una reseña y devolver la fila introducida', async () => {
        const newReviewData = {
            author_name: 'Ana García',
            author_role: 'Freelancer',
            avatar_url: 'https://ejemplo.com/avatar.jpg',
            content: 'Muy recomendado',
            rating: 4
        };
        const mockRow = { id: 2, ...newReviewData, is_active: true, created_at: new Date() };

        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

        const result = await reviewRepo.createReview(newReviewData);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO reviews'), 
            [newReviewData.author_name, newReviewData.author_role, newReviewData.avatar_url, newReviewData.content, newReviewData.rating]
        );
        expect(result).toEqual(mockRow);
    });
});
