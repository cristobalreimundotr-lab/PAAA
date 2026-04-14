import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { featuredProperties } from "@/data/siteData";
import styles from "@/components/PropertiesPage.module.css";

const colorMap = {
  verde: styles.imgVerde,
  azul: styles.imgAzul,
  cafe: styles.imgCafe
};

function toCardData(property, colorImg, extra = {}) {
  return {
    id: property.id,
    titulo: property.title,
    ubicacion: property.location,
    metros: property.specs[0] ?? "",
    dormitorios: extra.dormitorios,
    banos: extra.banos,
    precio: property.price.replace("UF ", ""),
    unidad: "UF",
    estado: property.status === "sold" ? "vendida" : "disponible",
    tiempoVenta: extra.tiempoVenta,
    colorImg,
    image: property.soldImage ?? property.image ?? null,
    href: property.href
  };
}

function Badge({ children, white = false }) {
  return <span className={white ? styles.badgeWhite : styles.badgeGold}>{children}</span>;
}

function Chip({ children, dark = false }) {
  return <span className={dark ? styles.chipDark : styles.chip}>{children}</span>;
}

function SectionHeader({ title, sub, linkText, dark = false }) {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <div className={styles.sectionLine}></div>
        <h2 className={dark ? `${styles.sectionTitle} ${styles.sectionTitleDark}` : styles.sectionTitle}>{title}</h2>
        <p className={dark ? `${styles.sectionSub} ${styles.sectionSubDark}` : styles.sectionSub}>{sub}</p>
      </div>
      <Link href="/propiedades" className={styles.sectionLink}>
        {linkText}
      </Link>
    </div>
  );
}

function PropCard({ prop, dark = false }) {
  const chips = [
    prop.dormitorios ? `${prop.dormitorios} dorm.` : null,
    prop.banos ? `${prop.banos} banos` : null,
    prop.metros
  ].filter(Boolean);

  return (
    <article className={dark ? `${styles.card} ${styles.cardDark}` : styles.card}>
      <div className={`${styles.cardImage} ${colorMap[prop.colorImg]}`}>
        {prop.image ? (
          <img
            src={prop.image}
            alt={prop.titulo}
            className={prop.estado === "vendida" ? `${styles.cardImagePhoto} ${styles.cardImagePhotoSold}` : styles.cardImagePhoto}
          />
        ) : null}
        <div className={styles.cardImageOverlay}></div>
        {prop.estado === "vendida" && (
          <div className={styles.soldOverlay}>
            <span className={styles.soldLabel}>Vendido</span>
          </div>
        )}
        <div className={styles.cardBadgeWrap}>
          <Badge white={prop.estado === "vendida"}>
            {prop.estado === "vendida" ? prop.tiempoVenta : "Disponible"}
          </Badge>
        </div>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardId}>{prop.id}</p>
        <h3 className={dark ? `${styles.cardTitle} ${styles.cardTitleDark}` : styles.cardTitle}>{prop.titulo}</h3>
        <p className={dark ? `${styles.cardLocation} ${styles.cardLocationDark}` : styles.cardLocation}>{prop.ubicacion}</p>

        <div className={styles.chips}>
          {chips.map((chip) => <Chip key={chip} dark={dark}>{chip}</Chip>)}
        </div>

        <div className={dark ? `${styles.cardFooter} ${styles.cardFooterDark}` : styles.cardFooter}>
          <div>
            <p className={dark ? `${styles.price} ${styles.priceDark}` : styles.price}>
              {prop.unidad} {prop.precio}
            </p>
            <p className={dark ? `${styles.priceMeta} ${styles.priceMetaDark}` : styles.priceMeta}>
              {prop.estado === "vendida" ? "Precio de cierre" : "Precio publicado"}
            </p>
          </div>
          {prop.estado === "vendida" ? (
            <span className={styles.cardLinkMuted}>Vendido</span>
          ) : (
            <Link href={prop.href} className={styles.cardLink}>
              Ver mas →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PropiedadesPage() {
  const paine = featuredProperties[1];

  const disponibles = [
    toCardData(paine, "verde", { dormitorios: 4, banos: 2 })
  ];

  const vendidas = [
    toCardData(featuredProperties[0], "azul", { dormitorios: 1, banos: 1, tiempoVenta: "En 3 semanas" }),
    {
      id: "FB-LAS-007",
      titulo: "Casa Familiar - Las Condes",
      ubicacion: "Las Condes · Santiago",
      dormitorios: 4,
      banos: 3,
      metros: "220 m²",
      precio: "9.800",
      unidad: "UF",
      estado: "vendida",
      tiempoVenta: "En 5 semanas",
      colorImg: "cafe",
      image: "/images/casa-las-condes-01.jpg",
      href: "/propiedades"
    },
    {
      id: "FB-BUIN-003",
      titulo: "Casa con Jardin - Sector tranquilo",
      ubicacion: "Buin · Region Metropolitana",
      dormitorios: 3,
      banos: 2,
      metros: "180 m²",
      precio: "2.800",
      unidad: "UF",
      estado: "vendida",
      tiempoVenta: "En 2 semanas",
      colorImg: "verde",
      image: "/images/casa-vitacura.jpg",
      href: "/propiedades"
    }
  ];

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.heroSection}>
          <div
            className={styles.darkAmbient}
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 80% 0%, rgba(185,140,60,0.09) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(30,60,120,0.15) 0%, transparent 55%)"
            }}
          />

          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <span className={styles.heroPill}>
                  <span className={styles.heroPillDot}></span>
                  Propiedades
                </span>

                <h1 className={styles.heroTitle}>
                  Propiedades con una presentacion <em>mas seria</em> y mas facil de vender
                </h1>

                <p className={styles.heroLead}>
                  Cada propiedad que tomamos se presenta con narrativa, criterio y una imagen que se diferencia desde el primer vistazo.
                </p>

                <div className={styles.heroStats}>
                  <div className={styles.heroStat}>
                    <p>1</p>
                    <span>En venta</span>
                  </div>
                  <div className={styles.heroStat}>
                    <p>3</p>
                    <span>Vendidas</span>
                  </div>
                  <div className={styles.heroStat}>
                    <p>2%</p>
                    <span>Comision</span>
                  </div>
                </div>
              </div>

              <article className={styles.heroCard}>
                <div className={`${styles.heroCardImage} ${styles.imgVerde}`}>
                  {paine.image ? (
                    <img
                      src={paine.image}
                      alt={paine.title}
                      className={styles.heroCardPhoto}
                    />
                  ) : null}
                  <div className={styles.cardImageOverlay}></div>
                  <div className={styles.cardBadgeWrap}>
                    <Badge>Destacada</Badge>
                  </div>
                </div>

                <div className={styles.heroCardBody}>
                  <p className={styles.cardId}>{paine.id}</p>
                  <h3 className={`${styles.cardTitle} ${styles.cardTitleDark}`}>{paine.title}</h3>
                  <p className={`${styles.cardLocation} ${styles.cardLocationDark}`}>{paine.location}</p>

                  <div className={styles.chips}>
                    {["4 dorm.", "2 baños", "5.000 m² terreno"].map((chip) => <Chip key={chip} dark>{chip}</Chip>)}
                  </div>

                  <div className={`${styles.cardFooter} ${styles.cardFooterDark}`}>
                    <p className={`${styles.price} ${styles.priceDark}`}>UF 7.500</p>
                    <Link href={paine.href} className={styles.heroButton}>
                      Ver propiedad
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.lightSection}>
          <div className={`container ${styles.sectionContainer}`}>
            <SectionHeader
              title={<>Lo que hoy conviene <em className={styles.inlineEm}>destacar</em> primero</>}
              sub="Propiedades activas con mayor potencial de cierre y mejor lectura comercial."
              linkText="Ver todas →"
            />
            <div className={`${styles.cardsGrid} ${styles.cardsGridSingle}`}>
              {disponibles.map((prop) => <PropCard key={prop.id} prop={prop} />)}
            </div>
          </div>
        </section>

        <section className={styles.darkSection}>
          <div
            className={styles.darkAmbient}
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 80% 0%, rgba(185,140,60,0.09) 0%, transparent 55%), radial-gradient(ellipse 40% 50% at 10% 100%, rgba(30,60,120,0.15) 0%, transparent 55%)"
            }}
          />
          <div className={`container ${styles.sectionContainer} ${styles.sectionContainerDark}`}>
            <SectionHeader
              title={<>Casos cerrados que tambien <em className={styles.inlineEm}>construyen</em> confianza</>}
              sub="Propiedades vendidas con resultados concretos. Cada cierre habla de gestion real."
              linkText="Ver historial →"
              dark
            />
            <div className={styles.cardsGrid}>
              {vendidas.map((prop) => <PropCard key={prop.id} prop={prop} dark />)}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
