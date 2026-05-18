"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConnexionPage() {
  const [isLogin, setIsLogin] =
    useState(true);

  const [prenom, setPrenom] =
    useState("");

  const [nom, setNom] =
    useState("");

  const [dateNaissance, setDateNaissance] =
    useState("");

  const [sexe, setSexe] =
    useState("");

  const [adresse, setAdresse] =
    useState("");

  const [codePostal, setCodePostal] =
    useState("");

 const [ville, setVille] =
  useState("");

const [villes, setVilles] =
  useState<string[]>([]);

  const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [newsletter, setNewsletter] =
  useState(false);

const [loading, setLoading] =
  useState(false);

  const [message, setMessage] =
    useState("");

  // AUTO VILLE
  useEffect(() => {
  async function chercherVille() {

    if (codePostal.length !== 5) {
      setVilles([]);
      return;
    }

    try {

      const response = await fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`
      );

      const data = await response.json();

      const communes = data.map(
        (item: any) => item.nom
      );

      setVilles(communes);

      if (communes.length === 1) {
        setVille(communes[0]);
      }

    } catch (error) {
      console.log(error);
    }
  }

  chercherVille();
}, [codePostal]);

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    try {
      // CONNEXION
      if (isLogin) {
        const { error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          setMessage(error.message);
        } else {
          window.location.href = "/";
        }
      }

      // INSCRIPTION
      else {
        if (
          !prenom ||
          !nom ||
          !dateNaissance ||
          !sexe ||
          !adresse ||
          !codePostal ||
          !ville ||
          !email ||
          !password
        ) {
          setMessage(
            "Veuillez remplir tous les champs."
          );

          setLoading(false);
          return;
        }

        const { error } =
          await supabase.auth.signUp({
            email,
            password,

            options: {
  data: {
    prenom,
    nom,
    date_naissance:
      dateNaissance,
    sexe,
    adresse,
    code_postal:
      codePostal,
    ville,
    newsletter,
    email,
  },
},
          });

        if (error) {
          setMessage(error.message);
        } else {
          setMessage(
            "Compte créé avec succès."
          );

          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
      }
    } catch (error) {
      setMessage(
        "Une erreur est survenue."
      );
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #eef2ff 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: 580,
          background: "white",
          borderRadius: 30,
          padding: 40,
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.08)",
        }}
      >

        {/* BADGE */}
        <div
          style={{
            display: "inline-block",
            background: "#dbeafe",
            color: "#1e3a8a",
            padding: "8px 16px",
            borderRadius: 999,
            fontWeight: "bold",
            marginBottom: 20,
            fontSize: 14,
          }}
        >
          Plateforme citoyenne
        </div>

        {/* TITRE */}
        <h1
          style={{
            fontSize: 40,
            lineHeight: 1.1,
            color: "#111827",
            marginBottom: 16,
          }}
        >
          {isLogin
            ? "Connexion"
            : "Créer un compte"}
        </h1>

        <p
          style={{
            color: "#6b7280",
            lineHeight: 1.7,
            marginBottom: 30,
            fontSize: 16,
          }}
        >
          {isLogin
            ? "Connectez-vous pour participer aux consultations citoyennes."
            : "Créez votre compte citoyen pour participer aux consultations et aux débats."}
        </p>

        {/* INSCRIPTION */}
        {!isLogin && (
          <>

            {/* NOM / PRENOM */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 16,
                marginBottom: 18,
              }}
            >

              <div>
                <label style={labelStyle}>
                  Prénom
                </label>

                <input
                  type="text"
                  value={prenom}
                  onChange={(e) =>
                    setPrenom(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Nom
                </label>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) =>
                    setNom(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

            </div>

            {/* DATE / SEXE */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 16,
                marginBottom: 18,
              }}
            >

              <div>
                <label style={labelStyle}>
                  Date de naissance
                </label>

                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) =>
                    setDateNaissance(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Sexe
                </label>

                <select
                  value={sexe}
                  onChange={(e) =>
                    setSexe(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                >
                  <option value="">
                    Sélectionner
                  </option>

                  <option value="Homme">
                    Homme
                  </option>

                  <option value="Femme">
                    Femme
                  </option>

                  <option value="Autre">
                    Autre
                  </option>
                </select>
              </div>

            </div>

            {/* ADRESSE */}
            <div
              style={{
                marginBottom: 18,
              }}
            >

              <label style={labelStyle}>
                Adresse
              </label>

              <input
                type="text"
                value={adresse}
                onChange={(e) =>
                  setAdresse(
                    e.target.value
                  )
                }
                style={inputStyle}
                placeholder="Adresse complète"
              />

            </div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "180px 1fr",
    gap: 16,
    marginBottom: 18,
  }}
>

  {/* CODE POSTAL */}
  <div>
    <label style={labelStyle}>
      Code postal
    </label>

    <input
      type="text"
      value={codePostal}
      onChange={(e) =>
        setCodePostal(
          e.target.value
        )
      }
      style={inputStyle}
      maxLength={5}
    />
  </div>

  {/* VILLE */}
  <div>
    <label style={labelStyle}>
      Ville
    </label>

    <select
      value={ville}
      onChange={(e) =>
        setVille(
          e.target.value
        )
      }
      style={inputStyle}
    >

      <option value="">
        Sélectionner une ville
      </option>

      {villes.map((villeItem) => (
        <option
          key={villeItem}
          value={villeItem}
        >
          {villeItem}
        </option>
      ))}

    </select>
  </div>

</div>

            {/* CAPTCHA */}
            <div
              style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 16,
                background: "#f8fafc",
                border:
                  "1px solid #e2e8f0",
                color: "#475569",
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              ✅ Protection anti-robot activée
              <br />
              (Cloudflare Turnstile pourra être ajouté ensuite)
            </div>

          </>
        )}

        {/* EMAIL */}
        <div
          style={{
            marginBottom: 18,
          }}
        >

          <label style={labelStyle}>
            Adresse email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>

        {/* MOT DE PASSE */}
        <div
          style={{
            marginBottom: 24,
          }}
        >

          <label style={labelStyle}>
            Mot de passe
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>

        {/* MESSAGE */}
        {message && (
          <div
            style={{
  marginBottom: 20,
  padding: 14,
  borderRadius: 14,
  background: "#f1f5f9",
  color: "#334155",
}}
>
              {message}
            </div>
          )}

{!isLogin && (

  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 10,
      marginBottom: 20,
      cursor: "pointer",
      color: "#374151",
      fontSize: 15,
    }}
  >

    <input
      type="checkbox"
      checked={newsletter}
      onChange={(e) =>
        setNewsletter(
          e.target.checked
        )
      }
    />

    Je souhaite recevoir
    les actualités et
    la newsletter.

  </label>

)}
          {/* BOUTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              background: "#1e3a8a",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: 16,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              marginBottom: 20,
            }}
          >
            {loading
              ? "Chargement..."
              : isLogin
              ? "Se connecter"
              : "Créer mon compte"}
          </button>

          {/* SWITCH */}
          <div
            style={{
              textAlign: "center",
              color: "#64748b",
              lineHeight: 1.8,
              fontSize: 15,
            }}
          >

            {isLogin
              ? "Vous n’avez pas encore de compte ?"
              : "Vous avez déjà un compte ?"}

            <br />

            <button
              onClick={() =>
                setIsLogin(!isLogin)
              }
              style={{
                background: "none",
                border: "none",
                color: "#1e3a8a",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: 8,
                fontSize: 15,
              }}
            >
              {isLogin
                ? "Créer un compte"
                : "Se connecter"}
            </button>

          </div>

      </div>

    </main>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: "bold",
  color: "#111827",
  fontSize: 14,
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: 14,
  border: "1px solid #d1d5db",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box" as const,
};