-- Migración: 003_create_orders_table.sql
-- Propósito: Crear la tabla para almacenar los pedidos de los clientes.

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'en espera',
    stage VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_is_deleted ON orders(is_deleted);
