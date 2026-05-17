"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminConsultationsPage() {

  const [consultations, setConsultations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadConsultations();
  }, []);

  async function loadConsultations() {

    const { data } =
      await supabase
        .from("consultations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (data) {
      setConsultations(data);
    }

    setLoading(false);
  }

  async function deleteConsultation(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Supprimer cette consultation ?"
      );

    if (!confirmDelete) return;

    await supabase
      .from("consultations")
      .delete()
      .eq("id", id);

    loadConsultations();
  }

  return (
    <main
      style={{
        padding: 40,
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 35,
        }}
      >

        <div>

          <h1
            style={{
              fontSize: 42,
              color: "#111827",
              marginBottom: 10,
            }}
          >
            Consultations
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: 18,
            }}
          >
            Gérez les consultations citoyennes.
          </p>

        </div>

        <a
          href="/admin/consultations/nouvelle"
          style={{
            background: "#2563eb",
            color: "white",
            padding:
              "16px 22px",
            borderRadius: 16,
            textDecoration:
              "none",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          + Nouvelle consultation
        </a>

      </div>

      {/* TABLEAU */}
      <div
        style={{
          background: "white",
          borderRadius: 30,
          overflow: "hidden",
          boxShadow:
            "0 12px 35px rgba(0,0,0,0.05)",
        }}
      >

        {/* HEADER TABLE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 120px 180px",
            padding: "22px 28px",
            background: "#f8fafc",
            fontWeight: "bold",
            color: "#334155",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >

          <div>Titre</div>

          <div>Statut</div>

          <div>Actions</div>

        </div>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Chargement...
          </div>
        )}

        {/* VIDE */}
        {!loading &&
          consultations.length === 0 && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "#64748b",
              }}
            >
              Aucune consultation.
            </div>
          )}

        {/* LISTE */}
        {!loading &&
          consultations.map(
            (consultation) => (

              <div
                key={consultation.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "2fr 120px 180px",
                  padding:
                    "22px 28px",
                  borderBottom:
                    "1px solid #f1f5f9",
                  alignItems:
                    "center",
                }}
              >

                {/* TITRE */}
                <div>

                  <div
                    style={{
                      fontWeight:
                        "bold",
                      fontSize: 18,
                      color:
                        "#111827",
                      marginBottom: 6,
                    }}
                  >
                    {
                      consultation.title
                    }
                  </div>

                  <div
                    style={{
                      color:
                        "#64748b",
                      fontSize: 14,
                    }}
                  >
                    {
                      consultation.description
                    }
                  </div>

                </div>

                {/* STATUS */}
                <div>

                  <span
                    style={{
                      background:
                        consultation.active
                          ? "#dcfce7"
                          : "#fee2e2",
                      color:
                        consultation.active
                          ? "#166534"
                          : "#991b1b",
                      padding:
                        "8px 12px",
                      borderRadius:
                        999,
                      fontWeight:
                        "bold",
                      fontSize: 13,
                    }}
                  >
                    {consultation.active
                      ? "Active"
                      : "Inactive"}
                  </span>

                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                  }}
                >

                  <a
                    href={`/admin/consultations/${consultation.id}`}
                    style={{
                      background:
                        "#2563eb",
                      color: "white",
                      padding:
                        "10px 14px",
                      borderRadius: 12,
                      textDecoration:
                        "none",
                      fontWeight:
                        "bold",
                      fontSize: 14,
                    }}
                  >
                    Modifier
                  </a>

                  <button
                    onClick={() =>
                      deleteConsultation(
                        consultation.id
                      )
                    }
                    style={{
                      background:
                        "#ef4444",
                      color: "white",
                      border: "none",
                      padding:
                        "10px 14px",
                      borderRadius: 12,
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                      fontSize: 14,
                    }}
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            )
          )}

      </div>

    </main>
  );
}