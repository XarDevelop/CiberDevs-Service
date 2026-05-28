import { pool } from '../../database/index.js';
import { type Order, type CreateOrderDTO } from '../../models/order.model.js';
import { type IOrderRepository } from './order.repo.interface.js';

export class OrderRepository implements IOrderRepository {
    async getAllOrders(): Promise<Order[]> {
        const query = 'SELECT * FROM orders WHERE is_deleted = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [false]);
        return result.rows;
    }

    async getOrderById(id: number): Promise<Order | null> {
        const query = 'SELECT * FROM orders WHERE id = $1 AND is_deleted = $2';
        const result = await pool.query(query, [id, false]);
        return result.rows[0] ?? null;
    }

    async createOrder(data: CreateOrderDTO): Promise<Order> {
        const query = `
            INSERT INTO orders (name, telefono, coment, tipo_pedido, tipo_pago)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [data.name, data.telefono, data.coment, data.tipo_pedido, data.tipo_pago];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateOrder(id: number, data: Partial<CreateOrderDTO & { status: string; stage: string }>): Promise<Order | null> {
        const fields = Object.keys(data) as (keyof typeof data)[];
        if (fields.length === 0) return null;

        const setClauses = fields.map((field, i) => `${field} = $${i + 1}`);
        const values: unknown[] = fields.map(f => data[f] ?? null);
        values.push(id);

        const query = `
            UPDATE orders
            SET ${setClauses.join(', ')}
            WHERE id = $${fields.length + 1} AND is_deleted = $${fields.length + 2}
            RETURNING *
        `;
        values.push(false);

        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }

    async softDeleteOrder(id: number): Promise<Order | null> {
        const query = `
            UPDATE orders
            SET is_deleted = $1
            WHERE id = $2 AND is_deleted = $3
            RETURNING *
        `;
        const result = await pool.query(query, [true, id, false]);
        return result.rows[0] ?? null;
    }
}
