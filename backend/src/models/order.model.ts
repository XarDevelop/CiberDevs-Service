export interface Order {
    id: number;
    name: string;
    telefono: string;
    coment: string;
    tipo_pedido: string;
    tipo_pago: string;
    status: string;
    stage: string;
    is_deleted: boolean;
    created_at: Date;
}

export type CreateOrderDTO = Omit<Order, 'id' | 'status' | 'stage' | 'is_deleted' | 'created_at'>;
export type UpdateOrderDTO = Partial<Omit<Order, 'id' | 'created_at'>>;
