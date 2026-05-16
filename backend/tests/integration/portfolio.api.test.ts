import request from 'supertest';
import { describe, it, expect, jest, afterEach } from '@jest/globals';
import app from '../../src/index.js';
import { pool } from '../../src/database/index.js';

describe('Portfolio API Integration Tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /api/v1/portfolio', () => {
        it('debe devolver 200 y una lista de proyectos', async () => {
            const mockProjects = [
                {
                    id: 1,
                    title: 'App Prueba',
                    description: 'Test',
                    icon: '🚀',
                    image_url: null,
                    project_url: null,
                    is_active: true,
                    created_at: new Date().toISOString()
                }
            ];

            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: mockProjects } as never);

            const response = await request(app).get('/api/v1/portfolio');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].title).toBe('App Prueba');
        });

        it('debe manejar errores del servidor con catch', async () => {
            jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Connection Refused'));

            const response = await request(app).get('/api/v1/portfolio');

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Error interno del servidor');
        });
    });
});
