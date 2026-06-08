import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { type Request, type Response, type NextFunction } from 'express';
import { OrderHandler } from '../../src/order/handler/order.handler.js';
import { type IOrderService } from '../../src/order/services/order.service.interface.js';
import { type Order } from '../../src/models/order.model.js';

describe('OrderHandler - Unit Tests', () => {
    let orderHandler: OrderHandler;
    let mockOrderService: jest.Mocked<IOrderService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
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
        created_at: new Date()
    };

    beforeEach(() => {
        mockOrderService = {
            getOrders: jest.fn<any>(),
            getOrderById: jest.fn<any>(),
            createOrder: jest.fn<any>(),
            updateOrder: jest.fn<any>(),
            deleteOrder: jest.fn<any>(),
        };

        orderHandler = new OrderHandler(mockOrderService);

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis() as any,
            json: jest.fn() as any,
        };
        nextFunction = jest.fn();
    });

    describe('getOrders', () => {
        it('debería responder con status 200 y la data si el servicio responde correctamente', async () => {
            mockOrderService.getOrders.mockResolvedValue([mockOrder]);

            await orderHandler.getOrders(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.getOrders).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: [mockOrder]
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('debería llamar a next(error) si el servicio lanza una excepción', async () => {
            const mockError = new Error('Database Error');
            mockOrderService.getOrders.mockRejectedValue(mockError);

            await orderHandler.getOrders(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.getOrders).toHaveBeenCalledTimes(1);
            expect(nextFunction).toHaveBeenCalledWith(mockError);
            expect(mockResponse.status).not.toHaveBeenCalled();
        });
    });

    describe('getOrderById', () => {
        it('debería responder con 200 y la orden cuando existe', async () => {
            mockOrderService.getOrderById.mockResolvedValue(mockOrder);
            mockRequest = { params: { id: '1' } };

            await orderHandler.getOrderById(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.getOrderById).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockOrder });
        });

        it('debería llamar a next(error) si el servicio lanza excepción', async () => {
            const error = new Error('Not found');
            mockOrderService.getOrderById.mockRejectedValue(error);
            mockRequest = { params: { id: '999' } };

            await orderHandler.getOrderById(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('createOrder', () => {
        it('debería responder con 201 y la orden creada', async () => {
            mockOrderService.createOrder.mockResolvedValue(mockOrder);
            mockRequest = { body: { name: 'Empresa Test', telefono: 'test@mail.com', coment: 'Quiero una pagina web', tipo_pedido: 'web', tipo_pago: 'transferencia' } };

            await orderHandler.createOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.createOrder).toHaveBeenCalledWith(mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: mockOrder });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('DB Error');
            mockOrderService.createOrder.mockRejectedValue(error);
            mockRequest = { body: {} };

            await orderHandler.createOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('updateOrder', () => {
        it('debería responder con 200 y la orden actualizada', async () => {
            const updated = { ...mockOrder, status: 'aceptado' };
            mockOrderService.updateOrder.mockResolvedValue(updated);
            mockRequest = { params: { id: '1' }, body: { status: 'aceptado' } };

            await orderHandler.updateOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.updateOrder).toHaveBeenCalledWith(1, mockRequest.body);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: updated });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('Not found');
            mockOrderService.updateOrder.mockRejectedValue(error);
            mockRequest = { params: { id: '999' }, body: {} };

            await orderHandler.updateOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteOrder', () => {
        it('debería responder con 200 y la orden eliminada', async () => {
            const deleted = { ...mockOrder, is_deleted: true };
            mockOrderService.deleteOrder.mockResolvedValue(deleted);
            mockRequest = { params: { id: '1' } };

            await orderHandler.deleteOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(mockOrderService.deleteOrder).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: deleted });
        });

        it('debería llamar a next(error) si el servicio falla', async () => {
            const error = new Error('Not found');
            mockOrderService.deleteOrder.mockRejectedValue(error);
            mockRequest = { params: { id: '999' } };

            await orderHandler.deleteOrder(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

            expect(nextFunction).toHaveBeenCalledWith(error);
        });
    });
});
