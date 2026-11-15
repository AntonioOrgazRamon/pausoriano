import { abs, getT, path, site, type Lang, type RouteKey } from './index';

export const faqLd = (lang: Lang) => ({
  '@type': 'FAQPage',
  '@id': `${abs(path('home', lang))}#faq`,
  inLanguage: lang === 'es' ? 'es-ES' : 'en',
  mainEntity: getT(lang).faq.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const serviceLd = (lang: Lang, key: 'gestion' | 'consultoria') => {
  const s = getT(lang).servicePages[key];
  return {
    '@type': 'Service',
    '@id': `${abs(path(key, lang))}#service`,
    name: s.name,
    serviceType: s.name,
    description: getT(lang).meta[key].description,
    url: abs(path(key, lang)),
    inLanguage: lang === 'es' ? 'es-ES' : 'en',
    provider: { '@id': abs('/#person') },
    areaServed: ['ES', 'Worldwide'],
    audience: { '@type': 'Audience', audienceType: s.forWho },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: s.name,
      itemListElement: s.bullets.map((b) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: b } })),
    },
  };
};

export const breadcrumbLd = (lang: Lang, key: RouteKey, label: string) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: getT(lang).ui.breadcrumbHome, item: abs(path('home', lang)) },
    { '@type': 'ListItem', position: 2, name: label, item: abs(path(key, lang)) },
  ],
});

export const webPageLd = (lang: Lang, key: RouteKey, name: string, description: string) => ({
  '@type': 'WebPage',
  '@id': `${abs(path(key, lang))}#webpage`,
  url: abs(path(key, lang)),
  name,
  description,
  inLanguage: lang === 'es' ? 'es-ES' : 'en',
  isPartOf: { '@id': abs('/#website') },
  about: { '@id': abs('/#person') },
});

export { site };
