import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { teamMembers } from "@/data/siteData";
import styles from "@/components/AboutPage.module.css";

export default function Page() {
  const founder = teamMembers.find((member) => member.featured);
  const team = teamMembers.filter((member) => !member.featured);

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot}></span>
                  Quiénes somos
                </div>
                <h1 className={styles.title}>
                  El equipo que sostiene la <em>imagen</em>, la venta y la confianza
                </h1>
                <p className={styles.lead}>
                  FamilyBrothers no se presenta como una corredora más. Somos una estructura comercial cercana, bien presentada y enfocada en que cada propiedad se venda con criterio, respaldo y una mejor percepción de marca.
                </p>
              </div>

              <aside className={styles.heroCard}>
                <h2 className={styles.heroCardTitle}>Qué hace distinta a la marca</h2>
                <p className={styles.heroCardText}>
                  La diferencia no está solo en la comisión. Está en cómo mostramos una propiedad, cómo guiamos la operación y cómo transmitimos seguridad desde el primer contacto.
                </p>
                <div className={styles.heroMetrics}>
                  <div className={styles.metric}><strong>Comercial</strong><span>Seguimiento real y directo</span></div>
                  <div className={styles.metric}><strong>Imagen</strong><span>Presentación más premium</span></div>
                  <div className={styles.metric}><strong>Respaldo</strong><span>Proceso claro y legal</span></div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.valuesGrid}>
              <article className={styles.valueCard}>
                <strong>Presentación</strong>
                <p>Una propiedad bien mostrada transmite valor antes de cualquier llamada o visita.</p>
              </article>
              <article className={styles.valueCard}>
                <strong>Relación comercial</strong>
                <p>Preferimos cercanía, seguimiento y claridad antes que una atención genérica.</p>
              </article>
              <article className={styles.valueCard}>
                <strong>Respaldo real</strong>
                <p>Comisión clara, boleta electrónica y abogado asociado para cerrar con tranquilidad.</p>
              </article>
            </div>

            <div className={styles.sectionHeader}>
              <span className={styles.sectionKicker}>Nuestro equipo</span>
              <h2 className={styles.sectionTitle}>Personas que sostienen la operación completa</h2>
              <p className={styles.sectionText}>
                Detrás de cada publicación hay una mezcla de estrategia, seguimiento comercial y criterio de presentación. Ese es el estándar que queremos que se sienta en toda la marca.
              </p>
            </div>

            <div className={styles.teamLayout}>
              <article className={styles.featuredCard}>
                <div className={styles.featuredTop}>
                  <div className={styles.avatarLarge}>{founder.initials}</div>
                  <div>
                    <span className={styles.badge}>{founder.badge}</span>
                    <h3 className={styles.nameLarge}>{founder.name}</h3>
                    <p className={styles.role}>{founder.role}</p>
                    <p className={styles.quote}>{founder.tagline}</p>
                    <p className={styles.body}>{founder.description}</p>
                    <div className={styles.profileActions}>
                      <a className={styles.linkedin} href={founder.linkedin} target="_blank" rel="noreferrer">
                        <span className={styles.linkedinIcon}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 13.08c0-3.36-1.8-4.92-4.2-4.92-1.93 0-2.8 1.06-3.29 1.8V8.5H9.56V20h3.39v-6.42c0-.34.02-.68.13-.93.27-.68.88-1.39 1.91-1.39 1.35 0 1.89 1.03 1.89 2.54V20H20.3l.14-6.92z" />
                          </svg>
                        </span>
                        Ver LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.featuredStrip}>
                  <div><strong>Estrategia</strong><span>Define la dirección general de FamilyBrothers.</span></div>
                  <div><strong>Imagen</strong><span>Supervisa la presentación y estándar de marca.</span></div>
                  <div><strong>Relación</strong><span>Busca que cada cliente sienta confianza real.</span></div>
                </div>
              </article>

              <div className={styles.membersStack}>
                {team.map((member) => (
                  <article className={styles.memberCard} key={member.name}>
                    <div className={styles.avatar}>{member.initials}</div>
                    <div>
                      <span className={styles.badge}>{member.badge}</span>
                      <h3 className={styles.name}>{member.name}</h3>
                      <p className={styles.role}>{member.role}</p>
                      <p className={styles.quote}>{member.tagline}</p>
                      <p className={styles.body}>{member.description}</p>
                      <div className={styles.profileActions}>
                        <a className={styles.linkedin} href={member.linkedin} target="_blank" rel="noreferrer">
                          <span className={styles.linkedinIcon}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3zM20.44 13.08c0-3.36-1.8-4.92-4.2-4.92-1.93 0-2.8 1.06-3.29 1.8V8.5H9.56V20h3.39v-6.42c0-.34.02-.68.13-.93.27-.68.88-1.39 1.91-1.39 1.35 0 1.89 1.03 1.89 2.54V20H20.3l.14-6.92z" />
                            </svg>
                          </span>
                          Ver LinkedIn
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.cta}>
              <div>
                <h3>¿Quieres vender con un equipo más serio y mejor presentado?</h3>
                <p>
                  Si lo que buscas es una operación bien acompañada, con una imagen más fuerte y un proceso comercial más cuidado, podemos conversar desde aquí.
                </p>
              </div>
              <Link className="btn btn-gold btn-lg" href="/#contacto">Hablar con el equipo</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
