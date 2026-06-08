-- Migracion: renombrar columnas de reviews al nuevo modelo
ALTER TABLE reviews RENAME COLUMN author_name TO name;
ALTER TABLE reviews RENAME COLUMN author_role TO role;
ALTER TABLE reviews RENAME COLUMN rating TO stars;
