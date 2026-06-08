import '../style/Testimonio.css'

interface InfoTestimonio {
    id: number,
    name: string,
    role: string,
    avatar_url: string,
    content: string,
    stars: number,
    is_active: boolean,
    created_at: string
}

export default function TestimonioGrid({ props }: { props: InfoTestimonio }) {
    const estrellas = '⭐'.repeat(props.stars);

    return (
        <div className="testimonial-card">
            <div className="testimonial-stars">
                <span>{estrellas}</span>
            </div>
            <p className="testimonial-text">"{props.content}"</p>
            <div className="testimonial-author">
                <div className="testimonial-avatar">
                    {props.name.charAt(0).toUpperCase()}
                </div>
                <div className="testimonial-info">
                    <h4>{props.name}</h4>
                    <p>{props.role}</p>
                </div>
            </div>
        </div>
    )
}
