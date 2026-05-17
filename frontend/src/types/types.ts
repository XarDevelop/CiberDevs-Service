export interface PortafolioProps{
    id: number,
    title: string,
    description: string,
    icon: string,
    image_url:string | null,
    project_url: string,
    is_active: boolean,
    created_at:string
}

export interface RespuestaPortafolio{
    success: boolean,
    data: PortafolioProps[]
}