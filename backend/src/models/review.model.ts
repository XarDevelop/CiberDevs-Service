export interface Review {
    id: number;
    name: string;
    role: string;
    avatar_url?: string;
    content: string;
    stars: number;
    is_active: boolean;
    created_at: Date;
}

export type CreateReviewDTO = Omit<Review, 'id' | 'created_at' | 'is_active'>;
