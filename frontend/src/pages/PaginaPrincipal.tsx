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
import SEO from '../components/SEO'
import StructuredData from '../components/StructuredData'

export default function PaginaPrincipal() {
  return (
    <>
      <SEO />
      <StructuredData />
      <Header />
      <Hero />
      <Problema />
      <Servicios />
      <Portafolio />
      <Testimonio />
      <About />
      <FAQ />
      <CTA />
      <Footer />
    </>
  )
}
