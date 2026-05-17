"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  const [
    consultationsCount,
    setConsultationsCount,
  ] = useState(0);

  const [
    votesCount,
    setVotesCount,
  ] = useState(0);

  const [
    agendaCount,
    setAgendaCount,
  ] = useState(0);

  const [
    usersCount,
    setUsersCount,
  ] = useState(0);

  const [
    unreadMessagesCount,
    setUnreadMessagesCount,
  ] = useState(0);

  useEffect(() => {
    checkAuth();
    getStats();
  }, []);

  async function checkAuth() {

    const { data } =
      await supabase.auth.getUser();

    if (!data.user) {

      window.location.href =
        "/connexion";

      return;
    }

    setUser(data.user);
    setLoading(false);
  }

  async function getStats() {

    const consultations =
      await supabase
        .from("consultations")
        .select("*", {
          count: "exact",
          head: true,
        });

    const votes =
      await supabase
        .from("votes")
        .select("*", {
          count: "exact",
          head: true,
        });

    const agenda =
      await supabase
        .from("agenda")
        .select("*", {
          count: "exact",
          head: true,
        });

    const users =
      await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: true,
        });

    const unreadMessages =
      await supabase
        .from("contacts")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("lu", false);

    setConsultationsCount(
      consultations.count || 0
    );

    setVotesCount(
      votes.count || 0
    );

    setAgendaCount(
      agenda.count || 0
    );

    setUsersCount(
      users.count || 0
    );

    setUnreadMessagesCount(
      unreadMessages.count || 0
    );
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          fontSize: 24,
          color: "#64748b",
        }}
      >
        Chargement...
      </main>
    );
  }

  const prenom =
    user?.user_metadata?.prenom ||
    "Admin";

  return (
    <main
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "50px",
      }}
    >

      {/* HERO */}
      <section
        style={{
          maxWidth: 1450,
          margin: "0 auto 40px",
          background:
            "linear-gradient(135deg, #062b66 0%, #0f172a 100%)",
          borderRadius: 36,
          padding: "45px 50px",
          color: "white",
        }}
      >

        <div
          style={{
            display: "inline-block",
            background:
              "rgba(255,255,255,0.12)",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Back-office sécurisé
        </div>

        <h1
          style={{
            fontSize: 52,
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Tableau de bord
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color:
              "rgba(255,255,255,0.82)",
            maxWidth: 900,
          }}
        >
          Gérez les consultations,
          l’agenda,
          les utilisateurs,
          les dons
          et l’ensemble de la plateforme
          citoyenne depuis votre espace
          d’administration.
        </p>

      </section>

      {/* STATISTIQUES */}
      <section
        style={{
          maxWidth: 1450,
          margin: "0 auto 35px",
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          gap: 25,
        }}
      >

        <StatCard
          title="Consultations"
          value={
            consultationsCount.toString()
          }
          color="#2563eb"
        />

        <StatCard
          title="Votes"
          value={
            votesCount.toString()
          }
          color="#16a34a"
        />

        <StatCard
          title="Agenda"
          value={
            agendaCount.toString()
          }
          color="#f59e0b"
        />

        <StatCard
          title="Utilisateurs"
          value={
            usersCount.toString()
          }
          color="#ec4899"
        />

        <StatCard
          title="Messages non lus"
          value={
            unreadMessagesCount.toString()
          }
          color="#ef4444"
        />

      </section>

      {/* MODULES */}
      <section
        style={{
          maxWidth: 1450,
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: 28,
        }}
      >

        <AdminCard
          title="Consultations"
          description="Créer, modifier et gérer les consultations citoyennes."
          link="/admin/consultations"
          color="#2563eb"
        />

        <AdminCard
          title="Agenda"
          description="Ajouter et modifier les événements et déplacements."
          link="/admin/agenda"
          color="#16a34a"
        />

        <AdminCard
          title="Utilisateurs"
          description="Voir les comptes et gérer les accès."
          link="/admin/utilisateurs"
          color="#f59e0b"
        />

        <AdminCard
          title="Dons"
          description="Suivre les contributions et financements."
          link="/admin/dons"
          color="#ec4899"
        />

        <AdminCard
          title="Messages"
          description="Consulter les demandes et messages citoyens."
          link="/admin/messages"
          color="#ef4444"
        />

        <AdminCard
          title="Rôles & sécurité"
          description="Gérer les permissions et niveaux d’accès."
          link="/admin/roles"
          color="#7c3aed"
        />

      </section>

    </main>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {

  return (
    <div
      style={{
        background: "white",
        borderRadius: 28,
        padding: 28,
        boxShadow:
          "0 12px 35px rgba(0,0,0,0.05)",
        borderTop:
          `6px solid ${color}`,
      }}
    >

      <div
        style={{
          color: "#64748b",
          marginBottom: 14,
          fontWeight: "bold",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        {value}
      </div>

    </div>
  );
}

function AdminCard({
  title,
  description,
  link,
  color,
}: {
  title: string;
  description: string;
  link: string;
  color: string;
}) {

  return (
    <a
      href={link}
      style={{
        textDecoration: "none",
      }}
    >

      <div
        style={{
          background: "white",
          borderRadius: 30,
          padding: 32,
          boxShadow:
            "0 12px 35px rgba(0,0,0,0.05)",
          borderLeft:
            `8px solid ${color}`,
          transition: "0.2s",
          minHeight: 180,
        }}
      >

        <h2
          style={{
            fontSize: 30,
            color: "#111827",
            marginBottom: 18,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#64748b",
            lineHeight: 1.8,
            fontSize: 16,
          }}
        >
          {description}
        </p>

      </div>

    </a>
  );
}