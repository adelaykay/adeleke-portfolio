"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Work",   href: "/#projects" },
  { label: "About",  href: "/#about" },
  { label: "Ask AI", href: "/#ai" },
  { label: "GitHub", href: "https://github.com/adelaykay", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

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
      >
        Adeleke<span style={{ color: "#7c6af7" }}>.</span>
      </Link>

      {/* Centre nav links */}
      {!isAdmin && (
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {NAV_LINKS.map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "13px",
                  color: "#9090b0",
                  textDecoration: "none",
                  transition: "color 0.15s",
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
                style={{
                  fontSize: "13px",
                  color: "#9090b0",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e2e2f0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9090b0")}
              >
                {l.label}
              </a>
            )
          )}
        </div>
      )}

      {/* Right CTA */}
      {isAdmin ? (
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
      ) : (
        <Link
          href="/admin"
          style={{
            fontSize: "12px",
            fontWeight: 500,
            padding: "8px 16px",
            borderRadius: "8px",
            background: "#7c6af7",
            color: "#fff",
            textDecoration: "none",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Admin ↗
        </Link>
      )}
    </nav>
  );
}
