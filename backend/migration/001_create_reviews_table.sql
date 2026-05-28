-- Migración: 001_create_reviews_table.sql
-- Propósito: Crear la tabla para almacenar los testimonios/reseñas de los clientes.

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(255),
    content TEXT NOT NULL,
    stars SMALLINT NOT NULL CHECK (stars >= 1 AND stars <= 5),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para mejorar el rendimiento cuando busquemos solo las reseñas activas
CREATE INDEX IF NOT EXISTS idx_reviews_is_active ON reviews(is_active);
