import { Helmet } from 'react-helmet-async';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CiberDev',
  description: 'Desarrollo web profesional y presencia digital para negocios.',
  url: 'https://ciberdev.com/',
  telephone: '+34-513-66196',
  email: 'francislopez0507@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Valencia',
    addressCountry: 'ES',
  },
  sameAs: ['https://wa.me/3451366196'],
};

export default function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
