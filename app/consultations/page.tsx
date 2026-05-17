"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConsultationsPage() {

  const [propositions, setPropositions] =
    useState<any[]>([]);

  const [votes, setVotes] =
    useState<any[]>([]);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
  getConsultations();
  getUser();
  getVotes();
}, []);

  async function getConsultations() {

    const { data } = await supabase
      .from("consultations")
      .select("*")
      .eq("active", true)
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setPropositions(data);
    }
  }

  async function getVotes() {

    const { data } = await supabase
      .from("votes")
      .select("*");

    if (data) {
      setVotes(data);
    }
  }

  async function getUser() {

    const { data } =
      await supabase.auth.getUser();

    setUser(data.user);
  }

async function voter(
  consultationId: number,
  choix: string
) {

  if (!user) {
    return;
  }

  const voteExistant = votes.find(
    (v) =>
      v.user_id === user.id &&
      v.consultation_id === consultationId
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
      .insert([
        {
          consultation_id: consultationId,
          user_id: user.id,
          choix,
        },
      ]);
  }

  await getVotes();
}

  function getPourcentage(
    consultationId: number,
    choix: string
  ) {

    const consultationVotes =
      votes.filter(
        (vote) =>
          vote.consultation_id ===
          consultationId
      );

    if (
      consultationVotes.length === 0
    )
      return 0;

    const total =
      consultationVotes.length;

    const nombre =
      consultationVotes.filter(
        (vote) =>
          vote.choix === choix
      ).length;

    return Math.round(
      (nombre / total) * 100
    );
  }

  return (
    <main
      style={{
        maxWidth: 1400,
        margin: "auto",
        padding:
          "80px 20px",
      }}
    >

      <div
        style={{
          marginBottom: 60,
        }}
      >

        <div
          style={{
            display: "inline-block",
            background: "#eef2ff",
            color: "#1e2a78",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: "bold",
            marginBottom: 25,
          }}
        >
          Participation citoyenne
        </div>

        <h1
          style={{
            fontSize: 62,
            lineHeight: 1.1,
            color: "#111827",
            marginBottom: 25,
          }}
        >
          Consultations citoyennes
        </h1>

        <p
          style={{
            fontSize: 20,
            lineHeight: 1.9,
            color: "#6b7280",
            maxWidth: 950,
          }}
        >
          Retrouvez l’ensemble des
          consultations citoyennes
          proposées aux habitants
          de la circonscription
          et participez aux grands débats
          concernant notre territoire.
        </p>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(420px, 1fr))",
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

    </main>
  );
}

function Barre({
  label,
  valeur,
  couleur,
  fond,
}: {
  label: string;
  valeur: number;
  couleur: string;
  fond: string;
}) {
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
          color: "#374151",
        }}
      >

        <span>{label}</span>

        <span>{valeur}%</span>

      </div>

      <div
        style={{
          width: "100%",
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
  borderRadius: 14,
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 15,
};

const boutonRouge = {
  flex: 1,
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 14,
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 15,
};

const boutonGris = {
  flex: 1,
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: 14,
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 15,
};