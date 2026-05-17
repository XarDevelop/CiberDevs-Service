import React from 'react'
import '../style/Portafolio.css'

 interface PortafolioProps{
    id: number,
    title: string,
    description: string,
    icon: string,
    image_url:string | null,
    project_url: string,
    is_active: boolean,
    created_at:string
}

 interface RespuestaPortafolio{
    success: boolean,
    data: PortafolioProps[]
}

interface Props{
  props:PortafolioProps
}

export default function PortafolioElement({props}:Props) {
  return (
    <div className="portfolio-item">
        <div className="portfolio-placeholder">
            <div className="portfolio-placeholder-icon">{props.icon}</div>
            <div className="portfolio-placeholder-text">{props.id}</div>
        </div>
        <div className="portfolio-overlay">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    </div>
  )
}
