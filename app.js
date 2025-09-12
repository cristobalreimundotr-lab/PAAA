// ===== Config =====
const BRAND_NAME = 'Family Brothers';
const PHONE_E164 = '+56973706611'; // WhatsApp / Teléfono oficial
const WHATS_TEXT_DEFAULT = encodeURIComponent('Hola, quiero cotizar la venta de mi propiedad.');

// Branding dinámico
document.getElementById('brandName') && (document.getElementById('brandName').textContent = BRAND_NAME);
document.getElementById('brandNameFoot') && (document.getElementById('brandNameFoot').textContent = BRAND_NAME);
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// WhatsApp & Tel en contacto (no en header)
(function(){
  const whatsURL = `https://wa.me/${PHONE_E164.replace('+','')}?text=${WHATS_TEXT_DEFAULT}`;
  const btns = ['whatsBtn','calcWhats'];
  btns.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.setAttribute('href', whatsURL);
  });
  const phoneLink = document.getElementById('phoneLink');
  if (phoneLink){
    phoneLink.setAttribute('href', `tel:${PHONE_E164}`);
    phoneLink.textContent = '+56 9 7370 6611';
  }
})();

// ===== Header sombra on scroll =====
(function(){
  const h = document.querySelector('header');
  if(!h) return;
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
})();

// ===== Reveal on scroll =====
(function setupReveal(){
  const targets = document.querySelectorAll('.reveal');
  const showAll = () => targets.forEach(el => el.classList.add('visible'));
  try {
    if (!('IntersectionObserver' in window)) { showAll(); return; }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    targets.forEach(el => io.observe(el));
    setTimeout(showAll, 1200);
  } catch { showAll(); }
})();

// ===== KPI counter (50 / 3 / 5) =====
(function animateCounters(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nums = document.querySelectorAll('.kpi-num');
  if(!nums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.count || 0) || 0;
      if (prefersReduced) { el.textContent = end; io.unobserve(el); return; }

      let cur = 0;
      const step = Math.max(1, Math.ceil(end/40));
      const t = setInterval(()=>{
        cur += step; if(cur>=end){cur=end; clearInterval(t);}
        el.textContent = String(cur);
      }, 25);
      io.unobserve(el);
    })
  }, {threshold:.45});
  nums.forEach(n => io.observe(n));
})();

// ===== FAQ accordion =====
document.querySelectorAll('.ac-item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const panel = btn.nextElementSibling;
    panel.classList.toggle('open', !expanded);
  });
});

// ===== Calculadora CLP (1% + IVA 19%) =====
(function setupCalc(){
  const precioCLP   = document.getElementById('precioCLP');
  const baseOut     = document.getElementById('comisionBase');
  const ivaOut      = document.getElementById('comisionIVA');
  const totalOut    = document.getElementById('comisionTotal');
  const calcWhats   = document.getElementById('calcWhats');

  if(!precioCLP || !baseOut || !ivaOut || !totalOut) return;

  const PCT = 0.01;  // 1%
  const IVA = 0.19;  // 19%

  const formatCLP = n => n.toLocaleString('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0});
  const parseCLP  = str => {
    const digits = (str||'').toString().replace(/\D+/g,'');
    return digits ? Number(digits) : 0;
  };

  function calc(){
    const precio = parseCLP(precioCLP.value);
    const base = Math.round(precio * PCT);
    const iva  = Math.round(base * IVA);
    const total = base + iva;

    baseOut.textContent  = formatCLP(base);
    ivaOut.textContent   = formatCLP(iva);
    totalOut.textContent = formatCLP(total);

    if(calcWhats){
      const msg = encodeURIComponent(
        `Hola, quiero cotizar.\n` +
        `Precio de venta: ${formatCLP(precio)}\n` +
        `Comisión: 1% + IVA 19% → ${formatCLP(total)} (paga el vendedor).`
      );
      calcWhats.setAttribute('href', `https://wa.me/${PHONE_E164.replace('+','')}?text=${msg}`);
    }
  }

  function formatOnInput(e){
    const raw = parseCLP(e.target.value);
    e.target.value = raw ? formatCLP(raw).replace(/\$\s?/, '') : '';
    calc();
  }

  precioCLP.addEventListener('input', formatOnInput, { passive:true });
  precioCLP.addEventListener('blur', calc, { passive:true });

  // valores iniciales
  precioCLP.value = '350000000';
  formatOnInput({ target: precioCLP });
  calc();
})();

// ===== Formulario (FormSubmit feedback & _next) =====
(function(){
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if(!form) return;

  const nextField = document.getElementById('nextField');
  if(nextField){
    const nextUrl = location.origin + location.pathname + '?enviado=1#contacto';
    nextField.value = nextUrl;
  }

  form.addEventListener('submit', ()=>{ if(formMsg) formMsg.textContent = 'Enviando…'; });

  const params = new URLSearchParams(location.search);
  if(params.get('enviado') === '1'){
    if(formMsg) formMsg.textContent = '¡Gracias! Recibimos tu mensaje. Te responderemos en minutos.';
    history.replaceState({}, '', location.pathname + '#contacto');
  }
})();
