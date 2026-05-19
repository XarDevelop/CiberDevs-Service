import React from 'react'
import '../style/Testimonio.css'

interface InfoTestimonio{
    id: number,
    author_name: string,
    author_role: string,
    avatar_url: string,
    content: string,
    rating: number,
    is_active: boolean,
    created_at: string
}

export default function TestimonioGrid({props}:InfoTestimonio) {
    const CantidadEstrellas=()=>{
        let estrellas:string='';
        for(let i:number=0;i<=props.rating;i++){
            estrellas=estrellas+"⭐"
        }
        return estrellas;
    }
    const VerRating:string=CantidadEstrellas();

  return (
    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <span>{VerRating}</span>
                        </div>
                        <p className="testimonial-text">"{props.content}"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-info">
                                <h4>{props.author_name}</h4>
                                <p>{props.author_role}</p>
                            </div>
                        </div>
                    </div>
  )
}
