"use client";

import { useMemo, useState } from "react";
import styles from "./PropertyPage.module.css";

export default function PropertyPage({ property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [open, setOpen] = useState(false);
  const whatsappUrl = useMemo(() => {
    const text = encodeURIComponent(`Hola, quiero visitar: ${property.title}`);
    return `https://wa.me/${property.whatsapp}?text=${text}`;
  }, [property]);

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(property.mapsQuery)}&output=embed`;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className="reveal reveal-left">
              <div className="hero-badge"><span className="pulse-dot"></span>Exclusivo · 2% + IVA · Respaldo legal</div>
              <h1 className={styles.title}>{property.title}</h1>
              <p className={styles.meta}>{property.address}, {property.commune}</p>
              <div className={styles.price}>{property.priceUf}</div>
            </div>
            <div className="feature-card reveal reveal-right delay-1 motion-panel">
              <h3 className="feature-title">Ficha rápida</h3>
              <ul className="feature-list">
                <li className="feature-item"><span className="feature-check">✓</span><div>{property.bedrooms} dormitorio · {property.bathrooms} baño</div></li>
                <li className="feature-item"><span className="feature-check">✓</span><div>{property.mtUtil} m² útil · {property.mtTotal} m² total</div></li>
                <li className="feature-item"><span className="feature-check">✓</span><div>Alta conectividad y demanda de arriendo</div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.layout}>
          <div>
            <div className={`${styles.gallery} reveal reveal-left motion-panel`}>
              <img className={styles.mainImg} src={property.images[activeImage]} alt={property.title} />
              <div className={styles.thumbs}>
                {property.images.map((image, index) => (
                  <button className={`${styles.thumb} ${index === activeImage ? styles.thumbActive : ""}`} key={image} onClick={() => setActiveImage(index)} type="button">
                    <img src={image} alt={`${property.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className={`${styles.card} reveal reveal-left delay-1 motion-panel`}>
              <h2 className={styles.sectionTitle}>Descripción</h2>
              <div className={styles.copy}><p>{property.description}</p></div>
            </div>

            <div className={`${styles.card} reveal reveal-left delay-2 motion-panel`}>
              <h2 className={styles.sectionTitle}>Cercanías</h2>
              <div className={styles.nearbyGrid}>
                {Object.entries(property.nearby).map(([category, items]) => (
                  <div className={styles.nearbyItem} key={category}>
                    <span className={styles.label}>{category}</span>
                    <div className={styles.copy}>{items.map((item) => <p key={item}>{item}</p>)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.card} reveal reveal-left delay-3 motion-panel`}>
              <h2 className={styles.sectionTitle}>Ubicación</h2>
              <iframe src={mapUrl} width="100%" height="360" style={{ border: 0, borderRadius: 16 }} loading="lazy" title={property.title}></iframe>
            </div>
          </div>

          <aside className={styles.sidebarSticky}>
            <div className={`${styles.card} reveal reveal-right motion-panel`}>
              <h3 className={styles.sectionTitle}>Ficha técnica</h3>
              <div className={styles.specGrid}>
                <div className={styles.specItem}><span className={styles.label}>Dormitorios</span><strong>{property.bedrooms}</strong></div>
                <div className={styles.specItem}><span className={styles.label}>Baños</span><strong>{property.bathrooms}</strong></div>
                <div className={styles.specItem}><span className={styles.label}>m² útil</span><strong>{property.mtUtil}</strong></div>
                <div className={styles.specItem}><span className={styles.label}>m² total</span><strong>{property.mtTotal}</strong></div>
                <div className={styles.specItem}><span className={styles.label}>Estacionamiento</span><strong>{property.parking ? "Sí" : "No"}</strong></div>
                <div className={styles.specItem}><span className={styles.label}>Bodega</span><strong>{property.storage ? "Sí" : "No"}</strong></div>
              </div>
            </div>

            <div className={`${styles.card} reveal reveal-right delay-1 motion-panel`}>
              <h3 className={styles.sectionTitle}>Nuestro proceso</h3>
              <div className={styles.copy}>
                <p>Publicación + marketing digital.</p>
                <p>Gestión de visitas.</p>
                <p>Apoyo legal en promesa y escritura.</p>
                <p>Boleta electrónica.</p>
              </div>
            </div>

            <div className={`${styles.card} reveal reveal-right delay-2 motion-panel`}>
              <div className={styles.price}>{property.priceUf}</div>
              <p className={styles.copy}>Comisión 2% + IVA · Respaldo legal incluido.</p>
              <div className={styles.cta}>
                <button className="btn btn-gold btn-full" onClick={() => setOpen(true)} type="button">Agendar visita</button>
                <a className={styles.wa} href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp directo</a>
                <a className={styles.outline} href="/#contacto">Volver a contacto</a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.sectionTitle}>Agendar visita</h3>
            <form className={styles.formGrid}>
              <div className={styles.field}><label>Nombre</label><input placeholder="Tu nombre" /></div>
              <div className={styles.field}><label>Teléfono</label><input placeholder="+56 9 1234 5678" /></div>
              <div className={`${styles.field} ${styles.full}`}><label>Email</label><input placeholder="tu@email.com" /></div>
              <div className={styles.field}><label>Fecha</label><input type="date" /></div>
              <div className={styles.field}><label>Horario</label><select><option>10:00 - 12:00</option><option>12:00 - 14:00</option><option>16:00 - 18:00</option></select></div>
              <div className={`${styles.field} ${styles.full}`}><label>Mensaje</label><textarea rows="4" placeholder="Cuéntanos tu disponibilidad"></textarea></div>
              <div className={styles.full}><button className="btn btn-gold btn-full" type="button" onClick={() => setOpen(false)}>Cerrar</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
