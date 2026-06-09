"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/firebase/firestore";
import type { Project } from "@/types/project";

const S = {
  h1: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", letterSpacing: "-0.5px", color: "#e2e2f0", marginBottom: "4px" } as React.CSSProperties,
  sub: { fontSize: "13px", color: "#505070" } as React.CSSProperties,
  card: { borderRadius: "12px", border: "1px solid #252538", padding: "20px", background: "#18182a" } as React.CSSProperties,
  label: { fontSize: "10px", textTransform: "uppercase" as const, letterSpacing: "1.5px", color: "#505070", marginBottom: "6px" },
  table: { width: "100%", fontSize: "13px", borderCollapse: "collapse" as const },
  th: { padding: "10px 16px", textAlign: "left" as const, fontSize: "11px", fontWeight: 600, color: "#505070", borderBottom: "1px solid #252538" },
  td: { padding: "10px 16px", borderBottom: "1px solid #252538", color: "#e2e2f0" },
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

  const live    = projects.filter((p) => p.status === "live").length;
  const testing = projects.filter((p) => p.status === "testing").length;
  const pub     = projects.filter((p) => p.isPublished).length;

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={S.h1}>Dashboard</h1>
        <p style={S.sub}>Welcome back. Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "40px" }}>
        {[
          { label: "Total", value: loading ? "—" : projects.length, color: "#e2e2f0" },
          { label: "Live",  value: loading ? "—" : live,  color: "#4ade80" },
          { label: "Testing", value: loading ? "—" : testing, color: "#fb923c" },
          { label: "Published", value: loading ? "—" : pub, color: "#e2e2f0" },
        ].map((s) => (
          <div key={s.label} style={S.card}>
            <div style={S.label}>{s.label}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "32px", color: s.color }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Table header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e2f0" }}>
          Projects
        </h2>
        <Link
          href="/admin/projects/new"
          style={{ fontSize: "12px", padding: "8px 16px", borderRadius: "8px", background: "#7c6af7", color: "#fff", textDecoration: "none", fontWeight: 500 }}
        >
          + New Project
        </Link>
      </div>

      <div style={{ borderRadius: "12px", border: "1px solid #252538", overflow: "hidden", background: "#0e0e18" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#505070", fontSize: "13px" }}>
            Loading…
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#505070", fontSize: "13px" }}>
            No projects yet.{" "}
            <Link href="/admin/projects/new" style={{ color: "#7c6af7" }}>Create your first one.</Link>
          </div>
        ) : (
          <table style={S.table}>
            <thead>
              <tr>
                {["Project", "Status", "Platform", "Published", ""].map((h) => (
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={S.td}>
                    <span style={{ marginRight: "8px" }}>{p.icon}</span>{p.name}
                  </td>
                  <td style={S.td}>
                    <span className={p.status === "live" ? "badge-live" : "badge-testing"}
                      style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ ...S.td, color: "#9090b0" }}>{p.platform}</td>
                  <td style={{ ...S.td, color: p.isPublished ? "#4ade80" : "#505070" }}>
                    {p.isPublished ? "Yes" : "Draft"}
                  </td>
                  <td style={S.td}>
                    <Link href={`/admin/projects/${p.id}`} style={{ color: "#7c6af7", fontSize: "12px", textDecoration: "none" }}>
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
