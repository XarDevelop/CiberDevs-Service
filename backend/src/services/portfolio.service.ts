import { type PortfolioProject } from '../models/portfolio.model.js';
import { type IPortfolioRepository } from '../repo/portfolio.repo.interface.js';
import { type IPortfolioService } from './portfolio.service.interface.js';

export class PortfolioService implements IPortfolioService {
    constructor(private readonly portfolioRepo: IPortfolioRepository) {}

    async getProjects(): Promise<PortfolioProject[]> {
        return await this.portfolioRepo.getAllActiveProjects();
    }
}
