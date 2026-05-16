import { type Request, type Response, type NextFunction } from 'express';

// Definimos una clase para errores operacionales predecibles
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Error interno del servidor';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else {
        console.error('💥 ERROR INESPERADO:', err);
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
