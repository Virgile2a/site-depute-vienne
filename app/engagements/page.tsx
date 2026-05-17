export default function EngagementsPage() {
  const sections = [
    {
      title: "Démocratie participative & transparence",
      subtitle: "Redonner la parole aux citoyens",
      text: "Je souhaite instaurer un lien permanent entre les habitants et leur député. Une démocratie moderne doit associer davantage les citoyens aux grandes décisions nationales et locales.",
      points: [
        "Consultations citoyennes sur les grands textes débattus à l’Assemblée nationale",
        "Publication claire de mes votes et de mes positions",
        "Réunions publiques régulières dans toute la circonscription",
        "Dialogue permanent avec les habitants, associations et acteurs locaux",
      ],
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Santé & accès aux soins",
      subtitle: "Garantir l’égalité territoriale",
      text: "L’accès aux soins devient chaque année plus difficile dans notre territoire. La santé doit redevenir une priorité nationale et territoriale.",
      points: [
        "Développement des maisons de santé pluriprofessionnelles",
        "Renforcement des capacités de formation médicale",
        "Incitation à l’installation dans les territoires sous-dotés",
        "Développement de la télémédecine lorsque cela est pertinent",
      ],
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Emploi, économie & attractivité",
      subtitle: "Défendre l’activité du territoire",
      text: "Notre territoire possède des savoir-faire et des entreprises fortes. Il faut défendre l’emploi local et renforcer l’attractivité économique de la circonscription.",
      points: [
        "Soutien aux entreprises locales, artisans et commerces",
        "Défense de l’emploi industriel et des savoir-faire",
        "Développement de l’attractivité pour les jeunes actifs",
        "Valorisation des initiatives locales et de l’innovation",
      ],
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto",
    },
    {
      title: "Agriculture & ruralité",
      subtitle: "Défendre nos campagnes",
      text: "L’agriculture est un pilier essentiel de notre territoire et de notre souveraineté alimentaire.",
      points: [
        "Maintien d’une agriculture viable et rémunératrice",
        "Accompagnement des jeunes agriculteurs",
        "Valorisation des circuits courts et productions locales",
        "Maintien des services publics dans les communes rurales",
      ],
      image:
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Mobilité & désenclavement",
      subtitle: "Mieux relier les territoires",
      text: "L’accès à l’emploi, aux soins et aux services dépend aussi de notre capacité à mieux connecter les territoires.",
      points: [
        "Amélioration des transports entre les communes",
        "Désenclavement des zones rurales",
        "Meilleure connexion aux bassins d’emploi",
        "Solutions adaptées aux réalités locales",
      ],
      image:
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  return (
    <main
      style={{
        background: "#f8fafc",
      }}
    >

      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1800&auto=format&fit=crop"
          alt="Rencontre citoyenne"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(6,43,102,0.92) 0%, rgba(6,43,102,0.72) 50%, rgba(6,43,102,0.55) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: "auto",
            padding: "120px 40px",
            color: "white",
            textAlign: "center",
          }}
        >

          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              marginBottom: 30,
              fontWeight: "bold",
            }}
          >
            Profession de foi — Élections législatives 2026
          </div>

          <h1
            style={{
              fontSize: 76,
              lineHeight: 1,
              maxWidth: "100%",
              marginBottom: 35,
              fontWeight: 800,
            }}
          >
            Une démocratie plus proche,
            <br />
            un territoire plus fort.
          </h1>

          <p
            style={{
              maxWidth: 820,
              fontSize: 22,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.92)",
              marginBottom: 45,
            }}
          >
            Je souhaite porter une autre manière d’exercer le mandat de député :
            plus transparente, plus proche du terrain et plus connectée aux
            réalités de notre territoire.
          </p>

          <div
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >

            <a
              href="/consultations"
              style={{
                background: "white",
                color: "#062b66",
                padding: "18px 28px",
                borderRadius: 18,
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 17,
              }}
            >
              Participer aux consultations
            </a>

            <a
              href="/contact"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                padding: "18px 28px",
                borderRadius: 18,
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 17,
                backdropFilter: "blur(12px)",
              }}
            >
              Me contacter
            </a>

          </div>

        </div>

      </section>

      {/* INTRO */}
      <section
        style={{
          maxWidth: 1200,
          margin: "auto",
          padding: "100px 30px 40px",
          textAlign: "center",
        }}
      >

        <h2
          style={{
            fontSize: 54,
            color: "#111827",
            marginBottom: 30,
          }}
        >
          Mes engagements
        </h2>

        <p
          style={{
            fontSize: 22,
            lineHeight: 1.9,
            color: "#6b7280",
            maxWidth: 950,
            margin: "auto",
          }}
        >
          Mon objectif est simple : faire en sorte que les habitants soient
          davantage écoutés, que notre territoire soit davantage défendu et que
          les décisions nationales prennent enfin mieux en compte la réalité du
          terrain.
        </p>

      </section>

      {/* SECTIONS */}
      <section
        style={{
          maxWidth: 1450,
          margin: "auto",
          padding: "40px 30px 120px",
          display: "flex",
          flexDirection: "column",
          gap: 90,
        }}
      >

        {sections.map((section, index) => (
          <div
            key={section.title}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(420px, 1fr))",
              gap: 50,
              alignItems: "center",
            }}
          >

            {/* IMAGE */}
            <div
              style={{
                order: index % 2 === 0 ? 1 : 2,
              }}
            >

              <img
                src={section.image}
                alt={section.title}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                  borderRadius: 36,
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.12)",
                }}
              />

            </div>

            {/* TEXTE */}
            <div
              style={{
                order: index % 2 === 0 ? 2 : 1,
              }}
            >

              <div
                style={{
                  display: "inline-block",
                  background: "#dbeafe",
                  color: "#1e3a8a",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: "bold",
                  marginBottom: 25,
                }}
              >
                Axe {index + 1}
              </div>

              <h2
                style={{
                  fontSize: 48,
                  lineHeight: 1.1,
                  marginBottom: 18,
                  color: "#111827",
                }}
              >
                {section.title}
              </h2>

              <h3
                style={{
                  fontSize: 24,
                  color: "#1e3a8a",
                  marginBottom: 28,
                }}
              >
                {section.subtitle}
              </h3>

              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.9,
                  color: "#6b7280",
                  marginBottom: 35,
                }}
              >
                {section.text}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >

                {section.points.map((point) => (
                  <div
                    key={point}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      background: "white",
                      padding: "18px 22px",
                      borderRadius: 20,
                      boxShadow:
                        "0 6px 20px rgba(0,0,0,0.04)",
                    }}
                  >

                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        background: "#2563eb",
                        marginTop: 7,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        color: "#374151",
                        fontSize: 17,
                        lineHeight: 1.7,
                        fontWeight: 500,
                      }}
                    >
                      {point}
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        ))}

      </section>

      {/* CTA FINAL */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #062b66 0%, #0f172a 100%)",
          padding: "120px 30px",
          textAlign: "center",
          color: "white",
        }}
      >

        <div
          style={{
            maxWidth: 1000,
            margin: "auto",
          }}
        >

          <h2
            style={{
              fontSize: 62,
              lineHeight: 1.1,
              marginBottom: 30,
            }}
          >
            Ensemble, faisons entendre
            la voix du territoire.
          </h2>

          <p
            style={{
              fontSize: 22,
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.82)",
              marginBottom: 45,
            }}
          >
            Je souhaite exercer ce mandat avec proximité,
            responsabilité et transparence.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >

            <a
              href="/consultations"
              style={{
                background: "white",
                color: "#062b66",
                padding: "18px 28px",
                borderRadius: 18,
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 17,
              }}
            >
              Participer aux consultations
            </a>

            <a
              href="/contact"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "white",
                padding: "18px 28px",
                borderRadius: 18,
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 17,
              }}
            >
              Me contacter
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}
