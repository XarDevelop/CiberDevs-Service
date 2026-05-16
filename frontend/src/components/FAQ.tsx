import React from 'react'
import '../style/FAQ.css'

export default function FAQ() {
  return (
    <div>
        <section class="faq" id="faq">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Preguntas Frecuentes</span>
                <h2 class="section-title">Resolvemos tus dudas</h2>
                <p class="section-subtitle">Las preguntas más comunes de nuestros clientes</p>
            </div>
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Cuánto tiempo tardan en entregar una página web?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>El tiempo de entrega depende del plan seleccionado. El plan Básico se entrega en 7-10 días hábiles, el Digital Pro en 14-21 días, y el Premium en 21-30 días. Siempre mantenemos comunicación constante durante el proceso.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Qué incluye exactamente el despliegue digital en redes sociales?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>Incluye la creación y optimización de perfiles en Facebook, Instagram, X (Twitter) y WhatsApp Business. Además, diseñamos una estrategia de contenido mensual, publicaciones programadas, y configuración de herramientas de respuesta automática.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Cómo funciona el plan Premium con inversión compartida?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>En el plan Premium, CiberDev invierte en tu crecimiento cada 4 meses con recursos adicionales de marketing y desarrollo. A cambio, el cliente paga un 5% de sus ganancias mensuales como royalty. Es una verdadera alianza de crecimiento mutuo.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Puedo hacer cambios a la web después de entregada?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>Sí, todos nuestros planes incluyen un período de soporte técnico post-entrega (30 días para Básico, 60 días para Digital Pro, y soporte prioritario ilimitado para Premium). También ofrecemos planes de mantenimiento mensual.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Necesito tener contenido listo antes de empezar?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>No es necesario. Podemos trabajar con el contenido que tengas o ayudarte a crearlo. Nuestro equipo puede asesorarte en copywriting, selección de imágenes, y estrategia de contenido para redes sociales.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle('active')">
                        <span>¿Las páginas web son responsivas (se ven bien en móvil)?</span>
                        <div class="faq-icon">+</div>
                    </div>
                    <div class="faq-answer">
                        <p>Absolutamente. Todas nuestras páginas web están diseñadas con mobile-first approach, lo que significa que se ven y funcionan perfectamente en celulares, tablets y computadoras. Es un estándar, no un extra.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
