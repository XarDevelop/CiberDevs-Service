import React, { useState } from 'react'
import '../style/FAQ.css'

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div>
        <section className="faq" id="faq">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Preguntas Frecuentes</span>
                <h2 className="section-title">Resolvemos tus dudas</h2>
                <p className="section-subtitle">Las preguntas más comunes de nuestros clientes</p>
            </div>
            <div className="faq-list">
                <div className={`faq-item${openItems.has(0) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(0)}>
                        <span>¿Cuánto tiempo tardan en entregar una página web?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>El tiempo de entrega depende del plan seleccionado. El plan Básico se entrega en 7-10 días hábiles, el Digital Pro en 14-21 días, y el Premium en 21-30 días. Siempre mantenemos comunicación constante durante el proceso.</p>
                    </div>
                </div>
                <div className={`faq-item${openItems.has(1) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(1)}>
                        <span>¿Qué incluye exactamente el despliegue digital en redes sociales?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>Incluye la creación y optimización de perfiles en Facebook, Instagram, X (Twitter) y WhatsApp Business. Además, diseñamos una estrategia de contenido mensual, publicaciones programadas, y configuración de herramientas de respuesta automática.</p>
                    </div>
                </div>
                <div className={`faq-item${openItems.has(2) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(2)}>
                        <span>¿Cómo funciona el plan Premium con inversión compartida?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>En el plan Premium, CiberDev invierte en tu crecimiento cada 4 meses con recursos adicionales de marketing y desarrollo. A cambio, el cliente paga un 5% de sus ganancias mensuales como royalty. Es una verdadera alianza de crecimiento mutuo.</p>
                    </div>
                </div>
                <div className={`faq-item${openItems.has(3) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(3)}>
                        <span>¿Puedo hacer cambios a la web después de entregada?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>Sí, todos nuestros planes incluyen un período de soporte técnico post-entrega (30 días para Básico, 60 días para Digital Pro, y soporte prioritario ilimitado para Premium). También ofrecemos planes de mantenimiento mensual.</p>
                    </div>
                </div>
                <div className={`faq-item${openItems.has(4) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(4)}>
                        <span>¿Necesito tener contenido listo antes de empezar?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>No es necesario. Podemos trabajar con el contenido que tengas o ayudarte a crearlo. Nuestro equipo puede asesorarte en copywriting, selección de imágenes, y estrategia de contenido para redes sociales.</p>
                    </div>
                </div>
                <div className={`faq-item${openItems.has(5) ? ' active' : ''}`}>
                    <div className="faq-question" onClick={() => toggleItem(5)}>
                        <span>¿Las páginas web son responsivas (se ven bien en móvil)?</span>
                        <div className="faq-icon">+</div>
                    </div>
                    <div className="faq-answer">
                        <p>Absolutamente. Todas nuestras páginas web están diseñadas con mobile-first approach, lo que significa que se ven y funcionan perfectamente en celulares, tablets y computadoras. Es un estándar, no un extra.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
