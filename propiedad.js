// ============================
// propiedad.js (ENTERO Y LIMPIO)
// - NO rompe si falta algún id
// - Rellena: titulo, subhead, precio, sidebarPrice, desc, ficha técnica
// - Galería: mainImg + thumbs + prev/next + contador
// - Cercanías: usa tu objeto property.cercanias (metro/universidades/etc.)
// - Mapa: usa property.mapsQuery -> iframe embed
// - WhatsApp: prop, sidebar, float
// - Modal + Form: Sheets (no-cors) + abre WhatsApp
// ============================

console.log("✅ propiedad.js cargado");

window.addEventListener("load", function () {
  console.log("✅ Página completamente cargada");

  // ====== VERIFICAR DATOS ======
  if (!window.PROPERTIES) {
    console.error("❌ ERROR: window.PROPERTIES no existe");
    document.body.innerHTML = "<h1>Error: No se cargaron los datos de propiedades</h1>";
    return;
  }

  const property = window.PROPERTIES["FB-STGO-001"];
  if (!property) {
    console.error("❌ ERROR: Propiedad FB-STGO-001 no encontrada");
    document.body.innerHTML = "<h1>Propiedad no encontrada</h1>";
    return;
  }

  console.log("✅ Propiedad encontrada:", property.titulo);

  // ====== CONFIG ======
  const SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbxMCVqhCtcClNbX8OQVOmHFL4xkZmjT_7i7rbMS7JHOfr1kFYXX78zUwPGCO4XFQA/exec";
  const WHATSAPP_NUMBER = property.whatsapp || "56973706611";

  // ====== HELPERS ======
  const $ = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = $(id);
    if (el) el.textContent = value ?? "";
  };

  const setHTML = (id, value) => {
    const el = $(id);
    if (el) el.innerHTML = value ?? "";
  };

  const setHref = (id, href) => {
    const el = $(id);
    if (el) el.href = href;
  };

  // ====== RELLENAR HERO + DATOS ======
  setText("titulo", property.titulo);
  setText("precio", `${property.precioUF} (${property.precio})`);
  setText("sidebarPrice", property.precioUF);
  setText("desc", property.descripcion);

  // subhead (si existe en tu HTML)
  setHTML(
    "subhead",
    `${property.direccion}, ${property.comuna}`
  );

  // ficha técnica
  setText("dorm", property.dormitorios ? String(property.dormitorios) : "Studio");
  setText("banos", property.banos != null ? String(property.banos) : "—");
  setText("mtu", property.mtUtil != null ? String(property.mtUtil) : "—");
  setText("mtt", property.mtTotal != null ? String(property.mtTotal) : "—");
  setText("est", property.estacionamiento ? "Sí" : "No");
  setText("bod", property.bodega ? "Sí" : "No");

  // ====== WHATSAPP SIMPLE ======
  const msg = encodeURIComponent(
    "Hola, quiero visitar: " + property.titulo + " - " + location.href
  );
  const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;

  setHref("whatsProp", waUrl);
  setHref("whatsFloat", waUrl);
  setHref("whatsSidebar", waUrl);

  console.log("✅ WhatsApp URL:", waUrl);

  // ==========================
  // GALERÍA (FOTOS)
  // ==========================
  (function initGallery() {
    const fotos = Array.isArray(property.fotos) ? property.fotos.filter(Boolean) : [];

    const mainImg = $("mainImg");
    const thumbs = $("thumbs");
    const prevBtn = $("prevBtn");
    const nextBtn = $("nextBtn");
    const imgCurrent = $("imgCurrent");
    const imgTotal = $("imgTotal");

    if (!mainImg || !thumbs || !prevBtn || !nextBtn || !imgCurrent || !imgTotal) {
      console.warn("⚠️ Galería: faltan elementos en el DOM (mainImg/thumbs/prevBtn/nextBtn/counter)");
      return;
    }

    if (!fotos.length) {
      console.warn("⚠️ No hay fotos en property.fotos");
      imgCurrent.textContent = "1";
      imgTotal.textContent = "1";
      return;
    }

    let index = 0;

    function renderThumbs() {
      imgTotal.textContent = String(fotos.length);
      thumbs.innerHTML = fotos
        .map(
          (src, i) => `
          <button class="thumb" type="button" data-i="${i}" aria-label="Foto ${i + 1}">
            <img src="${src}" alt="Foto ${i + 1}" loading="lazy">
          </button>`
        )
        .join("");
    }

    function show(i) {
      index = (i + fotos.length) % fotos.length;
      mainImg.src = fotos[index];
      imgCurrent.textContent = String(index + 1);

      const all = thumbs.querySelectorAll(".thumb");
      all.forEach((b, bi) => b.classList.toggle("active", bi === index));
    }

    renderThumbs();
    show(0);

    thumbs.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-i]");
      if (!btn) return;
      show(Number(btn.dataset.i));
    });

    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));
  })();

  // ==========================
  // CERCANÍAS (TU FORMATO: objeto con categorías)
  // id en HTML: near
  // ==========================
  (function renderCercanias() {
    const near = $("near");
    if (!near) return;

    const c = property.cercanias;
    if (!c || typeof c !== "object") return;

    const ICONS = {
      metro: "🚇",
      universidades: "🎓",
      supermercados: "🛒",
      parques: "🌳",
      farmacias: "💊",
      servicios: "📍"
    };

    const cats = Object.keys(c).filter((k) => Array.isArray(c[k]) && c[k].length > 0);
    if (!cats.length) return;

    near.innerHTML = cats
      .map((cat) => {
        const title = cat.charAt(0).toUpperCase() + cat.slice(1);

        const items = c[cat]
          .map(
            (it) => `
            <div class="near-item">
              <div class="near-name">${it.nombre}</div>
              <div class="near-dist">${it.distancia}</div>
            </div>`
          )
          .join("");

        return `
          <div class="near-block">
            <div class="near-block-title">${ICONS[cat] || "📍"} ${title}</div>
            <div class="near-block-items">${items}</div>
          </div>
        `;
      })
      .join("");
  })();

  // ==========================
  // MAPA (mapsQuery -> iframe embed)
  // id en HTML: mapFrame
  // ==========================
  (function renderMapa() {
    const mapFrame = $("mapFrame");
    if (!mapFrame) return;

    const q = property.mapsQuery || "";
    if (!q.trim()) return;

    mapFrame.src = "https://www.google.com/maps?q=" + encodeURIComponent(q) + "&output=embed";
  })();

  // ==========================
  // MODAL
  // ==========================
  const modal = $("modalOverlay");

  const openModal = function () {
    if (!modal) return;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    const hoy = new Date().toISOString().split("T")[0];
    const fecha = $("fecha");
    if (fecha) {
      fecha.min = hoy;
      fecha.value = hoy;
    }
  };

  const closeModal = function () {
    if (!modal) return;
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  const btnAgendar = $("btnAgendar");
  if (btnAgendar) btnAgendar.onclick = openModal;

  const btnSidebar = $("btnSidebar");
  if (btnSidebar) btnSidebar.onclick = openModal;

  const modalClose = $("modalClose");
  if (modalClose) modalClose.onclick = closeModal;

  // ==========================
  // FORMULARIO - SHEETS + WHATSAPP
  // ==========================
  const form = $("leadForm");
  if (form) {
    form.onsubmit = async function (e) {
      e.preventDefault();

      const btn = this.querySelector('button[type="submit"]');
      const status = $("formStatus");

      if (btn) {
        btn.disabled = true;
        btn.textContent = "Guardando...";
      }
      if (status) status.textContent = "Enviando datos...";

      const datos = {
        timestamp: new Date().toLocaleString("es-CL"),
        propiedad_id: "FB-STGO-001",
        titulo: property.titulo,
        direccion: property.direccion,
        comuna: property.comuna,
        precio: property.precioUF,
        agente: property.agente?.nombre || "",
        nombre: ($("nombre")?.value || "").trim(),
        telefono: ($("telefono")?.value || "").trim(),
        email: ($("email")?.value || "").trim(),
        fecha_visita: $("fecha")?.value || "",
        horario: $("horario")?.value || "",
        mensaje: ($("mensaje")?.value || "").trim(),
        origen: "Web",
        url: location.href
      };

      console.log("📤 Enviando:", datos);

      // 1) Guardar en Sheets
      try {
        const response = await fetch(SHEETS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        console.log("✅ Sheets response:", response);
        if (status) status.textContent = "✅ Guardado! Abriendo WhatsApp...";
      } catch (err) {
        console.error("❌ Error Sheets:", err);
        if (status) status.textContent = "⚠️ Error al guardar, pero abrimos WhatsApp...";
      }

      // 2) Abrir WhatsApp
      const msgCompleto = encodeURIComponent(
        "Hola " +
          (property.agente?.nombre || "Agente") +
          ", quiero agendar visita:\n\n" +
          "🏠 " +
          property.titulo +
          "\n" +
          "💰 " +
          property.precioUF +
          "\n" +
          "👤 " +
          datos.nombre +
          "\n" +
          "📞 " +
          datos.telefono +
          "\n" +
          "📅 " +
          datos.fecha_visita +
          " " +
          datos.horario +
          "\n\n" +
          location.href
      );

      const waCompleto = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msgCompleto;

      console.log("🔗 Abriendo WhatsApp:", waCompleto);

      setTimeout(function () {
        window.open(waCompleto, "_blank");

        setTimeout(function () {
          closeModal();
          form.reset();
        }, 2000);
      }, 500);

      if (btn) {
        btn.disabled = false;
        btn.textContent = "Confirmar visita";
      }
    };
  }

  console.log("✅ Todo inicializado correctamente");
});