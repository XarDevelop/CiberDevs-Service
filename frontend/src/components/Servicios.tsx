import { useState } from 'react'
import '../style/Servicios.css'
import FormularioDeServicio from './FormularioDeServicio';

export default function Servicios() {
    const[Personalizado, setPersonalizado]=useState<boolean>(false);
    const[Basico,setBasico]=useState<boolean>(false);
    const[Pro,setPro]=useState<boolean>(false);
    const[Premium,setPremium]=useState<boolean>(false);

  return (
    <div>
        <section className="solution" id="solucion">
        <div className="container">
            <div className="section-header">
                <span className="section-label">Nuestra Solución</span>
                <h2 className="section-title">Planes diseñados para tu crecimiento</h2>
                <p className="section-subtitle">Elige el paquete que mejor se adapte a las necesidades de tu negocio</p>
            </div>
            <div className="pricing-grid">
                
                <div className="pricing-card">
                    <span className="pricing-badge">Personalizado</span>
                    <h3 className="pricing-name">Plan a Medida</h3>
                    <div className="pricing-price">A convenir<span></span></div>
                    <p className="pricing-description">Acuerdo flexible dependiendo de la dificultad del servicio solicitado.</p>
                    <ul className="features-list">
                        <li className="feature-item">Presupuesto personalizado sin compromiso</li>
                        <li className="feature-item">Soluciones a medida de tu negocio</li>
                        <li className="feature-item">Consultoría inicial gratuita</li>
                        <li className="feature-item">Tecnologías adaptadas a tu proyecto</li>
                        <li className="feature-item">Sin límite de páginas ni funcionalidades</li>
                        <li className="feature-item">Soporte post-entrega personalizado</li>
                    </ul>
                    <button className="btn btn-outline" onClick={()=>{setPersonalizado(!Personalizado);setBasico(false);setPro(false);setPremium(false)}} aria-expanded={Personalizado} aria-controls="form-personalizado">Seleccionar Plan</button>
                    {Personalizado && <div id="form-personalizado"><FormularioDeServicio tipo={'Personalizado'}></FormularioDeServicio></div>}
                </div>

                <div className="pricing-card">
                    <span className="pricing-badge">Básico</span>
                    <h3 className="pricing-name">Web Esencial</h3>
                    <div className="pricing-price">$300<span>USD</span></div>
                    <p className="pricing-description">Página web profesional para establecer tu presencia online.</p>
                    <ul className="features-list">
                        <li className="feature-item">Diseño web profesional y responsive</li>
                        <li className="feature-item">Hasta 5 páginas principales</li>
                        <li className="feature-item">Optimización SEO básica</li>
                        <li className="feature-item">Formulario de contacto</li>
                        <li className="feature-item">Hosting y dominio (1 año)</li>
                        <li className="feature-item">Soporte técnico 30 días</li>
                    </ul>
                    <button className="btn btn-outline" onClick={()=>{setPersonalizado(false);setBasico(!Basico);setPro(false);setPremium(false)}} aria-expanded={Basico} aria-controls="form-basico">Seleccionar Plan</button>
                    {Basico && <div id="form-basico"><FormularioDeServicio tipo={'Basico'}></FormularioDeServicio></div>}
                </div>

                <div>
                    <div className="pricing-card featured">
                    <span className="pricing-badge">Recomendado</span>
                    <h3 className="pricing-name">Digital Pro</h3>
                    <div className="pricing-price">$500<span>USD</span></div>
                    <p className="pricing-description">Web + presencia digital completa en redes sociales.</p>
                    <ul className="features-list">
                        <li className="feature-item">Todo lo del plan Básico</li>
                        <li className="feature-item">Gestión de Facebook e Instagram</li>
                        <li className="feature-item">Perfil optimizado en X (Twitter)</li>
                        <li className="feature-item">Integración con WhatsApp Business</li>
                        <li className="feature-item">Estrategia de contenido mensual</li>
                        <li className="feature-item">Reportes de analytics</li>
                        <li className="feature-item">Soporte técnico 60 días</li>
                    </ul>
                    <button className="btn btn-white" onClick={()=>{setPersonalizado(false);setBasico(false);setPro(!Pro);setPremium(false)}} aria-expanded={Pro} aria-controls="form-pro">Seleccionar Plan</button>
                </div>
                {Pro && <div id="form-pro"><FormularioDeServicio tipo={'Pro'}></FormularioDeServicio></div>}
                </div>


                <div className="pricing-card">
                    <span className="pricing-badge">Premium</span>
                    <h3 className="pricing-name">Partner Growth</h3>
                    <div className="pricing-price">$1,300<span>USD</span></div>
                    <p className="pricing-description">Alianza estratégica con inversión compartida en tu crecimiento.</p>
                    <ul className="features-list">
                        <li className="feature-item">Todo lo del plan Digital Pro</li>
                        <li className="feature-item"><strong>20% de descuento</strong> en futuras renovaciones</li>
                        <li className="feature-item"><strong>Inversión cada 4 meses</strong> por parte de CiberDev</li>
                        <li className="feature-item">Estrategia de crecimiento personalizada</li>
                        <li className="feature-item">Prioridad en soporte técnico</li>
                        <li className="feature-item">Consultoría mensual incluida</li>
                    </ul>
                    <p className='p-span'>
                        <strong>Nota:</strong> El cliente paga un 5% de sus ganancias mensuales como royalty por la inversión compartida.
                    </p>
                    <button className="btn btn-outline" onClick={()=>{setPersonalizado(false);setBasico(false);setPro(false);setPremium(!Premium)}} aria-expanded={Premium} aria-controls="form-premium">Seleccionar Plan</button>
                    {Premium && <div id="form-premium"><FormularioDeServicio tipo={'Premium'}></FormularioDeServicio></div>}
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
