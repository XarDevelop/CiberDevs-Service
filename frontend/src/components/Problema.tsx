import React from 'react'
import '../style/Problema.css'

export default function Problema() {
  return (
    <div>
        <section class="problem" id="problema">
        <div class="container">
            <div class="section-header">
                <span class="section-label">El Problema</span>
                <h2 class="section-title">¿Por qué tu negocio está perdiendo oportunidades?</h2>
                <p class="section-subtitle">La falta de presencia digital profesional afecta directamente tus resultados</p>
            </div>
            <div class="problem-grid">
                <div class="problem-card">
                    <div class="problem-icon">📉</div>
                    <h3>Pérdida de clientes</h3>
                    <p>El 70% de los consumidores investiga online antes de comprar. Sin web, no existes para ellos.</p>
                </div>
                <div class="problem-card">
                    <div class="problem-icon">🔍</div>
                    <h3>Baja visibilidad</h3>
                    <p>Tu competencia con presencia digital te roba clientes potenciales todos los días.</p>
                </div>
                <div class="problem-card">
                    <div class="problem-icon">⏰</div>
                    <h3>Tiempo perdido</h3>
                    <p>Gestionar redes sociales sin estrategia consume tiempo sin generar resultados reales.</p>
                </div>
            </div>
            <div class="problem-cta">
                <button class="btn btn-primary btn-large">Quiero solucionarlo</button>
            </div>
        </div>
    </section>
    </div>
  )
}
