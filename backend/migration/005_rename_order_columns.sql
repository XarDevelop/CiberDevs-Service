-- Migracion: renombrar columnas de orders al nuevo modelo
ALTER TABLE orders RENAME COLUMN identifier TO name;
ALTER TABLE orders RENAME COLUMN contact TO telefono;
ALTER TABLE orders RENAME COLUMN description TO coment;
