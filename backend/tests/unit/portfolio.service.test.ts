import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { PortfolioService } from '../../src/services/portfolio.service.js';
import { type IPortfolioRepository } from '../../src/repo/portfolio.repo.interface.js';
import { type PortfolioProject } from '../../src/models/portfolio.model.js';

describe('PortfolioService - Unit Tests', () => {
    let portfolioService: PortfolioService;
    let mockPortfolioRepo: jest.Mocked<IPortfolioRepository>;

    beforeEach(() => {
        mockPortfolioRepo = {
            getAllActiveProjects: jest.fn<any>(),
        };
        portfolioService = new PortfolioService(mockPortfolioRepo);
    });

    it('debería retornar un arreglo de proyectos de forma exitosa', async () => {
        const mockProjects: PortfolioProject[] = [
            {
                id: 1,
                title: 'App Prueba',
                description: 'Descripción test',
                icon: '🚀',
                image_url: null,
                project_url: null,
                is_active: true,
                created_at: new Date(),
            },
        ];
        mockPortfolioRepo.getAllActiveProjects.mockResolvedValue(mockProjects);

        const result = await portfolioService.getProjects();

        expect(result).toHaveLength(1);
        expect(result).toEqual(mockProjects);
        expect(mockPortfolioRepo.getAllActiveProjects).toHaveBeenCalledTimes(1);
    });
});
