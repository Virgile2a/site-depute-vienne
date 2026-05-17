"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const isAdmin =
    pathname.startsWith("/admin");

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } =
      await supabase.auth.getUser();

    setUser(data.user);
  }

  async function logout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  const prenom =
    user?.user_metadata?.prenom ||
    user?.email?.split("@")[0];

  return (
    <html lang="fr">

      <body
        style={{
          margin: 0,
          fontFamily:
            "Arial, sans-serif",
          background: "#f5f7fb",
        }}
      >

        {/* SITE PUBLIC */}
        {!isAdmin && (
          <>

            {/* BANDEAU */}
            <div
              style={{
                background: "#062b66",
                color: "white",
                textAlign: "center",
                padding: "10px",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Plateforme citoyenne indépendante • 4ème circonscription de la Vienne
            </div>

            {/* HEADER */}
            <header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 9999,
                backdropFilter:
                  "blur(24px)",
                WebkitBackdropFilter:
                  "blur(24px)",
                background:
                  "rgba(255,255,255,0.22)",
                borderBottom:
                  "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.02)",
              }}
            >

              <div
                style={{
                  maxWidth: 1450,
                  margin: "auto",
                  padding:
                    "22px 40px",
                  display: "flex",
                  alignItems:
                    "center",
                }}
              >

                {/* LOGO */}
                <div
                  style={{
                    fontSize: 24,
                    fontWeight:
                      "bold",
                    color: "#062b66",
                    minWidth: 220,
                  }}
                >
                  Virgile Flores
                </div>

                {/* MENU */}
                <nav
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent:
                      "center",
                    gap: 40,
                  }}
                >

                  <a
                    href="/"
                    style={linkStyle}
                  >
                    Accueil
                  </a>

                  <a
                    href="/consultations"
                    style={linkStyle}
                  >
                    Consultations
                  </a>

                  <a
                    href="/engagements"
                    style={linkStyle}
                  >
                    Engagements
                  </a>

                  <a
                    href="/contact"
                    style={linkStyle}
                  >
                    Contact
                  </a>

                  <a
  href="/agenda"
  style={linkStyle}
>
  Agenda
</a>

<a
  href="/dons"
  style={{
    ...linkStyle,
    color: "#1e3a8a",
    fontWeight: "bold",
    borderBottom:
      "2px solid #1e3a8a",
    paddingBottom: 4,
  }}
>
  Dons
</a>

</nav>

{/* CONNEXION */}
<div
  style={{
    minWidth: 220,
    display: "flex",
    justifyContent:
      "flex-end",
    alignItems:
      "center",
    gap: 15,
  }}
>

                  {user ? (
                    <>

                      <span
                        style={{
                          fontWeight:
                            "bold",
                          color:
                            "#111827",
                        }}
                      >
                        {prenom}
                      </span>

                      <button
                        onClick={logout}
                        style={{
                          background:
                            "#ef4444",
                          color:
                            "white",
                          border:
                            "none",
                          padding:
                            "10px 16px",
                          borderRadius: 10,
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Déconnexion
                      </button>

                    </>
                  ) : (
                    <a
                      href="/connexion"
                      style={{
                        background:
                          "#062b66",
                        color: "white",
                        padding:
                          "12px 18px",
                        borderRadius: 12,
                        textDecoration:
                          "none",
                        fontWeight:
                          "bold",
                      }}
                    >
                      Se connecter / s'inscrire
                    </a>
                  )}

                </div>

              </div>

            </header>

          </>
        )}

        {/* CONTENU */}
        {children}

        {/* FOOTER */}
        {!isAdmin && (

          <footer
            style={{
              background:
                "#0f172a",
              color: "white",
              marginTop: 80,
              padding:
                "60px 40px 30px",
            }}
          >

            <div
              style={{
                maxWidth: 1400,
                margin: "auto",
                display: "grid",
                gridTemplateColumns:
                  "1.2fr 1fr 1fr",
                gap: 50,
                marginBottom: 40,
              }}
            >

              {/* GAUCHE */}
              <div>

                <h3
                  style={{
                    fontSize: 28,
                    marginBottom: 20,
                  }}
                >
                  Virgile Flores
                </h3>

                <p
                  style={{
                    lineHeight: 1.9,
                    color:
                      "rgba(255,255,255,0.72)",
                    maxWidth: 500,
                  }}
                >
                  Plateforme citoyenne indépendante
                  dédiée à la participation,
                  à la transparence
                  et aux échanges avec les habitants
                  de la 4ème circonscription
                  de la Vienne.
                </p>

              </div>

              {/* NAVIGATION */}
              <div>

                <h4
                  style={{
                    marginBottom: 20,
                    fontSize: 20,
                  }}
                >
                  Navigation
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 14,
                  }}
                >

                  <a
                    href="/"
                    style={footerLink}
                  >
                    Accueil
                  </a>

                  <a
                    href="/consultations"
                    style={footerLink}
                  >
                    Consultations
                  </a>

                  <a
                    href="/engagements"
                    style={footerLink}
                  >
                    Engagements
                  </a>

                  <a
                    href="/agenda"
                    style={footerLink}
                  >
                    Agenda
                  </a>

                  <a
                    href="/contact"
                    style={footerLink}
                  >
                    Contact
                  </a>

                </div>

              </div>

              {/* INFOS */}
              <div>

                <h4
                  style={{
                    marginBottom: 20,
                    fontSize: 20,
                  }}
                >
                  Informations
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    gap: 14,
                  }}
                >

                  <a
                    href="/mentions-legales"
                    style={footerLink}
                  >
                    Mentions légales
                  </a>

                  <a
                    href="/confidentialite"
                    style={footerLink}
                  >
                    Politique de confidentialité
                  </a>

                  <a
                    href="/cookies"
                    style={footerLink}
                  >
                    Gestion des cookies
                  </a>

                </div>

              </div>

            </div>

            {/* BAS */}
            <div
              style={{
                borderTop:
                  "1px solid rgba(255,255,255,0.12)",
                paddingTop: 25,
                textAlign:
                  "center",
                color:
                  "rgba(255,255,255,0.55)",
                fontSize: 14,
              }}
            >
              © 2026 Virgile Flores —
              Tous droits réservés
            </div>

          </footer>

        )}

      </body>

    </html>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#111827",
  fontWeight: "bold",
  fontSize: 16,
};

const footerLink = {
  color:
    "rgba(255,255,255,0.72)",
  textDecoration: "none",
};