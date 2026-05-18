import { type PortfolioProject, type CreatePortfolioDTO, type UpdatePortfolioDTO } from '../../models/portfolio.model.js';

export interface IPortfolioService {
    getProjects(): Promise<PortfolioProject[]>;
    getProjectById(id: number): Promise<PortfolioProject>;
    createProject(data: CreatePortfolioDTO): Promise<PortfolioProject>;
    updateProject(id: number, data: UpdatePortfolioDTO): Promise<PortfolioProject>;
    toggleProjectActive(id: number): Promise<PortfolioProject>;
}
