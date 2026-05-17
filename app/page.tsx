"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [propositions, setPropositions] =
    useState<any[]>([]);
  const [votes, setVotes] = useState<any[]>([]);

  useEffect(() => {
  getUser();
  getPropositions();
  getVotes();
}, []);

  async function getUser() {
    const { data } =
      await supabase.auth.getUser();

    setUser(data.user);
  }

  async function getPropositions() {

  const { data } = await supabase
    .from("consultations")
    .select("*")
    .eq("active", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(4);

  if (data) {
    setPropositions(data);
  }
}

  async function getVotes() {
    const { data } = await supabase
      .from("votes")
      .select("*");

    setVotes(data || []);
  }

  async function voter(
  propositionId: number,
  choix: string
) {
  if (!user) {
    return;
  }

  const voteExistant = votes.find(
    (v) =>
      v.user_id === user.id &&
      v.consultation_id === propositionId
  );

  if (voteExistant) {

    await supabase
      .from("votes")
      .update({
        choix,
      })
      .eq("id", voteExistant.id);

  } else {

    await supabase
      .from("votes")
      .insert({
        consultation_id: propositionId,
        user_id: user.id,
        choix,
      });
  }

  await getVotes();
}

  function getPourcentage(
  propositionId: number,
  choix: string
) {

  const votesProposition =
    votes.filter(
      (v) =>
        v.consultation_id ===
        propositionId
    );

  if (votesProposition.length === 0) {
    return 0;
  }

  const total =
    votesProposition.length;

  const nombre =
    votesProposition.filter(
      (v) => v.choix === choix
    ).length;

  return Math.round(
    (nombre / total) * 100
  );
}

  return (
    <main
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      {/* HERO */}
      <section
        style={{
          padding: "70px 60px",
          background:
            "linear-gradient(135deg, #dbeafe 0%, #eef2ff 100%)",
        }}
      >

        <div
          style={{
            maxWidth: 1400,
            margin: "auto",
            display: "grid",
            gridTemplateColumns:
              "1.1fr 0.9fr",
            gap: 80,
            alignItems: "center",
          }}
        >

          {/* TEXTE */}
          <div>

            <h1
              style={{
                fontSize: 78,
                lineHeight: 1,
                color: "#1e2a78",
                marginBottom: 40,
                letterSpacing: "-2px",
              }}
            >
              À vos côtés,
              <br />
              pour
              <br />
              Châtellerault
              <br />
              et pour la
              <br />
              France.
            </h1>

            <p
              style={{
                fontSize: 22,
                lineHeight: 1.8,
                color: "#4b5563",
                maxWidth: 700,
                marginBottom: 35,
              }}
            >
              Une plateforme citoyenne moderne pour consulter,
              participer et construire ensemble des solutions
              concrètes pour notre territoire.
            </p>

          </div>

          {/* IMAGE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >

            <img
              src="/affiche-campagne.jpeg"
              alt="Virgile Flores"
              style={{
                width: "100%",
                maxWidth: 420,
                borderRadius: 24,
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.18)",
              }}
            />

          </div>

        </div>

      </section>

      {/* CONSULTATIONS */}
      <section
        style={{
          padding: "0 60px 100px",
        }}
      >

        <div
          style={{
            maxWidth: 1400,
            margin: "auto",
          }}
        >

          <h2
            style={{
              fontSize: 54,
              color: "#1e2a78",
              marginBottom: 40,
            }}
          >
            Consultations citoyennes
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 30,
            }}
          >

            {propositions.map((item) => {
              const oui =
                getPourcentage(
                  item.id,
                  "oui"
                );

              const non =
                getPourcentage(
                  item.id,
                  "non"
                );

              const abstention =
                getPourcentage(
                  item.id,
                  "abstention"
                );

              return (
                <div
                  key={item.id}
                  style={{
                    background: "white",
                    borderRadius: 24,
                    padding: 35,
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.05)",
                  }}
                >

                  <div
                    style={{
                      display: "inline-block",
                      background: "#eef2ff",
                      color: "#1e2a78",
                      padding: "8px 14px",
                      borderRadius: 999,
                      fontWeight: "bold",
                      marginBottom: 20,
                      fontSize: 14,
                    }}
                  >
                    Consultation citoyenne
                  </div>

                  <h2
                    style={{
                      fontSize: 32,
                      marginBottom: 15,
                      color: "#111827",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      color: "#6b7280",
                      lineHeight: 1.8,
                      marginBottom: 30,
                    }}
                  >
                    {item.description}
                  </p>

                  <Barre
                    label="Oui"
                    valeur={oui}
                    couleur="#16a34a"
                    fond="#dcfce7"
                  />

                  <Barre
                    label="Non"
                    valeur={non}
                    couleur="#dc2626"
                    fond="#fee2e2"
                  />

                  <Barre
                    label="Abstention"
                    valeur={abstention}
                    couleur="#6b7280"
                    fond="#e5e7eb"
                  />

                  {user ? (

                    <div
                      style={{
                        display: "flex",
                        gap: 15,
                        marginTop: 30,
                      }}
                    >

                      <button
                        onClick={() =>
                          voter(
                            item.id,
                            "oui"
                          )
                        }
                        style={boutonVert}
                      >
                        Oui
                      </button>

                      <button
                        onClick={() =>
                          voter(
                            item.id,
                            "non"
                          )
                        }
                        style={boutonRouge}
                      >
                        Non
                      </button>

                      <button
                        onClick={() =>
                          voter(
                            item.id,
                            "abstention"
                          )
                        }
                        style={boutonGris}
                      >
                        Abstention
                      </button>

                    </div>

                  ) : (

                    <a
                      href="/connexion"
                      style={{
                        display: "block",
                        marginTop: 30,
                        textAlign: "center",
                        background: "#1e2a78",
                        color: "white",
                        padding: "16px",
                        borderRadius: 14,
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Se connecter pour voter
                    </a>

                  )}

                </div>
              );
            })}

          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 50,
            }}
          >

            <a
              href="/consultations"
              style={{
                display: "inline-block",
                background: "#1e2a78",
                color: "white",
                padding: "18px 28px",
                borderRadius: 14,
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Voir toutes les consultations
            </a>

          </div>

        </div>

      </section>

      {/* SECTION PROJET */}
      <section
        style={{
          padding: "40px 60px 120px",
        }}
      >

        <div
          style={{
            maxWidth: 1400,
            margin: "auto",
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
            borderRadius: 40,
            overflow: "hidden",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.18)",
          }}
        >

          {/* HERO INTERNE */}
          <div
            style={{
              padding: "80px 70px",
              position: "relative",
            }}
          >

            <div
              style={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 320,
                height: 320,
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,0.06)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
              }}
            >

              <div
                style={{
                  display: "inline-block",
                  background:
                    "rgba(255,255,255,0.12)",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 999,
                  fontWeight: "bold",
                  marginBottom: 25,
                }}
              >
                Élections législatives – 4e circonscription de la Vienne
              </div>

              <h2
  style={{
    fontSize: 78,
    lineHeight: 1.1,
    color: "white",
    marginBottom: 40,
    textAlign: "center",
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  Une démocratie
  <br />
  plus proche,
  <br />
  un territoire
  <br />
  plus fort.
</h2>

              <p
  style={{
    fontSize: 26,
    lineHeight: 2,
    color:
      "rgba(255,255,255,0.86)",
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "center",
  }}
>
  Aujourd’hui, beaucoup de citoyens ont le sentiment
  que les décisions politiques se prennent loin d’eux,
  que leur quotidien est insuffisamment entendu
  et que leur voix ne compte plus réellement entre deux élections.

  <br />
  <br />

  Cette distance progressive entre les citoyens
  et les institutions nourrit la défiance,
  le découragement et parfois même le sentiment
  d’abandon dans de nombreux territoires.

  <br />
  <br />

  Je souhaite défendre une autre manière d’exercer
  le mandat de député :
  plus proche du terrain,
  plus transparente,
  plus moderne
  et davantage connectée aux réalités concrètes
  des habitants de notre circonscription.

  <br />
  <br />

  Mon objectif est également de redonner davantage
  de place à la parole citoyenne dans la vie démocratique.
  Grâce à cette plateforme,
  les habitants pourront être consultés,
  donner leur avis
  et participer aux grandes réflexions
  sur les textes et les lois débattus à l’Assemblée nationale.

  <br />
  <br />

  Ces consultations citoyennes n’ont pas vocation
  à remplacer le rôle du député,
  mais à mieux éclairer ses décisions
  grâce à l’expérience,
  aux attentes
  et aux réalités vécues sur le terrain.
</p>

            </div>

          </div>

          {/* IMAGE */}
          <div
            style={{
              position: "relative",
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1800&auto=format&fit=crop"
              alt="Citoyens"
              style={{
                width: "100%",
                height: 500,
                objectFit: "cover",
                display: "block",
              }}
            />

          </div>

        </div>

      </section>

    </main>
  );
}

function Barre({
  label,
  valeur,
  couleur,
  fond,
}: any) {
  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: 8,
          fontWeight: "bold",
        }}
      >
        <span
          style={{
            color: couleur,
          }}
        >
          {label}
        </span>

        <span>
          {valeur}%
        </span>
      </div>

      <div
        style={{
          height: 14,
          background: fond,
          borderRadius: 999,
          overflow: "hidden",
        }}
      >

        <div
          style={{
            width: `${valeur}%`,
            height: "100%",
            background: couleur,
          }}
        />

      </div>

    </div>
  );
}

const boutonVert = {
  flex: 1,
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 12,
  fontWeight: "bold",
  cursor: "pointer",
};

const boutonRouge = {
  flex: 1,
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 12,
  fontWeight: "bold",
  cursor: "pointer",
};

const boutonGris = {
  flex: 1,
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 12,
  fontWeight: "bold",
  cursor: "pointer",
};