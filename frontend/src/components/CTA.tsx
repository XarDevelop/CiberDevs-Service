import '../style/CTA.css'

export default function CTA() {
  return (
    <div>
        <section className="cta-final">
        <div className="container">
            <span className="section-label">Únete a CiberDev</span>
            <h2 className="section-title">Tu competencia ya está online. <br /> ¿Y tú?</h2>
            <p className="section-subtitle">Cada día que pasa sin presencia digital profesional es un día perdiendo clientes potenciales. Invierte en el futuro de tu negocio hoy mismo con un equipo que entiende de resultados.</p>
            <a href="#solucion" className="btn btn-white btn-large">Comprar Servicio Ahora</a>
            <div className="cta-features">
                <div className="cta-feature">Entrega garantizada</div>
                <div className="cta-feature">Soporte técnico incluido</div>
                <div className="cta-feature">Satisfacción asegurada</div>
            </div>
        </div>
    </section>
    </div>
  )
}
