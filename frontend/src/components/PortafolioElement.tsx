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

interface Props{
  props:PortafolioProps
}

export default function PortafolioElement({props}:Props) {
  const content = (
    <div className="portfolio-item">
        <div className="portfolio-placeholder">
            {props.image_url ? (
              <img src={props.image_url} alt={props.title} className="portfolio-image" />
            ) : (
              <>
                <div className="portfolio-placeholder-icon">{props.icon}</div>
                <div className="portfolio-placeholder-text">{props.title}</div>
              </>
            )}
        </div>
        <div className="portfolio-overlay">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    </div>
  );

  if (props.project_url) {
    return (
      <a href={props.project_url} target="_blank" rel="noopener noreferrer" className="portfolio-link">
        {content}
      </a>
    );
  }

  return content;
}
