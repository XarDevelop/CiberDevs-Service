import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { OrderService } from '../../src/order/services/order.service.js';
import { type IOrderRepository } from '../../src/order/repo/order.repo.interface.js';
import { type Order } from '../../src/models/order.model.js';
import { AppError } from '../../src/middleware/errorHandler.js';

describe('OrderService - Unit Tests', () => {
    let orderService: OrderService;
    let mockOrderRepo: jest.Mocked<IOrderRepository>;
    const mockOrder: Order = {
        id: 1,
        name: 'Empresa Test',
        telefono: 'test@mail.com',
        coment: 'Quiero una pagina web',
        tipo_pedido: 'web',
        tipo_pago: 'transferencia',
        status: 'en espera',
        stage: 'pendiente',
        is_deleted: false,
        created_at: new Date(),
    };

    beforeEach(() => {
        mockOrderRepo = {
            getAllOrders: jest.fn<any>(),
            getOrderById: jest.fn<any>(),
            createOrder: jest.fn<any>(),
            updateOrder: jest.fn<any>(),
            softDeleteOrder: jest.fn<any>(),
        };
        orderService = new OrderService(mockOrderRepo);
    });

    describe('getOrders', () => {
        it('debería retornar un arreglo de ordenes de forma exitosa', async () => {
            mockOrderRepo.getAllOrders.mockResolvedValue([mockOrder]);

            const result = await orderService.getOrders();

            expect(result).toHaveLength(1);
            expect(result).toEqual([mockOrder]);
            expect(mockOrderRepo.getAllOrders).toHaveBeenCalledTimes(1);
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockOrderRepo.getAllOrders.mockResolvedValue(null as unknown as Order[]);

            await expect(orderService.getOrders()).rejects.toThrow(AppError);
        });
    });

    describe('getOrderById', () => {
        it('debería retornar la orden si existe', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(mockOrder);

            const result = await orderService.getOrderById(1);

            expect(result).toEqual(mockOrder);
            expect(mockOrderRepo.getOrderById).toHaveBeenCalledWith(1);
        });

        it('debería lanzar AppError 404 si no existe', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(null);

            await expect(orderService.getOrderById(999)).rejects.toThrow(AppError);
            await expect(orderService.getOrderById(999)).rejects.toMatchObject({ statusCode: 404 });
        });
    });

    describe('createOrder', () => {
        it('debería crear y retornar la orden', async () => {
            const data = { name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', tipo_pedido: 'web', tipo_pago: 'transferencia' };
            mockOrderRepo.createOrder.mockResolvedValue(mockOrder);

            const result = await orderService.createOrder(data);

            expect(result).toEqual(mockOrder);
            expect(mockOrderRepo.createOrder).toHaveBeenCalledWith(data);
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockOrderRepo.createOrder.mockResolvedValue(null as unknown as Order);

            await expect(orderService.createOrder({ name: 'Test', telefono: 'test@mail.com', coment: 'Test descripcion larga', tipo_pedido: 'web', tipo_pago: 'transferencia' })).rejects.toThrow(AppError);
        });
    });

    describe('updateOrder', () => {
        it('debería actualizar y retornar la orden', async () => {
            const updateData = { status: 'aceptado' };
            const updated = { ...mockOrder, status: 'aceptado' };
            mockOrderRepo.getOrderById.mockResolvedValue(mockOrder);
            mockOrderRepo.updateOrder.mockResolvedValue(updated);

            const result = await orderService.updateOrder(1, updateData);

            expect(result).toEqual(updated);
            expect(mockOrderRepo.updateOrder).toHaveBeenCalledWith(1, updateData);
        });

        it('debería lanzar AppError 404 si la orden no existe', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(null);

            await expect(orderService.updateOrder(999, {})).rejects.toMatchObject({ statusCode: 404 });
        });

        it('debería lanzar AppError si el repo de update retorna null', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(mockOrder);
            mockOrderRepo.updateOrder.mockResolvedValue(null);

            await expect(orderService.updateOrder(1, { status: 'aceptado' })).rejects.toThrow(AppError);
        });
    });

    describe('deleteOrder', () => {
        it('debería eliminar (soft delete) y retornar la orden', async () => {
            const deleted = { ...mockOrder, is_deleted: true };
            mockOrderRepo.getOrderById.mockResolvedValue(mockOrder);
            mockOrderRepo.softDeleteOrder.mockResolvedValue(deleted);

            const result = await orderService.deleteOrder(1);

            expect(result.is_deleted).toBe(true);
            expect(mockOrderRepo.softDeleteOrder).toHaveBeenCalledWith(1);
        });

        it('debería lanzar AppError 404 si la orden no existe', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(null);

            await expect(orderService.deleteOrder(999)).rejects.toMatchObject({ statusCode: 404 });
        });

        it('debería lanzar AppError si el repo retorna null', async () => {
            mockOrderRepo.getOrderById.mockResolvedValue(mockOrder);
            mockOrderRepo.softDeleteOrder.mockResolvedValue(null);

            await expect(orderService.deleteOrder(1)).rejects.toThrow(AppError);
        });
    });
});
