import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { PortfolioHandler } from '../../src/handler/portfolio.handler.js';
import { type IPortfolioService } from '../../src/services/portfolio.service.interface.js';
import { type PortfolioProject } from '../../src/models/portfolio.model.js';

describe('PortfolioHandler - Unit Tests', () => {
    let portfolioHandler: PortfolioHandler;
    let mockPortfolioService: jest.Mocked<IPortfolioService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockPortfolioService = {
            getProjects: jest.fn<any>(),
        };

        portfolioHandler = new PortfolioHandler(mockPortfolioService);

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any,
        };
        nextFunction = jest.fn();
    });

    it('debería responder con status 200 y la data si el servicio responde correctamente', async () => {
        const mockProjects: PortfolioProject[] = [
            {
                id: 1,
                title: 'E-commerce',
                description: 'Test',
                icon: null,
                image_url: null,
                project_url: null,
                is_active: true,
                created_at: new Date()
            }
        ];
        mockPortfolioService.getProjects.mockResolvedValue(mockProjects);

        await portfolioHandler.getProjects(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockPortfolioService.getProjects).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            data: mockProjects
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('debería llamar a next(error) si el servicio lanza una excepción', async () => {
        const mockError = new Error('Database Error');
        mockPortfolioService.getProjects.mockRejectedValue(mockError);

        await portfolioHandler.getProjects(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

        expect(mockPortfolioService.getProjects).toHaveBeenCalledTimes(1);
        expect(nextFunction).toHaveBeenCalledWith(mockError);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });
});
