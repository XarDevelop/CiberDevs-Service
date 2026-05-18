import { pool } from '../../database/index.js';
import { type PortfolioProject, type CreatePortfolioDTO } from '../../models/portfolio.model.js';
import { type IPortfolioRepository } from './portfolio.repo.interface.js';

export class PortfolioRepository implements IPortfolioRepository {
    async getAllActiveProjects(): Promise<PortfolioProject[]> {
        const query = 'SELECT * FROM portfolio_projects WHERE is_active = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [true]);
        return result.rows;
    }

    async getProjectById(id: number): Promise<PortfolioProject | null> {
        const query = 'SELECT * FROM portfolio_projects WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] ?? null;
    }

    async createProject(data: CreatePortfolioDTO): Promise<PortfolioProject> {
        const query = `
            INSERT INTO portfolio_projects (title, description, icon, image_url, project_url, is_active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const values = [
            data.title,
            data.description,
            data.icon ?? null,
            data.image_url ?? null,
            data.project_url ?? null,
            true
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async updateProject(id: number, data: Partial<CreatePortfolioDTO>): Promise<PortfolioProject | null> {
        const fields = Object.keys(data) as (keyof CreatePortfolioDTO)[];
        if (fields.length === 0) return null;

        const setClauses = fields.map((field, i) => `${field} = $${i + 1}`);
        const values: unknown[] = fields.map(f => data[f] ?? null);
        values.push(id);

        const query = `
            UPDATE portfolio_projects
            SET ${setClauses.join(', ')}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `;
        const result = await pool.query(query, values);
        return result.rows[0] ?? null;
    }

    async toggleProjectActive(id: number): Promise<PortfolioProject | null> {
        const query = `
            UPDATE portfolio_projects
            SET is_active = NOT is_active
            WHERE id = $1
            RETURNING *
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0] ?? null;
    }
}
