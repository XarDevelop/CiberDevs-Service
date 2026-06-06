import React from 'react'
import '../style/Header.css'
import logo from '../assets/logo.jpeg'

export default function Header() {
  return (
    <header className="header">
        <div className="container">
            <div className="header-inner">
                <a href="/" className="logo"><img src={logo} alt="CiberDev" /></a>
                <nav className="nav-desktop">
                    <a href="#problema" className="nav-link">Problema</a>
                    <a href="#solucion" className="nav-link">Servicios</a>
                    <a href="#portafolio" className="nav-link">Portafolio</a>
                    <a href="#testimonios" className="nav-link">Testimonios</a>
                    <a href="#faq" className="nav-link">FAQ</a>
                    <a href="#contacto" className="nav-link">Contacto</a>
                    <button className="btn btn-primary" disabled>Solicitar Presupuesto</button>
                </nav>
            </div>
        </div>
    </header>
  )
}
