"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/FirebaseProvider";
import { signOut } from "@/lib/firebase/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  // Prevent children rendering before auth resolves
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return; // Wait — Firebase hasn't resolved persisted session yet
    if (!user) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [user, loading, router]);

  // Show neutral loading state — no flash of content, no premature redirect
  if (loading || !ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090f",
        }}
      >
        <div style={{ fontSize: "14px", color: "#505070" }}>
          {loading ? "Authenticating…" : "Redirecting…"}
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Projects",  href: "/admin/projects" },
    { label: "New Project", href: "/admin/projects/new" },
    { label: "Settings",  href: "/admin/settings" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#09090f" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          borderRight: "1px solid #252538",
          display: "flex",
          flexDirection: "column",
          background: "#0e0e18",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid #252538" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "17px",
              color: "#e2e2f0",
              textDecoration: "none",
            }}
          >
            Adeleke<span style={{ color: "#7c6af7" }}>.</span>
          </Link>
          <div
            style={{
              fontSize: "10px",
              marginTop: "4px",
              color: "#505070",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            Admin Hub
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px" }}>
          {navItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  marginBottom: "2px",
                  textDecoration: "none",
                  background: active ? "#18182a" : "transparent",
                  color: active ? "#e2e2f0" : "#9090b0",
                  borderLeft: active ? "2px solid #7c6af7" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div style={{ padding: "16px", borderTop: "1px solid #252538" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#505070",
              marginBottom: "8px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user?.email}
          </div>
          <button
            onClick={() =>
              signOut().then(() => router.replace("/login"))
            }
            style={{
              width: "100%",
              fontSize: "12px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #252538",
              background: "transparent",
              color: "#9090b0",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: "auto", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}
