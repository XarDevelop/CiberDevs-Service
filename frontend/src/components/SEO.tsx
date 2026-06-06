import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

export default function SEO({ title, description, canonical, image }: SEOProps) {
  const siteName = 'CiberDev';
  const baseUrl = 'https://ciberdevs.vercel.app';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Desarrollo Web Profesional`;
  const fullDescription = description || 'Transformamos tu negocio con soluciones web de alto impacto. Desarrollo profesional, despliegue digital estratégico y crecimiento compartido.';
  const ogImage = image || `${baseUrl}/favicon.jpeg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={canonical || baseUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonical || baseUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
