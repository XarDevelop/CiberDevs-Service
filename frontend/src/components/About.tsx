import React from 'react'
import '../style/About.css'

export default function About() {
  return (
    <div>
      <section class="about" id="contacto">
        <div class="container">
            <div class="about-grid">
                <div class="about-content">
                    <span class="section-label">Sobre CiberDev</span>
                    <h2>Conectamos negocios con el mundo digital</h2>
                    <p>Somos un equipo apasionado por crear soluciones web que generan resultados reales. No solo hacemos páginas bonitas, construimos herramientas de crecimiento para tu negocio.</p>
                    <ul class="contact-list">
                        <li class="contact-item">
                            <div class="contact-icon">📱</div>
                            <div class="contact-details">
                                <h4>Teléfono / WhatsApp</h4>
                                <p>+53 51366196</p>
                            </div>
                        </li>
                        <li class="contact-item">
                            <div class="contact-icon">📧</div>
                            <div class="contact-details">
                                <h4>Correo electrónico</h4>
                                <p>francislopez05072gamil.com</p>
                            </div>
                        </li>
                        <li class="contact-item">
                            <div class="contact-icon">📍</div>
                            <div class="contact-details">
                                <h4>Ubicación</h4>
                                <p>La Habana,El Vedado,Cuba</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="about-visual">
                    <div class="about-image">
                        <h3>¿Listo para crecer?</h3>
                        <p>Contáctanos hoy mismo y recibe una consultoría gratuita sobre cómo podemos impulsar tu negocio digital.</p>
                        <div class="social-links">
                            <a href="#" class="social-link" title="Facebook">f</a>
                            <a href="#" class="social-link" title="Instagram">📷</a>
                            <a href="#" class="social-link" title="X (Twitter)">𝕏</a>
                            <a href="#" class="social-link" title="WhatsApp">💬</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
