import { Router } from 'express';
import { AuthHandler } from '../Auth/handler/auth.handler.js';
import { AuthService } from '../Auth/services/auth.service.js';
import { AuthRepo } from '../Auth/repo/auth.repo.js';
import { authLimiter } from '../middleware/rateLimiter.js';

export const authRouter = Router();

const authRepo = new AuthRepo();
const authService = new AuthService(authRepo);
const authHandler = new AuthHandler(authService);

authRouter.post('/login', authLimiter, authHandler.login);