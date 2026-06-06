import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util.js';

interface JwtPayload {
    role: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    let token = req.cookies?.token;

    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'No autorizado' });
        return;
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'No autorizado' });
    }
};