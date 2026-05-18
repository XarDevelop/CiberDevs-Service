import { Router } from 'express';
import { PortfolioRepository } from '../portfolio/repo/portfolio.repo.js';
import { PortfolioService } from '../portfolio/services/portfolio.service.js';
import { PortfolioHandler } from '../portfolio/handler/portfolio.handler.js';

const portfolioRouter = Router();

const portfolioRepo = new PortfolioRepository();
const portfolioService = new PortfolioService(portfolioRepo);
const portfolioHandler = new PortfolioHandler(portfolioService);

portfolioRouter.get('/', portfolioHandler.getProjects);

export { portfolioRouter };
