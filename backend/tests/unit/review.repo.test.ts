import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { pool } from '../../src/database/index.js';
import { ReviewRepository } from '../../src/review/repo/review.repo.js';

describe('ReviewRepository - Unit Tests', () => {
    const reviewRepo = new ReviewRepository();

    afterEach(() => {
        jest.restoreAllMocks(); // Limpiamos los mocks después de cada test
    });

    it('[GET] debería ejecutar el query correcto y retornar las reseñas activas', async () => {
        const mockRows = [
            { id: 1, name: 'Juan Perez', content: 'Genial', stars: 5, is_active: true }
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
            name: 'Ana García',
            role: 'Freelancer',
            content: 'Muy recomendado',
            stars: 4
        };
        const mockRow = { id: 2, ...newReviewData, is_active: true, created_at: new Date() };

        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

        const result = await reviewRepo.createReview(newReviewData);

        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO reviews'), 
            [newReviewData.name, newReviewData.role, newReviewData.content, newReviewData.stars]
        );
        expect(result).toEqual(mockRow);
    });
});
