import { type Request, type Response, type NextFunction } from 'express';
import { type IPortfolioService } from '../services/portfolio.service.interface.js';

export class PortfolioHandler {
    constructor(private readonly portfolioService: IPortfolioService) {}

    getProjects = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const projects = await this.portfolioService.getProjects();
            res.status(200).json({
                success: true,
                data: projects
            });
        } catch (error) {
            next(error);
        }
    };

    getProjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const project = await this.portfolioService.getProjectById(id);
            res.status(200).json({
                success: true,
                data: project
            });
        } catch (error) {
            next(error);
        }
    };

    createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newProject = await this.portfolioService.createProject(req.body);
            res.status(201).json({
                success: true,
                data: newProject
            });
        } catch (error) {
            next(error);
        }
    };

    updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const updatedProject = await this.portfolioService.updateProject(id, req.body);
            res.status(200).json({
                success: true,
                data: updatedProject
            });
        } catch (error) {
            next(error);
        }
    };

    toggleProjectActive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const toggledProject = await this.portfolioService.toggleProjectActive(id);
            res.status(200).json({
                success: true,
                data: toggledProject
            });
        } catch (error) {
            next(error);
        }
    };
}
