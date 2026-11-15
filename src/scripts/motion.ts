/**
 * Movimiento del sitio: Lenis (scroll lento) + GSAP/ScrollTrigger/SplitText.
 *
 * Reglas para que no se rompa en móvil:
 *  - Lenis solo en dispositivos con puntero fino (ratón). En táctil el scroll es el nativo.
 *  - ScrollTrigger con ignoreMobileResize (la barra del navegador no dispara refrescos).
 *  - Nada de pin ni de scrub pesado en móvil: solo revelados y un scrub de opacidad.
 *  - prefers-reduced-motion: no se anima nada, todo visible.
 *  - Si algo falla, se revierten los splits y se muestra todo (`.no-motion`).
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

(window as any).__motion = true;

const root = document.documentElement;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, ctx: ParentNode = document) =>
  Array.from(ctx.querySelectorAll<T>(sel));

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const failsafe = root.classList.contains('no-motion'); // el JS llegó tarde: ya se mostró todo

let lenis: Lenis | null = null;
const splits: SplitText[] = [];

/* ───────────── UI que no depende del movimiento ───────────── */

function initUi() {
  // CTA fijo en móvil: aparece tras el hero y se retira al llegar al CTA final
  const bar = document.getElementById('sticky-cta');
  const end = document.getElementById('cta-final');
  if (bar) {
    const update = () => {
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      const show = window.scrollY > 520 && !nearEnd;
      bar.classList.toggle('translate-y-full', !show);
      if (show) bar.removeAttribute('inert');
      else bar.setAttribute('inert', '');
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Indicador de los carruseles táctiles
  $$('[data-snap]').forEach((list) => {
    const dots = list.parentElement?.querySelectorAll<HTMLElement>('.snap-dots span');
    if (!dots || !dots.length) return;
    const items = Array.from(list.children) as HTMLElement[];
    let raf = 0;
    const update = () => {
      raf = 0;
      const lr = list.getBoundingClientRect();
      const mid = lr.left + lr.width / 2;
      let best = 0;
      let bestD = Infinity;
      items.forEach((it, i) => {
        const r = it.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      dots.forEach((d, i) => (d.dataset.on = i === best ? '1' : '0'));
    };
    list.addEventListener('scroll', () => !raf && (raf = requestAnimationFrame(update)), { passive: true });
    update();
  });

  // Menú móvil
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const inertTargets = [document.getElementById('main'), document.querySelector('footer')] as (HTMLElement | null)[];
  const setMenu = (open: boolean) => {
    if (!btn || !menu) return;
    root.toggleAttribute('data-menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', (open ? btn.dataset.labelClose : btn.dataset.labelOpen) || '');
    if (open) menu.removeAttribute('inert');
    else menu.setAttribute('inert', '');
    inertTargets.forEach((el) => el && (el.inert = open));
    if (open) lenis?.stop();
    else lenis?.start();
  };
  btn?.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.hasAttribute('data-menu-open')) {
      setMenu(false);
      btn?.focus();
    }
  });
  matchMedia('(min-width: 768px)').addEventListener('change', (e) => e.matches && setMenu(false));

  // Anclas internas: scroll suave con offset por la cabecera (Lenis si existe; si no, el nativo)
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!a || a.target || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname !== location.pathname || u.hash.length < 2) return;
    if (u.hash === '#main') return;
    const el = document.getElementById(decodeURIComponent(u.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    if (root.hasAttribute('data-menu-open')) setMenu(false);
    if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.8 });
    else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.pushState(null, '', u.hash);
  });

  // El embudo SVG (SMIL) se pausa fuera de pantalla: ahorra batería en móvil
  const svg = document.querySelector<SVGSVGElement>('[data-parallax] svg');
  if (svg && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => (en.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations())).observe(svg);
  }
}

/* ───────────── Helpers de GSAP ───────────── */

/** Ejecuta fn una sola vez cuando el elemento cruza `start` (también si la página carga ya más abajo). */
function once(trigger: Element, start: string, fn: () => void) {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    fn();
  };
  ScrollTrigger.create({ trigger, start, onEnter: go, onRefresh: (self) => self.progress > 0 && go() });
}

const split = (el: HTMLElement, mask: boolean) => {
  const s = SplitText.create(el, { type: 'words', wordsClass: 'sw', ...(mask ? { mask: 'words' as const } : {}) });
  splits.push(s);
  return s;
};

const wide = () => matchMedia('(min-width: 1024px)').matches;

/* ───────────── Piezas ───────────── */

function smoothScroll() {
  if (!finePointer) return;
  lenis = new Lenis({
    duration: 1.5, // más largo = scroll más lento y con inercia
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.85,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.addEventListener('refresh', () => lenis?.resize());
}

function hero() {
  const els = $$('[data-hero]').sort((a, b) => Number(a.dataset.hero) - Number(b.dataset.hero));
  if (!els.length) return gsap.timeline();
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.05 });
  els.forEach((el, i) => {
    if (el.tagName === 'H1') {
      const marks = $$('mark.hl', el);
      const s = split(el, true);
      gsap.set(s.words, { yPercent: 108 });
      gsap.set(el, { opacity: 1 });
      if (marks.length) gsap.set(marks, { backgroundSize: '0% 100%' });
      tl.to(s.words, { yPercent: 0, duration: 1.15, stagger: 0.07, ease: 'power4.out' }, 0.1);
      if (marks.length) tl.to(marks, { backgroundSize: '100% 100%', duration: 0.9, ease: 'power2.out', stagger: 0.2 }, 0.95);
    } else {
      tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.95 }, 0.35 + i * 0.12);
    }
  });

  // Embudo: se dibujan las paredes, entra el filtro, las etiquetas y, al final, los puntos
  const fig = document.querySelector('[data-parallax] svg');
  if (fig) {
    const walls = $$('.fn-wall', fig as unknown as HTMLElement);
    gsap.set(walls, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set('.fn-bar', { scaleX: 0, svgOrigin: '120 250' });
    gsap.set('.fn-label', { opacity: 0, x: 16 });
    gsap.set('.fn-live', { opacity: 0 });
    gsap.set('.fn-client', { scale: 0, svgOrigin: '120 478' });
    tl.to(walls, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0.7)
      .to('.fn-bar', { scaleX: 1, duration: 0.8, ease: 'power3.out' }, 1.5)
      .to('.fn-label', { opacity: 1, x: 0, duration: 0.8, stagger: 0.15 }, 1.4)
      .to('.fn-client', { scale: 1, duration: 0.7, ease: 'back.out(2.5)' }, 2)
      .to('.fn-live', { opacity: 1, duration: 0.8 }, 2.1);
  }
  return tl;
}

function headings() {
  $$('main h2').forEach((h) => {
    if (h.closest('[data-hero]')) return;
    const marks = $$('mark.hl', h).filter((m) => !m.closest('.on-ink'));
    const s = split(h, true);
    gsap.set(s.words, { yPercent: 108 });
    if (marks.length) gsap.set(marks, { backgroundSize: '0% 100%' });
    once(h, 'top 88%', () => {
      gsap.to(s.words, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.05 });
      if (marks.length) gsap.to(marks, { backgroundSize: '100% 100%', duration: 0.85, ease: 'power2.out', delay: 0.5 });
    });
  });
}

function reveals() {
  const dist = wide() ? 44 : 22;
  let queue: HTMLElement[] = [];
  let raf = 0;
  const flush = () => {
    raf = 0;
    const batch = queue;
    queue = [];
    gsap.to(batch, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.09 });
  };
  $$('[data-reveal]').forEach((el) => {
    gsap.set(el, { y: dist });
    once(el, 'top 92%', () => {
      queue.push(el);
      if (!raf) raf = requestAnimationFrame(flush); // los que entran a la vez salen en cascada
    });
  });
}

/** Párrafo que se ilumina palabra a palabra con el scroll (solo opacidad: barato también en móvil). */
function scrubWords() {
  $$('[data-scrub]').forEach((p) => {
    const s = split(p, false);
    gsap.set(s.words, { opacity: 0.28 });
    gsap.to(s.words, {
      opacity: 1,
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 55%', scrub: true },
    });
  });
}

/** La demostración de la IA: dos paneles, la misma pregunta, la misma respuesta. */
function demo() {
  const root_ = document.querySelector<HTMLElement>('[data-demo]');
  if (!root_) return;
  const cards = $$('[data-demo-card]', root_);
  const qs = $$('[data-demo-q]', root_);
  const lis = $$('[data-demo-a] li', root_);
  const eq = $$('[data-demo-eq]', root_);
  const same = $$('[data-demo-same]', root_);
  gsap.set(cards, { opacity: 0, y: 36 });
  gsap.set(qs, { opacity: 0, y: 10, scale: 0.96, transformOrigin: '100% 50%' });
  gsap.set(lis, { opacity: 0, x: -10 });
  gsap.set(eq, { opacity: 0, scale: 0.4 });
  gsap.set(same, { opacity: 0, y: 14 });
  once(root_, 'top 72%', () => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .to(cards, { opacity: 1, y: 0, duration: 0.9, stagger: 0.14 })
      .to(qs, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.14 }, '-=0.45')
      .to(lis, { opacity: 1, x: 0, duration: 0.5, stagger: 0.16 }, '-=0.1')
      .to(eq, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(3)' }, '-=0.35')
      .to(same, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');
  });
}

/** Los números gigantes del proceso se rellenan de lima al llegar. */
function numerals() {
  $$('.proc-num').forEach((n, i) => {
    once(n, 'top 82%', () => gsap.to(n, { color: '#d9f56e', duration: 0.9, delay: i * 0.12, ease: 'power2.out' }));
  });
}

/** Banda de verticales: va sola y se acelera con la velocidad del scroll. */
function marquee() {
  const track = document.querySelector<HTMLElement>('.marquee-track');
  if (!track) return;
  const tween = gsap.to(track, { xPercent: -50, duration: 42, ease: 'none', repeat: -1 });
  if (!finePointer) return;
  let boost = 0;
  ScrollTrigger.create({ onUpdate: (self) => (boost = Math.min(Math.abs(self.getVelocity()) / 500, 5)) });
  gsap.ticker.add(() => {
    boost *= 0.93;
    tween.timeScale(1 + boost);
  });
}

function progress() {
  gsap.to('#progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });
}

/** Solo escritorio: profundidad con parallax suave. */
function parallax() {
  $$('[data-parallax]').forEach((el) => {
    const [a, b] = (el.dataset.parallax || '0,0').split(',').map(Number);
    gsap.fromTo(
      el,
      { yPercent: a },
      {
        yPercent: b,
        ease: 'none',
        scrollTrigger: {
          trigger: (el.closest('section, footer') as HTMLElement) || el,
          start: el.dataset.pstart || 'top bottom',
          end: el.dataset.pend || 'bottom top',
          scrub: 0.6,
        },
      },
    );
  });
}

/** Solo escritorio: el CTA principal del hero "tira" ligeramente del cursor. */
function magnet() {
  $$('[data-hero] .btn-primary').forEach((b) => {
    b.style.transition = 'background-color .25s, color .25s, border-color .25s'; // sin transición de transform: manda GSAP
    const x = gsap.quickTo(b, 'x', { duration: 0.6, ease: 'power3' });
    const y = gsap.quickTo(b, 'y', { duration: 0.6, ease: 'power3' });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.22);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    b.addEventListener('pointerleave', () => {
      x(0);
      y(0);
    });
  });
}

/* ───────────── Arranque ───────────── */

async function init() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
  smoothScroll();

  // Dividir texto con la tipografía ya cargada, o los saltos de línea saldrían distintos
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 700))]);

  try {
    hero();
    headings();
    reveals();
    scrubWords();
    demo();
    numerals();
    marquee();
    progress();
    gsap.matchMedia().add('(min-width: 1024px) and (hover: hover)', () => {
      parallax();
      magnet();
    });
    ScrollTrigger.refresh();
  } catch (err) {
    console.error('[motion]', err);
    splits.forEach((s) => s.revert());
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.killTweensOf('*');
    $$('[data-demo] *, [data-hero], [data-reveal], .fn-wall, .fn-bar, .fn-label, .fn-live, .fn-client').forEach((el) => el.removeAttribute('style'));
    root.classList.add('no-motion');
  }
}

initUi();
if (reduce || failsafe) {
  root.classList.add('no-motion');
} else {
  void init();
}
