# pausoriano.es

Web de Pau Soriano (Media Buyer · Meta Ads). Astro 7 + Tailwind 4. Estática, bilingüe (ES `/` · EN `/en/`).

```
pnpm install
pnpm dev        # desarrollo
pnpm build      # genera dist/ (HTML estático)
pnpm preview    # sirve dist/
node scripts/og.mjs   # regenera public/og.png
```

## Dónde tocar
- **Textos**: `src/i18n/es.ts` y `src/i18n/en.ts` (mismo esquema; `*palabra*` = subrayado lima).
- **Datos de contacto / Calendly / redes / URLs**: `src/i18n/index.ts` (`site`, `routes`).
- **SEO global y JSON-LD**: `src/layouts/Base.astro` y `src/i18n/schema.ts`.
- **Secciones**: `src/components/*.astro`; plantillas de página en `src/components/pages/`.
- **Colores y tipografías**: `@theme` en `src/styles/global.css`.

## Pendiente antes de publicar
- Confirmar con Pau: textos legales (el EN es traducción), Calendly, redes.
- Analítica / píxel de Meta con banner de cookies (la web actual no carga ninguno desde el HTML).
- Redirecciones 301 desde las URLs antiguas del WordPress (posts/categorías) si tienen tráfico.
- Casos de éxito / testimonios / foto de Pau: no hay material todavía.
