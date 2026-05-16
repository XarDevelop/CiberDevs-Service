import { Router } from 'express';
import { PortfolioRepository } from '../repo/portfolio.repo.js';
import { PortfolioService } from '../services/portfolio.service.js';
import { PortfolioHandler } from '../handler/portfolio.handler.js';

const portfolioRouter = Router();

const portfolioRepo = new PortfolioRepository();
const portfolioService = new PortfolioService(portfolioRepo);
const portfolioHandler = new PortfolioHandler(portfolioService);

portfolioRouter.get('/', portfolioHandler.getProjects);

export { portfolioRouter };
