import { type PortfolioProject } from '../../models/portfolio.model.js';

export interface IPortfolioService {
    getProjects(): Promise<PortfolioProject[]>;
}
