"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/providers/FirebaseProvider";
import { signOut } from "@/lib/firebase/auth";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [user, loading, router]);

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
    <div style={{ minHeight: "100vh", display: "flex", background: "#09090f", flexDirection: "column" }}>
      {/* Mobile Header */}
      <div 
        className="mobile-header"
        style={{
          display: "none",
          padding: "16px",
          borderBottom: "1px solid #252538",
          background: "#0e0e18",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            color: "#e2e2f0",
            textDecoration: "none",
          }}
        >
          Adeleke<span style={{ color: "#7c6af7" }}>.</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#e2e2f0",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9,
              display: "none",
            }}
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className="sidebar"
          style={{
            width: "220px",
            flexShrink: 0,
            borderRight: "1px solid #252538",
            display: "flex",
            flexDirection: "column",
            background: "#0e0e18",
            zIndex: 10,
            position: "relative",
          }}
        >
          {/* Logo - Desktop Only */}
          <div 
            className="logo-section"
            style={{ 
              padding: "20px", 
              borderBottom: "1px solid #252538",
              display: "block",
            }}
          >
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
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    marginBottom: "2px",
                    textDecoration: "none",
                    background: active ? "#18182a" : "transparent",
                    color: active ? "#e2e2f0" : "#9090b0",
                    borderLeft: active ? "2px solid #7c6af7" : "2px solid transparent",
                    transition: "all 0.15s",
                    minHeight: "44px",
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
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #252538",
                background: "transparent",
                color: "#9090b0",
                cursor: "pointer",
                textAlign: "left",
                minHeight: "44px",
              }}
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main 
          className="main-content"
          style={{ 
            flex: 1, 
            overflow: "auto", 
            padding: "32px",
          }}
        >
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-header {
            display: flex !important;
          }
          .sidebar {
            position: fixed !important;
            top: 56px !important;
            left: 0 !important;
            height: calc(100vh - 56px) !important;
            transform: ${menuOpen ? "translateX(0)" : "translateX(-100%)"} !important;
            box-shadow: ${menuOpen ? "0 0 10px rgba(0,0,0,0.3)" : "none"} !important;
            transition: transform 0.3s ease !important;
          }
          .mobile-overlay {
            display: block !important;
          }
          .logo-section {
            display: none !important;
          }
          .main-content {
            padding: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .main-content {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
