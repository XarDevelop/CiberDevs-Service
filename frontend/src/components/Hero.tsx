import React from 'react'
import '../style/Hero.css'

export default function Hero() {
  return (
    <div>
        <section class="hero" id="inicio">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">Disponible para proyectos</div>
                    <h1 class="hero-title">Tu negocio necesita una presencia <span>digital profesional</span></h1>
                    <p class="hero-text">En la era digital, no tener una página web optimizada y presencia en redes sociales significa perder clientes todos los días. Transformamos tu negocio con soluciones web de alto impacto.</p>
                    <div class="hero-cta">
                        <button class="btn btn-primary btn-large">Empezar Ahora</button>
                        <button class="btn btn-outline btn-large">Ver Servicios</button>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-image-wrapper">
                        <div class="hero-image">
                            <div class="mockup-browser">
                                <div class="mockup-header">
                                    <img src="/src/assets/estado_design 2.jpg" alt=""></img>
                                </div>
                                <div class="mockup-body">
                                    <div class="mockup-block short"></div>
                                    <div class="mockup-block medium"></div>
                                    <div class="mockup-block long"></div>
                                    <div class="mockup-card">
                                        <div class="mockup-card-item"></div>
                                        <div class="mockup-card-item"></div>
                                        <div class="mockup-card-item"></div>
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
