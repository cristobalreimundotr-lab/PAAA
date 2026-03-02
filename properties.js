// ============================
// properties.js (COMPLETO)
// ============================

window.PROPERTIES = {
  "FB-STGO-001": {
    // Info básica
    titulo: "Home Studio 1D/1B — San Francisco 335",
    comuna: "Santiago Centro",
    direccion: "San Francisco 335",

    // Precios
    precio: "$50.490.000",
    precioUF: "UF 1.269",

    // Características
    dormitorios: 1,
    banos: 1,
    mtUtil: 21,
    mtTotal: 24,

    // Amenities
    estacionamiento: false,
    bodega: false,

    // Descripción
    descripcion:
      "Home Studio de 21 m² en el corazón de Santiago Centro. Ideal para inversión o primer departamento. Excelente conectividad a pasos de Metro Parque Almagro, cercano a universidades, supermercados y servicios. Alta demanda de arriendo en el sector, perfecto para estudiantes o profesionales.",

    // ✅ FOTOS (ASEGÚRATE QUE EXISTAN EN /images/ CON ESTOS NOMBRES + .jpg)
    // IMPORTANTE: NO uses "baño" con Ñ. Renombra a "bano.jpg"
    fotos: [
      "images/35924.jpg",
      "images/35919.jpg",
      "images/35910.jpg",
      "images/35916.jpg",
      "images/bano.jpeg",
      "images/piscina.jpeg"
    ],

    // ✅ MAPA (se usa mapsQuery para construir el iframe)
    mapsQuery: "San Francisco 335, Santiago, Chile",

    // WhatsApp
    whatsapp: "56973706611",

    // Agente
    agente: {
      nombre: "Cristóbal Reimundo",
      telefono: "56973706611",
      email: "cristobalreimund@gmail.com"
    },

    // ✅ CERCANÍAS (OBJETO CON CATEGORÍAS)
    cercanias: {
      metro: [
        { nombre: "Metro Parque Almagro (L3)", distancia: "8 min caminando" },
        { nombre: "Metro Santa Lucía (L1)", distancia: "12 min caminando" },
        { nombre: "Metro Universidad de Chile (L1)", distancia: "15 min caminando" }
      ],
      universidades: [
        { nombre: "Universidad Central", distancia: "6 min caminando" },
        { nombre: "Universidad Tecnológica Metropolitana", distancia: "12 min caminando" },
        { nombre: "Universidad de Chile (Casa Central)", distancia: "14 min caminando" }
      ],
      supermercados: [
        { nombre: "Líder Express", distancia: "9 min caminando" },
        { nombre: "Unimarc", distancia: "10 min caminando" }
      ],
      parques: [{ nombre: "Parque Almagro", distancia: "8 min caminando" }]
    }
  }
};