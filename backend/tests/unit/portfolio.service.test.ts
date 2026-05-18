import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PortfolioService } from '../../src/portfolio/services/portfolio.service.js';
import { type IPortfolioRepository } from '../../src/portfolio/repo/portfolio.repo.interface.js';
import { type PortfolioProject } from '../../src/models/portfolio.model.js';
import { AppError } from '../../src/middleware/errorHandler.js';

describe('PortfolioService - Unit Tests', () => {
    let portfolioService: PortfolioService;
    let mockPortfolioRepo: jest.Mocked<IPortfolioRepository>;
    const mockProject: PortfolioProject = {
        id: 1,
        title: 'App Prueba',
        description: 'Descripción test',
        icon: '🚀',
        image_url: null,
        project_url: null,
        is_active: true,
        created_at: new Date(),
    };

    beforeEach(() => {
        mockPortfolioRepo = {
            getAllActiveProjects: jest.fn<any>(),
            getProjectById: jest.fn<any>(),
            createProject: jest.fn<any>(),
            updateProject: jest.fn<any>(),
            toggleProjectActive: jest.fn<any>(),
        };
        portfolioService = new PortfolioService(mockPortfolioRepo);
    });

    describe('getProjects', () => {
        it('debería retornar un arreglo de proyectos de forma exitosa', async () => {
            mockPortfolioRepo.getAllActiveProjects.mockResolvedValue([mockProject]);

            const result = await portfolioService.getProjects();

            expect(result).toHaveLength(1);
            expect(result).toEqual([mockProject]);
            expect(mockPortfolioRepo.getAllActiveProjects).toHaveBeenCalledTimes(1);
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockPortfolioRepo.getAllActiveProjects.mockResolvedValue(null as unknown as PortfolioProject[]);

            await expect(portfolioService.getProjects()).rejects.toThrow(AppError);
        });
    });

    describe('getProjectById', () => {
        it('debería retornar el proyecto si existe', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(mockProject);

            const result = await portfolioService.getProjectById(1);

            expect(result).toEqual(mockProject);
            expect(mockPortfolioRepo.getProjectById).toHaveBeenCalledWith(1);
        });

        it('debería lanzar AppError 404 si no existe', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(null);

            await expect(portfolioService.getProjectById(999)).rejects.toThrow(AppError);
            await expect(portfolioService.getProjectById(999)).rejects.toMatchObject({ statusCode: 404 });
        });
    });

    describe('createProject', () => {
        it('debería crear y retornar el proyecto', async () => {
            const data = { title: 'App Prueba', description: 'Descripción test', icon: '🚀', image_url: null, project_url: null };
            mockPortfolioRepo.createProject.mockResolvedValue(mockProject);

            const result = await portfolioService.createProject(data);

            expect(result).toEqual(mockProject);
            expect(mockPortfolioRepo.createProject).toHaveBeenCalledWith(data);
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockPortfolioRepo.createProject.mockResolvedValue(null as unknown as PortfolioProject);

            await expect(portfolioService.createProject({ title: 'Test', description: 'Test desc', icon: null, image_url: null, project_url: null })).rejects.toThrow(AppError);
        });
    });

    describe('updateProject', () => {
        it('debería actualizar y retornar el proyecto', async () => {
            const updateData = { title: 'Updated Title' };
            const updated = { ...mockProject, title: 'Updated Title' };
            mockPortfolioRepo.getProjectById.mockResolvedValue(mockProject);
            mockPortfolioRepo.updateProject.mockResolvedValue(updated);

            const result = await portfolioService.updateProject(1, updateData);

            expect(result).toEqual(updated);
            expect(mockPortfolioRepo.updateProject).toHaveBeenCalledWith(1, updateData);
        });

        it('debería lanzar AppError 404 si el proyecto no existe', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(null);

            await expect(portfolioService.updateProject(999, {})).rejects.toMatchObject({ statusCode: 404 });
        });

        it('debería lanzar AppError si el repo de update retorna null', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(mockProject);
            mockPortfolioRepo.updateProject.mockResolvedValue(null);

            await expect(portfolioService.updateProject(1, { title: 'X' })).rejects.toThrow(AppError);
        });
    });

    describe('toggleProjectActive', () => {
        it('debería cambiar el estado y retornar el proyecto', async () => {
            const toggled = { ...mockProject, is_active: false };
            mockPortfolioRepo.getProjectById.mockResolvedValue(mockProject);
            mockPortfolioRepo.toggleProjectActive.mockResolvedValue(toggled);

            const result = await portfolioService.toggleProjectActive(1);

            expect(result.is_active).toBe(false);
            expect(mockPortfolioRepo.toggleProjectActive).toHaveBeenCalledWith(1);
        });

        it('debería lanzar AppError 404 si el proyecto no existe', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(null);

            await expect(portfolioService.toggleProjectActive(999)).rejects.toMatchObject({ statusCode: 404 });
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockPortfolioRepo.getProjectById.mockResolvedValue(mockProject);
            mockPortfolioRepo.toggleProjectActive.mockResolvedValue(null);

            await expect(portfolioService.toggleProjectActive(1)).rejects.toThrow(AppError);
        });
    });
});
