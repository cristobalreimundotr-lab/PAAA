import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/images/logo-familybrothers-horizontal.png" alt="FamilyBrothers" className="footer-logo" width="200" />
            <p className="footer-tagline">Comisión 2% con respaldo legal</p>
          </div>

          <div className="footer-links">
            <Link href="/#inicio">Inicio</Link>
            <Link href="/propiedades">Propiedades</Link>
            <Link href="/#calculadora">Calculadora</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FamilyBrothers. Todos los derechos reservados.</p>
          <p className="footer-legal">Las Condes, Santiago de Chile</p>
        </div>
      </div>
    </footer>
  );
}
