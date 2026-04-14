"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import styles from "./PropertyDetailPage.module.css";

export default function PropertyDetailPage({ property }) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(`Hola, vi la propiedad ${property.code} y quiero coordinar una visita.`);
    return `https://wa.me/${property.whatsapp}?text=${text}`;
  }, [property]);

  const mapUrl = useMemo(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(property.mapQuery)}&output=embed`;
  }, [property.mapQuery]);

  const visibleThumbs = property.gallery.slice(0, 4);
  const galleryPreview = property.gallery.slice(1, 5);
  const remaining = Math.max(property.totalPhotos - property.gallery.length, 0);

  const goPrev = () => {
    setActiveImage((current) => (current - 1 + property.gallery.length) % property.gallery.length);
  };

  const goNext = () => {
    setActiveImage((current) => (current + 1) % property.gallery.length);
  };

  return (
    <main className={styles.page}>
      <section
        className={styles.hero}
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 80% 0%, rgba(185,140,60,0.09) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(30,60,120,0.15) 0%, transparent 55%), #0c1220"
        }}
      >
        <div className={styles.heroInner}>
          <div>
            <p className={styles.code}>{property.code}</p>
            <h1
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: property.title }}
            />
            <p className={styles.location}>{property.location}</p>
          </div>

          <div className={styles.priceBlock}>
            <p className={styles.priceLabel}>Valor publicado</p>
            <div className={styles.price}>{property.priceUf}</div>
            <p className={styles.priceSub}>{property.commissionNote}</p>
          </div>
        </div>

        <div className={styles.chips}>
          {property.chips.map((chip) => (
            <span className={styles.chip} key={chip}>
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.galleryShell}>
          <button
            className={styles.heroImageWrap}
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Ver galeria completa"
          >
            <div className={styles.heroImageStage}>
              <Image
                src={property.gallery[activeImage]}
                alt={property.plainTitle}
                fill
                sizes="(max-width: 1100px) 100vw, 68vw"
                className={styles.heroImage}
                priority
              />
            </div>
            <button
              type="button"
              className={`${styles.galleryNav} ${styles.galleryPrev}`}
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Foto anterior"
            >
              {"<"}
            </button>
            <button
              type="button"
              className={`${styles.galleryNav} ${styles.galleryNext}`}
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Foto siguiente"
            >
              {">"}
            </button>
            <span className={styles.galleryButton}>Ver todas las fotos</span>
            <span className={styles.galleryCounter}>
              {activeImage + 1} / {property.gallery.length}
            </span>
          </button>

          <div className={styles.previewGrid}>
            {galleryPreview.map((image, index) => (
              <button
                className={styles.previewCard}
                type="button"
                key={image}
                onClick={() => {
                  setActiveImage(index + 1);
                  setLightboxOpen(true);
                }}
                aria-label={`Ver foto ${index + 2}`}
              >
                <Image
                  src={image}
                  alt={`${property.plainTitle} ${index + 2}`}
                  fill
                  sizes="(max-width: 1100px) 50vw, 18vw"
                  className={styles.previewImage}
                />
              </button>
            ))}

            <button
              type="button"
              className={styles.morePhotos}
              onClick={() => setLightboxOpen(true)}
              aria-label="Abrir galeria completa"
            >
              <strong>12</strong>
              <span>fotos totales</span>
              <small>{remaining > 0 ? `Preparada para +${remaining} mas` : "Galeria completa"}</small>
            </button>
          </div>
        </div>

        <div className={styles.galleryHint}>
          {Array.from({ length: property.totalPhotos }).map((_, index) => (
            <span
              key={`slot-${index + 1}`}
              className={index < property.gallery.length ? styles.galleryDotActive : styles.galleryDot}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.layout}>
          <div>
            <div className={styles.contentBlock}>
              <p className={styles.sectionLabel}>Descripcion</p>
              <div className={styles.description}>
                {property.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={styles.contentBlock}>
              <p className={styles.sectionLabel}>Especificaciones</p>
              <div className={styles.specGrid}>
                {property.specs.map(([value, label]) => (
                  <div className={styles.specCard} key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.bottomGrid}>
              <article className={styles.mapCard}>
                <p className={styles.sectionLabel}>Ubicacion</p>
                <h2 className={styles.bottomTitle}>Paine, conectado y listo para visitar</h2>
                <p className={styles.bottomCopy}>
                  Dejamos la referencia de ubicacion activa para que puedas presentar la zona, coordinar recorridos y explicar el contexto de la propiedad con una senal mucho mas clara.
                </p>
                <iframe
                  className={styles.mapFrame}
                  src={mapUrl}
                  loading="lazy"
                  title={`Mapa de ${property.plainTitle}`}
                />
              </article>

              <article className={styles.formCard} id="coordinar">
                <p className={styles.sectionLabel}>Coordinar visita</p>
                <h2 className={styles.bottomTitle}>Formulario directo para interesados</h2>
                <p className={styles.bottomCopy}>
                  Si prefieren agendar por formulario, esta parte ya queda lista para captar nombre, contacto y disponibilidad.
                </p>
                <form
                  className={styles.form}
                  action="https://formsubmit.co/familybrotherspropiedades@gmail.com"
                  method="POST"
                >
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span>Nombre</span>
                      <input name="Nombre" type="text" placeholder="Nombre completo" required />
                    </label>
                    <label className={styles.field}>
                      <span>Telefono</span>
                      <input name="Telefono" type="tel" placeholder="+56 9 ..." required />
                    </label>
                    <label className={`${styles.field} ${styles.fieldFull}`}>
                      <span>Email</span>
                      <input name="Email" type="email" placeholder="correo@ejemplo.com" required />
                    </label>
                    <label className={styles.field}>
                      <span>Fecha</span>
                      <input name="Fecha" type="date" />
                    </label>
                    <label className={styles.field}>
                      <span>Horario</span>
                      <select name="Horario" defaultValue="">
                        <option value="" disabled>Selecciona un horario</option>
                        <option>10:00 - 12:00</option>
                        <option>12:00 - 14:00</option>
                        <option>16:00 - 18:00</option>
                      </select>
                    </label>
                    <label className={`${styles.field} ${styles.fieldFull}`}>
                      <span>Mensaje</span>
                      <textarea
                        name="Mensaje"
                        rows="5"
                        defaultValue={`Hola, quiero visitar la propiedad ${property.code}.`}
                      />
                    </label>
                  </div>
                  <input type="hidden" name="_subject" value={`Nueva visita solicitada - ${property.code}`} />
                  <input type="hidden" name="_captcha" value="false" />
                  <button className={styles.formButton} type="submit">Enviar solicitud</button>
                </form>
              </article>
            </div>
          </div>

          <aside className={styles.sidebar}>
            <article className={styles.priceCard}>
              <p className={styles.sidebarLabel}>Valor publicado</p>
              <div className={styles.sidebarPrice}>{property.priceUf}</div>
              <p className={styles.sidebarPriceSub}>{property.priceClp}</p>
              <div className={styles.commissionBox}>
                Comision de <strong>2% + IVA</strong> con acompanamiento comercial y legal durante la operacion.
              </div>
              <a className={styles.primaryButton} href={whatsappHref} target="_blank" rel="noreferrer">
                Coordinar visita
              </a>
              <a className={styles.secondaryButton} href="#coordinar">
                Enviar formulario
              </a>
            </article>

            <article className={styles.protectionCard}>
              <p className={styles.protectionLabel}>Tu operacion protegida</p>
              <div className={styles.protectionList}>
                {property.protection.map((item) => (
                  <div className={styles.protectionItem} key={item}>
                    <span className={styles.protectionDot} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.agentCard}>
              <div className={styles.agentAvatar}>{property.agent.initials}</div>
              <div>
                <h3 className={styles.agentName}>{property.agent.name}</h3>
                <p className={styles.agentRole}>{property.agent.role}</p>
                <span className={styles.agentBadge}>{property.agent.badge}</span>
              </div>
            </article>
          </aside>
        </div>
      </section>

      {lightboxOpen && (
        <div className={styles.lightbox} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxDialog} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.lightboxClose} onClick={() => setLightboxOpen(false)}>
              Cerrar
            </button>
            <button type="button" className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={goPrev}>
              {"<"}
            </button>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={property.gallery[activeImage]}
                alt={`${property.plainTitle} ${activeImage + 1}`}
                fill
                sizes="90vw"
                className={styles.lightboxImage}
              />
            </div>
            <button type="button" className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={goNext}>
              {">"}
            </button>
            <div className={styles.lightboxFooter}>
              <span>{activeImage + 1} / {property.gallery.length}</span>
              <div className={styles.lightboxThumbs}>
                {property.gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={index === activeImage ? `${styles.lightboxThumb} ${styles.lightboxThumbActive}` : styles.lightboxThumb}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.plainTitle} miniatura ${index + 1}`}
                      fill
                      sizes="120px"
                      className={styles.lightboxThumbImage}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
