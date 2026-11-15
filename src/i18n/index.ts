import { es } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';
export const languages = { es, en } as const;

export const site = {
  url: 'https://pausoriano.es',
  name: 'Pau Soriano',
  email: 'contacto@pausoriano.es',
  calendly: 'https://calendly.com/pausoriano555/30min',
  instagram: 'https://www.instagram.com/pausoriaanoo_/',
  linkedin: 'https://www.linkedin.com/in/pau-soriano-pérez-b41029374',
};

export const routes = {
  home: { es: '/', en: '/en/' },
  gestion: { es: '/servicios/gestion-meta-ads/', en: '/en/services/meta-ads-management/' },
  consultoria: { es: '/servicios/consultoria-meta-ads/', en: '/en/services/meta-ads-consulting/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  legal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
} as const;
export type RouteKey = keyof typeof routes;

export const getT = (lang: Lang) => languages[lang];
export const path = (key: RouteKey, lang: Lang) => routes[key][lang];
export const abs = (p: string) => new URL(p, site.url).toString();
export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** *texto* → <mark class="hl">texto</mark> (rotulador lima). Solo para textos propios del repo. */
export const fmt = (s: string) => s.replace(/\*(.+?)\*/g, '<mark class="hl">$1</mark>');
/** Quita los asteriscos para usar el texto como texto plano (JSON-LD, alt, etc.). */
export const plain = (s: string) => s.replace(/\*/g, '');
