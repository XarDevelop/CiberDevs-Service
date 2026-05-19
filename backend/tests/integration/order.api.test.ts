import request from 'supertest';
import { describe, it, expect, jest, afterEach } from '@jest/globals';
import app from '../../src/index.js';
import { pool } from '../../src/database/index.js';

describe('Order API Integration Tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /api/v1/orders', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app).get('/api/v1/orders');

            expect(response.status).toBe(401);
        });

        it('debe devolver 200 y una lista de ordenes con token valido', async () => {
            const mockOrders = [
                {
                    id: 1,
                    identifier: 'Empresa Test',
                    contact: 'test@mail.com',
                    description: 'Quiero una pagina web',
                    status: 'en espera',
                    stage: 'pendiente',
                    is_deleted: false,
                    created_at: new Date().toISOString()
                }
            ];

            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: mockOrders } as never);

            const response = await request(app)
                .get('/api/v1/orders')
                .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYxNTkyMDAsImV4cCI6OTk5OTk5OTk5OX0.fake');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
        });

        it('debe manejar errores del servidor', async () => {
            jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('Connection Refused'));

            const response = await request(app)
                .get('/api/v1/orders')
                .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYxNTkyMDAsImV4cCI6OTk5OTk5OTk5OX0.fake');

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/v1/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app).get('/api/v1/orders/1');

            expect(response.status).toBe(401);
        });

        it('debe devolver 200 y la orden si existe con token valido', async () => {
            const mockOrder = { id: 1, identifier: 'Empresa Test', contact: 'test@mail.com', description: 'Quiero una pagina web', status: 'en espera', stage: 'pendiente', is_deleted: false, created_at: new Date().toISOString() };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockOrder] } as never);

            const response = await request(app)
                .get('/api/v1/orders/1')
                .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYxNTkyMDAsImV4cCI6OTk5OTk5OTk5OX0.fake');

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(1);
        });

        it('debe devolver 404 si la orden no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const response = await request(app)
                .get('/api/v1/orders/999')
                .set('Cookie', 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTYxNTkyMDAsImV4cCI6OTk5OTk5OTk5OX0.fake');

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/v1/orders', () => {
        it('debe devolver 201 sin token de autenticación (acceso público)', async () => {
            const mockOrder = { id: 1, identifier: 'Empresa Test', contact: 'test@mail.com', description: 'Quiero una pagina web', status: 'en espera', stage: 'pendiente', is_deleted: false, created_at: new Date().toISOString() };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockOrder] } as never);

            const response = await request(app)
                .post('/api/v1/orders')
                .send({ identifier: 'Empresa Test', contact: 'test@mail.com', description: 'Quiero una pagina web' });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.status).toBe('en espera');
        });

        it('debe devolver 400 si los datos son inválidos', async () => {
            const response = await request(app)
                .post('/api/v1/orders')
                .send({ identifier: 'AB' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/v1/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .put('/api/v1/orders/1')
                .send({ status: 'aceptado' });

            expect(response.status).toBe(401);
        });
    });

    describe('DELETE /api/v1/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .delete('/api/v1/orders/1');

            expect(response.status).toBe(401);
        });
    });
});
