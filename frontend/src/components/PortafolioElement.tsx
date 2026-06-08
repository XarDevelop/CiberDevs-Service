import { useState, useEffect } from 'react';
import '../style/Portafolio.css'

interface PortafolioProps {
    id: number,
    title: string,
    description: string,
    icon: string,
    image_url: string | null,
    project_url: string,
    is_active: boolean,
    created_at: string
}

interface Props {
    props: PortafolioProps
}

export default function PortafolioElement({ props }: Props) {
    const [ogImage, setOgImage] = useState<string | null>(null);

    useEffect(() => {
        if (props.image_url) {
            setOgImage(props.image_url);
            return;
        }
        if (!props.project_url) return;

        let cancelled = false;
        fetch(`/api/meta-image?url=${encodeURIComponent(props.project_url)}`)
            .then(r => r.json())
            .then(data => {
                if (!cancelled && data.success && data.image) {
                    setOgImage(data.image);
                }
            })
            .catch(() => {});

        return () => { cancelled = true; };
    }, [props.id, props.image_url, props.project_url]);

    const imageSrc = ogImage;

    const content = (
        <div className="portfolio-item">
            {imageSrc ? (
                <img src={imageSrc} alt={props.title} className="portfolio-image" loading="lazy" />
            ) : (
                <div className="portfolio-placeholder">
                    <div className="portfolio-placeholder-icon">{props.icon}</div>
                    <div className="portfolio-placeholder-text">{props.title}</div>
                </div>
            )}
            <div className="portfolio-overlay">
                <span className="portfolio-tag">{props.icon} {props.title.split(' ')[0]}</span>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                {props.project_url && (
                    <span className="portfolio-link-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Visitar
                    </span>
                )}
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
