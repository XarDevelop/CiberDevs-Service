-- Agregar columnas faltantes en la tabla orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tipo_pedido VARCHAR(255) NOT NULL DEFAULT 'sin_especificar';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tipo_pago VARCHAR(255) NOT NULL DEFAULT 'sin_especificar';
