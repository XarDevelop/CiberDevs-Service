import React from 'react'
import '../style/Portafolio.css'

export default function Portafolio() {
  return (
    <div><section class="portfolio" id="portafolio">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Portafolio</span>
                <h2 class="section-title">Muestra de proyectos</h2>
                <p class="section-subtitle">Algunos de los proyectos que hemos desarrollado para nuestros clientes</p>
            </div>
            <div class="portfolio-grid">
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">🌐</div>
                        <div class="portfolio-placeholder-text">Proyecto 1</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>E-commerce Moda</h3>
                        <p>Tienda online con pasarela de pagos</p>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">🏥</div>
                        <div class="portfolio-placeholder-text">Proyecto 2</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>Clínica Dental</h3>
                        <p>Sitio web + sistema de citas</p>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">🍔</div>
                        <div class="portfolio-placeholder-text">Proyecto 3</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>Restaurante Local</h3>
                        <p>Web + menú digital + pedidos</p>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">🏋️</div>
                        <div class="portfolio-placeholder-text">Proyecto 4</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>Gimnasio FitLife</h3>
                        <p>Plataforma completa de fitness</p>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">🏠</div>
                        <div class="portfolio-placeholder-text">Proyecto 5</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>Inmobiliaria</h3>
                        <p>Catálogo de propiedades + CRM</p>
                    </div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-placeholder">
                        <div class="portfolio-placeholder-icon">📚</div>
                        <div class="portfolio-placeholder-text">Proyecto 6</div>
                    </div>
                    <div class="portfolio-overlay">
                        <h3>Academia Online</h3>
                        <p>Plataforma e-learning</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
