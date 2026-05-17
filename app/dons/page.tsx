export default function DonsPage() {

  return (
    <main
      style={{
        background: "#f3f6fb",
        minHeight: "100vh",
      }}
    >

      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "140px 30px 120px",
          background:
            "linear-gradient(135deg, #062b66 0%, #0f172a 100%)",
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 40%)",
          }}
        />

        <div
          style={{
            maxWidth: 1250,
            margin: "auto",
            position: "relative",
            zIndex: 2,
          }}
        >

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background:
                "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.15)",
              color: "white",
              padding: "12px 22px",
              borderRadius: 999,
              marginBottom: 35,
              fontWeight: 600,
              backdropFilter: "blur(12px)",
            }}
          >
            Engagement citoyen indépendant
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(420px, 1fr))",
              gap: 60,
              alignItems: "center",
            }}
          >

            {/* TEXTE */}
            <div>

              <h1
                style={{
                  fontSize: 78,
                  lineHeight: 0.95,
                  color: "white",
                  marginBottom: 35,
                  fontWeight: 800,
                  letterSpacing: -2,
                }}
              >
                Soutenir
                <br />
                une campagne
                <br />
                indépendante
              </h1>

              <p
                style={{
                  fontSize: 22,
                  lineHeight: 1.9,
                  color:
                    "rgba(255,255,255,0.88)",
                  maxWidth: 760,
                }}
              >
                Cette campagne ne repose sur
                aucun appareil politique national.
                Elle repose avant tout sur les habitants,
                le terrain et la volonté de construire
                une démocratie plus proche des citoyens.
              </p>

            </div>

            {/* CARTE DON */}
            <div
              style={{
                background: "white",
                borderRadius: 36,
                padding: 42,
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.22)",
              }}
            >

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1e3a8a",
                  marginBottom: 18,
                }}
              >
                Soutenir la campagne
              </div>

              <h2
                style={{
                  fontSize: 42,
                  lineHeight: 1.1,
                  marginBottom: 20,
                  color: "#111827",
                }}
              >
                Chaque soutien compte
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: 1.9,
                  fontSize: 17,
                  marginBottom: 35,
                }}
              >
                Votre participation permet de financer
                les déplacements, les réunions publiques,
                les outils numériques citoyens
                et la présence sur le terrain.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, 1fr)",
                  gap: 16,
                  marginBottom: 20,
                }}
              >

                {[20, 50, 100, 500].map(
                  (montant) => (

                    <button
                      key={montant}
                      style={{
                        background: "#f8fafc",
                        border:
                          "1px solid #dbeafe",
                        padding: "22px",
                        borderRadius: 22,
                        fontWeight: 700,
                        fontSize: 24,
                        color: "#1e3a8a",
                        cursor: "pointer",
                        transition: "0.2s",
                      }}
                    >
                      {montant} €
                    </button>

                  )
                )}

              </div>

              <input
                placeholder="Montant libre"
                style={{
                  width: "100%",
                  padding: "22px",
                  borderRadius: 22,
                  border: "1px solid #d1d5db",
                  background: "#f8fafc",
                  fontSize: 18,
                  marginBottom: 28,
                  outline: "none",
                }}
              />

              <button
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
                  color: "white",
                  border: "none",
                  padding: "22px",
                  borderRadius: 22,
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow:
                    "0 15px 35px rgba(30,58,138,0.28)",
                }}
              >
                Soutenir la campagne
              </button>

              <div
                style={{
                  marginTop: 22,
                  textAlign: "center",
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontSize: 14,
                }}
              >
                Le système de paiement sera activé
                prochainement après validation
                du compte de campagne.
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENU */}
      <section
        style={{
          maxWidth: 1350,
          margin: "auto",
          padding: "90px 30px 120px",
          display: "flex",
          flexDirection: "column",
          gap: 35,
        }}
      >

        {/* FISCAL */}
        <div style={cardStyle}>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              gap: 40,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >

            <div style={{ flex: 1 }}>

              <div style={smallTitle}>
                Transparence fiscale
              </div>

              <h2 style={bigTitle}>
                Les dons ouvrent droit
                à une réduction d’impôt
              </h2>

              <p style={textStyle}>
                Conformément à la législation
                applicable aux campagnes électorales,
                les dons bénéficient d’une réduction
                fiscale de <strong>66%</strong>,
                dans les plafonds prévus par la loi.
              </p>

            </div>

            <div
              style={{
                minWidth: 320,
                background:
                  "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                padding: 35,
                borderRadius: 28,
                border:
                  "1px solid #bfdbfe",
              }}
            >

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1e3a8a",
                  marginBottom: 16,
                }}
              >
                Exemple concret
              </div>

              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1,
                  marginBottom: 18,
                }}
              >
                100 €
              </div>

              <p
                style={{
                  color: "#475569",
                  lineHeight: 1.9,
                  margin: 0,
                  fontSize: 17,
                }}
              >
                Après déduction fiscale,
                un don de 100 €
                vous revient réellement
                à seulement <strong>34 €</strong>.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: 36,
  padding: 50,
  boxShadow:
    "0 18px 45px rgba(0,0,0,0.05)",
};

const smallTitle = {
  color: "#1e3a8a",
  fontWeight: 700,
  marginBottom: 16,
  fontSize: 18,
};

const bigTitle = {
  fontSize: 48,
  lineHeight: 1.15,
  color: "#111827",
  marginBottom: 28,
  maxWidth: 900,
};

const textStyle = {
  color: "#64748b",
  lineHeight: 2,
  fontSize: 18,
  maxWidth: 1000,
};