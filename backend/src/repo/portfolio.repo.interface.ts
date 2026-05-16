import { type PortfolioProject } from '../models/portfolio.model.js';

export interface IPortfolioRepository {
    getAllActiveProjects(): Promise<PortfolioProject[]>;
}
