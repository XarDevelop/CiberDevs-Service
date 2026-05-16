-- Migración: 002_create_portfolio_table.sql
-- Propósito: Crear la tabla para almacenar los proyectos del portafolio.

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50), -- Puede almacenar un emoji (ej. 🌐, 🏥) o identificador de icono
    image_url VARCHAR(255), -- Para cuando el proyecto tenga una imagen real de portada
    project_url VARCHAR(255), -- Link al proyecto en vivo o repositorio
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para optimizar consultas de proyectos activos
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_is_active ON portfolio_projects(is_active);
