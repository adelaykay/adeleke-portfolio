"use client";

export function Footer() {
  return (
    <footer
      className="page-footer"
      style={{
        borderTop: "1px solid #252538",
        padding: "32px 24px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            color: "#505070",
          }}
        >
          adeleke.empyrealworks.com
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "GitHub",   href: "https://github.com/adelaykay" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/adeleke-olasope-0a097b19b/" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#505070",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e2e2f0")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#505070")}
            >
              {l.label}
            </a>
          ))}
          <span style={{ fontSize: "12px", color: "#505070" }}>
            © {new Date().getFullYear()} Empyreal Works
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .page-footer {
            padding: 24px 12px !important;
            margin-top: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
