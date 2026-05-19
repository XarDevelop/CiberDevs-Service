import { type Request, type Response, type NextFunction } from 'express';
import { type IOrderService } from '../services/order.service.interface.js';

export class OrderHandler {
    constructor(private readonly orderService: IOrderService) {}

    getOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orders = await this.orderService.getOrders();
            res.status(200).json({
                success: true,
                data: orders
            });
        } catch (error) {
            next(error);
        }
    };

    getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const order = await this.orderService.getOrderById(id);
            res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            next(error);
        }
    };

    createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newOrder = await this.orderService.createOrder(req.body);
            res.status(201).json({
                success: true,
                data: newOrder
            });
        } catch (error) {
            next(error);
        }
    };

    updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const updatedOrder = await this.orderService.updateOrder(id, req.body);
            res.status(200).json({
                success: true,
                data: updatedOrder
            });
        } catch (error) {
            next(error);
        }
    };

    deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const deletedOrder = await this.orderService.deleteOrder(id);
            res.status(200).json({
                success: true,
                data: deletedOrder
            });
        } catch (error) {
            next(error);
        }
    };
}
