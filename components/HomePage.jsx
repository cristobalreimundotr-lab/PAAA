"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { faqItems, featuredProperties, siteConfig } from "@/data/siteData";
import FaqSection from "./FaqSection";
import styles from "./HomePage.module.css";

function formatCLP(value) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(value);
}

export default function HomePage() {
  const [price, setPrice] = useState("350.000.000");
  const numericValue = useMemo(() => Number(String(price).replace(/\D+/g, "")) || 0, [price]);
  const base = Math.round(numericValue * 0.02);
  const iva = Math.round(base * 0.19);
  const total = base + iva;
  const ahorro = Math.max(Math.round(numericValue * 0.04) - total, 0);
  const calcWhatsapp = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hola, quiero cotizar la venta de mi propiedad.\n\nPrecio: ${formatCLP(numericValue)}\nComisión 2% + IVA: ${formatCLP(total)}\nAhorro estimado: ${formatCLP(ahorro)}`
  )}`;

  const soldProperty = featuredProperties[0];
  const paineProperty = featuredProperties[1];
  const officeMap = "https://www.google.com/maps?q=San+Rosario,+Las+Condes,+Chile&output=embed";

  const handlePriceChange = (value) => {
    const digits = value.replace(/\D+/g, "");
    if (!digits) {
      setPrice("");
      return;
    }
    setPrice(Number(digits).toLocaleString("es-CL"));
  };

  return (
    <main className={styles.page}>
      <section id="inicio" className={styles.hero}>
        <div className={styles.heroMedia}></div>
        <div className={styles.heroGlow}></div>
        <div className="container">
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot}></span>
                FamilyBrothers · Proceso premium
              </div>
              <h1 className={styles.headline}>
                Vendemos con <span className={styles.headlineAccent}>criterio</span>, presentación y respaldo real
              </h1>
              <p className={styles.heroText}>
                FamilyBrothers combina estrategia comercial, imagen inmobiliaria y acompañamiento legal para que una propiedad se vea mejor, genere confianza y cierre de forma más profesional.
              </p>
              <div className={styles.heroActions}>
                <Link className="btn btn-gold btn-lg" href="#contacto">Cotizar ahora</Link>
                <Link className="btn btn-outline-light" href="/propiedades">Ver propiedades</Link>
              </div>

              <div className={styles.heroNotes}>
                <div className={styles.heroNote}>
                  <strong>2%</strong>
                  <span>Comisión clara y competitiva</span>
                </div>
                <div className={styles.heroNote}>
                  <strong>90 días</strong>
                  <span>Exclusividad con foco real</span>
                </div>
                <div className={styles.heroNote}>
                  <strong>Legal</strong>
                  <span>Respaldo profesional incluido</span>
                </div>
              </div>
            </div>

            <aside className={styles.heroPanel}>
              <span className={styles.panelKicker}>Modelo de trabajo</span>
              <h2 className={styles.panelTitle}>Una corredora más fina, más directa y mejor presentada</h2>
              <ul className={styles.panelList}>
                <li><span className={styles.panelCheck}>✓</span><span>Publicaciones inmobiliarias con mejor estándar visual y mejor narrativa comercial.</span></li>
                <li><span className={styles.panelCheck}>✓</span><span>Seguimiento constante, comunicación ágil y un proceso que sí se siente acompañado.</span></li>
                <li><span className={styles.panelCheck}>✓</span><span>Boleta electrónica, abogado asociado y control claro de cada etapa.</span></li>
              </ul>
              <div className={styles.panelPrice}>
                <strong>Comisión 2%</strong>
                <span>Sin letra chica y con enfoque premium para vender mejor.</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.editorialGrid}>
            <div className={styles.editorialCard}>
              <span className={styles.kicker}>Posicionamiento</span>
              <h2 className={styles.title}>Una marca que tiene que verse tan bien como vende</h2>
              <p className={styles.subtitle}>
                El valor no está solo en publicar. Está en cómo se presenta la propiedad, cómo se construye confianza y cómo se acompaña la operación desde el primer contacto hasta el cierre.
              </p>
            </div>
            <div className={styles.editorialCard}>
              <div className={styles.editorialValue}>+50 UF</div>
              <p className={styles.editorialBody}>
                En propiedades bien trabajadas, la diferencia entre una gestión genérica y una estrategia más cuidada no es solo estética: también impacta percepción, velocidad y calidad del comprador que llega.
              </p>
              <ul className={styles.editorialList}>
                <li>Presentación con mejor estándar visual.</li>
                <li>Filtrado comercial con más criterio.</li>
                <li>Proceso más serio y menos improvisado.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="publicaciones" className={`${styles.section} ${styles.sectionSoft}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>Portafolio</span>
              <h2 className={styles.title}>Propiedades que ya están presentadas para vender mejor</h2>
              <p className={styles.subtitle}>
                Una home premium no solo muestra inmuebles. Jerarquiza lo importante, deja una propiedad protagonista y ordena el resto con criterio editorial.
              </p>
            </div>
            <Link className="btn btn-outline" href="/propiedades">Ver catálogo completo</Link>
          </div>

          <div className={styles.propertyGrid}>
            <article className={styles.featureProperty}>
              {paineProperty.image ? <img className={styles.featurePropertyImage} src={paineProperty.image} alt={paineProperty.title} /> : null}
              <div className={styles.featurePropertyShade}></div>
              <div className={styles.featurePropertyContent}>
                <span className={styles.featurePropertyBadge}>Propiedad destacada</span>
                <h3 className={styles.featurePropertyTitle}>{paineProperty.title}</h3>
                <p className={styles.featurePropertyMeta}>{paineProperty.location} · {paineProperty.specs.join(" · ")}</p>
                <div className={styles.featurePropertyTags}>
                  {paineProperty.tags.map((tag) => <span className={styles.featureTag} key={tag}>{tag}</span>)}
                </div>
                <div className={styles.featurePropertyFooter}>
                  <div className={styles.featurePrice}>{paineProperty.price}</div>
                  <Link className="btn btn-outline-light" href={paineProperty.href}>Ver parcela</Link>
                </div>
              </div>
            </article>

            <div className={styles.propertyStack}>
              <article className={styles.propertyMini}>
                <div className={`${styles.propertyMiniMedia} ${styles.propertyMiniMediaSold}`}>
                  <img src={soldProperty.image} alt={soldProperty.title} />
                  <div className={styles.propertyMiniOverlay}></div>
                  <div className={styles.propertyMiniSold}>
                    <span className={styles.propertyMiniSoldBadge}>Vendido</span>
                    <strong>Se vendió en 3 semanas</strong>
                  </div>
                </div>
                <div className={`${styles.propertyMiniBody} ${styles.propertyMiniBodySold}`}>
                  <span className={styles.kicker}>Caso vendido</span>
                  <h3 className={styles.propertyMiniTitle}>{soldProperty.title}</h3>
                  <p className={styles.propertyMiniMeta}>{soldProperty.location}</p>
                  <div className={styles.propertyMiniPrice}>{soldProperty.price}</div>
                  <div className={styles.propertyMiniTags}>
                    {soldProperty.tags.map((tag) => <span className={styles.pill} key={tag}>{tag}</span>)}
                  </div>
                  <div className={styles.soldNote}>Operación cerrada con presentación, difusión y seguimiento comercial coordinado.</div>
                </div>
              </article>

              <article className={styles.editorialCard}>
                <span className={styles.kicker}>Equipo</span>
                <h3 className={styles.propertyMiniTitle}>Una operación cuidada también habla de quién la lidera</h3>
                <p className={styles.editorialBody}>
                  Detrás de cada publicación hay seguimiento comercial, criterio de presentación y un equipo que entiende que vender una propiedad es una operación patrimonial, no una publicación más.
                </p>
                <div style={{ marginTop: "18px" }}>
                  <Link className="btn btn-outline" href="/quienes-somos">Conocer al equipo</Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="seguridad" className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <section
            className={styles.assuranceWrap}
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 95% 5%, rgba(185,140,60,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 5% 95%, rgba(12,18,32,0.04) 0%, transparent 55%), #f5f2ec"
            }}
          >
            <div className={styles.assuranceMain}>
              <div className={styles.assuranceHeader}>
                <div className={styles.assuranceBadge}>Seguridad</div>
                <h2 className={styles.assuranceTitle}>
                  La confianza también se <em>diseña</em>
                </h2>
                <p className={styles.assuranceSubtitle}>
                  Un proceso bien presentado también necesita señales claras de orden, respaldo y formalidad.
                </p>
              </div>

              <div className={styles.assuranceGrid}>
                <article className={styles.assuranceCard}>
                  <div className={styles.assuranceNumber}>01</div>
                  <h3 className={styles.assuranceCardTitle}>Exclusividad clara</h3>
                  <p className={styles.assuranceCardBody}>
                    Trabajamos con una sola estrategia comercial para que la propiedad no pierda valor por dispersión.
                  </p>
                  <div className={styles.assuranceFooter}>
                    <div className={styles.assuranceBullet}>Contrato formal por escrito</div>
                    <div className={styles.assuranceBullet}>Metas de gestión definidas</div>
                    <div className={styles.assuranceBullet}>Un solo equipo, sin dispersión</div>
                  </div>
                </article>

                <article className={styles.assuranceCard}>
                  <div className={styles.assuranceNumber}>02</div>
                  <h3 className={styles.assuranceCardTitle}>Formalidad total</h3>
                  <p className={styles.assuranceCardBody}>
                    Cada paso queda trazado para que el cliente sienta un proceso serio y una operación más ordenada.
                  </p>
                  <div className={styles.assuranceFooter}>
                    <div className={styles.assuranceBullet}>Boleta electrónica por comisión</div>
                    <div className={styles.assuranceBullet}>Registro de cada gestión</div>
                    <div className={styles.assuranceBullet}>Comunicación clara y escrita</div>
                  </div>
                </article>

                <article className={styles.assuranceCard}>
                  <div className={styles.assuranceNumber}>03</div>
                  <h3 className={styles.assuranceCardTitle}>Respaldo legal</h3>
                  <p className={styles.assuranceCardBody}>
                    El cierre no se deja al azar: hay revisión y coordinación para que la operación termine bien.
                  </p>
                  <div className={styles.assuranceFooter}>
                    <div className={styles.assuranceBullet}>Revisión de promesa de compraventa</div>
                    <div className={styles.assuranceBullet}>Coordinación con abogado</div>
                    <div className={styles.assuranceBullet}>Cierre documentado y seguro</div>
                  </div>
                </article>
              </div>
            </div>

            <div className={styles.assuranceStripe}>
              <p className={styles.assuranceStripeCopy}>
                Detrás de cada captación no hay improvisación: hay <strong>un equipo real detrás</strong> sosteniendo la presentación, la gestión y el cierre.
              </p>

              <div className={styles.assuranceStats}>
                <div className={styles.assuranceStat}>
                  <strong>90</strong>
                  <span>Días contrato</span>
                </div>
                <div className={styles.assuranceStat}>
                  <strong>2%</strong>
                  <span>Comisión</span>
                </div>
                <div className={styles.assuranceStat}>
                  <strong>24h</strong>
                  <span>Respuesta</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.brandShowcase}>
            <div className={styles.brandLead}>
              <span className={`${styles.kicker} ${styles.kickerDark}`}>FamilyBrothers</span>
              <h2 className={styles.brandTitle}>Una propuesta más <em className={styles.headlineAccent}>seria</em>, moderna y bien presentada</h2>
              <p className={styles.brandCopy}>
                Cuidamos la imagen, el seguimiento y el respaldo del proceso para que vender una propiedad se vea tan profesional como debe sentirse.
              </p>

              <div className={styles.brandMetrics}>
                <div className={styles.brandMetric}>
                  <strong>Presentación</strong>
                  <span>Una imagen más cuidada, más premium y mejor pensada para captar interés.</span>
                </div>
                <div className={styles.brandMetric}>
                  <strong>Gestión</strong>
                  <span>Seguimiento comercial cercano, directo y con criterio durante todo el proceso.</span>
                </div>
              </div>
            </div>

            <div className={styles.brandPillars}>
              <div className={styles.brandPillarsHeader}>
                <div className={styles.editorialValue}>03</div>
                <div>
                  <h3 className={styles.brandPillarsTitle}>Pilares que sostienen la operación</h3>
                  <p className={styles.brandPillarsCopy}>Más método, más confianza y una experiencia de marca mucho más sólida.</p>
                </div>
              </div>

              <div className={styles.pillarsGrid}>
                <article className={styles.pillarCard}>
                  <span className={styles.pillarNumber}>01</span>
                  <div>
                    <h4>Presentación inmobiliaria</h4>
                    <p>Fotos, narrativa comercial y una lectura visual mejor resuelta desde el primer vistazo.</p>
                  </div>
                </article>
                <article className={styles.pillarCard}>
                  <span className={styles.pillarNumber}>02</span>
                  <div>
                    <h4>Gestión comercial</h4>
                    <p>Contacto rápido, visitas coordinadas y una comunicación mucho más clara con cada interesado.</p>
                  </div>
                </article>
                <article className={styles.pillarCard}>
                  <span className={styles.pillarNumber}>03</span>
                  <div>
                    <h4>Respaldo real</h4>
                    <p>Boleta electrónica, abogado asociado y un cierre más ordenado, transparente y confiable.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculadora" className={`${styles.section} ${styles.sectionDark}`}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.calcPanel}>
              <h2 className={styles.calcPanelTitle}>Calcula tu comisión</h2>
              <label htmlFor="precioCLP" className={styles.calcLabel}>Precio de venta</label>
              <div className={styles.calcInputWrap}>
                <span className={styles.calcPrefix}>$</span>
                <input id="precioCLP" className={styles.calcInput} value={price} onChange={(e) => handlePriceChange(e.target.value)} placeholder="350.000.000" />
              </div>
              <div className={styles.calcQuick}>
                {[250000000, 350000000, 500000000, 750000000].map((value) => (
                  <button key={value} type="button" onClick={() => setPrice(value.toLocaleString("es-CL"))}>
                    {formatCLP(value)}
                  </button>
                ))}
              </div>
              <div className={styles.calcResults}>
                <div className={styles.calcRow}><span>Subtotal comisión (2%)</span><strong>{formatCLP(base)}</strong></div>
                <div className={styles.calcRow}><span>IVA 19%</span><strong>{formatCLP(iva)}</strong></div>
                <div className={`${styles.calcRow} ${styles.calcTotal}`}><span>Total a pagar</span><strong>{formatCLP(total)}</strong></div>
                <div className={styles.calcRow}><span>Ahorro estimado vs 4%</span><strong>{formatCLP(ahorro)}</strong></div>
              </div>
            </div>

            <div className={styles.contactPanel}>
              <h2 className={styles.contactPanelTitle}>Nuestro lugar</h2>
              <p className={styles.contactCopy}>
                La ubicación también forma parte de la percepción de marca. Por eso dejamos un punto de contacto claro, visible y con mapa real.
              </p>
              <ul className={styles.contactList}>
                <li>Email: {siteConfig.email}</li>
                <li>WhatsApp: {siteConfig.phone}</li>
                <li>Ubicación: {siteConfig.office}</li>
                <li>Horario: Lunes a Viernes · 09:00 a 19:00</li>
              </ul>
              <div className={styles.mapFrame}>
                <iframe
                  src={officeMap}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación FamilyBrothers"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className={`${styles.section} ${styles.sectionLight}`}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.kicker}>Contáctanos</span>
            <h2 className={styles.title}>Conversemos sobre tu propiedad</h2>
            <p className={styles.subtitle} style={{ margin: "0 auto" }}>
              Si quieres vender con una imagen más seria y una operación mejor acompañada, este es el siguiente paso.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactFormCard}>
              <form className={styles.contactForm} action={`https://formsubmit.co/${siteConfig.email}`} method="POST">
                <div className={styles.formField}>
                  <label htmlFor="contact-name">Nombre completo</label>
                  <input id="contact-name" name="Nombre" type="text" placeholder="Tu nombre" required />
                </div>
                <div className={styles.formTwoCols}>
                  <div className={styles.formField}>
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="Email" type="email" placeholder="tucorreo@ejemplo.com" required />
                  </div>
                  <div className={styles.formField}>
                    <label htmlFor="contact-phone">Teléfono</label>
                    <input id="contact-phone" name="Telefono" type="tel" placeholder={siteConfig.phone} />
                  </div>
                </div>
                <div className={styles.formField}>
                  <label htmlFor="contact-message">Cuéntanos sobre tu propiedad</label>
                  <textarea id="contact-message" name="Mensaje" rows="5" placeholder="Comuna, metros cuadrados, dormitorios, precio aproximado..." required />
                </div>
                <input type="hidden" name="_subject" value="Nueva cotización - FamilyBrothers" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <button className="btn btn-gold btn-lg" type="submit">Enviar solicitud</button>
              </form>
            </div>

            <div className={styles.contactInfoCard}>
              <span className={styles.kicker}>Contacto directo</span>
              <h3 className={styles.propertyMiniTitle}>Atención rápida y sin rodeos</h3>
              <p className={styles.editorialBody}>
                Si prefieres avanzar por un canal más inmediato, también puedes escribir directo y coordinamos el siguiente paso contigo.
              </p>
              <ul className={styles.contactInfoList}>
                <li><strong>Email</strong><span>{siteConfig.email}</span></li>
                <li><strong>WhatsApp</strong><span>{siteConfig.phone}</span></li>
                <li><strong>Dirección</strong><span>{siteConfig.office}</span></li>
              </ul>
              <div className={styles.heroActions}>
                <a className="btn btn-gold btn-lg" href={calcWhatsapp} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
                <a className="btn btn-outline" href={`mailto:${siteConfig.email}`}>Escribir por correo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}>
        <div className="container">
          <FaqSection items={faqItems} />
        </div>
      </section>
    </main>
  );
}
