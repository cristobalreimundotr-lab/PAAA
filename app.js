// ===== CONFIGURACIÓN =====
const CONFIG = {
  BRAND_NAME: 'FamilyBrothers',
  PHONE_E164: '+56933857105',
  WHATSAPP_MESSAGE: 'Hola, quiero cotizar la venta de mi propiedad.',
  COMISION_PCT: 0.02,
  IVA_PCT: 0.19
};

// ===== UTILIDADES =====
const formatCLP = (n) => {
  return n.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });
};

const parseCLP = (str) => {
  const digits = (str || '').toString().replace(/\D+/g, '');
  return digits ? Number(digits) : 0;
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeader();
  initNavigation();
  initReveal();
  initCounters();
  initCalculator();
  initFAQ();
  initWhatsApp();
  initForm();
  initSmoothScroll();
});

// ===== AÑO EN FOOTER =====
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ===== HEADER SCROLL =====
function initHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;
  
  let lastScroll = 0;
  
  const handleScroll = () => {
    const currentScroll = window.scrollY;
    
    // Sombra al hacer scroll
    header.classList.toggle('scrolled', currentScroll > 50);
    
    // Ocultar/mostrar en móvil al scrollear hacia abajo
    if (window.innerWidth <= 768) {
      if (currentScroll > lastScroll && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ===== NAVEGACIÓN MÓVIL =====
function initNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const siteNav = document.getElementById('siteNav');
  
  if (!menuBtn || !siteNav) return;
  
  const toggleMenu = () => {
    const isOpen = siteNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  
  menuBtn.addEventListener('click', toggleMenu);
  
  // Cerrar al hacer click en un link
  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      toggleMenu();
    }
  });
}

// ===== ANIMACIÓN REVEAL =====
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
  const counters = document.querySelectorAll('.kpi-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        el.textContent = current;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target;
        }
      };
      
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ===== CALCULADORA =====
function initCalculator() {
  const precioInput = document.getElementById('precioCLP');
  const baseOut = document.getElementById('comisionBase');
  const ivaOut = document.getElementById('comisionIVA');
  const totalOut = document.getElementById('comisionTotal');
  const ahorroOut = document.getElementById('ahorroValor');
  const calcWhats = document.getElementById('calcWhats');
  const quickBtns = document.querySelectorAll('.quick-btn');
  
  if (!precioInput) return;
  
  const calculate = () => {
    const precio = parseCLP(precioInput.value);
    const base = Math.round(precio * CONFIG.COMISION_PCT);
    const iva = Math.round(base * CONFIG.IVA_PCT);
    const total = base + iva;
    const ahorro = Math.round(precio * 0.04) - total; // Diferencia vs 4%
    
    // Animar valores
    animateValue(baseOut, base);
    animateValue(ivaOut, iva);
    animateValue(totalOut, total);
    animateValue(ahorroOut, ahorro);
    
    // Actualizar WhatsApp
    if (calcWhats) {
      const message = encodeURIComponent(
        `Hola, quiero cotizar la venta de mi propiedad.\n\n` +
        `💰 Precio: ${formatCLP(precio)}\n` +
        `📊 Comisión 2% + IVA: ${formatCLP(total)}\n` +
        `💡 Ahorro vs 4%: ${formatCLP(ahorro)}`
      );
      calcWhats.href = `https://wa.me/${CONFIG.PHONE_E164.replace('+', '')}?text=${message}`;
    }
  };
  
  const animateValue = (el, value) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = formatCLP(value).replace('$', '$ ');
      el.style.opacity = '1';
    }, 150);
  };
  
  // Formato en tiempo real
  precioInput.addEventListener('input', (e) => {
    const raw = parseCLP(e.target.value);
    if (raw > 0) {
      e.target.value = formatCLP(raw).replace(/\$\s?/, '').replace(/\s/g, '.');
    }
    calculate();
  });
  
  // Botones rápidos
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      precioInput.value = formatCLP(Number(value)).replace(/\$\s?/, '').replace(/\s/g, '.');
      calculate();
      
      // Efecto visual
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => btn.style.transform = '', 150);
    });
  });
  
  // Valor inicial
  precioInput.value = '350.000.000';
  calculate();
}

// ===== FAQ ACCORDION =====
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      
      // Cerrar todos los demás
      items.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-answer').classList.remove('active');
        }
      });
      
      // Toggle actual
      question.setAttribute('aria-expanded', !isOpen);
      answer.classList.toggle('active', !isOpen);
    });
  });
}

// ===== WHATSAPP LINKS =====
function initWhatsApp() {
  const whatsUrl = `https://wa.me/${CONFIG.PHONE_E164.replace('+', '')}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
  
  ['whatsBtn', 'calcWhats'].forEach(id => {
    const el = document.getElementById(id);
    if (el && id !== 'calcWhats') el.href = whatsUrl;
  });
  
  const phoneLink = document.getElementById('phoneLink');
  if (phoneLink) {
    phoneLink.href = `tel:${CONFIG.PHONE_E164}`;
    phoneLink.textContent = '+56 9 7370 6611';
  }
}

// ===== FORMULARIO =====
function initForm() {
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  const nextField = document.getElementById('nextField');
  
  if (!form) return;
  
  // Configurar URL de retorno
  if (nextField) {
    const returnUrl = `${window.location.origin}${window.location.pathname}?enviado=1#contacto`;
    nextField.value = returnUrl;
  }
  
  // Enviar
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Enviando...</span>';
    
    if (formMsg) {
      formMsg.textContent = 'Enviando tu solicitud...';
      formMsg.className = 'form-message';
    }
  });
  
  // Mensaje de éxito
  const params = new URLSearchParams(window.location.search);
  if (params.get('enviado') === '1') {
    if (formMsg) {
      formMsg.textContent = '¡Gracias! Recibimos tu mensaje. Te contactaremos en menos de 5 minutos.';
      formMsg.className = 'form-message success';
    }
    
    // Limpiar URL
    window.history.replaceState({}, '', window.location.pathname + '#contacto');
    
    // Scroll al mensaje
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== EFECTOS ADICIONALES =====
// Parallax suave en hero
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}