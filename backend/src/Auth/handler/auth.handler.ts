import { type Request, type Response } from 'express';
import { type IAuthService } from '../services/auth.service.interface.js';
import { AppError } from '../../middleware/errorHandler.js';

export class AuthHandler {
    constructor(private authService: IAuthService) {}

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { password } = req.body;
            if (!password) {
                res.status(400).json({ error: 'Password is required' });
                return;
            }

            const token = await this.authService.loginAndGetToken(password);

            if (!token) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            });

            res.status(200).json({ message: 'Login successful' });
        } catch (error: any) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ success: false, message: error.message });
                return;
            }
            console.error('Login error:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    };

    logout = async (_req: Request, res: Response): Promise<void> => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Logout successful' });
    };

    checkSession = async (_req: Request, res: Response): Promise<void> => {
        res.status(200).json({ success: true, message: 'Session is valid' });
    };
}