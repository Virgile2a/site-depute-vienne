"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminAgendaPage() {

  const [titre, setTitre] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [lieu, setLieu] =
    useState("");

  const [dateEvenement, setDateEvenement] =
    useState("");

  const [heure, setHeure] =
    useState("");

  const [agenda, setAgenda] =
    useState<any[]>([]);

  useEffect(() => {
    getAgenda();
  }, []);

  async function getAgenda() {

    const { data } = await supabase
      .from("agenda")
      .select("*")
      .order(
        "date_evenement",
        {
          ascending: true,
        }
      );

    if (data) {
      setAgenda(data);
    }
  }

  async function ajouterEvenement() {

    if (
      !titre ||
      !dateEvenement
    ) {
      return;
    }

    await supabase
      .from("agenda")
      .insert([
        {
          titre,
          description,
          lieu,
          date_evenement:
            dateEvenement,
          heure,
        },
      ]);

    setTitre("");
    setDescription("");
    setLieu("");
    setDateEvenement("");
    setHeure("");

    getAgenda();
  }

  async function supprimerEvenement(
    id: number
  ) {

    await supabase
      .from("agenda")
      .delete()
      .eq("id", id);

    getAgenda();
  }

  return (
    <main
      style={{
        padding: 40,
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          maxWidth: 1200,
          margin: "auto",
        }}
      >

        <h1
          style={{
            fontSize: 42,
            marginBottom: 30,
            color: "#111827",
          }}
        >
          Gestion de l’agenda
        </h1>

        {/* FORMULAIRE */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 35,
            marginBottom: 40,
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >

            <input
              placeholder="Titre"
              value={titre}
              onChange={(e) =>
                setTitre(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={5}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />

            <input
              placeholder="Lieu"
              value={lieu}
              onChange={(e) =>
                setLieu(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 18,
              }}
            >

              <input
                type="date"
                value={
                  dateEvenement
                }
                onChange={(e) =>
                  setDateEvenement(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

              <input
                placeholder="Heure"
                value={heure}
                onChange={(e) =>
                  setHeure(
                    e.target.value
                  )
                }
                style={inputStyle}
              />

            </div>

            <button
              onClick={
                ajouterEvenement
              }
              style={{
                background:
                  "#1e3a8a",
                color: "white",
                border: "none",
                padding: "16px",
                borderRadius: 16,
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              Ajouter l’événement
            </button>

          </div>

        </div>

        {/* LISTE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >

          {agenda.map((event) => (

            <div
              key={event.id}
              style={{
                background: "white",
                borderRadius: 24,
                padding: 28,
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.05)",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 20,
                }}
              >

                <div>

                  <h2
                    style={{
                      marginTop: 0,
                      color:
                        "#111827",
                    }}
                  >
                    {event.titre}
                  </h2>

                  <p>
                    📅 {
                      event.date_evenement
                    }
                  </p>

                  <p>
                    🕒 {event.heure}
                  </p>

                  <p>
                    📍 {event.lieu}
                  </p>

                  <p
                    style={{
                      color:
                        "#6b7280",
                      lineHeight:
                        1.7,
                    }}
                  >
                    {
                      event.description
                    }
                  </p>

                </div>

                <button
                  onClick={() =>
                    supprimerEvenement(
                      event.id
                    )
                  }
                  style={{
                    background:
                      "#dc2626",
                    color: "white",
                    border: "none",
                    padding:
                      "12px 18px",
                    borderRadius: 14,
                    cursor: "pointer",
                    fontWeight: "bold",
                    height: "fit-content",
                  }}
                >
                  Supprimer
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: 16,
  border: "1px solid #d1d5db",
  fontSize: 16,
  outline: "none",
};