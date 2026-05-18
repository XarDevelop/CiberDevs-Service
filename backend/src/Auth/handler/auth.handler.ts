import { type Request, type Response } from 'express';
import { type IAuthService } from '../services/auth.service.interface.js';

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
                httpOnly: true,                 // Previene acceso desde JS (mitiga XSS)
                secure: process.env.NODE_ENV === 'production', // Solo HTTPS en prod
                sameSite: 'strict',             // Mitiga CSRF
                maxAge: 3600000                 // 1 hora
            });

            res.status(200).json({ message: 'Login successful' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
}