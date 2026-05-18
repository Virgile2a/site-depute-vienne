"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] =
  useState<any>(null);

const [role, setRole] =
  useState("");

useEffect(() => {
  getUser();
}, []);

  async function getUser() {
    const { data } =
      await supabase.auth.getUser();

    if (!data.user) {
      window.location.href =
        "/connexion";

      return;
    }

    setUser(data.user);

const { data: profile } =
  await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", data.user.id)
    .single();

if (profile?.role) {
  setRole(profile.role);
}
  }

  async function logout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  const prenom =
    user?.user_metadata?.prenom ||
    user?.email?.split("@")[0] ||
    "Admin";

  return (
    <html lang="fr">

      <body
        style={{
          margin: 0,
          background: "#f5f7fb",
          fontFamily:
            "Arial, sans-serif",
        }}
      >

        <div
          style={{
            display: "flex",
            minHeight: "100vh",
          }}
        >

          {/* SIDEBAR */}
          <aside
            style={{
              width: 280,
              background:
                "linear-gradient(180deg, #062b66 0%, #0f172a 100%)",
              color: "white",
              padding: 30,
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
            }}
          >

            <h2
              style={{
                fontSize: 32,
                marginBottom: 40,
              }}
            >
              Admin
            </h2>

            <nav
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: 14,
              }}
            >

              <a
                href="/admin"
                style={linkStyle}
              >
                Dashboard
              </a>

              <a
                href="/admin/consultations"
                style={linkStyle}
              >
                Consultations
              </a>

              <a
                href="/admin/agenda"
                style={linkStyle}
              >
                Agenda
              </a>

              <a
                href="/admin/utilisateurs"
                style={linkStyle}
              >
                Utilisateurs
              </a>

              <a
                href="/admin/dons"
                style={linkStyle}
              >
                Dons
              </a>

              <a
                href="/admin/messages"
                style={linkStyle}
              >
                Messages
              </a>

              {role === "super_admin" && (

  <a
    href="/admin/roles"
    style={linkStyle}
  >
    Rôles & sécurité
  </a>

)}

            </nav>

          </aside>

          {/* CONTENU */}
          <main
            style={{
              marginLeft: 280,
              width: "100%",
            }}
          >

            {/* HEADER ADMIN */}
            <header
              style={{
                height: 90,
                background:
                  "rgba(255,255,255,0.72)",
                backdropFilter:
                  "blur(18px)",
                WebkitBackdropFilter:
                  "blur(18px)",
                borderBottom:
                  "1px solid rgba(0,0,0,0.05)",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                padding: "0 40px",
                position: "sticky",
                top: 0,
                zIndex: 999,
              }}
            >

              <div
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                Bonjour {prenom}
              </div>

              <button
                onClick={logout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding:
                    "12px 18px",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Déconnexion
              </button>

            </header>

            {/* PAGE */}
            <div>
              {children}
            </div>

          </main>

        </div>

      </body>

    </html>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "14px 18px",
  borderRadius: 14,
  background:
    "rgba(255,255,255,0.08)",
  fontWeight: "bold",
};