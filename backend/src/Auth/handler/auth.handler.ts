import { type Request, type Response } from 'express';
import { type IAuthService } from '../services/auth.service.interface.js';
import { AppError } from '../../middleware/errorHandler.js';
import { config } from '../../config/index.js';

export class AuthHandler {
    constructor(private readonly authService: IAuthService) {}

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { password } = req.body;
            if (!password) {
                res.status(400).json({ success: false, message: 'La contraseña es requerida' });
                return;
            }

            const token = await this.authService.loginAndGetToken(password);

            if (!token) {
                res.status(401).json({ success: false, message: 'Credenciales inválidas' });
                return;
            }

            res.cookie('token', token, {
                httpOnly: true,
                secure: config.isProduction,
                sameSite: 'strict',
                maxAge: 3600000,
                path: '/api/admin/auth'
            });

            res.status(200).json({ success: true, message: 'Login successful' });
        } catch (error: unknown) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ success: false, message: error.message });
                return;
            }
            if (!config.isProduction) {
                console.error('Login error:', error);
            }
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    };

    logout = async (_req: Request, res: Response): Promise<void> => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: config.isProduction,
            sameSite: 'strict',
            path: '/api/admin/auth'
        });
        res.status(200).json({ success: true, message: 'Logout successful' });
    };

    checkSession = async (_req: Request, res: Response): Promise<void> => {
        res.status(200).json({ success: true, message: 'Session is valid' });
    };
}