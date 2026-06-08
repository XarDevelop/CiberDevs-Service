import { describe, it, expect, jest, afterEach } from '@jest/globals';
import { pool } from '../../src/database/index.js';
import { OrderRepository } from '../../src/order/repo/order.repo.js';

describe('OrderRepository - Unit Tests', () => {
    const orderRepo = new OrderRepository();
    const mockRow = { id: 1, name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', tipo_pedido: 'web', tipo_pago: 'transferencia', status: 'en espera', stage: 'pendiente', is_deleted: false, created_at: new Date() };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getAllOrders', () => {
        it('debería ejecutar el query correcto y retornar las ordenes activas', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await orderRepo.getAllOrders();

            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM orders WHERE is_deleted = $1 ORDER BY created_at DESC',
                [false]
            );
            expect(result).toEqual([mockRow]);
        });
    });

    describe('getOrderById', () => {
        it('debería ejecutar el query correcto y retornar la orden si existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await orderRepo.getOrderById(1);

            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM orders WHERE id = $1 AND is_deleted = $2', [1, false]);
            expect(result).toEqual(mockRow);
        });

        it('debería retornar null si no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await orderRepo.getOrderById(999);

            expect(result).toBeNull();
        });
    });

    describe('createOrder', () => {
        it('debería insertar y retornar la orden creada', async () => {
            const data = { name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', tipo_pedido: 'web', tipo_pago: 'transferencia' };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await orderRepo.createOrder(data);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO orders'),
                [data.name, data.telefono, data.coment, data.tipo_pedido, data.tipo_pago]
            );
            expect(result).toEqual(mockRow);
        });
    });

    describe('updateOrder', () => {
        it('debería actualizar solo los campos enviados', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [mockRow] } as never);

            const result = await orderRepo.updateOrder(1, { status: 'aceptado' });

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE orders'),
                ['aceptado', 1, false]
            );
            expect(result).toEqual(mockRow);
        });

        it('debería retornar null si la orden no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await orderRepo.updateOrder(999, { status: 'aceptado' });

            expect(result).toBeNull();
        });
    });

    describe('softDeleteOrder', () => {
        it('debería marcar is_deleted como true y retornar la orden', async () => {
            const deletedRow = { ...mockRow, is_deleted: true };
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [deletedRow] } as never);

            const result = await orderRepo.softDeleteOrder(1);

            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE orders'),
                [true, 1, false]
            );
            expect(result?.is_deleted).toBe(true);
        });

        it('debería retornar null si la orden no existe', async () => {
            jest.spyOn(pool, 'query').mockResolvedValueOnce({ rows: [] } as never);

            const result = await orderRepo.softDeleteOrder(999);

            expect(result).toBeNull();
        });
    });
});
