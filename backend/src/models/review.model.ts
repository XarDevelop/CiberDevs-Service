export interface Review {
    id: number;
    author_name: string; // Ej: "María Rodríguez"
    author_role: string; // Ej: "Dueña de Boutique Luna"
    avatar_url?: string; // Opcional por si en un futuro incluyen foto, sino el frontend puede deducir las iniciales
    content: string;     // El texto del testimonio
    rating: number;      // Calificación en estrellas (1 a 5)
    is_active: boolean;  // Por si queremos ocultar un testimonio en el futuro (Soft Delete/Toggle)
    created_at: Date;
}

// Tipo que usaremos para cuando llegue la información para CREAR una nueva reseña
export type CreateReviewDTO = Omit<Review, 'id' | 'created_at' | 'is_active'>;
