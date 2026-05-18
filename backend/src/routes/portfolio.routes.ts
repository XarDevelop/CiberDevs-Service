import { Router } from 'express';
import { PortfolioRepository } from '../portfolio/repo/portfolio.repo.js';
import { PortfolioService } from '../portfolio/services/portfolio.service.js';
import { PortfolioHandler } from '../portfolio/handler/portfolio.handler.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateSchema, createPortfolioSchema, updatePortfolioSchema } from '../utils/validator.util.js';
import { writeLimiter, generalLimiter } from '../middleware/rateLimiter.js';

const portfolioRouter = Router();

const portfolioRepo = new PortfolioRepository();
const portfolioService = new PortfolioService(portfolioRepo);
const portfolioHandler = new PortfolioHandler(portfolioService);

portfolioRouter.get('/', generalLimiter, portfolioHandler.getProjects);
portfolioRouter.get('/:id', generalLimiter, portfolioHandler.getProjectById);
portfolioRouter.post('/', writeLimiter, authMiddleware, validateSchema(createPortfolioSchema), portfolioHandler.createProject);
portfolioRouter.put('/:id', writeLimiter, authMiddleware, validateSchema(updatePortfolioSchema), portfolioHandler.updateProject);
portfolioRouter.patch('/:id/toggle', writeLimiter, authMiddleware, portfolioHandler.toggleProjectActive);

export { portfolioRouter };
