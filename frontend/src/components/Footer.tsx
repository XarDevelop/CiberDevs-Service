import React from 'react'
import '../style/Footer.css'

export default function Footer() {
  return (
    <div>
        <footer class="footer" id='footer'>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="#" class="logo">Ciber<span>Dev</span></a>
                    <p>Transformamos negocios con soluciones web de alto impacto. Desarrollo profesional, despliegue digital estratégico y crecimiento compartido.</p>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Servicios</h4>
                    <ul class="footer-links">
                        <li><a href="#solucion">Web Esencial</a></li>
                        <li><a href="#solucion">Digital Pro</a></li>
                        <li><a href="#solucion">Partner Growth</a></li>
                        <li><a href="#solucion">Consultoría</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Empresa</h4>
                    <ul class="footer-links">
                        <li><a href="#portafolio">Portafolio</a></li>
                        <li><a href="#testimonios">Testimonios</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                        <li><a href="#faq">FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Legal</h4>
                    <ul class="footer-links">
                        <li><a href="#">Términos de servicio</a></li>
                        <li><a href="#">Política de privacidad</a></li>
                        <li><a href="#">Condiciones del plan Premium</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 CiberDev. Todos los derechos reservados.</p>
                <div class="footer-social">
                    <a href="#" title="Facebook">f</a>
                    <a href="#" title="Instagram">📷</a>
                    <a href="#" title="X">𝕏</a>
                    <a href="#" title="WhatsApp">💬</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}
