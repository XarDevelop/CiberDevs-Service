import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { pool } from '../../src/database/index.js';
import { PortfolioRepository } from '../../src/repo/portfolio.repo.js';

describe('PortfolioRepository - Unit Tests', () => {
    const portfolioRepo = new PortfolioRepository();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('[GET] debería ejecutar el query correcto y retornar los proyectos activos', async () => {
        const mockRows = [
            { id: 1, title: 'App Test', description: 'Desc', icon: '🌐', project_url: null, image_url: null, is_active: true }
        ];

        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: mockRows } as never);

        const result = await portfolioRepo.getAllActiveProjects();

        expect(pool.query).toHaveBeenCalledWith(
            'SELECT * FROM portfolio_projects WHERE is_active = $1 ORDER BY created_at DESC',
            [true]
        );
        expect(result).toEqual(mockRows);
    });
});
