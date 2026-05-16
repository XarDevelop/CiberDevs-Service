import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { ReviewHandler } from '../../src/handler/review.handler.js';
import { type IReviewService } from '../../src/services/review.service.interface.js';
import { type Review } from '../../src/models/review.model.js';

describe('ReviewHandler - Unit Tests', () => {
    let reviewHandler: ReviewHandler;
    let mockReviewService: jest.Mocked<IReviewService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockReviewService = {
            getReviews: jest.fn<any>(),
            createReview: jest.fn<any>(),
        };

        reviewHandler = new ReviewHandler(mockReviewService);

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any,
        };
        nextFunction = jest.fn();
    });

    it('debería responder con status 200 y la data si el servicio responde correctamente', async () => {
        const mockReviews: Review[] = [
            { id: 1, author_name: 'Ana', author_role: 'CEO', content: 'Gran trabajo!', rating: 5, is_active: true, created_at: new Date() }
        ];
        mockReviewService.getReviews.mockResolvedValue(mockReviews);

        await reviewHandler.getReviews(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockReviewService.getReviews).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockReviews
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('debería llamar a next(error) si el servicio lanza una excepción', async () => {
        const mockError = new Error('Error de Base de Datos DB');
        mockReviewService.getReviews.mockRejectedValue(mockError);

        await reviewHandler.getReviews(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockReviewService.getReviews).toHaveBeenCalledTimes(1);
        expect(nextFunction).toHaveBeenCalledWith(mockError);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('debería responder con status 201 y la data cuando createReview es exitoso', async () => {
        const payload = {
            author_name: 'Marcos',
            author_role: 'Designer',
            content: 'Lo recomiendo.',
            rating: 5
        };
        mockRequest.body = payload;

        const mockCreatedReview: Review = { 
            id: 2, 
            ...payload, 
            is_active: true, 
            created_at: new Date() 
        };
        
        mockReviewService.createReview.mockResolvedValue(mockCreatedReview);

        await reviewHandler.createReview(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
        expect(mockReviewService.createReview).toHaveBeenCalledWith(payload);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockCreatedReview
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('[POST] debería llamar a next(error) si el servicio lanza una excepción al crear', async () => {
        mockRequest.body = { author_name: 'Fallo' };
        const mockError = new Error('Error guardando en BD');
        
        mockReviewService.createReview.mockRejectedValue(mockError);

        await reviewHandler.createReview(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockReviewService.createReview).toHaveBeenCalledTimes(1);
        expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
});

