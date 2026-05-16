import React from 'react'
import '../style/Servicios.css'

export default function Servicios() {
  return (
    <div>
        <section class="solution" id="solucion">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Nuestra Solución</span>
                <h2 class="section-title">Planes diseñados para tu crecimiento</h2>
                <p class="section-subtitle">Elige el paquete que mejor se adapte a las necesidades de tu negocio</p>
            </div>
            <div class="pricing-grid">
                
                <div class="pricing-card">
                    <span class="pricing-badge">Básico</span>
                    <h3 class="pricing-name">Web Esencial</h3>
                    <div class="pricing-price">$300<span>USD</span></div>
                    <p class="pricing-description">Página web profesional para establecer tu presencia online.</p>
                    <ul class="features-list">
                        <li class="feature-item">Diseño web profesional y responsive</li>
                        <li class="feature-item">Hasta 5 páginas principales</li>
                        <li class="feature-item">Optimización SEO básica</li>
                        <li class="feature-item">Formulario de contacto</li>
                        <li class="feature-item">Hosting y dominio (1 año)</li>
                        <li class="feature-item">Soporte técnico 30 días</li>
                    </ul>
                    <button class="btn btn-outline">Seleccionar Plan</button>
                </div>

                <div class="pricing-card featured">
                    <span class="pricing-badge">Recomendado</span>
                    <h3 class="pricing-name">Digital Pro</h3>
                    <div class="pricing-price">$500<span>USD</span></div>
                    <p class="pricing-description">Web + presencia digital completa en redes sociales.</p>
                    <ul class="features-list">
                        <li class="feature-item">Todo lo del plan Básico</li>
                        <li class="feature-item">Gestión de Facebook e Instagram</li>
                        <li class="feature-item">Perfil optimizado en X (Twitter)</li>
                        <li class="feature-item">Integración con WhatsApp Business</li>
                        <li class="feature-item">Estrategia de contenido mensual</li>
                        <li class="feature-item">Reportes de analytics</li>
                        <li class="feature-item">Soporte técnico 60 días</li>
                    </ul>
                    <button class="btn btn-white">Seleccionar Plan</button>
                </div>

                <div class="pricing-card">
                    <span class="pricing-badge">Premium</span>
                    <h3 class="pricing-name">Partner Growth</h3>
                    <div class="pricing-price">$1,700<span>USD</span></div>
                    <p class="pricing-description">Alianza estratégica con inversión compartida en tu crecimiento.</p>
                    <ul class="features-list">
                        <li class="feature-item">Todo lo del plan Digital Pro</li>
                        <li class="feature-item"><strong>20% de descuento</strong> en futuras renovaciones</li>
                        <li class="feature-item"><strong>Inversión cada 4 meses</strong> por parte de CiberDev</li>
                        <li class="feature-item">Estrategia de crecimiento personalizada</li>
                        <li class="feature-item">Prioridad en soporte técnico</li>
                        <li class="feature-item">Consultoría mensual incluida</li>
                    </ul>
                    <p className='p-span'>
                        <strong>Nota:</strong> El cliente paga un 5% de sus ganancias mensuales como royalty por la inversión compartida.
                    </p>
                    <button class="btn btn-outline">Seleccionar Plan</button>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
