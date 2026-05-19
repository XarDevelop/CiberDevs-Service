import { type Order, type CreateOrderDTO } from '../../models/order.model.js';

export interface IOrderRepository {
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: number): Promise<Order | null>;
    createOrder(data: CreateOrderDTO): Promise<Order>;
    updateOrder(id: number, data: Partial<CreateOrderDTO & { status: string; stage: string }>): Promise<Order | null>;
    softDeleteOrder(id: number): Promise<Order | null>;
}
