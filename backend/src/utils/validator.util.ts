import { z, ZodObject } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';
import type { AnyZodObject } from 'zod/v3';

/**
 * Middleware genérico que valida los datos contra un esquema Zod.
 * Si falla, responde con Status 400 y el detalle. Caso contrario, continúa.
 */
export const validateSchema = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Datos de entrada inválidos',
                    errors: error.issues.map((e: z.ZodIssue) => ({
                        path: e.path.join('.'),
                        message: e.message
                    }))
                });
                return; // Cortamos el flujo
            }
            next(error);
        }
    };
};

/**
 * Esquema específico para validar la Creación de Reseñas.
 */
export const createReviewSchema = z.object({
    body: z.object({
        author_name: z.string({ message: 'El nombre es obligatorio' })
                        .min(3, 'El nombre debe tener al menos 3 caracteres')
                        .max(100, 'El nombre no debe superar los 100 caracteres'),
        author_role: z.string({ message: 'El rol es obligatorio' })
                        .min(2, 'El rol debe tener al menos 2 caracteres')
                        .max(150, 'El rol no debe superar los 150 caracteres'),
        content: z.string({ message: 'El contenido es obligatorio' })
                    .min(10, 'El testimonio debe ser más descriptivo (mínimo 10 caracteres)'),
        rating: z.number({ message: 'La calificación es obligatoria' })
                    .min(1, 'La calificación mínima es 1')
                    .max(5, 'La calificación máxima es 5'),
        avatar_url: z.string()
                    .url('Debe ser una URL válida')
                    .optional()
                    .nullable()
    })
});

/**
 * Esquema específico para validar la Creación de Proyectos en Portafolio.
 */
export const createPortfolioSchema = z.object({
    body: z.object({
        title: z.string({ message: 'El título es obligatorio' })
                .min(3, 'El título debe tener al menos 3 caracteres')
                .max(150, 'El título no debe superar los 150 caracteres'),
        description: z.string({ message: 'La descripción es obligatoria' })
                    .min(10, 'La descripción debe tener al menos 10 caracteres'),
        icon: z.string().optional().nullable(),
        image_url: z.string().url('Debe ser una URL válida').optional().nullable(),
        project_url: z.string().url('Debe ser una URL válida').optional().nullable()
    })
});

/**
 * Esquema para validar la Actualización de Proyectos (todos los campos son opcionales).
 */
export const updatePortfolioSchema = z.object({
    body: z.object({
        title: z.string()
                .min(3, 'El título debe tener al menos 3 caracteres')
                .max(150, 'El título no debe superar los 150 caracteres')
                .optional(),
        description: z.string()
                    .min(10, 'La descripción debe tener al menos 10 caracteres')
                    .optional(),
        icon: z.string().optional().nullable(),
        image_url: z.string().url('Debe ser una URL válida').optional().nullable(),
        project_url: z.string().url('Debe ser una URL válida').optional().nullable()
    })
});