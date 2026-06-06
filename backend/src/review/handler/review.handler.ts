import { type Request, type Response, type NextFunction } from 'express';
import { type IReviewService } from '../services/review.service.interface.js';

export class ReviewHandler {
    constructor(private readonly reviewService: IReviewService) {}

    public getReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const reviews = await this.reviewService.getReviews();
            res.status(200).json({
                success: true,
                data: reviews,
            });
        } catch (error) {
            // Pasamos el error al Error Handler Global
            next(error);
        }
    };

    public createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            // En este punto, los datos de req.body ya pasaron por el validador (Zod)
            const newReview = await this.reviewService.createReview(req.body);
            res.status(201).json({
                success: true,
                data: newReview,
            });
        } catch (error) {
            next(error);
        }
    };
}
