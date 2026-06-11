"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work",   href: "/#projects" },
  { label: "About",  href: "/#about" },
  { label: "Ask AI", href: "/#ai" },
  { label: "GitHub", href: "https://github.com/adelaykay", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: "1px solid #252538",
        background: "rgba(9, 9, 15, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "18px",
          color: "#e2e2f0",
          textDecoration: "none",
          letterSpacing: "-0.5px",
        }}
        onClick={() => setMenuOpen(false)}
      >
        Adeleke<span style={{ color: "#7c6af7" }}>.</span>
      </Link>

      {/* Mobile menu button */}
      {!isAdmin && (
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#e2e2f0",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Right-aligned nav links */}
      {!isAdmin && (
        <>
          <div 
            className={`nav-links ${menuOpen ? 'open' : ''}`}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "24px",
            }}
          >
            {NAV_LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{
                    fontSize: "13px",
                    color: "#9090b0",
                    textDecoration: "none",
                    transition: "color 0.15s",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e2e2f0")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9090b0")}
                >
                  {l.label}
                </a>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link"
                  style={{
                    fontSize: "13px",
                    color: "#9090b0",
                    textDecoration: "none",
                    transition: "color 0.15s",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e2e2f0")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9090b0")}
                >
                  {l.label}
                </a>
              )
            )}
            
            {/* Admin Button integrated into the menu */}
            <Link
              href="/admin"
              className="admin-btn"
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "12px",
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: "8px",
                background: "#7c6af7",
                color: "#fff",
                textDecoration: "none",
                transition: "opacity 0.15s",
                display: "block",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Admin ↗
            </Link>
          </div>

          {/* Mobile overlay */}
          {menuOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.5)",
                zIndex: -1,
              }}
              onClick={() => setMenuOpen(false)}
            />
          )}
        </>
      )}

      {/* Right CTA for Admin Layout */}
      {isAdmin && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "#505070" }}>Admin Portal</span>
          <Link
            href="/"
            style={{
              fontSize: "12px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #252538",
              color: "#9090b0",
              textDecoration: "none",
            }}
          >
            ← View Site
          </Link>
        </div>
      )}

      <style>{`
        .mobile-menu-btn {
          display: none !important;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .nav-links {
            position: fixed !important;
            top: 56px !important;
            left: 0 !important;
            right: 0 !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
            background: #0e0e18 !important;
            border-bottom: none !important;
            padding: 0 24px !important;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
          }
          .nav-links.open {
            max-height: 500px;
            padding-top: 16px !important;
            padding-bottom: 24px !important;
            border-bottom: 1px solid #252538 !important;
            display: flex !important;
          }
          .nav-link {
            width: 100%;
          }
          .admin-btn {
            margin-top: 8px !important;
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
}