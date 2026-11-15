// Genera public/og.png (1200x630) con sharp. Uso: node scripts/og.mjs
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#ffffff"/>
<circle cx="1040" cy="90" r="260" fill="#2f6fe4" opacity=".12"/>
<text x="80" y="110" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#0f1d3d">pau<tspan font-family="Georgia,serif" font-style="italic" font-weight="400">soriano</tspan></text>
<text x="80" y="290" font-family="Helvetica,Arial,sans-serif" font-size="84" font-weight="600" letter-spacing="-3" fill="#0f1d3d">Media Buyer</text>
<text x="80" y="390" font-family="Georgia,serif" font-style="italic" font-size="96" fill="#2f6fe4">de Meta Ads</text>
<text x="80" y="500" font-family="Helvetica,Arial,sans-serif" font-size="30" fill="#555e70">Lead generation · E-commerce · Infoproductos</text>
<text x="80" y="560" font-family="Helvetica,Arial,sans-serif" font-size="26" fill="#7a8494">pausoriano.es</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og.png', import.meta.url).pathname);
console.log('og.png ok');
