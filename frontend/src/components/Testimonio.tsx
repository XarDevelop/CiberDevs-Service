import React from 'react'
import '../style/Testimonio.css'

export default function Testimonio() {
  return (
    <div>
        <section class="testimonials" id="testimonios">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Testimonios</span>
                <h2 class="section-title">Feedback de nuestros clientes</h2>
                <p class="section-subtitle">Lo que dicen quienes ya confiaron en CiberDev</p>
            </div>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p class="testimonial-text">"CiberDev transformó por completo la imagen de mi negocio. En solo 2 semanas tenía una web profesional y mis redes sociales funcionando. Las ventas aumentaron un 40%."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">MR</div>
                        <div class="testimonial-info">
                            <h4>María Rodríguez</h4>
                            <p>Dueña de Boutique Luna</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p class="testimonial-text">"El plan Digital Pro fue la mejor inversión. No solo me hicieron la web, sino que gestionan mis redes y me traen clientes nuevos constantemente. Totalmente recomendado."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">CG</div>
                        <div class="testimonial-info">
                            <h4>Carlos Gómez</h4>
                            <p>Consultor Financiero</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p class="testimonial-text">"Opté por el plan Premium y la alianza con CiberDev ha sido clave. La inversión compartida demuestra que realmente creen en el crecimiento de mi negocio."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">AP</div>
                        <div class="testimonial-info">
                            <h4>Ana Pérez</h4>
                            <p>CEO de TechStart</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
