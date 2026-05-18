export interface PortfolioProject {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    image_url: string | null;
    project_url: string | null;
    is_active: boolean;
    created_at: Date;
}

export type CreatePortfolioDTO = Omit<PortfolioProject, 'id' | 'created_at' | 'is_active'>;
export type UpdatePortfolioDTO = Partial<CreatePortfolioDTO>;
