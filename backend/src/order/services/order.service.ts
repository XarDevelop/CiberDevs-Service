import { type Order, type CreateOrderDTO, type UpdateOrderDTO } from '../../models/order.model.js';
import { type IOrderRepository } from '../repo/order.repo.interface.js';
import { type IOrderService } from './order.service.interface.js';
import { AppError } from '../../middleware/errorHandler.js';
import { removeUndefinedFields } from '../../utils/object.util.js';

export class OrderService implements IOrderService {
    constructor(private readonly orderRepo: IOrderRepository) {}

    async getOrders(): Promise<Order[]> {
        const orders = await this.orderRepo.getAllOrders();
        if (!orders) throw new AppError('No se pudieron obtener los pedidos', 500);
        return orders;
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepo.getOrderById(id);
        if (!order) throw new AppError('Pedido no encontrado', 404);
        return order;
    }

    async createOrder(data: CreateOrderDTO): Promise<Order> {
        const newOrder = await this.orderRepo.createOrder(data);
        if (!newOrder) throw new AppError('Error al guardar el pedido en la base de datos', 500);
        return newOrder;
    }

    async updateOrder(id: number, data: UpdateOrderDTO): Promise<Order> {
        await this.getOrderById(id);

        const updates = removeUndefinedFields(data);
        if (Object.keys(updates).length === 0) {
            return await this.getOrderById(id);
        }

        const updatedOrder = await this.orderRepo.updateOrder(id, updates);
        if (!updatedOrder) throw new AppError('Error al actualizar el pedido', 500);
        return updatedOrder;
    }

    async deleteOrder(id: number): Promise<Order> {
        await this.getOrderById(id);
        const deletedOrder = await this.orderRepo.softDeleteOrder(id);
        if (!deletedOrder) throw new AppError('Error al eliminar el pedido', 500);
        return deletedOrder;
    }
}
