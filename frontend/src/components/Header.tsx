import React from 'react'
import '../style/Header.css'

export default function Header() {
  return (
    <header class="header">
        <div class="container">
            <div class="header-inner">
                <a href="#" class="logo">Ciber<span>Dev</span></a>
                <nav class="nav-desktop">
                    <a href="#problema" class="nav-link">Problema</a>
                    <a href="#solucion" class="nav-link">Servicios</a>
                    <a href="#portafolio" class="nav-link">Portafolio</a>
                    <a href="#testimonios" class="nav-link">Testimonios</a>
                    <a href="#faq" class="nav-link">FAQ</a>
                    <a href="#contacto" class="nav-link">Contacto</a>
                    <button class="btn btn-primary">Solicitar Presupuesto</button>
                </nav>
            </div>
        </div>
    </header>
  )
}
