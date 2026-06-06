import { type Request, type Response, type NextFunction } from 'express';
import { config } from '../config/index.js';

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }

    if (!config.isProduction) {
        console.error('Unhandled error:', err);
    }

    res.status(500).json({
        success: false,
        message: config.isProduction
            ? 'Error interno del servidor'
            : err.message,
    });
};

export const notFoundHandler = (_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
    });
};
