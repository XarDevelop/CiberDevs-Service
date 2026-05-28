import React from 'react'
import '../style/Hero.css'
import heroImage from '../assets/estado_design 2.jpg'

export default function Hero() {
  return (
    <div>
        <section className="hero" id="inicio">
        <div className="container">
            <div className="hero-grid">
                <div className="hero-content">
                    <div className="hero-badge">Disponible para proyectos</div>
                    <h1 className="hero-title">Tu negocio necesita una presencia <span>digital profesional</span></h1>
                    <p className="hero-text">En la era digital, no tener una página web optimizada y presencia en redes sociales significa perder clientes todos los días. Transformamos tu negocio con soluciones web de alto impacto.</p>
                    <div className="hero-cta">
                        <button className="btn btn-primary btn-large">Empezar Ahora</button>
                        <button className="btn btn-outline btn-large">Ver Servicios</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <div className="hero-image">
                            <div className="mockup-browser">
                                <div className="mockup-header">
                                    <img src={heroImage} alt="Estado de diseño - Vista previa de proyecto desarrollo web"></img>
                                </div>
                                <div className="mockup-body">
                                    <div className="mockup-block short"></div>
                                    <div className="mockup-block medium"></div>
                                    <div className="mockup-block long"></div>
                                    <div className="mockup-card">
                                        <div className="mockup-card-item"></div>
                                        <div className="mockup-card-item"></div>
                                        <div className="mockup-card-item"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
