"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RolesPage() {

  const [authorized, setAuthorized] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href =
        "/connexion";

      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (
      profile?.role !==
      "super_admin"
    ) {
      window.location.href =
        "/admin";

      return;
    }

    setAuthorized(true);

    loadUsers();

    setLoading(false);
  }

  async function loadUsers() {

    const { data } =
      await supabase
        .from("profiles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (data) {
      setUsers(data);
    }
  }

  async function updateRole(
    id: string,
    role: string
  ) {

    await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id);

    loadUsers();
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 40,
          fontSize: 20,
        }}
      >
        Chargement...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div
      style={{
        padding: 40,
      }}
    >

      <h1
        style={{
          fontSize: 36,
          marginBottom: 10,
          color: "#111827",
        }}
      >
        Rôles & sécurité
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: 40,
          fontSize: 18,
        }}
      >
        Gérer les permissions et niveaux d’accès.
      </p>

      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 40,
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >

          <thead>

            <tr
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >

              <th
                style={thStyle}
              >
                Prénom
              </th>

              <th
                style={thStyle}
              >
                Nom
              </th>

              <th
                style={thStyle}
              >
                Ville
              </th>

              <th
                style={thStyle}
              >
                Rôle
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                style={{
                  borderBottom:
                    "1px solid #f3f4f6",
                }}
              >

                <td
                  style={tdStyle}
                >
                  {user.prenom}
                </td>

                <td
                  style={tdStyle}
                >
                  {user.nom}
                </td>

                <td
                  style={tdStyle}
                >
                  {user.ville}
                </td>

                <td
                  style={tdStyle}
                >

                  <select
                    value={
                      user.role || "admin"
                    }
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    style={{
                      padding:
                        "10px 14px",
                      borderRadius: 12,
                      border:
                        "1px solid #d1d5db",
                      fontWeight:
                        "bold",
                      background:
                        "white",
                      cursor:
                        "pointer",
                    }}
                  >

                    <option value="super_admin">
                      super_admin
                    </option>

                    <option value="admin">
                      admin
                    </option>

                    <option value="moderateur">
                      moderateur
                    </option>

                                        <option value="redacteur">
                      redacteur
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

     <div
  style={{
    marginTop: 40,
    background: "white",
    borderRadius: 30,
    padding: 28,
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.05)",
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
  }}
>

  <h2
    style={{
      fontSize: 26,
      marginBottom: 30,
      color: "#111827",
    }}
  >
    Permissions des rôles
  </h2>

  <div
    style={{
      overflowX: "auto",
    }}
  >

    <table
      style={{
        width: "100%",
        borderCollapse:
          "collapse",
        minWidth: 650,
      }}
    >

      <thead>

        <tr
          style={{
            borderBottom:
              "1px solid #e5e7eb",
          }}
        >

          <th style={permissionTh}>
            Fonctionnalité
          </th>

          <th style={permissionTh}>
            citoyen
          </th>

          <th style={permissionTh}>
            redacteur
          </th>

          <th style={permissionTh}>
            moderateur
          </th>

          <th style={permissionTh}>
            admin
          </th>

          <th style={permissionTh}>
            super_admin
          </th>

        </tr>

      </thead>

      <tbody>

        {[
          [
            "Accès plateforme",
            "✔",
            "✔",
            "✔",
            "✔",
            "✔",
          ],

          [
            "Consultations",
            "✔",
            "✔",
            "✔",
            "✔",
            "✔",
          ],

          [
            "Gestion agenda",
            "✖",
            "✔",
            "✖",
            "✔",
            "✔",
          ],

          [
            "Gestion messages",
            "✖",
            "✖",
            "✔",
            "✔",
            "✔",
          ],

          [
            "Newsletter",
            "✖",
            "✔",
            "✖",
            "✔",
            "✔",
          ],

          [
            "Gestion utilisateurs",
            "✖",
            "✖",
            "✖",
            "✔",
            "✔",
          ],

          [
            "Gestion rôles",
            "✖",
            "✖",
            "✖",
            "✖",
            "✔",
          ],

          [
            "Sécurité plateforme",
            "✖",
            "✖",
            "✖",
            "✖",
            "✔",
          ],

        ].map((row, index) => (

          <tr
            key={index}
            style={{
              borderBottom:
                "1px solid #f3f4f6",
            }}
          >

            <td
              style={{
                padding:
                  "18px 16px",
                fontWeight:
                  "bold",
                color:
                  "#111827",
              }}
            >
              {row[0]}
            </td>

            {row
              .slice(1)
              .map((cell, i) => (

                <td
  key={i}
  style={{
    padding:
      "10px 12px",
    textAlign:
      "center",
    fontSize: 18,
    color:
      cell === "✔"
        ? "#16a34a"
        : "#dc2626",
    fontWeight:
      "bold",
  }}
>
  {cell}
</td>

              ))}

          </tr>

        ))}

        </tbody>

    </table>

  </div>

</div>

    </div>
  );
}

const permissionTh = {
  padding: "10px 12px",
  textAlign: "center" as const,
  color: "#6b7280",
  fontSize: 14,
};

const thStyle = {
  textAlign: "left" as const,
  padding: "16px",
  color: "#6b7280",
  fontSize: 14,
};

const tdStyle = {
  padding: "18px 16px",
  color: "#111827",
  fontSize: 16,
};