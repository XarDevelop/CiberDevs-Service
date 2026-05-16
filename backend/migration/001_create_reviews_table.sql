-- Migración: 001_create_reviews_table.sql
-- Propósito: Crear la tabla para almacenar los testimonios/reseñas de los clientes.

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL,
    author_role VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(255),
    content TEXT NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para mejorar el rendimiento cuando busquemos solo las reseñas activas
CREATE INDEX IF NOT EXISTS idx_reviews_is_active ON reviews(is_active);
