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

export default function AdminMessagesPage() {

  const [messages, setMessages] =
    useState<any[]>([]);

  useEffect(() => {
    getMessages();
  }, []);

  async function getMessages() {

    const { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setMessages(data);
    }
  }

  async function supprimerMessage(
    id: number
  ) {

    await supabase
      .from("contacts")
      .delete()
      .eq("id", id);

    getMessages();
  }

  async function marquerCommeLu(
    id: number
  ) {

    await supabase
      .from("contacts")
      .update({
        lu: true,
      })
      .eq("id", id);

    getMessages();
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
          maxWidth: 1400,
          margin: "auto",
        }}
      >

        <h1
          style={{
            fontSize: 42,
            marginBottom: 40,
            color: "#111827",
          }}
        >
          Messages citoyens
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >

          {messages.length === 0 && (

            <div
              style={{
                background: "white",
                padding: 40,
                borderRadius: 24,
                textAlign: "center",
                color: "#64748b",
                fontSize: 18,
              }}
            >
              Aucun message reçu.
            </div>

          )}

          {messages.map((message) => (

            <div
              key={message.id}
              style={{
                background: "white",
                borderRadius: 30,
                padding: 35,
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.05)",
                border:
                  !message.lu
                    ? "2px solid #dc2626"
                    : "none",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 30,
                  alignItems:
                    "flex-start",
                }}
              >

                <div
                  style={{
                    flex: 1,
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 20,
                    }}
                  >

                    <div
                      style={{
                        background:
                          "#dbeafe",
                        color:
                          "#1e3a8a",
                        padding:
                          "8px 14px",
                        borderRadius:
                          999,
                        fontWeight:
                          "bold",
                        fontSize: 14,
                      }}
                    >
                      {
                        message.type_demande
                      }
                    </div>

                    {!message.lu && (

                      <div
                        style={{
                          background:
                            "#dc2626",
                          color: "white",
                          padding:
                            "8px 14px",
                          borderRadius:
                            999,
                          fontWeight:
                            "bold",
                          fontSize: 14,
                        }}
                      >
                        Nouveau
                      </div>

                    )}

                    <div
                      style={{
                        background:
                          "#f3f4f6",
                        color:
                          "#374151",
                        padding:
                          "8px 14px",
                        borderRadius:
                          999,
                        fontSize: 14,
                      }}
                    >
                      {new Date(
                        message.created_at
                      ).toLocaleDateString(
                        "fr-FR"
                      )}
                    </div>

                  </div>

                  <h2
                    style={{
                      fontSize: 30,
                      marginTop: 0,
                      marginBottom: 15,
                      color:
                        "#111827",
                    }}
                  >
                    {message.sujet}
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                      gap: 15,
                      marginBottom: 25,
                    }}
                  >

                    <div>
                      <strong>
                        Nom :
                      </strong>{" "}
                      {
                        message.prenom
                      }{" "}
                      {
                        message.nom
                      }
                    </div>

                    <div>
                      <strong>
                        Email :
                      </strong>{" "}
                      {
                        message.email
                      }
                    </div>

                    <div>
                      <strong>
                        Téléphone :
                      </strong>{" "}
                      {
                        message.telephone
                      }
                    </div>

                    <div>
                      <strong>
                        Commune :
                      </strong>{" "}
                      {
                        message.commune
                      }
                    </div>

                  </div>

                  {(message.type_demande ===
                    "Réunion privée" ||
                    message.type_demande ===
                      "Demande de rendez-vous") && (

                    <div
                      style={{
                        background:
                          "#eff6ff",
                        borderRadius: 20,
                        padding: 24,
                        marginBottom: 25,
                      }}
                    >

                      <h3
                        style={{
                          marginTop: 0,
                          color:
                            "#1e3a8a",
                        }}
                      >
                        Informations réunion
                      </h3>

                      <p>
                        <strong>
                          Participants :
                        </strong>{" "}
                        {
                          message.participants
                        }
                      </p>

                      <p>
                        <strong>
                          Format :
                        </strong>{" "}
                        {
                          message.format_reunion
                        }
                      </p>

                    </div>

                  )}

                  <div
                    style={{
                      background:
                        "#f9fafb",
                      borderRadius: 20,
                      padding: 24,
                      lineHeight: 1.9,
                      color:
                        "#374151",
                    }}
                  >
                    {
                      message.message
                    }
                  </div>

                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 12,
                  }}
                >

                  <a
                    href={`mailto:${message.email}?subject=Réponse à votre message`}
                    style={{
                      background:
                        "#1e3a8a",
                      color: "white",
                      border: "none",
                      padding:
                        "12px 18px",
                      borderRadius: 14,
                      cursor: "pointer",
                      fontWeight:
                        "bold",
                      textDecoration:
                        "none",
                      display:
                        "inline-block",
                      textAlign:
                        "center",
                    }}
                  >
                    Répondre
                  </a>

                  {!message.lu && (

                    <button
                      onClick={() =>
                        marquerCommeLu(
                          message.id
                        )
                      }
                      style={{
                        background:
                          "#16a34a",
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
                      Marquer comme lu
                    </button>

                  )}

                  <button
                    onClick={() =>
                      supprimerMessage(
                        message.id
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
                      fontWeight:
                        "bold",
                    }}
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}