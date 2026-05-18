import { type PortfolioProject, type CreatePortfolioDTO, type UpdatePortfolioDTO } from '../../models/portfolio.model.js';
import { type IPortfolioRepository } from '../repo/portfolio.repo.interface.js';
import { type IPortfolioService } from './portfolio.service.interface.js';
import { AppError } from '../../middleware/errorHandler.js';
import { removeUndefinedFields } from '../../utils/object.util.js';

export class PortfolioService implements IPortfolioService {
    constructor(private readonly portfolioRepo: IPortfolioRepository) {}

    async getProjects(): Promise<PortfolioProject[]> {
        const projects = await this.portfolioRepo.getAllActiveProjects();
        if (!projects) throw new AppError('No se pudieron obtener los proyectos', 500);
        return projects;
    }

    async getProjectById(id: number): Promise<PortfolioProject> {
        const project = await this.portfolioRepo.getProjectById(id);
        if (!project) throw new AppError('Proyecto no encontrado', 404);
        return project;
    }

    async createProject(data: CreatePortfolioDTO): Promise<PortfolioProject> {
        const newProject = await this.portfolioRepo.createProject(data);
        if (!newProject) throw new AppError('Error al guardar el proyecto en la base de datos', 500);
        return newProject;
    }

    async updateProject(id: number, data: UpdatePortfolioDTO): Promise<PortfolioProject> {
        await this.getProjectById(id);

        const updates = removeUndefinedFields(data);
        if (Object.keys(updates).length === 0) {
            return await this.getProjectById(id);
        }

        const updatedProject = await this.portfolioRepo.updateProject(id, updates);
        if (!updatedProject) throw new AppError('Error al actualizar el proyecto', 500);
        return updatedProject;
    }

    async toggleProjectActive(id: number): Promise<PortfolioProject> {
        await this.getProjectById(id);
        const toggledProject = await this.portfolioRepo.toggleProjectActive(id);
        if (!toggledProject) throw new AppError('Error al cambiar el estado del proyecto', 500);
        return toggledProject;
    }
}
