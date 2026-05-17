"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactPage() {

  const [typeDemande, setTypeDemande] =
    useState("Question générale");

  const [prenom, setPrenom] =
    useState("");

  const [nom, setNom] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [telephone, setTelephone] =
    useState("");

  const [sujet, setSujet] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [commune, setCommune] =
    useState("");

  const [participants, setParticipants] =
    useState("");

  const [formatReunion, setFormatReunion] =
    useState("");

  async function envoyerMessage() {

    await supabase
      .from("contacts")
      .insert([
        {
          prenom,
          nom,
          email,
          telephone,
          type_demande:
            typeDemande,
          sujet,
          message,
          commune,
          participants,
          format_reunion:
            formatReunion,
        },
      ]);

    alert(
      "Votre message a bien été envoyé."
    );

    setPrenom("");
    setNom("");
    setEmail("");
    setTelephone("");
    setSujet("");
    setMessage("");
    setCommune("");
    setParticipants("");
    setFormatReunion("");
  }

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
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1800&auto=format&fit=crop"
          alt="Contact"
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
            padding: "120px 30px",
            color: "white",
            textAlign: "center",
          }}
        >

          <div
            style={{
              display: "inline-block",
              padding: "10px 18px",
              borderRadius: 999,
              background:
                "rgba(255,255,255,0.15)",
              backdropFilter:
                "blur(12px)",
              marginBottom: 30,
              fontWeight: "bold",
            }}
          >
            Échanges & proximité
          </div>

          <h1
            style={{
              fontSize: 72,
              lineHeight: 1,
              marginBottom: 35,
              fontWeight: 800,
            }}
          >
            Contact &
            <br />
            réunions privées
          </h1>

          <p
            style={{
              maxWidth: 850,
              margin: "auto",
              fontSize: 22,
              lineHeight: 1.9,
              color:
                "rgba(255,255,255,0.92)",
            }}
          >
            Vous souhaitez poser une
            question, partager une idée,
            signaler un problème local ou
            demander une rencontre privée ?
            Cette campagne doit rester
            proche du terrain et des
            habitants.
          </p>

        </div>

      </section>

      {/* INTRO */}
      <section
        style={{
          maxWidth: 1200,
          margin: "auto",
          padding:
            "100px 30px 40px",
          textAlign: "center",
        }}
      >

        <h2
          style={{
            fontSize: 52,
            color: "#111827",
            marginBottom: 28,
          }}
        >
          Un dialogue direct avec
          les habitants
        </h2>

        <p
          style={{
            fontSize: 21,
            lineHeight: 1.9,
            color: "#6b7280",
            maxWidth: 950,
            margin: "auto",
          }}
        >
          Je souhaite exercer ce
          mandat avec proximité,
          transparence et écoute.
          Il est possible de demander
          une réunion privée afin
          d’échanger directement,
          poser vos questions et
          discuter des enjeux du
          territoire.
        </p>

      </section>

      {/* CONTACT GRID */}
      <section
        style={{
          maxWidth: 1450,
          margin: "auto",
          padding:
            "40px 30px 120px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(420px, 1fr))",
          gap: 40,
          alignItems: "start",
        }}
      >

        {/* FORMULAIRE */}
        <div
          style={{
            background: "white",
            borderRadius: 36,
            padding: 45,
            boxShadow:
              "0 15px 45px rgba(0,0,0,0.06)",
          }}
        >

          <h2
            style={{
              fontSize: 38,
              marginBottom: 15,
              color: "#111827",
            }}
          >
            Formulaire de contact
          </h2>

          <p
            style={{
              color: "#6b7280",
              lineHeight: 1.8,
              marginBottom: 35,
            }}
          >
            Toutes les demandes sont
            étudiées avec attention.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
              }}
            >

              <input
                placeholder="Prénom"
                value={prenom}
                onChange={(e) =>
                  setPrenom(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                placeholder="Nom"
                value={nom}
                onChange={(e) =>
                  setNom(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

            </div>

            <input
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) =>
                setTelephone(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <select
              value={typeDemande}
              onChange={(e) =>
                setTypeDemande(
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option>
                Question générale
              </option>
              <option>
                Problème local
              </option>
              <option>
                Proposition citoyenne
              </option>
              <option>
                Demande de rendez-vous
              </option>
              <option>
                Réunion privée
              </option>
              <option>
                Invitation événement
              </option>
              <option>
                Presse / média
              </option>
            </select>

            {(typeDemande ===
              "Réunion privée" ||
              typeDemande ===
                "Demande de rendez-vous") && (

              <div
                style={{
                  background:
                    "#eff6ff",
                  borderRadius: 24,
                  padding: 30,
                  border:
                    "1px solid #bfdbfe",
                }}
              >

                <h3
                  style={{
                    fontSize: 24,
                    color: "#1e3a8a",
                    marginBottom: 25,
                  }}
                >
                  Informations de
                  rencontre
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 18,
                  }}
                >

                  <input
                    placeholder="Commune"
                    value={commune}
                    onChange={(e) =>
                      setCommune(
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <input
                    placeholder="Nombre de participants"
                    value={participants}
                    onChange={(e) =>
                      setParticipants(
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />

                  <select
                    value={
                      formatReunion
                    }
                    onChange={(e) =>
                      setFormatReunion(
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  >
                    <option>
                      Rencontre physique
                    </option>
                    <option>
                      Téléphone
                    </option>
                    <option>
                      Visioconférence
                    </option>
                  </select>

                </div>

              </div>
            )}

            <input
              placeholder="Sujet"
              value={sujet}
              onChange={(e) =>
                setSujet(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Votre message"
              rows={7}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />

            <button
              onClick={
                envoyerMessage
              }
              style={{
                background:
                  "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
                color: "white",
                border: "none",
                padding: "18px",
                borderRadius: 18,
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 17,
                marginTop: 10,
              }}
            >
              Envoyer la demande
            </button>

          </div>

        </div>

        {/* INFOS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >

          <div
            style={cardStyle}
          >
            <h3 style={cardTitle}>
              Réunions privées
            </h3>

            <p style={cardText}>
              Vous souhaitez échanger
              directement, poser vos
              questions ou discuter de
              votre vision du territoire ?
            </p>

            <p style={cardText}>
              Il est possible de demander
              une rencontre privée ou un
              temps d’échange personnalisé.
            </p>
          </div>

          <div
            style={cardStyle}
          >
            <h3 style={cardTitle}>
              Circonscription
            </h3>

            <p style={cardText}>
              4e circonscription
              de la Vienne
            </p>

            <p style={cardText}>
              Déplacements réguliers
              sur l’ensemble du territoire.
            </p>
          </div>

          <div
            style={{
              overflow: "hidden",
              borderRadius: 36,
              boxShadow:
                "0 15px 45px rgba(0,0,0,0.08)",
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop"
              alt="Réunion"
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
              }}
            />

          </div>

        </div>

      </section>

    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px 20px",
  borderRadius: 18,
  border: "1px solid #d1d5db",
  fontSize: 16,
  outline: "none",
  background: "#f9fafb",
};

const cardStyle = {
  background: "white",
  borderRadius: 30,
  padding: 35,
  boxShadow:
    "0 12px 35px rgba(0,0,0,0.05)",
};

const cardTitle = {
  fontSize: 30,
  color: "#111827",
  marginBottom: 18,
};

const cardText = {
  color: "#6b7280",
  lineHeight: 1.9,
  fontSize: 17,
};