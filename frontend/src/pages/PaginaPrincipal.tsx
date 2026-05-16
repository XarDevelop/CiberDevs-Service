import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Problema from '../components/Problema'
import Servicios from '../components/Servicios'
import Portafolio from '../components/Portafolio'
import Testimonio from '../components/Testimonio'
import About from '../components/About'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function PaginaPrincipal() {
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <Problema></Problema>
      <Servicios></Servicios>
      <Portafolio></Portafolio>
      <Testimonio></Testimonio>
      <About></About>
      <FAQ></FAQ>
      <CTA></CTA>
      <Footer></Footer>
    </div>
  )
}