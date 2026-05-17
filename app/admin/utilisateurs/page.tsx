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

export default function AdminUsersPage() {

  const [users, setUsers] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setUsers(data);
    }
  }

  async function supprimerUtilisateur(
    id: number
  ) {

    const confirmation =
      confirm(
        "Supprimer cet utilisateur ?"
      );

    if (!confirmation) return;

    await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    getUsers();
  }

  const utilisateursFiltres =
    users.filter((user) => {

      const texte =
        `
        ${user.prenom || ""}
        ${user.nom || ""}
        ${user.ville || ""}
      `.toLowerCase();

      return texte.includes(
        search.toLowerCase()
      );
    });

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
            Utilisateurs
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 18,
            }}
          >
            Gestion des comptes citoyens.
          </p>

        </div>

        {/* RECHERCHE */}
        <div
          style={{
            marginBottom: 30,
          }}
        >

          <input
            placeholder="Rechercher un utilisateur..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "100%",
              maxWidth: 500,
              padding:
                "16px 20px",
              borderRadius: 18,
              border:
                "1px solid #d1d5db",
              fontSize: 16,
              outline: "none",
              background: "white",
            }}
          />

        </div>

        {/* LISTE */}
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 22,
          }}
        >

          {utilisateursFiltres.length ===
            0 && (

            <div
              style={{
                background: "white",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                color: "#64748b",
                fontSize: 18,
              }}
            >
              Aucun utilisateur.
            </div>

          )}

          {utilisateursFiltres.map(
            (user) => (

              <div
                key={user.id}
                style={{
                  background:
                    "white",
                  borderRadius: 30,
                  padding: 30,
                  boxShadow:
                    "0 12px 35px rgba(0,0,0,0.05)",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    gap: 30,
                    flexWrap: "wrap",
                  }}
                >

                  {/* INFOS */}
                  <div
                    style={{
                      flex: 1,
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        flexWrap:
                          "wrap",
                        marginBottom: 20,
                      }}
                    >

                      {user.admin && (

                        <div
                          style={{
                            background:
                              "#dc2626",
                            color:
                              "white",
                            padding:
                              "8px 14px",
                            borderRadius:
                              999,
                            fontWeight:
                              "bold",
                            fontSize: 14,
                          }}
                        >
                          Admin
                        </div>

                      )}

                      {user.newsletter && (

                        <div
                          style={{
                            background:
                              "#16a34a",
                            color:
                              "white",
                            padding:
                              "8px 14px",
                            borderRadius:
                              999,
                            fontWeight:
                              "bold",
                            fontSize: 14,
                          }}
                        >
                          Newsletter
                        </div>

                      )}

                    </div>

                    <h2
                      style={{
                        fontSize: 32,
                        color:
                          "#111827",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                      {user.prenom}{" "}
                      {user.nom}
                    </h2>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 16,
                        color:
                          "#374151",
                        lineHeight: 1.8,
                      }}
                    >

                      <div>
                        <strong>
                          Ville :
                        </strong>{" "}
                        {
                          user.ville
                        }
                      </div>

                      <div>
                        <strong>
                          Date de naissance :
                        </strong>{" "}
                        {
                          user.date_naissance
                        }
                      </div>

                      <div>
                        <strong>
                          Inscription :
                        </strong>{" "}
                        {new Date(
                          user.created_at
                        ).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>

                      <div>
                        <strong>
                          ID utilisateur :
                        </strong>{" "}
                        {
                          user.user_id
                        }
                      </div>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: 12,
                    }}
                  >

                    <button
                      style={{
                        background:
                          "#1e3a8a",
                        color: "white",
                        border: "none",
                        padding:
                          "12px 18px",
                        borderRadius: 14,
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      Voir profil
                    </button>

                    <button
                      onClick={() =>
                        supprimerUtilisateur(
                          user.id
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
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      Supprimer
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}