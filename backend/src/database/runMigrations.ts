import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './index.js';
import { config as appConfig } from '../config/index.js';

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

        await client.query(`
            CREATE TABLE IF NOT EXISTS _migrations (
                name TEXT PRIMARY KEY,
                executed_at TIMESTAMPTZ DEFAULT NOW()
            )
        `);

        const { rows: executed } = await client.query('SELECT name FROM _migrations');
        const executedNames = new Set(executed.map((r: { name: string }) => r.name));

        for (const file of files) {
            if (executedNames.has(file)) {
                continue;
            }
            console.log(`Running migration: ${file}`);
            const filePath = path.join(migrationDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');
            await client.query(sql);
            await client.query('INSERT INTO _migrations (name) VALUES ($1)', [file]);
            console.log(`Migration ${file} completed`);
        }

        await client.query('COMMIT');
        console.log('All migrations completed successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        if (!appConfig.isProduction) {
            console.error('Migration failed, rolling back:', error);
        }
        throw error;
    } finally {
        client.release();
    }
}
