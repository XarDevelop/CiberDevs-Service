import { type Order, type CreateOrderDTO, type UpdateOrderDTO } from '../../models/order.model.js';

export interface IOrderService {
    getOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order>;
    createOrder(data: CreateOrderDTO): Promise<Order>;
    updateOrder(id: number, data: UpdateOrderDTO): Promise<Order>;
    deleteOrder(id: number): Promise<Order>;
}
