import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const siteName = 'CiberDev';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Desarrollo Web Profesional`;
  const fullDescription = description || 'Transformamos tu negocio con soluciones web de alto impacto. Desarrollo profesional, despliegue digital estratégico y crecimiento compartido.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
