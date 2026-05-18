export default function AdminDonsPage() {
  return (
    <div
      style={{
        padding: 40,
      }}
    >

      <h1
        style={{
          fontSize: 36,
          marginBottom: 10,
          color: "#111827",
        }}
      >
        Gestion des dons
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: 40,
          fontSize: 18,
        }}
      >
        Retrouvez ici les dons effectués sur la plateforme.
      </p>

      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 40,
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >

        <h2
          style={{
            marginBottom: 20,
            color: "#062b66",
          }}
        >
          Aucun don pour le moment
        </h2>

        <p
          style={{
            color: "#6b7280",
            lineHeight: 1.8,
          }}
        >
          Cette section affichera automatiquement
          les dons lorsque le système de paiement
          sera configuré.
        </p>

      </div>

    </div>
  );
}