import request from 'supertest';
import { jest, describe, it, expect, afterEach, beforeAll } from '@jest/globals';

const mockPool = { query: jest.fn() };

jest.unstable_mockModule('../../src/database/index.js', () => ({
    pool: mockPool,
    connectDB: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    disconnectDB: jest.fn<() => Promise<void>>(),
}));

let app: any;

beforeAll(async () => {
    const mod = await import('../../src/index.js');
    app = mod.default;
});

describe('Portfolio API Integration Tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /api/portfolio', () => {
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

            mockPool.query.mockResolvedValueOnce({ rows: mockProjects } as never);

            const response = await request(app).get('/api/portfolio');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
            expect(response.body.data[0].title).toBe('App Prueba');
        });

        it('debe manejar errores del servidor', async () => {
            mockPool.query.mockRejectedValueOnce(new Error('Connection Refused') as never);

            const response = await request(app).get('/api/portfolio');

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Connection Refused');
        });
    });

    describe('GET /api/portfolio/:id', () => {
        it('debe devolver 200 y el proyecto si existe', async () => {
            const mockProject = { id: 1, title: 'App Prueba', description: 'Test', icon: '🚀', image_url: null, project_url: null, is_active: true, created_at: new Date().toISOString() };
            mockPool.query.mockResolvedValueOnce({ rows: [mockProject] } as never);

            const response = await request(app).get('/api/portfolio/1');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(1);
        });

        it('debe devolver 404 si el proyecto no existe', async () => {
            mockPool.query.mockResolvedValueOnce({ rows: [] } as never);

            const response = await request(app).get('/api/portfolio/999');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/portfolio', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .post('/api/portfolio')
                .send({ title: 'Test', description: 'Test description' });

            expect(response.status).toBe(401);
        });
    });

    describe('PUT /api/portfolio/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .put('/api/portfolio/1')
                .send({ title: 'Updated' });

            expect(response.status).toBe(401);
        });
    });

    describe('PATCH /api/portfolio/:id/toggle', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .patch('/api/portfolio/1/toggle');

            expect(response.status).toBe(401);
        });
    });
});
