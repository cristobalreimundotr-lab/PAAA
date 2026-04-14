"use client";

export default function Error({ error, reset }) {
  console.error(error);

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "40px", background: "#f8fafc", color: "#0f172a", textAlign: "center" }}>
      <div>
        <p style={{ marginBottom: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#b8941f", fontSize: "12px", fontWeight: 700 }}>
          Error
        </p>
        <h1 style={{ margin: "0 0 14px", fontFamily: "var(--font-playfair)", fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          Algo salió mal
        </h1>
        <p style={{ maxWidth: "560px", margin: "0 auto 24px", lineHeight: 1.7, color: "#475569" }}>
          Hubo un problema cargando esta página. Puedes intentar nuevamente.
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
  );
}
