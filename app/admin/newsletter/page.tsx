"use client";

import {
  useEffect,
  useState,
} from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsletterPage() {

  const [abonnes, setAbonnes] =
    useState<any[]>([]);

  const [objet, setObjet] =
    useState("");

  const [contenu, setContenu] =
    useState("");

  useEffect(() => {
    getAbonnes();
  }, []);

  async function getAbonnes() {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("newsletter", true)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setAbonnes(data);
    }
  }

  return (
    <main
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: 40,
      }}
    >

      <div
        style={{
          maxWidth: 1450,
          margin: "auto",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom: 35,
          }}
        >

          <h1
            style={{
              fontSize: 42,
              marginBottom: 12,
              color: "#111827",
            }}
          >
            Newsletter
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 18,
            }}
          >
            Gestion des abonnés et campagnes.
          </p>

        </div>

        {/* STATS */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 30,
            marginBottom: 30,
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.05)",
          }}
        >

          <div
            style={{
              fontSize: 18,
              color: "#64748b",
              marginBottom: 12,
            }}
          >
            Abonnés newsletter
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            {abonnes.length}
          </div>

        </div>

        {/* EDITEUR */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 35,
            marginBottom: 35,
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.05)",
          }}
        >

          <h2
            style={{
              fontSize: 32,
              marginBottom: 25,
              color: "#111827",
            }}
          >
            Nouvelle newsletter
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >

            <input
              placeholder="Objet de la newsletter"
              value={objet}
              onChange={(e) =>
                setObjet(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Contenu de la newsletter..."
              rows={10}
              value={contenu}
              onChange={(e) =>
                setContenu(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />

            <button
              style={{
                background:
                  "#1e3a8a",
                color: "white",
                border: "none",
                padding:
                  "16px 22px",
                borderRadius: 16,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                width: "fit-content",
              }}
            >
              Envoyer la newsletter
            </button>

          </div>

        </div>

        {/* ABONNES */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 35,
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.05)",
          }}
        >

          <h2
            style={{
              fontSize: 32,
              marginBottom: 30,
              color: "#111827",
            }}
          >
            Liste des abonnés
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: 18,
            }}
          >

            {abonnes.map(
              (user) => (

                <div
                  key={user.id}
                  style={{
                    background:
                      "#f9fafb",
                    borderRadius: 22,
                    padding: 22,
                    display: "flex",
                    justifyContent:
                      "space-between",
                    gap: 20,
                    flexWrap: "wrap",
                  }}
                >

                  <div>

                    <div
                      style={{
                        fontWeight:
                          "bold",
                        fontSize: 20,
                        marginBottom: 8,
                        color:
                          "#111827",
                      }}
                    >
                      {user.prenom}{" "}
                      {user.nom}
                    </div>

                    <div
                      style={{
                        color:
                          "#64748b",
                      }}
                    >
                      {user.ville}
                    </div>

                  </div>

                  <div
                    style={{
                      color:
                        "#64748b",
                      fontSize: 14,
                    }}
                  >
                    {new Date(
                      user.created_at
                    ).toLocaleDateString(
                      "fr-FR"
                    )}
                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

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