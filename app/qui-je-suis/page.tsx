export default function QuiJeSuisPage() {
  return (
    <main
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >

      {/* HERO FULL WIDTH */}
      <section
        style={{
          width: "100%",
          background:
            "linear-gradient(135deg, #062b66 0%, #0f172a 100%)",
          color: "white",
          padding: "140px 24px 120px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.05)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.04)",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >

          <div
            style={{
              display: "inline-block",
              background:
                "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.15)",
              padding: "12px 20px",
              borderRadius: 999,
              fontWeight: "bold",
              marginBottom: 30,
              backdropFilter: "blur(10px)",
            }}
          >
            Élections législatives 2027
          </div>

          <h1
            style={{
              fontSize: "clamp(52px, 8vw, 96px)",
              lineHeight: 1,
              marginBottom: 40,
              fontWeight: 800,
            }}
          >
            Virgile Flores
          </h1>

          <p
            style={{
              fontSize: 28,
              lineHeight: 1.8,
              maxWidth: 900,
              margin: "0 auto",
              opacity: 0.92,
            }}
          >
            Entrepreneur, investisseur local
            et citoyen engagé,
            je souhaite défendre une politique
            plus proche des habitants,
            plus concrète
            et plus participative.
          </p>

        </div>

      </section>

      {/* INTRO */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "100px 24px",
        }}
      >

        <div
          style={{
            background: "white",
            borderRadius: 32,
            padding: "70px 60px",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.06)",
          }}
        >

          <div
            style={{
              color: "#1e3a8a",
              fontWeight: "bold",
              marginBottom: 24,
              fontSize: 14,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Mon parcours
          </div>

          <h2
            style={{
              fontSize: "clamp(38px, 5vw, 62px)",
              lineHeight: 1.1,
              color: "#0f172a",
              marginBottom: 40,
            }}
          >
            Un parcours construit
            par le travail
            et l’expérience du terrain.
          </h2>

          <p style={textStyle}>
            Je m’appelle Virgile Flores,
            je suis né le 28 juin 1980 à Ajaccio, en Corse.
          </p>

          <p style={textStyle}>
            Mon parcours professionnel a toujours été guidé
            par le travail, l’adaptation et l’envie d’avancer.
            J’ai exercé plusieurs métiers :
            à la CCAS de Porticcio,
            facteur à La Poste,
            chef de chantier,
            entrepreneur dans l’animation
            et gérant de la partie bar-restauration
            d’un complexe sportif.
          </p>

          <p style={textStyle}>
            Le sport a également joué un rôle important dans ma vie,
            particulièrement le tennis pratiqué en compétition pendant
            de nombreuses années.
            Il m’a appris la rigueur,
            le dépassement de soi
            et la persévérance.
          </p>

        </div>

      </section>

      {/* SUISSE */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px 100px",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            alignItems: "center",
          }}
        >

          <img
            src="https://images.openai.com/static-rsc-4/yxm4990nFvcrF-Zhp-RB-Yd_UCC68NzvfhtvhzFYVB-IYPgh3fba5FRAMAPEeVbqiSNOtTY7w4YVGPK3_vCgS5o4SeOb_3ZCeZajyFWGK4EIDc9WAtHthktu8aeTjkBXGbChyQvS9-Ndmnd7av4108eI5BErg9tb2V9h4oOB4bt9bgiYxoLBdNeok-0zIRBq?purpose=fullsize"
            alt="Châtellerault"
            style={{
              width: "100%",
              height: 500,
              objectFit: "cover",
              borderRadius: 30,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.12)",
            }}
          />

          <div>

            <div
              style={{
                color: "#1e3a8a",
                fontWeight: "bold",
                marginBottom: 20,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Une nouvelle vie
            </div>

            <h2
              style={{
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.1,
                marginBottom: 30,
                color: "#0f172a",
              }}
            >
              De la Corse
              à la Vienne.
            </h2>

            <p style={textStyle}>
              En 2014, à l’âge de 34 ans,
              j’ai décidé de quitter la Corse
              pour partir en Suisse.
            </p>

            <p style={textStyle}>
              Pendant près de dix ans,
              j’ai travaillé chez SOS OXYGÈNE,
              où j’ai évolué de technicien à responsable.
            </p>

            <p style={textStyle}>
              Durant cette période,
              j’ai commencé à investir en France
              avec l’envie de trouver un territoire dynamique,
              accessible et à taille humaine.
            </p>

            <p style={textStyle}>
  En 2017,
  j’ai découvert Châtellerault
  à l’occasion de la visite d’un immeuble.
  J’ai immédiatement eu un véritable coup de cœur
  pour la ville,
  son potentiel,
  sa qualité de vie
  et plus largement pour toute la région.
</p>

<p style={textStyle}>
  Au fil des années,
  j’ai continué à investir localement
  et à découvrir le territoire.
</p>

<p style={textStyle}>
  En 2024,
  avec ma compagne,
  nous avons décidé de nous installer
  définitivement dans la région,
  à Senillé-Saint-Sauveur,
  où nous sommes aujourd’hui très heureux.
</p>

<p style={textStyle}>
  Ma compagne travaille
  au centre thermal de La Roche-Posay,
  un établissement reconnu
  et emblématique de notre territoire.
</p>

<p style={textStyle}>
  Depuis notre arrivée,
  nous prenons beaucoup de plaisir
  à découvrir les communes,
  les paysages
  et la richesse du patrimoine local.
</p>

          </div>

        </div>

      </section>

      {/* ENGAGEMENT */}
      <section
        style={{
          background: "white",
          padding: "120px 24px",
        }}
      >

        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
          }}
        >

          <div
            style={{
              color: "#1e3a8a",
              fontWeight: "bold",
              marginBottom: 20,
              fontSize: 14,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Engagement politique
          </div>

          <h2
            style={{
              fontSize: "clamp(40px, 6vw, 68px)",
              lineHeight: 1.1,
              marginBottom: 40,
              color: "#0f172a",
            }}
          >
            Redonner la parole
            aux citoyens.
          </h2>

          <p
            style={{
              fontSize: 22,
              lineHeight: 2,
              color: "#475569",
              marginBottom: 30,
            }}
          >
            Pendant longtemps,
            la politique ne m’intéressait pas.
            Comme beaucoup de Français,
            j’avais le sentiment que les partis traditionnels
            étaient déconnectés du quotidien des habitants.
          </p>

          <p
            style={{
              fontSize: 22,
              lineHeight: 2,
              color: "#475569",
              marginBottom: 30,
            }}
          >
            Mon expérience locale à Châtellerault
            et les rencontres avec les habitants
            m’ont progressivement convaincu
            qu’il fallait une politique
            plus proche du terrain,
            plus sincère
            et plus participative.
          </p>

          <p
            style={{
              fontSize: 22,
              lineHeight: 2,
              color: "#475569",
            }}
          >
            C’est dans cet esprit
            que j’ai décidé de me présenter
            aux élections législatives de 2027
            dans la 4ᵉ circonscription de la Vienne.
          </p>

        </div>

      </section>

    </main>
  );
}

const textStyle = {
  fontSize: 20,
  lineHeight: 2,
  color: "#475569",
  marginBottom: 28,
};