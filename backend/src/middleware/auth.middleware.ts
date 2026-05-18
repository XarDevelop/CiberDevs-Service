import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util.js';

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.cookies?.token;

    // Fallback: Si no está en las cookies, verificamos el header Authorization
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Unauthorized: Missing token' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Expired or invalid token' });
    }
};