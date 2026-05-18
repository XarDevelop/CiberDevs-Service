import { type PortfolioProject, type CreatePortfolioDTO } from '../../models/portfolio.model.js';

export interface IPortfolioRepository {
    getAllActiveProjects(): Promise<PortfolioProject[]>;
    getProjectById(id: number): Promise<PortfolioProject | null>;
    createProject(data: CreatePortfolioDTO): Promise<PortfolioProject>;
    updateProject(id: number, data: Partial<CreatePortfolioDTO>): Promise<PortfolioProject | null>;
    toggleProjectActive(id: number): Promise<PortfolioProject | null>;
}
