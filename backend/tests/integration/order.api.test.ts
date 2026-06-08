import request from 'supertest';
import { jest, describe, it, expect, afterEach, beforeAll } from '@jest/globals';

const mockPool = { query: jest.fn() };

jest.unstable_mockModule('../../src/database/index.js', () => ({
    pool: mockPool,
    connectDB: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    disconnectDB: jest.fn<() => Promise<void>>(),
}));

let app: any;
let validToken: string;

beforeAll(async () => {
    const mod = await import('../../src/index.js');
    app = mod.default;
    const { generateToken } = await import('../../src/utils/jwt.util.js');
    validToken = generateToken({ role: 'admin' });
});

describe('Order API Integration Tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /api/orders', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app).get('/api/orders');

            expect(response.status).toBe(401);
        });

        it('debe devolver 200 y una lista de ordenes con token valido', async () => {
            const mockOrders = [
                {
                    id: 1,
                    name: 'Empresa Test',
                    telefono: 'test@mail.com',
                    coment: 'Quiero una pagina web',
                    status: 'en espera',
                    stage: 'pendiente',
                    is_deleted: false,
                    tipo_pedido: 'web',
                    tipo_pago: 'transferencia',
                    created_at: new Date().toISOString()
                }
            ];

            mockPool.query.mockResolvedValueOnce({ rows: mockOrders } as never);

            const response = await request(app)
                .get('/api/orders')
                .set('Cookie', `token=${validToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveLength(1);
        });

        it('debe manejar errores del servidor', async () => {
            mockPool.query.mockRejectedValueOnce(new Error('Connection Refused') as never);

            const response = await request(app)
                .get('/api/orders')
                .set('Cookie', `token=${validToken}`);

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app).get('/api/orders/1');

            expect(response.status).toBe(401);
        });

        it('debe devolver 200 y la orden si existe con token valido', async () => {
            const mockOrder = { id: 1, name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', status: 'en espera', stage: 'pendiente', is_deleted: false, tipo_pedido: 'web', tipo_pago: 'transferencia', created_at: new Date().toISOString() };
            mockPool.query.mockResolvedValueOnce({ rows: [mockOrder] } as never);

            const response = await request(app)
                .get('/api/orders/1')
                .set('Cookie', `token=${validToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.id).toBe(1);
        });

        it('debe devolver 404 si la orden no existe', async () => {
            mockPool.query.mockResolvedValueOnce({ rows: [] } as never);

            const response = await request(app)
                .get('/api/orders/999')
                .set('Cookie', `token=${validToken}`);

            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/orders', () => {
        it('debe devolver 201 sin token de autenticación (acceso público)', async () => {
            const mockOrder = { id: 1, name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', status: 'en espera', stage: 'pendiente', is_deleted: false, tipo_pedido: 'web', tipo_pago: 'transferencia', created_at: new Date().toISOString() };
            mockPool.query.mockResolvedValueOnce({ rows: [mockOrder] } as never);

            const response = await request(app)
                .post('/api/orders')
                .send({ name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', tipo_pedido: 'web', tipo_pago: 'transferencia' });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.status).toBe('en espera');
        });

        it('debe devolver 400 si los datos son inválidos', async () => {
            const response = await request(app)
                .post('/api/orders')
                .send({ name: 'AB' });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .put('/api/orders/1')
                .send({ status: 'aceptado' });

            expect(response.status).toBe(401);
        });
    });

    describe('DELETE /api/orders/:id', () => {
        it('debe devolver 401 sin token de autenticación', async () => {
            const response = await request(app)
                .delete('/api/orders/1');

            expect(response.status).toBe(401);
        });
    });
});
