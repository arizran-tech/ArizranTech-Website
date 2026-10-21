'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Dark theme is the default; returning visitors may keep their previously chosen light or dark preference.
const themeButton = $('#theme-toggle');
try {
  const savedTheme = localStorage.getItem('arizran-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
} catch { /* Browser storage is optional. */ }
function syncThemeLabel() {
  const light = document.documentElement.dataset.theme === 'light';
  themeButton?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  themeButton?.setAttribute('title', `Switch to ${light ? 'dark' : 'light'} theme`);
  $('meta[name="theme-color"]')?.setAttribute('content', light ? '#f6f8fc' : '#0a1020');
}
syncThemeLabel();
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('arizran-theme', next); } catch { /* Optional. */ }
  syncThemeLabel();
});

// Mobile navigation.
const mobileToggle = $('#menu-toggle');
const nav = $('#nav');
function closeMenu() {
  nav?.classList.remove('open');
  mobileToggle?.setAttribute('aria-expanded', 'false');
  mobileToggle?.setAttribute('aria-label', 'Open navigation');
}
mobileToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
$$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 940) closeMenu(); });

// Scroll position marker.
const progress = $('#scroll-progress');
function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0})`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

// Reveal blocks as they enter the viewport. No blank content if IntersectionObserver is unavailable.
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('has-js');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.045, rootMargin: '0px 0px 40px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
}

// Subtle desktop parallax for the hero cards.
const heroVisual = $('#hero-visual');
if (heroVisual && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', event => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    $$('.float-card', heroVisual).forEach(el => {
      const amount = Number(el.dataset.depth) || 10;
      el.style.translate = `${(-x * amount).toFixed(1)}px ${(-y * amount).toFixed(1)}px`;
    });
  });
  heroVisual.addEventListener('pointerleave', () => {
    $$('.float-card', heroVisual).forEach(el => { el.style.translate = ''; });
  });
}

// Before / After – only one panel visible at a time.
const beforeAfter = $('#before-after');
$$('[data-state]', beforeAfter).forEach(button => {
  button.addEventListener('click', () => {
    const state = button.dataset.state;
    $$('[data-state]', beforeAfter).forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    $$('[data-ba]', beforeAfter).forEach(panel => { panel.hidden = panel.dataset.ba !== state; });
  });
});

// Digital-creative preview; all three formats are rendered with CSS, not claimed client work.
const creativeLabels = { poster: '01 — POSTERS', reel: '02 — AI REELS', campaign: '03 — META AD CREATIVE' };
$$('[data-creative]').forEach(button => {
  button.addEventListener('click', () => {
    const choice = button.dataset.creative;
    $$('[data-creative]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('selected', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    $$('[data-scene]').forEach(scene => { scene.hidden = scene.dataset.scene !== choice; });
    $('#preview-index').textContent = creativeLabels[choice];
  });
});

// Interactive process overview. No camera, filming or in-house production stages.
const processSteps = [
  { label: 'START WITH THE WHY', title: 'Discover your needs.', description: 'We discuss your business, audience, goals and what you actually need from your website, application or campaign.', keywords: ['Goals', 'Audience', 'Requirements'] },
  { label: 'MAKE A CLEAR PLAN', title: 'Plan the right solution.', description: 'We decide on scope, features, timelines, content needs and the most suitable digital approach for your budget.', keywords: ['Scope', 'Features', 'Priorities'] },
  { label: 'TURN IDEAS INTO DIGITAL', title: 'Design and build.', description: 'We create the agreed website, web app, SEO improvements or campaign creatives, refining the details as we go.', keywords: ['Design', 'Development', 'Creative assets'] },
  { label: 'READY TO GO LIVE', title: 'Launch with care.', description: 'We check essential details, prepare the handover and publish the site or launch the agreed campaign.', keywords: ['Final checks', 'Publishing', 'Handover'] },
  { label: 'LEARN AND REFINE', title: 'Review and improve.', description: 'Where ongoing support is included, we look at performance, feedback and opportunities for practical improvements.', keywords: ['Feedback', 'SEO', 'Optimisation'] }
];
$$('[data-step]').forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.step);
    const step = processSteps[index];
    if (!step) return;
    $$('[data-step]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    $('#process-number').textContent = String(index + 1).padStart(2, '0');
    $('#process-label').textContent = step.label;
    $('#process-title').textContent = step.title;
    $('#process-description').textContent = step.description;
    $('#process-keywords').replaceChildren(...step.keywords.map(word => {
      const span = document.createElement('span'); span.textContent = word; return span;
    }));
    $('#process-progress-fill').style.width = `${((index + 1) / processSteps.length) * 100}%`;
  });
});

// Filter the live website projects.
$$('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('[data-filter]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    $$('.project-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  });
});

// GA4: measure WhatsApp link clicks without sending customer information.
function trackWhatsAppClick(source, serviceName = '') {
  if (typeof window.gtag !== 'function') return;
  const parameters = {
    link_location: source,
    page_path: window.location.pathname
  };
  if (serviceName) parameters.service_name = serviceName;
  window.gtag('event', 'whatsapp_click', parameters);
}

// Handles floating buttons, footer links and other regular WhatsApp links.
document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  let target;
  try { target = new URL(link.href, window.location.href); } catch { return; }
  if (!['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(target.hostname)) return;

  const source = link.classList.contains('floating-whatsapp') ? 'floating_button'
    : link.closest('footer') ? 'footer_link'
    : link.closest('#contact') ? 'contact_link'
    : link.closest('.sp-cta') ? 'service_cta'
    : 'other_whatsapp_link';
  trackWhatsAppClick(source);
});

// Build an encoded WhatsApp message; form contents are not posted to a server.
const contactForm = $('#contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const values = new FormData(contactForm);
  const get = key => String(values.get(key) || '').trim();
  const message = [
    'Hi Arizran Tech, I would like to discuss a project.',
    '',
    `Name: ${get('name')}`,
    `Business: ${get('business') || 'Not provided'}`,
    `Phone: ${get('phone') || 'Not provided'}`,
    `Email: ${get('email') || 'Not provided'}`,
    `Service: ${get('service')}`,
    '',
    'Project details:',
    get('message')
  ].join('\n');
  const url = 'https://wa.me/917034540528?text=' + encodeURIComponent(message);
  // Use a real anchor so noopener does not cause a false blocked-popup fallback.
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  // This detached link does not bubble to the document click listener.
  trackWhatsAppClick('enquiry_form', get('service'));
  link.click();
});
// Show the back-to-top shortcut once visitors have scrolled down.
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
  if (backToTop) backToTop.hidden = window.scrollY < 370;
}
backToTop?.addEventListener('click', event => {
  event.preventDefault();
  window.scrollTo({top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth'});
});
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
$('#year').textContent = String(new Date().getFullYear());
