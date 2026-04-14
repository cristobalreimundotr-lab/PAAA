"use client";

export default function GlobalError({ error, reset }) {
  console.error(error);

  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "40px", background: "#0a0e1a", color: "#ffffff", textAlign: "center" }}>
          <div>
            <p style={{ marginBottom: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4af37", fontSize: "12px", fontWeight: 700 }}>
              FamilyBrothers
            </p>
            <h1 style={{ margin: "0 0 14px", fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              La aplicación encontró un error
            </h1>
            <p style={{ maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.7, color: "rgba(255,255,255,0.72)" }}>
              Recarga la página o vuelve a intentar. Si el problema persiste, seguiré limpiando la base para dejarla estable.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                minHeight: "48px",
                padding: "0 22px",
                borderRadius: "999px",
                border: "none",
                background: "#d4af37",
                color: "#0f172a",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
