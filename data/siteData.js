export const siteConfig = {
  brand: "FamilyBrothers",
  phone: "+56 9 3385 7105",
  whatsapp: "56933857105",
  email: "familybrotherspropiedades@gmail.com",
  office: "San Rosario, Las Condes"
};

export const featuredProperties = [
  {
    id: "FB-STGO-001",
    status: "sold",
    location: "Santiago Centro",
    title: "Departamento Home Studio - San Francisco 335",
    specs: ["21 m2 utiles", "21 m2 totales"],
    tags: ["Metro cercano", "Ideal inversion"],
    price: "UF 1.269",
    image: "/images/35924.jpg",
    soldImage: "/images/35924.jpg",
    href: "/propiedades"
  },
  {
    id: "FB-PAINE-001",
    status: "sale",
    location: "Paine · 58 km de Santiago",
    title: "Parcela con Casa - Piscina y Chimenea",
    specs: ["5.000 m2 terreno", "170 m2 construidos", "4 hab · 2 baños"],
    tags: ["5.000 m2 terreno", "Piscina", "Chimenea"],
    price: "UF 7.500",
    image: "/images/parcela-paine.jpg",
    href: "/propiedades/parcela-paine"
  }
];

export const faqItems = [
  {
    number: "01",
    question: "Por que elegir una comision del 2%?",
    answer:
      "Porque el valor real esta en como trabajamos, no en cuanto cobramos. Un 2% con gestion profesional, respaldo legal y presentacion premium genera mejores resultados que una comision mayor mal ejecutada."
  },
  {
    number: "02",
    question: "El contrato es realmente exclusivo?",
    answer:
      "Si. Trabajamos con exclusividad porque eso nos permite comprometernos al 100% con tu propiedad: inversion en fotografia, difusion pagada y seguimiento dedicado. Sin exclusividad no podemos garantizar ese nivel."
  },
  {
    number: "03",
    question: "Como resguardan el cierre de la operacion?",
    answer:
      "Trabajamos con un abogado asociado que revisa promesa y escritura. Ademas emitimos boleta electronica por la comision, dando trazabilidad y seguridad en cada etapa del proceso."
  }
];

export const propertyDetails = {
  "FB-STGO-001": {
    id: "FB-STGO-001",
    title: "Home Studio 1D/1B - San Francisco 335",
    commune: "Santiago Centro",
    address: "San Francisco 335",
    price: "$50.490.000",
    priceUf: "UF 1.269",
    bedrooms: 1,
    bathrooms: 1,
    mtUtil: 21,
    mtTotal: 24,
    parking: false,
    storage: false,
    description:
      "Home Studio de 21 m2 en el corazon de Santiago Centro. Ideal para inversion o primer departamento. Excelente conectividad a pasos de Metro Parque Almagro, cercano a universidades, supermercados y servicios. Alta demanda de arriendo en el sector, perfecto para estudiantes o profesionales.",
    images: [
      "/images/35924.jpg",
      "/images/35919.jpg",
      "/images/35910.jpg",
      "/images/35916.jpg",
      "/images/bano.jpeg",
      "/images/piscina.jpeg"
    ],
    mapsQuery: "San Francisco 335, Santiago, Chile",
    whatsapp: siteConfig.whatsapp,
    nearby: {
      Metro: [
        "Metro Parque Almagro (L3) - 8 min caminando",
        "Metro Santa Lucia (L1) - 12 min caminando",
        "Metro Universidad de Chile (L1) - 15 min caminando"
      ],
      Universidades: [
        "Universidad Central - 6 min caminando",
        "UTEM - 12 min caminando",
        "Universidad de Chile - 14 min caminando"
      ],
      Servicios: [
        "Lider Express - 9 min caminando",
        "Unimarc - 10 min caminando",
        "Parque Almagro - 8 min caminando"
      ]
    }
  }
};

export const paineProperty = {
  code: "FB-PAINE-001",
  priceUf: "UF 7.500",
  whatsapp: "56988046689",
  stats: [
    ["5.000 m2", "Terreno"],
    ["170 m2", "Construidos"],
    ["4D / 2B", "Programa"]
  ],
  summary: [
    "Doble acceso: porton del condominio y porton exclusivo de la casa.",
    "Piscina y zonas exteriores ideales para descanso y reuniones.",
    "Cocina independiente, comedor separado y living propio.",
    "Agua de pozo para mayor autonomia y menor costo mensual."
  ],
  features: [
    ["Terreno", "5.000 m2 con excelente amplitud"],
    ["Construccion", "Casa solida de 170 m2"],
    ["Programa", "4 dormitorios y 2 baños"],
    ["Exterior", "Piscina"],
    ["Confort", "Chimenea"],
    ["Distribucion", "Cocina, comedor y living separados"],
    ["Agua", "Pozo propio"],
    ["Seguridad", "Porton de acceso a parcelas mas porton entrada casa"]
  ],
  specs: [
    ["Tipo", "Parcela con casa"],
    ["Terreno", "5.000 m2"],
    ["Construido", "170 m2"],
    ["Dormitorios", "4"],
    ["Baños", "2"],
    ["Estado", "Solida con chimenea"],
    ["Agua", "Pozo propio"],
    ["Acceso", "Porton parcelas + porton casa"],
    ["Extras", "Piscina"],
    ["Precio", "UF 7.500"],
    ["Comision", "2% + IVA vendedor"],
    ["Codigo", "FB-PAINE-001"]
  ]
};

export const propertyPages = {
  "parcela-paine": {
    slug: "parcela-paine",
    code: "FB-PAINE-001",
    title: "Parcela con Casa - <em>Piscina</em> y Chimenea",
    plainTitle: "Parcela con Casa - Piscina y Chimenea",
    location: "Paine, Region Metropolitana",
    priceUf: "UF 7.500",
    priceClp: "$289.000.000 aprox.",
    commissionNote: "Comision 2% + IVA incluida",
    chips: [
      "4 dormitorios",
      "2 banos",
      "5.000 m2 terreno",
      "170 m2 construidos",
      "Piscina",
      "Chimenea",
      "Disponible"
    ],
    gallery: [
      "/images/parcela-paine.jpg",
      "/images/parcela-paine-01.jpeg",
      "/images/parcela-paine-02.jpeg",
      "/images/parcela-paine-03.jpeg",
      "/images/parcela-paine-04.jpeg",
      "/images/parcela-paine-05.jpeg",
      "/images/parcela-paine-06.jpeg",
      "/images/parcela-paine-07.jpeg",
      "/images/parcela-paine-08.jpeg",
      "/images/parcela-paine-09.jpeg",
      "/images/parcela-paine-10.jpeg",
      "/images/parcela-paine-11.jpeg"
    ],
    totalPhotos: 12,
    description: [
      "Parcela pensada para quien quiere amplitud, privacidad y una presentacion solida desde la primera visita. El terreno permite una vida exterior mucho mas comoda, con espacios definidos para descanso, reuniones y uso familiar durante todo el año.",
      "La casa cuenta con 4 habitaciones, 2 baños, cocina, comedor y living separados. La chimenea aporta calidez y la piscina refuerza el valor exterior de la propiedad.",
      "Es una propiedad que se muestra bien tanto en publicacion como en terreno, con atributos claros para captar interes real y coordinar visitas con mejor nivel de intencion."
    ],
    specs: [
      ["5.000", "m2 terreno"],
      ["170", "m2 construidos"],
      ["4", "dormitorios"],
      ["2", "baños"],
      ["Pozo", "agua"]
    ],
    protection: [
      "Contrato exclusivo por 90 dias",
      "Abogado asociado incluido",
      "Boleta electronica por comision",
      "Revision de titulos y documentos",
      "Proceso claro, directo y sin sorpresas"
    ],
    mapQuery: "Paine, Region Metropolitana, Chile",
    agent: {
      initials: "CG",
      name: "Carmen Gloria Guzman",
      role: "Agente a cargo - FamilyBrothers",
      badge: "Alianza"
    },
    whatsapp: "56988046689"
  }
};

export const teamMembers = [
  {
    initials: "CT",
    badge: "Fundador",
    name: "Cristobal Troncoso",
    role: "CEO",
    tagline: "Vision que construye confianza a largo plazo",
    description: "Lidera la estrategia, marca y direccion general de Family Brothers, asegurando una operacion ordenada, transparente y enfocada en generar valor real para cada cliente.",
    featured: true,
    linkedin: "https://www.linkedin.com/in/crist%C3%B3bal-troncoso-127b7b2a1/"
  },
  {
    initials: "BD",
    badge: "Comercial",
    name: "Benjamin Duran",
    role: "Responsable Comercial",
    tagline: "Relaciones que se transforman en oportunidades",
    description: "Gestiona el proceso comercial completo, desde la captacion hasta el cierre, manteniendo una comunicacion directa, cercana y orientada a resultados.",
    linkedin: "https://www.linkedin.com/in/bdurana/"
  },
  {
    initials: "AG",
    badge: "Comercial",
    name: "Agustin Valenzuela",
    role: "Ejecutivo Comercial",
    tagline: "Atencion que marca la diferencia",
    description: "Acompana a los clientes en cada etapa del proceso, entregando apoyo constante y asegurando una experiencia clara, agil y confiable.",
    linkedin: "https://www.linkedin.com/in/agustin-valenzuela-garcia-9216a12b2/"
  },
  {
    initials: "RV",
    badge: "Finanzas",
    name: "Rafael Vasquez",
    role: "Encargado de Finanzas",
    tagline: "Orden financiero que respalda cada decision",
    description: "Administra el flujo financiero de la empresa, analiza operaciones y asegura una gestion clara, responsable y sostenible en el tiempo.",
    linkedin: "https://www.linkedin.com/in/rafael-vasquez-aravena-1a7610387/"
  }
];
