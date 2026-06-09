"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";
import { useAuth } from "@/components/providers/FirebaseProvider";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/admin");
  }, [user, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.replace("/admin");
    } catch {
      setError("Invalid email or password. Check your Firebase credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090f" }}>
        <div style={{ fontSize: "13px", color: "#505070" }}>Loading…</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090f",
        padding: "24px",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "360px",
          borderRadius: "16px",
          border: "1px solid #252538",
          padding: "32px",
          background: "#18182a",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#e2e2f0" }}>
            Adeleke<span style={{ color: "#7c6af7" }}>.</span>
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#505070", marginTop: "4px" }}>
            Admin Portal
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "#505070", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: "#505070", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#fb923c", marginBottom: "16px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#7c6af7",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.6 : 1,
              fontFamily: "inherit",
              transition: "opacity 0.15s",
            }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#505070", marginTop: "24px" }}>
          Not Adeleke?{" "}
          <a href="/" style={{ color: "#7c6af7", textDecoration: "none" }}>
            Go to portfolio →
          </a>
        </p>
      </div>
    </div>
  );
}
