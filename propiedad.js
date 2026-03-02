/* =========================================================
   propiedad.js — CON GOOGLE SHEETS INTEGRATION
   Guarda leads en spreadsheet y abre WhatsApp
   ========================================================= */

// ===== CONFIGURACIÓN =====
const CONFIG = {
  // ⚠️ REEMPLAZA CON TU URL DE GOOGLE APPS SCRIPT
  SHEETS_ENDPOINT: 'https://script.google.com/macros/s/AKfycbxMCVqhCtcClNbX8OQVOmHFL4xkZmjT_7i7rbMS7JHOfr1kFYXX78zUwPGCO4XFQA/exec',
  
  // Número de WhatsApp (sin +, solo país+número)
  WHATSAPP_NUMBER: '56973706611',
  
  // ID de propiedad desde URL
  getPropertyId() {
    return new URLSearchParams(location.search).get('id') || 'FB-STGO-001';
  }
};

// ===== DATOS DE PROPIEDADES =====
const PROPERTIES = {
  'FB-STGO-001': {
    titulo: 'Departamento 2D/2B — San Francisco 335',
    comuna: 'Santiago Centro',
    direccion: 'San Francisco 335',
    precio: '$50.000.000',
    precioUF: 'UF 3.850',
    dormitorios: 2,
    banos: 2,
    mtUtil: 48,
    mtTotal: 52,
    estacionamiento: false,
    bodega: false,
    descripcion: 'Departamento con excelente conectividad en Santiago Centro. Ideal para inversión o primera vivienda. Ubicado a pasos de Metro Parque Almagro y cercano a universidades, supermercados y servicios. Alta demanda de arriendo en el sector.',
    fotos: [
      'images/props/fb-stgo-001/01.jpg',
      'images/props/fb-stgo-001/02.jpg',
      'images/props/fb-stgo-001/03.jpg',
      'images/props/fb-stgo-001/04.jpg',
      'images/props/fb-stgo-001/05.jpg'
    ],
    mapsQuery: 'San Francisco 335, Santiago, Chile',
    agente: 'Cristóbal Reimundo',
    telefonoAgente: '+56 9 7370 6611'
  }
};

// ===== UTILIDADES =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function getCurrentTimestamp() {
  return new Date().toLocaleString('es-CL', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ===== GOOGLE SHEETS INTEGRATION =====
async function saveLeadToSheets(data) {
  try {
    const response = await fetch(CONFIG.SHEETS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Importante para CORS con Google Apps Script
      mode: 'cors',
      cache: 'no-cache'
    });

    // Google Apps Script devuelve texto plano o JSON
    const text = await response.text();
    let result;
    
    try {
      result = JSON.parse(text);
    } catch (e) {
      // Si no es JSON, asumimos éxito si el status es 200
      result = { 
        success: response.ok, 
        message: text,
        raw: text 
      };
    }

    return {
      success: result.success || result.status === 'success' || response.ok,
      data: result
    };

  } catch (error) {
    console.error('Error guardando en Sheets:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ===== WHATSAPP =====
function buildWhatsAppMessage(property, leadData = null) {
  let message = `Hola, quiero agendar visita para:\n\n`;
  message += `🏠 *${property.titulo}*\n`;
  message += `📍 ${property.direccion}, ${property.comuna}\n`;
  message += `💰 Precio: ${property.precio} (${property.precioUF})\n`;
  
  if (leadData) {
    message += `\n👤 *Mis datos:*\n`;
    message += `Nombre: ${leadData.nombre}\n`;
    message += `Teléfono: ${leadData.telefono}\n`;
    if (leadData.email) message += `Email: ${leadData.email}\n`;
    message += `Fecha preferida: ${formatDate(leadData.fecha_visita)} ${leadData.horario}\n`;
    if (leadData.mensaje) message += `Mensaje: ${leadData.mensaje}\n`;
  }
  
  message += `\n📎 ${location.href}`;
  
  return encodeURIComponent(message);
}

function openWhatsApp(property, leadData = null) {
  const message = buildWhatsAppMessage(property, leadData);
  const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ===== MODAL =====
function initModal() {
  const modal = $('#modalOverlay');
  const openBtns = $$('#btnAgendar, #btnSidebar');
  const closeBtn = $('#modalClose');
  
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set fecha mínima = hoy
    const fechaInput = $('#fecha');
    if (fechaInput) {
      const today = new Date().toISOString().split('T')[0];
      fechaInput.min = today;
      fechaInput.value = today;
    }
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset form después de cerrar
    setTimeout(() => {
      const form = $('#leadForm');
      const status = $('#formStatus');
      if (form) form.reset();
      if (status) {
        status.textContent = '';
        status.className = 'form-note';
      }
    }, 300);
  }
  
  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn.addEventListener('click', closeModal);
  
  // Cerrar al hacer click fuera
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ===== FORMULARIO =====
function initForm(property) {
  const form = $('#leadForm');
  const submitBtn = form.querySelector('button[type="submit"]');
  const status = $('#formStatus');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Desactivar botón durante envío
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Enviando...</span>';
    status.textContent = 'Guardando tu solicitud...';
    status.className = 'form-note';
    
    // Recoger datos
    const formData = new FormData(form);
    const leadData = {
      timestamp: getCurrentTimestamp(),
      propertyId: CONFIG.getPropertyId(),
      propertyTitle: property.titulo,
      propertyAddress: `${property.direccion}, ${property.comuna}`,
      propertyPrice: property.precio,
      nombre: formData.get('nombre')?.trim(),
      telefono: formData.get('telefono')?.trim(),
      email: formData.get('email')?.trim() || '',
      fecha_visita: formData.get('fecha_visita'),
      horario: formData.get('horario'),
      mensaje: formData.get('mensaje')?.trim() || '',
      origen: 'Web - Página Propiedad',
      url: location.href,
      userAgent: navigator.userAgent
    };
    
    // Validación extra
    if (!leadData.nombre || !leadData.telefono || !leadData.fecha_visita) {
      status.textContent = '❌ Por favor completa todos los campos obligatorios';
      status.className = 'form-note error';
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Confirmar visita</span>';
      return;
    }
    
    // 1. Guardar en Google Sheets
    const sheetsResult = await saveLeadToSheets(leadData);
    
    if (sheetsResult.success) {
      // 2. Éxito - Mostrar mensaje y abrir WhatsApp
      status.textContent = '✅ ¡Listo! Abriendo WhatsApp...';
      status.className = 'form-note success';
      
      // Pequeña pausa para que el usuario vea el mensaje
      setTimeout(() => {
        openWhatsApp(property, leadData);
        
        // Cerrar modal después de abrir WhatsApp
        setTimeout(() => {
          $('#modalOverlay').classList.remove('active');
          document.body.style.overflow = '';
          form.reset();
        }, 1000);
      }, 800);
      
    } else {
      // Error - pero igual abrimos WhatsApp como fallback
      console.error('Error Sheets:', sheetsResult.error);
      status.textContent = '⚠️ Error guardando, pero abrimos WhatsApp directo...';
      
      setTimeout(() => {
        openWhatsApp(property, leadData);
      }, 1000);
    }
    
    // Reactivar botón
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirmar visita</span>';
  });
}

// ===== GALERÍA =====
function initGallery(property) {
  const mainImg = $('#mainImg');
  const thumbsContainer = $('#thumbs');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const counterCurrent = $('#imgCurrent');
  const counterTotal = $('#imgTotal');
  
  let currentIndex = 0;
  const fotos = property.fotos || [];
  
  if (fotos.length === 0) {
    mainImg.src = 'images/placeholder-propiedad.jpg';
    mainImg.alt = 'Fotos próximamente';
    return;
  }
  
  function updateGallery() {
    // Actualizar imagen principal con fade
    mainImg.style.opacity = '0.8';
    setTimeout(() => {
      mainImg.src = fotos[currentIndex];
      mainImg.alt = `Foto ${currentIndex + 1} de ${fotos.length}`;
      mainImg.style.opacity = '1';
    }, 150);
    
    // Actualizar contador
    counterCurrent.textContent = currentIndex + 1;
    counterTotal.textContent = fotos.length;
    
    // Actualizar thumbnails
    renderThumbs();
  }
  
  function renderThumbs() {
    thumbsContainer.innerHTML = fotos.map((src, i) => `
      <img 
        src="${src}" 
        alt="Miniatura ${i + 1}" 
        class="${i === currentIndex ? 'active' : ''}" 
        data-index="${i}"
        loading="lazy"
      >
    `).join('');
    
    // Event listeners en thumbnails
    thumbsContainer.querySelectorAll('img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        currentIndex = parseInt(thumb.dataset.index);
        updateGallery();
      });
    });
  }
  
  // Navegación
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + fotos.length) % fotos.length;
    updateGallery();
  });
  
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % fotos.length;
    updateGallery();
  });
  
  // Swipe en móvil
  let touchStartX = 0;
  const gallery = $('.gallery-main');
  
  gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  gallery.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextBtn.click();
      else prevBtn.click();
    }
  }, { passive: true });
  
  // Inicializar
  updateGallery();
}

// ===== RENDERIZAR PÁGINA =====
function renderPage() {
  const propertyId = CONFIG.getPropertyId();
  const property = PROPERTIES[propertyId];
  
  if (!property) {
    document.body.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: Inter, sans-serif;">
        <h1>Propiedad no encontrada</h1>
        <p>ID: <code>${propertyId}</code></p>
        <a href="index.html" style="color: #d4af37;">← Volver al inicio</a>
      </div>
    `;
    return;
  }
  
  // Actualizar título de página
  document.title = `${property.titulo} — FamilyBrothers`;
  
  // Rellenar datos básicos
  $('#titulo').textContent = property.titulo;
  $('#subhead').innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
    ${property.comuna} • ${property.direccion}
  `;
  $('#precio').textContent = property.precio;
  $('#sidebarPrice').textContent = property.precio;
  $('#desc').textContent = property.descripcion;
  $('#addrHint').textContent = property.direccion;
  
  // Ficha técnica
  $('#dorm').textContent = property.dormitorios;
  $('#banos').textContent = property.banos;
  $('#mtu').textContent = property.mtUtil;
  $('#mtt').textContent = property.mtTotal;
  
  const estEl = $('#est');
  const bodEl = $('#bod');
  estEl.textContent = property.estacionamiento ? 'Sí' : 'No';
  bodEl.textContent = property.bodega ? 'Sí' : 'No';
  estEl.className = 'spec-value' + (property.estacionamiento ? '' : ' no');
  bodEl.className = 'spec-value' + (property.bodega ? '' : ' no');
  
  // Quickbar
  const quickbar = $('#quickbar');
  quickbar.innerHTML = `
    <span class="prop-feature-pill"><span>🛏️</span> ${property.dormitorios} Dorm.</span>
    <span class="prop-feature-pill"><span>🛁</span> ${property.banos} Baños</span>
    <span class="prop-feature-pill"><span>📐</span> ${property.mtUtil} m² útil</span>
    <span class="prop-feature-pill"><span>📏</span> ${property.mtTotal} m² total</span>
    <span class="prop-feature-pill highlight"><span>🚇</span> Metro cercano</span>
    <span class="prop-feature-pill highlight"><span>💼</span> Ideal inversión</span>
  `;
  
  // Mapa
  const mapFrame = $('#mapFrame');
  if (mapFrame && property.mapsQuery) {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(property.mapsQuery)}&output=embed`;
  }
  
  // WhatsApp links (sin datos de formulario)
  const whatsMessage = encodeURIComponent(
    `Hola, quiero agendar visita para:\n\n` +
    `🏠 ${property.titulo}\n` +
    `📍 ${property.direccion}, ${property.comuna}\n` +
    `💰 ${property.precio}\n\n` +
    `📎 ${location.href}`
  );
  const whatsUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${whatsMessage}`;
  
  $('#whatsProp').href = whatsUrl;
  $('#whatsFloat').href = whatsUrl;
  $('#whatsSidebar').href = whatsUrl;
  
  // Inicializar componentes
  initGallery(property);
  initModal();
  initForm(property);
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', renderPage);