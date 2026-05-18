import { pool } from '../../database/index.js';
import { type PortfolioProject } from '../../models/portfolio.model.js';
import { type IPortfolioRepository } from './portfolio.repo.interface.js';

export class PortfolioRepository implements IPortfolioRepository {
    async getAllActiveProjects(): Promise<PortfolioProject[]> {
        const query = 'SELECT * FROM portfolio_projects WHERE is_active = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [true]);
        return result.rows;
    }
}
