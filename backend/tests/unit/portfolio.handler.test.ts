import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { PortfolioHandler } from '../../src/portfolio/handler/portfolio.handler.js';
import { type IPortfolioService } from '../../src/portfolio/services/portfolio.service.interface.js';
import { type PortfolioProject } from '../../src/models/portfolio.model.js';

describe('PortfolioHandler - Unit Tests', () => {
    let portfolioHandler: PortfolioHandler;
    let mockPortfolioService: jest.Mocked<IPortfolioService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    const mockProject: PortfolioProject = {
        id: 1,
        title: 'E-commerce',
        description: 'Test description',
        icon: null,
        image_url: null,
        project_url: null,
        is_active: true,
        created_at: new Date()
    };

    beforeEach(() => {
        mockPortfolioService = {
            getProjects: jest.fn<any>(),
            getProjectById: jest.fn<any>(),
            createProject: jest.fn<any>(),
            updateProject: jest.fn<any>(),
            toggleProjectActive: jest.fn<any>(),
        };

        portfolioHandler = new PortfolioHandler(mockPortfolioService);

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any,
        };
        nextFunction = jest.fn();
    });

    describe('getProjects', () => {
        it('debería responder con status 200 y la data si el servicio responde correctamente', async () => {
            mockPortfolioService.getProjects.mockResolvedValue([mockProject]);

            await portfolioHandler.getProjects(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockPortfolioService.getProjects).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: [mockProject]
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

    describe('getProjectById', () => {
        it('debería responder con 200 y el proyecto cuando existe', async () => {
            mockPortfolioService.getProjectById.mockResolvedValue(mockProject);
            mockRequest = { params: { id: '1' } };

            await portfolioHandler.getProjectById(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockPortfolioService.getProjectById).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockProject });
        });

        it('debería llamar a next(error) si el servicio lanza excepción', async () => {
            const error = new Error('Not found');
            mockPortfolioService.getProjectById.mockRejectedValue(error);
            mockRequest = { params: { id: '999' } };

            await portfolioHandler.getProjectById(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('createProject', () => {
        it('debería responder con 201 y el proyecto creado', async () => {
            mockPortfolioService.createProject.mockResolvedValue(mockProject);
            mockRequest = { body: { title: 'E-commerce', description: 'Test description' } };

            await portfolioHandler.createProject(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockPortfolioService.createProject).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockProject });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('DB Error');
            mockPortfolioService.createProject.mockRejectedValue(error);
            mockRequest = { body: {} };

            await portfolioHandler.createProject(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('updateProject', () => {
        it('debería responder con 200 y el proyecto actualizado', async () => {
            const updated = { ...mockProject, title: 'E-commerce v2' };
            mockPortfolioService.updateProject.mockResolvedValue(updated);
            mockRequest = { params: { id: '1' }, body: { title: 'E-commerce v2' } };

            await portfolioHandler.updateProject(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockPortfolioService.updateProject).toHaveBeenCalledWith(1, mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: updated });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('Not found');
            mockPortfolioService.updateProject.mockRejectedValue(error);
            mockRequest = { params: { id: '999' }, body: {} };

            await portfolioHandler.updateProject(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('toggleProjectActive', () => {
        it('debería responder con 200 y el proyecto con estado cambiado', async () => {
            const toggled = { ...mockProject, is_active: false };
            mockPortfolioService.toggleProjectActive.mockResolvedValue(toggled);
            mockRequest = { params: { id: '1' } };

            await portfolioHandler.toggleProjectActive(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockPortfolioService.toggleProjectActive).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: toggled });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('Not found');
            mockPortfolioService.toggleProjectActive.mockRejectedValue(error);
            mockRequest = { params: { id: '999' } };

            await portfolioHandler.toggleProjectActive(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });
});
