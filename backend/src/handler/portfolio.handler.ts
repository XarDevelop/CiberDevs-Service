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
}
