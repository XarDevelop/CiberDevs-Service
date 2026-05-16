import fs from 'fs';
import path from 'path';
import { pool } from './index.js';
// Importamos dotenv para asegurarnos de que levante variables si lo corremos de forma independiente
import 'dotenv/config'; 

async function runMigrations() {
    console.log('Iniciando proceso de migraciones...');
    const client = await pool.connect();

    try {
        // Obtenemos los archivos SQL de la carpeta 'migration'
        const migrationDir = path.join(__dirname, '../../migration');
        const files = fs.readdirSync(migrationDir).sort(); // Los ordena alfanuméricamente (001_, 002_, etc.)

        // Iniciamos la transacción (buena práctica para las migraciones)
        await client.query('BEGIN');

        for (const file of files) {
            if (file.endsWith('.sql')) {
                console.log(`Ejecutando migración: ${file}`);
                const filePath = path.join(migrationDir, file);
                const sql = fs.readFileSync(filePath, 'utf8');
                
                // Ejecutamos el archivo SQL
                await client.query(sql);
                console.log(`✅ Migración ${file} completada.`);
            }
        }

        await client.query('COMMIT');
        console.log('🎉 Todas las migraciones terminaron exitosamente.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error corriendo las migraciones. Se revirtieron los cambios.', error);
    } finally {
        client.release();
        // Cerramos el pool para que el script termine en la terminal
        await pool.end();
    }
}

// Ejecutar si llamamos a este script directamente
runMigrations();
