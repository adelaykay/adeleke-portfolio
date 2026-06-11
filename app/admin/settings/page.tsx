"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase/auth";

const S = {
  card: { borderRadius: "12px", border: "1px solid #252538", padding: "20px", background: "#18182a", marginBottom: "16px" } as React.CSSProperties,
  h2: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e2f0", marginBottom: "8px" } as React.CSSProperties,
  p: { fontSize: "13px", color: "#9090b0", lineHeight: 1.7, marginBottom: "16px" } as React.CSSProperties,
};

export default function AdminSettingsPage() {
  const [seeding, setSeeding]   = useState(false);
  const [seedMsg, setSeedMsg]   = useState("");

  async function handleSeed() {
    if (!confirm("Seed Firestore with all 7 projects? Only runs if collection is empty.")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSeedMsg(res.ok ? `✓ ${data.message ?? `Seeded ${data.seeded} projects.`}` : `✗ ${data.error}`);
    } catch (e) {
      setSeedMsg("✗ Seed failed. Check the browser console.");
      console.error(e);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div style={{ maxWidth: "640px", width: "100%" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", letterSpacing: "-0.5px", color: "#e2e2f0", marginBottom: "4px" }}>
          Settings
        </h1>
        <p style={{ fontSize: "13px", color: "#505070" }}>Site configuration and data management.</p>
      </div>

      {/* Seed */}
      <div style={S.card}>
        <h2 style={S.h2}>Seed Projects</h2>
        <p style={S.p}>
          Populate Firestore with the 7 initial portfolio projects. Only runs if the collection is currently empty — safe to click at any time.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={handleSeed}
            disabled={seeding}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#7c6af7",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 500,
              cursor: seeding ? "not-allowed" : "pointer",
              opacity: seeding ? 0.6 : 1,
              fontFamily: "inherit",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {seeding ? "Seeding…" : "Seed Projects"}
          </button>
          {seedMsg && (
            <span style={{ fontSize: "13px", color: seedMsg.startsWith("✓") ? "#4ade80" : "#fb923c" }}>
              {seedMsg}
            </span>
          )}
        </div>
      </div>

      {/* Auth */}
      <div style={S.card}>
        <h2 style={S.h2}>Authentication</h2>
        <p style={{ ...S.p, marginBottom: "8px" }}>Signed in as:</p>
        <code style={{ fontSize: "12px", padding: "8px 12px", borderRadius: "6px", background: "#13131f", color: "#7c6af7", border: "1px solid #252538", display: "block", overflow: "auto", WebkitOverflowScrolling: "touch" }}>
          {auth.currentUser?.email ?? "—"}
        </code>
      </div>

      {/* Deployment */}
      <div style={S.card}>
        <h2 style={S.h2}>Deployment Info</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            ["Hosting",  "Firebase Hosting (adeleke.empyrealworks.com)"],
            ["Database", "Cloud Firestore"],
            ["Auth",     "Firebase Auth — Email/Password"],
            ["AI",       "Google Gemini 1.5 Flash"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ color: "#505070" }}>{k}</span>
              <span style={{ color: "#9090b0" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
