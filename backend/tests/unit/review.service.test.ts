import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ReviewService } from '../../src/review/services/review.service.js';
import { type IReviewRepository } from '../../src/review/repo/review.repo.interface.js';
import { type Review } from '../../src/models/review.model.js';

describe('ReviewService - Unit Tests', () => {
    let reviewService: ReviewService;
    let mockReviewRepo: jest.Mocked<IReviewRepository>;

    beforeEach(() => {
        mockReviewRepo = {
            getAllActiveReviews: jest.fn<any>(),
            createReview: jest.fn<any>()
        };
        reviewService = new ReviewService(mockReviewRepo);
    });

    it('debería retornar un arreglo de reviews de forma exitosa', async () => {
        const mockReviews: Review[] = [
            {
                id: 1,
                name: 'María Rodríguez',
                role: 'Dueña de Boutique',
                content: 'Excelente servicio.',
                stars: 5,
                is_active: true,
                created_at: new Date(),
            },
        ];
        mockReviewRepo.getAllActiveReviews.mockResolvedValue(mockReviews);

        const result = await reviewService.getReviews();

        expect(result).toHaveLength(1);
        expect(result).toEqual(mockReviews);
        expect(mockReviewRepo.getAllActiveReviews).toHaveBeenCalledTimes(1);
    });

    it('debería llamar al repositorio para crear una reseña y devolver la data creada', async () => {
        const payload = {
            name: 'Ana García',
            role: 'Freelancer',
            content: 'Excelente trabajo.',
            stars: 4
        };
        const mockCreatedReview: Review = { 
            id: 2, 
            ...payload, 
            is_active: true, 
            created_at: new Date() 
        };
        
        mockReviewRepo.createReview.mockResolvedValue(mockCreatedReview);

        const result = await reviewService.createReview(payload);

        expect(mockReviewRepo.createReview).toHaveBeenCalledTimes(1);
        expect(mockReviewRepo.createReview).toHaveBeenCalledWith(payload);
        expect(result).toEqual(mockCreatedReview);
    });
});

