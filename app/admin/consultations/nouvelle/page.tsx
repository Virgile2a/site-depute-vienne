"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NouvelleConsultationPage() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [active, setActive] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function createConsultation() {

    if (!title || !description) {
      setMessage(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    setLoading(true);

    const { error } =
      await supabase
        .from("consultations")
        .insert([
          {
            title,
            description,
            active,
          },
        ]);

    if (error) {
      setMessage(
        "Erreur lors de la création."
      );

      setLoading(false);

      return;
    }

    window.location.href =
      "/admin/consultations";
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
          marginBottom: 35,
        }}
      >

        <h1
          style={{
            fontSize: 42,
            color: "#111827",
            marginBottom: 10,
          }}
        >
          Nouvelle consultation
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: 18,
          }}
        >
          Créez une nouvelle consultation citoyenne.
        </p>

      </div>

      {/* FORMULAIRE */}
      <div
        style={{
          background: "white",
          borderRadius: 30,
          padding: 35,
          maxWidth: 900,
          boxShadow:
            "0 12px 35px rgba(0,0,0,0.05)",
        }}
      >

        {/* TITRE */}
        <div
          style={{
            marginBottom: 25,
          }}
        >

          <label
            style={labelStyle}
          >
            Titre
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
            placeholder="Titre de la consultation"
          />

        </div>

        {/* DESCRIPTION */}
        <div
          style={{
            marginBottom: 25,
          }}
        >

          <label
            style={labelStyle}
          >
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={{
              ...inputStyle,
              minHeight: 180,
              resize: "vertical",
            }}
            placeholder="Description de la consultation"
          />

        </div>

        {/* ACTIVE */}
        <div
          style={{
            marginBottom: 30,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >

          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
          />

          <span
            style={{
              color: "#111827",
              fontWeight: "bold",
            }}
          >
            Consultation active
          </span>

        </div>

        {/* MESSAGE */}
        {message && (
          <div
            style={{
              marginBottom: 25,
              padding: 16,
              borderRadius: 14,
              background: "#f1f5f9",
              color: "#334155",
            }}
          >
            {message}
          </div>
        )}

        {/* BOUTON */}
        <button
          onClick={createConsultation}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding:
              "16px 24px",
            borderRadius: 16,
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {loading
            ? "Création..."
            : "Créer la consultation"}
        </button>

      </div>

    </main>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 10,
  fontWeight: "bold",
  color: "#111827",
  fontSize: 15,
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box" as const,
};