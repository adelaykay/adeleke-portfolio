"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects, deleteProject } from "@/lib/firebase/firestore";
import type { Project } from "@/types/project";
import Image from "next/image";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try { setProjects(await getAllProjects()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch { alert("Failed to delete."); }
    finally { setDeleting(null); }
  }

  const tdS: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid #252538", color: "#e2e2f0", fontSize: "13px" };

  return (
    <div>
      <div className="projects-header" style={{ 
        display: "flex", 
        alignItems: "flex-start", 
        justifyContent: "space-between", 
        marginBottom: "32px",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", color: "#e2e2f0", marginBottom: "4px" }}>Projects</h1>
          <p style={{ fontSize: "13px", color: "#505070" }}>{projects.length} total</p>
        </div>
        <Link
          href="/admin/projects/new"
          style={{ 
            padding: "8px 18px", 
            borderRadius: "8px", 
            background: "#7c6af7", 
            color: "#fff", 
            fontSize: "13px", 
            fontWeight: 500, 
            textDecoration: "none",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          + New Project
        </Link>
      </div>

      <div style={{ 
        borderRadius: "12px", 
        border: "1px solid #252538", 
        overflow: "auto", 
        background: "#0e0e18",
        WebkitOverflowScrolling: "touch",
      }}>
        {loading ? (
          <div style={{ padding: "48px 16px", textAlign: "center", color: "#505070", fontSize: "13px" }}>Loading…</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["#", "Project", "Status", "Published", "Actions"].map((h) => (
                  <th key={h} style={{ 
                    padding: "10px 16px", 
                    textAlign: "left", 
                    fontSize: "11px", 
                    fontWeight: 600, 
                    color: "#505070", 
                    borderBottom: "1px solid #252538",
                    display: h === "#" ? "none" : "table-cell",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={{ 
                    ...tdS, 
                    color: "#505070", 
                    width: "40px",
                    display: "none",
                  }}>{p.displayOrder}</td>
                  <td style={tdS}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "44px" }}>
                      {typeof p.icon === "string" && p.icon.startsWith("http") ? (
                        <Image src={p.icon} alt={p.name} width={20} height={20} />
                      ) : (
                        <span style={{ fontSize: "16px" }}>{p.icon}</span>
                      )}
                      <span>{p.name}</span>
                    </div>
                    {p.isNda && (
                      <span style={{ marginLeft: "8px", fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "rgba(246,173,85,0.1)", color: "#f6ad55" }}>
                        NDA
                      </span>
                    )}
                  </td>
                  <td style={tdS}>
                    <span
                      className={p.status === "live" ? "badge-live" : "badge-testing"}
                      style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontWeight: 600 }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td style={{ 
                    ...tdS, 
                    color: p.isPublished ? "#4ade80" : "#505070",
                    display: "none",
                  }}>
                    {p.isPublished ? "Published" : "Draft"}
                  </td>
                  <td style={tdS}>
                    <div className="actions-flex" style={{ 
                      display: "flex", 
                      gap: "12px",
                      flexDirection: "column",
                    }}>
                      <Link href={`/admin/projects/${p.id}`} style={{ color: "#7c6af7", fontSize: "12px", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>Edit</Link>
                      <Link href={`/projects/${p.slug}`} target="_blank" style={{ color: "#505070", fontSize: "12px", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>View ↗</Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        style={{ 
                          background: "none", 
                          border: "none", 
                          color: "#fb923c", 
                          fontSize: "12px", 
                          cursor: "pointer", 
                          padding: 0, 
                          opacity: deleting === p.id ? 0.5 : 1,
                          minHeight: "44px",
                          display: "flex",
                          alignItems: "center",
                          textAlign: "left",
                        }}
                      >
                        {deleting === p.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        @media (min-width: 640px) {
          .projects-header {
            flex-direction: row !important;
            align-items: center !important;
          }
          .projects-header a {
            width: auto !important;
          }
          .actions-flex {
            flex-direction: row !important;
            gap: 16px !important;
          }
        }
        @media (min-width: 768px) {
          th, td {
            display: table-cell !important;
          }
        }
      `}</style>
    </div>
  );
}
