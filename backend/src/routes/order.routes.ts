import { Router } from 'express';
import { OrderRepository } from '../order/repo/order.repo.js';
import { OrderService } from '../order/services/order.service.js';
import { OrderHandler } from '../order/handler/order.handler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateSchema, createOrderSchema, updateOrderSchema } from '../utils/validator.util.js';
import { writeLimiter, generalLimiter } from '../middleware/rateLimiter.js';

const orderRouter = Router();

const orderRepo = new OrderRepository();
const orderService = new OrderService(orderRepo);
const orderHandler = new OrderHandler(orderService);

orderRouter.get('/', generalLimiter, authMiddleware, orderHandler.getOrders);
orderRouter.get('/:id', generalLimiter, authMiddleware, orderHandler.getOrderById);
orderRouter.post('/', writeLimiter, validateSchema(createOrderSchema), orderHandler.createOrder);
orderRouter.put('/:id', writeLimiter, authMiddleware, validateSchema(updateOrderSchema), orderHandler.updateOrder);
orderRouter.delete('/:id', writeLimiter, authMiddleware, orderHandler.deleteOrder);

export { orderRouter };
