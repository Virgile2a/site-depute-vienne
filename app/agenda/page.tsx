"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const mois = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const jours = [
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
  "Dim",
];

const couleursJours = {
  1: "#2563eb",
  2: "#16a34a",
  3: "#facc15",
  4: "#fb923c",
  5: "#ef4444",
  6: "#ec4899",
  0: "#64748b",
};

export default function AgendaPage() {

  const [agenda, setAgenda] =
    useState<any[]>([]);

  const today = new Date();

  const [currentDate, setCurrentDate] =
    useState(today);

  const [selectedDate, setSelectedDate] =
    useState(
      `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}`
    );

  const [showAll, setShowAll] =
    useState(true);

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

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  );

  const lastDay = new Date(
    year,
    month + 1,
    0
  );

  const firstDayIndex =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;

  const daysInMonth =
    lastDay.getDate();

  const calendarDays = useMemo(() => {

    const days = [];

    for (
      let i = 0;
      i < firstDayIndex;
      i++
    ) {
      days.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day);
    }

    return days;

  }, [
    daysInMonth,
    firstDayIndex,
  ]);

  function previousMonth() {

    setCurrentDate(
      new Date(
        year,
        month - 1,
        1
      )
    );
  }

  function nextMonth() {

    setCurrentDate(
      new Date(
        year,
        month + 1,
        1
      )
    );
  }

  function getDateString(
    day: number
  ) {

    return `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  const eventsToDisplay =
    showAll
      ? agenda
      : agenda.filter(
  (event) =>
    event.date_evenement
      ?.split("T")[0] ===
    selectedDate
)

  return (
    <main
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "60px",
      }}
    >

      {/* HERO */}
      <section
        style={{
          maxWidth: 1400,
          margin:
            "0 auto 40px",
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
          borderRadius: 36,
          padding:
            "40px 50px",
          color: "white",
        }}
      >

        <div
          style={{
            display:
              "inline-block",
            background:
              "rgba(255,255,255,0.12)",
            padding:
              "10px 18px",
            borderRadius: 999,
            fontWeight:
              "bold",
            marginBottom: 20,
          }}
        >
          Agenda citoyen
        </div>

        <h1
          style={{
            fontSize: 42,
            lineHeight: 1.2,
            marginBottom: 18,
          }}
        >
          Rencontres,
          déplacements
          et réunions publiques.
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            maxWidth: 850,
            color:
              "rgba(255,255,255,0.84)",
          }}
        >
          Retrouvez
          l’ensemble des
          événements,
          réunions publiques
          et rencontres
          organisées dans la
          circonscription.
        </p>

      </section>

      {/* CONTENU */}
      <section
        style={{
          maxWidth: 1400,
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "380px 1fr",
          gap: 40,
          alignItems:
            "start",
        }}
      >

        {/* CALENDRIER */}
        <div
          style={{
            background: "white",
            borderRadius: 30,
            padding: 30,
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.06)",
            position: "sticky",
            top: 120,
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginBottom: 25,
            }}
          >

            <button
              onClick={
                previousMonth
              }
              style={navButton}
            >
              ←
            </button>

            <h2
              style={{
                fontSize: 24,
                margin: 0,
                color:
                  "#111827",
              }}
            >
              {mois[month]}{" "}
              {year}
            </h2>

            <button
              onClick={
                nextMonth
              }
              style={navButton}
            >
              →
            </button>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7, 1fr)",
              gap: 10,
              marginBottom: 15,
            }}
          >

            {jours.map(
              (jour) => (
                <div
                  key={jour}
                  style={{
                    textAlign:
                      "center",
                    fontWeight:
                      "bold",
                    color:
                      "#64748b",
                  }}
                >
                  {jour}
                </div>
              )
            )}

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(7, 1fr)",
              gap: 10,
            }}
          >

            {calendarDays.map(
              (
                day,
                index
              ) => {

                if (!day) {
                  return (
                    <div
                      key={
                        index
                      }
                    />
                  );
                }

                const dateString =
                  getDateString(
                    day
                  );

                const hasEvent =
  agenda.some(
    (event) =>
      event.date_evenement
        ?.split("T")[0] ===
      dateString
  );

                const isSelected =
                  selectedDate ===
                  dateString;

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(
                        dateString
                      );

                      setShowAll(
                        false
                      );
                    }}
                    style={{
                      aspectRatio: 1,
                      borderRadius: 16,
                      border:
                        "none",
                      cursor:
                        "pointer",
                      fontWeight:
                        "bold",
                      background:
                        isSelected
                          ? "#1e3a8a"
                          : hasEvent
                          ? "#dbeafe"
                          : "#f8fafc",
                      color:
                        isSelected
                          ? "white"
                          : "#111827",
                    }}
                  >
                    {day}
                  </button>
                );
              }
            )}

          </div>

          <button
            onClick={() =>
              setShowAll(
                !showAll
              )
            }
            style={{
              marginTop: 30,
              width: "100%",
              background:
                "#1e2a78",
              color: "white",
              border: "none",
              padding: "16px",
              borderRadius: 16,
              fontWeight:
                "bold",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {showAll
              ? "Voir uniquement le jour sélectionné"
              : "Voir tous les rendez-vous"}
          </button>

        </div>

        {/* RENDEZ-VOUS */}
        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 18,
          }}
        >

          {eventsToDisplay.length ===
            0 && (

            <div
              style={{
                background:
                  "white",
                borderRadius: 24,
                padding: 40,
                textAlign:
                  "center",
                color:
                  "#64748b",
                fontSize: 20,
                boxShadow:
                  "0 12px 35px rgba(0,0,0,0.05)",
              }}
            >
              Aucun rendez-vous
              prévu.
            </div>

          )}

          {eventsToDisplay.map(
            (event) => {

              const dayColor =
                couleursJours[
                  new Date(
                    event.date_evenement
                  ).getDay() as keyof typeof couleursJours
                ];

              return (

                <div
                  key={
                    event.id
                  }
                  style={{
                    background:
                      "white",
                    borderRadius: 24,
                    overflow:
                      "hidden",
                    display:
                      "grid",
                    gridTemplateColumns:
                      "260px 1fr",
                    boxShadow:
                      "0 12px 35px rgba(0,0,0,0.05)",
                  }}
                >

                  {/* GAUCHE */}
                  <div
                    style={{
                      background:
                        "#f8fafc",
                      padding: 24,
                      borderLeft:
                        `8px solid ${dayColor}`,
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      justifyContent:
                        "center",
                      gap: 10,
                    }}
                  >

                    <div
                      style={{
                        fontWeight:
                          "bold",
                        fontSize: 18,
                        color:
                          "#1e293b",
                        lineHeight:
                          1.5,
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {new Date(
                        event.date_evenement
                      ).toLocaleDateString(
                        "fr-FR",
                        {
                          weekday:
                            "long",
                          day:
                            "2-digit",
                          month:
                            "2-digit",
                          year:
                            "numeric",
                        }
                      )}
                    </div>

                    <div
                      style={{
                        color:
                          "#475569",
                        fontWeight:
                          "bold",
                      }}
                    >
                      🕒{" "}
                      {
                        event.heure
                      }
                    </div>

                    <div
                      style={{
                        color:
                          "#475569",
                      }}
                    >
                      📍{" "}
                      {
                        event.lieu
                      }
                    </div>

                  </div>

                  {/* DROITE */}
                  <div
                    style={{
                      padding: 28,
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      justifyContent:
                        "center",
                    }}
                  >

                    <h3
                      style={{
                        fontSize: 28,
                        color:
                          "#111827",
                        marginTop: 0,
                        marginBottom: 15,
                        lineHeight:
                          1.5,
                      }}
                    >
                      {
                        event.titre
                      }
                    </h3>

                    <p
                      style={{
                        color:
                          "#6b7280",
                        lineHeight:
                          1.8,
                        margin: 0,
                      }}
                    >
                      {
                        event.description
                      }
                    </p>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </section>

    </main>
  );
}

const navButton = {
  background: "#1e3a8a",
  color: "white",
  border: "none",
  width: 42,
  height: 42,
  borderRadius: 12,
  cursor: "pointer",
  fontWeight: "bold",
};