import type { es } from './es';

export const en: typeof es = {
  lang: 'en',
  locale: 'en_GB',
  langName: 'English',
  meta: {
    home: {
      title: 'Pau Soriano | Meta Ads Media Buyer',
      description:
        'Meta Ads management and consulting for lead generation, e-commerce and info-product businesses. Strategy, creatives and weekly optimisation. No lock-in contracts.',
    },
    gestion: {
      title: 'Meta Ads Management | Pau Soriano',
      description:
        'I run your Meta Ads end to end: strategy, creatives, landing pages, CRM and weekly optimisation. No lock-in contracts.',
    },
    consultoria: {
      title: 'Meta Ads Consulting | Pau Soriano',
      description:
        'Account audit, 1:1 sessions and direct support so you or your team can run Meta Ads with sound judgement and avoid the most common mistakes.',
    },
    privacy: {
      title: 'Privacy Policy | Pau Soriano',
      description: 'Privacy policy of pausoriano.es.',
    },
    legal: {
      title: 'Legal Notice | Pau Soriano',
      description: 'Legal notice of pausoriano.es.',
    },
  },
  ui: {
    skip: 'Skip to content',
    nav: { services: 'Services', process: 'Process', faq: 'FAQ' },
    cta: 'Book a call',
    ctaShort: 'Call',
    ctaLong: 'Book a free call',
    langSwitch: 'Change language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    back: 'Back to home',
    breadcrumbHome: 'Home',
    moreInfo: 'See the service',
    forWho: 'Who it is for',
    included: "What's included",
    lastUpdate: 'Last updated: July 2026',
    legal: 'Legal',
  },
  hero: {
    eyebrow: 'Media Buyer · Meta Ads',
    title: 'The growth partner your business needs to *really grow* with Meta Ads.',
    sub: "I don't just launch campaigns. I get inside your business to understand your customer and what makes you different. With that I build the strategy, the creatives and the acquisition system that turns paid traffic into real opportunities.",
    note: '30-minute call, no strings attached',
    tags: ['Lead generation', 'E-commerce', 'Info products'],
    funnel: ['Paid traffic', 'Qualified leads', 'Customers'],
    funnelAlt: 'Diagram: paid traffic is filtered down to qualified leads, who become customers.',
    funnelLegend: ['Not a fit', 'A fit'],
    funnelFilter: 'Filter',
    factsTitle: 'The basics',
    facts: [
      { k: 'Lock-in', v: 'None' },
      { k: 'Recommended minimum ad spend', v: '€400–500/mo' },
      { k: 'First meaningful data', v: 'Week 1–3' },
    ],
  },
  services: {
    eyebrow: 'What I do',
    title: 'Two ways of working *together*.',
  },
  ai: {
    eyebrow: 'One more thing',
    title: 'I know what you are thinking: "I\'ll just do it with AI". The problem is that *AI tells everyone the same thing*.',
    body: "Your competitors ask it the same question and get the same answer you do. AI doesn't know your business, doesn't know what makes you different, doesn't understand your essence, doesn't know your real customer or why they choose you over someone else. It has no judgement about what works in your market or which angle connects with the people you want to attract.",
    demo: {
      tag: 'Illustrative example',
      you: 'You',
      rival: 'Your competitor',
      prompt: 'Give me a Meta Ads strategy for my business.',
      answer: ['Define your target audience.', 'Create eye-catching ads.', 'Test different formats.', 'Optimise with the data.'],
      same: 'Same question. Same answer.',
    },
    punch: "We're not here to push buttons.",
    close:
      "I'm the strategic partner for your customer acquisition: I get inside, understand what you sell and build the system that turns traffic into real customers. No Artificial Intelligence does that the same way.",
  },
  compare: {
    eyebrow: 'Which one fits you?',
    title: 'Management or *consulting*.',
    cols: ['Management', 'Consulting'],
    rows: [
      { label: 'Who executes?', a: 'Me', b: 'You or your team' },
      { label: 'Strategy', a: 'Included', b: 'Included' },
      { label: 'Creatives', a: 'Included', b: 'Review and guidance' },
      { label: 'Ongoing optimisation', a: 'Weekly', b: 'With my support' },
      { label: 'Ideal if…', a: 'You want to focus on your role as a founder', b: 'You want to learn' },
    ],
  },
  process: {
    eyebrow: 'How we start',
    title: 'From first contact to *first results*.',
    steps: [
      {
        when: 'Call · Day 1',
        title: 'I get to know you',
        text: "We talk and I see whether I can help.",
        chips: ['Your business', 'Your customer', 'Your goals'],
      },
      {
        when: 'Strategy · Week 1',
        title: 'I design the plan',
        text: 'I design the strategy before spending a single euro.',
        chips: ['Strategy', 'Angles and creatives', 'Acquisition system'],
      },
      {
        when: 'Launch · Week 2',
        title: 'We launch and learn',
        text: 'We launch, measure and improve every week.',
        chips: ['Launch', 'Measurement', 'Weekly optimisation'],
      },
    ],
  },
  principles: {
    eyebrow: 'Shall we work together?',
    title: 'How I *work*.',
    items: [
      { t: 'Personal attention', d: 'I work directly with you. No middlemen, no account managers.' },
      { t: 'Tailored strategy', d: 'No templates. Every business is different and every strategy is designed from scratch.' },
      { t: 'Real results only', d: "I care about sales, leads and conversion. Not the metrics that just look good in a report." },
      { t: 'Long-term vision', d: "I'm not interested in a one-off project. I want your business to grow steadily." },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'What people *ask me most*.',
    items: [
      {
        q: 'What is the minimum budget I need for Meta Ads?',
        a: 'It depends on the business and the goal, but in general I recommend starting from €400–500 a month in ad spend so there is enough data to optimise effectively.',
      },
      {
        q: 'Do you work with lock-in contracts?',
        a: 'No. I believe results are what should keep a client working with me. There are no lock-in contracts: if you are not happy, you can leave whenever you want.',
      },
      {
        q: 'What kind of businesses do you work with?',
        a: 'Lead generation, e-commerce and info-product businesses. Before we start we have a call so I can get to know your business and make sure I can really help.',
      },
      {
        q: 'When can I start seeing results?',
        a: 'Meta Ads needs an initial learning phase. In general, the first meaningful data arrives between the first and third week. From there I optimise continuously to improve results.',
      },
      {
        q: 'What does getting started look like?',
        a: 'We start with a call to get to know your business, your goals and answer any questions. If we are a good fit, I send you a proposal and we get going.',
      },
    ],
  },
  finalCta: {
    eyebrow: 'Shall we start?',
    title: 'Book a *free* call.',
    text: 'A 30-minute call to understand your situation and see whether I can help you win more customers with Meta Ads. No strings attached, no pressure.',
    or: 'Or write to me at',
  },
  footer: {
    tagline: 'Media Buyer specialised in Meta Ads for lead generation, e-commerce and info products.',
    services: 'Services',
    legal: 'Legal',
    contact: 'Contact',
  },
  servicePages: {
    gestion: {
      kicker: 'Service 01',
      name: 'Meta Ads Management',
      title: 'Meta Ads management, *end to end*.',
      intro: 'I take care of everything. You focus on your business and I make Meta Ads really work.',
      bullets: [
        'Strategy designed for your business and the customer you want to attract',
        'Creatives and ads that connect with your customer and convert',
        'Landing pages, forms and the full user journey',
        'A system that attracts leads that fit, not just contacts',
        'Continuous optimisation to scale what works',
        'CRM with automated lead follow-up: as soon as someone fills in the form, you have them',
      ],
      forWho: 'Businesses that want a partner who thinks and executes, not just someone who launches ads.',
    },
    consultoria: {
      kicker: 'Service 02',
      name: 'Meta Ads Consulting',
      title: 'Meta Ads consulting to *run it with judgement*.',
      intro: 'I guide you so that you or your team can run campaigns with sound judgement and without the most common mistakes.',
      bullets: [
        'Account audit: structure, campaigns, creatives and measurement',
        '1:1 sessions to define strategy, priorities and next steps',
        'Review of creatives and communication angles',
        'Guidance to improve results without depending on an agency',
        'Direct support between sessions to solve day-to-day questions',
      ],
      forWho: 'Businesses that run their own campaigns and want to improve results with better judgement.',
    },
  },
  legalPages: {
    privacy: {
      title: 'Privacy Policy',
      sections: [
        {
          h: 'Data controller',
          p: ['Pau Soriano Pérez is the controller of the personal data you provide through this website. Contact: contacto@pausoriano.es'],
        },
        {
          h: 'What data we collect and why',
          p: [
            'Contact form: name, email address, phone number (if you provide it) and the information you include in your message. We use this data to answer your enquiry, assess your needs and, where appropriate, prepare a meeting or service proposal.',
            'Call booking: if you book a meeting through an external platform (such as Calendly), the appointment is handled by that provider, which processes your data under its own privacy policy.',
            'Analytics: we use web analytics tools to understand how the site is used and to improve the user experience. This data is collected in aggregate and is not used to identify you personally.',
          ],
        },
        {
          h: 'Legal basis',
          p: ['We process your personal data on the basis of your consent, given when you submit a contact form or request a meeting, and our legitimate interest in handling your requests and providing our services properly.'],
        },
        {
          h: 'Retention and recipients',
          p: [
            'We will keep your data only for as long as necessary to handle your enquiry and, where applicable, any professional or commercial relationship that may follow.',
            'We do not sell or share your personal data with third parties. However, certain technology providers we use to deliver our services (such as the web hosting provider, the booking platform or analytics tools) may process personal data as data processors.',
          ],
        },
        {
          h: 'Your rights',
          p: [
            'You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability by emailing contacto@pausoriano.es.',
            'If you believe the processing of your data does not comply with the applicable rules, you may also lodge a complaint with the Spanish Data Protection Agency (AEPD) at www.aepd.es.',
          ],
        },
      ],
    },
    legal: {
      title: 'Legal Notice',
      sections: [
        { h: 'Website owner', p: ['Pau Soriano Pérez · contacto@pausoriano.es · pausoriano.es'] },
        {
          h: 'Purpose',
          p: ['This legal notice governs the use of the website pausoriano.es, owned by Pau Soriano Pérez. Browsing this site implies full acceptance of these conditions.'],
        },
        {
          h: 'Intellectual property',
          p: ['All website content (texts, images, design and code) belongs to Pau Soriano Pérez or to third parties who have authorised its use. Total or partial reproduction without express permission is prohibited.'],
        },
        {
          h: 'Liability',
          p: ['The owner is not liable for damages arising from the use of this website or for possible errors in its content. The information published is for information purposes only.'],
        },
        {
          h: 'Applicable law',
          p: ['This legal notice is governed by Spanish law. For any dispute arising from the use of the website, the parties submit to the courts of the owner’s domicile.'],
        },
        { h: 'Contact', p: ['For any query related to this legal notice you can contact contacto@pausoriano.es.'] },
      ],
    },
  },
};
