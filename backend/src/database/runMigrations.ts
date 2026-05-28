import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
    const migrationDir = path.join(__dirname, '..', '..', '..', 'migration');
    
    if (!fs.existsSync(migrationDir)) {
        console.log('No migration directory found, skipping migrations');
        return;
    }

    const files = fs.readdirSync(migrationDir)
        .filter(f => f.endsWith('.sql'))
        .sort();

    if (files.length === 0) {
        console.log('No migration files found');
        return;
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const file of files) {
            console.log(`Running migration: ${file}`);
            const filePath = path.join(migrationDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            await client.query(sql);
            console.log(`Migration ${file} completed`);
        }

        await client.query('COMMIT');
        console.log('All migrations completed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed, rolling back:', error);
        throw error;
    } finally {
        client.release();
    }
}

const isMainModule = process.argv[1]?.includes('runMigrations');
if (isMainModule) {
    runMigrations()
        .then(() => pool.end())
        .catch(() => process.exit(1));
}
