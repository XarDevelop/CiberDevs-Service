import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { pool } from '../../src/database/index.js';
import { PortfolioRepository } from '../../src/portfolio/repo/portfolio.repo.js';

describe('PortfolioRepository - Unit Tests', () => {
    const portfolioRepo = new PortfolioRepository();
    const mockRow = { id: 1, title: 'App Test', description: 'Desc', icon: '🌐', image_url: null, project_url: null, is_active: true, created_at: new Date() };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllActiveProjects', () => {
        it('debería ejecutar el query correcto y retornar los proyectos activos', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await portfolioRepo.getAllActiveProjects();

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM portfolio_projects WHERE is_active = $1 ORDER BY created_at DESC',
                [true]
            );
            expect(result).toEqual([mockRow]);
        });
    });

    describe('getProjectById', () => {
        it('debería ejecutar el query correcto y retornar el proyecto si existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await portfolioRepo.getProjectById(1);

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM portfolio_projects WHERE id = $1', [1]);
            expect(result).toEqual(mockRow);
        });

        it('debería retornar null si no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await portfolioRepo.getProjectById(999);

            expect(result).toBeNull();
        });
    });

    describe('createProject', () => {
        it('debería insertar y retornar el proyecto creado', async () => {
            const data = { title: 'App Test', description: 'Desc', icon: '🌐', image_url: null, project_url: null };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await portfolioRepo.createProject(data);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO portfolio_projects'),
                [data.title, data.description, data.icon, data.image_url, data.project_url, true]
            );
            expect(result).toEqual(mockRow);
        });
    });

    describe('updateProject', () => {
        it('debería actualizar solo los campos enviados', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await portfolioRepo.updateProject(1, { title: 'Updated' });

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE portfolio_projects'),
                ['Updated', 1]
            );
            expect(result).toEqual(mockRow);
        });

        it('debería retornar null si el proyecto no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await portfolioRepo.updateProject(999, { title: 'Updated' });

            expect(result).toBeNull();
        });
    });

    describe('toggleProjectActive', () => {
        it('debería cambiar is_active y retornar el proyecto', async () => {
            const toggledRow = { ...mockRow, is_active: false };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [toggledRow] } as never);

            const result = await portfolioRepo.toggleProjectActive(1);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE portfolio_projects'),
                [1]
            );
            expect(result?.is_active).toBe(false);
        });

        it('debería retornar null si el proyecto no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await portfolioRepo.toggleProjectActive(999);

            expect(result).toBeNull();
        });
    });
});
