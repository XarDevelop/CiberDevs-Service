-- Migración: 003_create_orders_table.sql
-- Propósito: Crear la tabla para almacenar los pedidos de los clientes.

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    telefono VARCHAR(255) NOT NULL,
    coment TEXT NOT NULL,
    tipo_pedido VARCHAR(255) NOT NULL,
    tipo_pago VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'en espera',
    stage VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_is_deleted ON orders(is_deleted);
