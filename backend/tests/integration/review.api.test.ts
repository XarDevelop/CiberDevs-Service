import { describe, it, expect, jest, afterEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { reviewRouter } from '../../src/routes/review.routes.js';
import { pool } from '../../src/database/index.js';
import { errorHandler } from '../../src/middleware/errorHandler.js';

// Configuramos una app Express exclusiva para testear las rutas aisladas
const app = express();
app.use(express.json());
app.use('/api/reviews', reviewRouter);
// Añadimos el error handler para simular el ciclo de vida completo
app.use(errorHandler as express.ErrorRequestHandler);

describe('GET /api/reviews - Integration API', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('debe responder 200 y devolver la lista de reseñas a través de HTTP', async () => {
        const mockRows = [{ id: 1, name: 'Ana', content: 'Increíble', stars: 5, is_active: true }];
        
        // Mockeamos la base de datos igual que en el repo
        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: mockRows } as never);

        // Simulamos la llamada HTTP real usando supertest
        const response = await request(app).get('/api/reviews');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true,
            data: mockRows
        });
    });

    it('debe protegerse y devolver 500 si la base de datos falla (AppError)', async () => {
        // Simulamos un crash en la BD
        jest.spyOn(pool, 'query').mockRejectedValueOnce(new Error('DB Connection Refused'));

        const response = await request(app).get('/api/reviews');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            success: false,
            message: 'DB Connection Refused'
        });
    });
});

describe('POST /api/reviews - Integration API', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('debe crear una reseña exitosamente si los datos son válidos', async () => {
        const newReviewPayload = {
            name: 'Ana',
            role: 'Founder',
            content: 'Gran mejora para mi web',
            stars: 5
        };

        const mockResponse = { id: 1, ...newReviewPayload, is_active: true };

        jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockResponse] } as never);

        const response = await request(app)
            .post('/api/reviews')
            .send(newReviewPayload);

        expect(response.status).toBe(201);
        expect(response.body.data).toEqual(mockResponse);
    });

    it('debe devolver error 400 de validación si el rating es mayor a 5 o faltan datos', async () => {
        const invalidPayload = {
            name: 'A', // Muy corto
            role: 'Founder',
            content: 'Gran mejora para mi web',
            stars: 10 // Inválido, max es 5
            // Falta content? no, pero testemos el rating
        };

        const dbSpy = jest.spyOn(pool, 'query');

        const response = await request(app)
            .post('/api/reviews')
            .send(invalidPayload);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Datos de entrada inválidos');
        // No llamamos a la db cuando es 400
        expect(dbSpy).not.toHaveBeenCalled();
    });
});
