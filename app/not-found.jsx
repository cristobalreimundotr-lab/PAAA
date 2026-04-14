import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="section" style={{ paddingTop: 180 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag">404</span>
          <h1 className="section-title">Página no encontrada</h1>
          <p className="section-subtitle" style={{ margin: "0 auto 24px" }}>
            La ruta que buscabas no existe dentro de la nueva base Next.js.
          </p>
          <Link href="/" className="btn btn-gold">Volver al inicio</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
