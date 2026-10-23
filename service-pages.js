'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// First-time visitors see dark; previously selected theme is remembered.
try { const saved = localStorage.getItem('arizran-theme-v2'); if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved; } catch {}
const themeButton = $('#theme-toggle');
function syncTheme() { const light = document.documentElement.dataset.theme !== 'dark'; themeButton?.setAttribute('aria-label', 'Switch to '+(light?'dark':'light')+' theme'); $('meta[name="theme-color"]')?.setAttribute('content',light?'#f6f8fc':'#0a1020'); }
syncTheme();
themeButton?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('arizran-theme-v2',next)}catch{}syncTheme()});
const nav=$('#nav'),menu=$('#menu-toggle');
function closeMenu(){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation')}
menu?.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
$$('#nav a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
window.addEventListener('resize',()=>{if(innerWidth>1150)closeMenu()});
const progress=$('#scroll-progress'),back=$('#back-to-top');
function update(){let max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,scrollY/max)):0)+')';if(back)back.hidden=scrollY<370}
window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
back?.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,left:0,behavior:reduced?'auto':'smooth'})});
if(!reduced&&'IntersectionObserver' in window){document.documentElement.classList.add('has-js');let ob=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in-view');ob.unobserve(x.target)}}),{threshold:.05,rootMargin:'0px 0px 50px 0px'});$$('.reveal').forEach(x=>ob.observe(x))}
const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());

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
