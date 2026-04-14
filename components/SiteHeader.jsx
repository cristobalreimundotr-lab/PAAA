"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader({ home = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (id) => (home ? `#${id}` : `/#${id}`);

  return (
    <header id="mainHeader" className={scrolled ? "scrolled" : ""}>
      <div className="container nav" role="navigation" aria-label="Principal">
        <Link className="brand" href={home ? "#inicio" : "/"}>
          <img
            src="/images/logo-familybrothers-horizontal.png"
            alt="FamilyBrothers Propiedades"
            className="brand-mark"
            width="300"
            height="100"
          />
        </Link>

        <button
          id="menuBtn"
          className="menu-btn"
          aria-label="Abrir menú"
          aria-controls="siteNav"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="hamburger"></span>
          <span className="menu-text">Menú</span>
        </button>

        <nav id="siteNav" className={open ? "open" : ""}>
          <ul>
            <li><Link className="nav-link" href={href("seguridad")} onClick={() => setOpen(false)}>Seguridad</Link></li>
            <li><Link className="nav-link" href="/quienes-somos" onClick={() => setOpen(false)}>Quiénes somos</Link></li>
            <li><Link className="nav-link" href={href("calculadora")} onClick={() => setOpen(false)}>Calculadora</Link></li>
            <li><Link className="nav-link" href="/propiedades" onClick={() => setOpen(false)}>Publicaciones</Link></li>
            <li><Link className="nav-link" href={href("faq")} onClick={() => setOpen(false)}>Preguntas</Link></li>
            <li><Link className="nav-link" href={href("contacto")} onClick={() => setOpen(false)}>Contacto</Link></li>
          </ul>
        </nav>

        <Link className="btn btn-primary" href={href("contacto")}>
          <span>Cotizar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
