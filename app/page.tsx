import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AIChatGuide } from "@/components/ai/AIChatGuide";
import { adminGetAllProjects } from "@/lib/firebase/admin";
import type { Project } from "@/types/project";

export const metadata: Metadata = {
  title: "Adeleke Olasope — AI-Powered Full-Stack Developer",
  description:
    "Adeleke Olasope builds AI-powered web and mobile products for African and global users. Explore projects, skills, and availability.",
  openGraph: {
    title: "Adeleke Olasope — AI-Powered Full-Stack Developer",
    description:
      "Adeleke Olasope builds AI-powered web and mobile products for African and global users.",
    url: "https://adeleke.web.app",
    siteName: "Adeleke Olasope",
    type: "website",
    images: [
      {
        url: "/portrait.png",
        width: 1200,
        height: 1200,
        alt: "Portrait of Adeleke Olasope",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeleke Olasope — AI-Powered Full-Stack Developer",
    description:
      "Adeleke Olasope builds AI-powered web and mobile products for African and global users.",
    images: ["/portrait.png"],
  },
};

export const revalidate = 60;

export default async function HomePage() {
  let projects: Project[] = [];
  try {
    const all = await adminGetAllProjects();
    projects = all.filter((p) => p.isPublished);
  } catch {
    // Firebase not yet configured — empty state shown
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://adeleke.web.app",
    name: "Adeleke Olasope",
    description:
      "Adeleke Olasope builds AI-powered web and mobile products for African and global users.",
    publisher: {
      "@type": "Person",
      name: "Adeleke Olasope",
      url: "https://adeleke.web.app",
    },
    sameAs: [
      "https://github.com/adelaykay",
      "https://www.linkedin.com/in/adeleke-olasope-0a097b19b/",
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HeroSection />

        {/* ── Projects ──────────────────────────────────────────────── */}
        <section
          id="projects"
          className="page-section"
          style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 24px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#505070",
                whiteSpace: "nowrap",
              }}
            >
              Projects
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#252538" }} />
            <span style={{ fontSize: "11px", color: "#505070", whiteSpace: "nowrap" }}>
              {projects.length} total
            </span>
          </div>

          {projects.length > 0 ? (
            <ProjectGrid projects={projects} />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                borderRadius: "12px",
                border: "1px solid #252538",
                color: "#505070",
                fontSize: "14px",
              }}
            >
              Projects loading… Configure Firebase in .env.local to see them here.
            </div>
          )}
        </section>

        {/* ── About ─────────────────────────────────────────────────── */}
        <section
          id="about"
          className="page-section"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "80px 24px",
            borderTop: "1px solid #252538",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#505070",
                whiteSpace: "nowrap",
              }}
            >
              About
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#252538" }} />
          </div>

          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "48px",
              alignItems: "start",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  letterSpacing: "-0.3px",
                  color: "#e2e2f0",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Engineering products people actually use.
              </h3>
              {[
                "I'm Adeleke Olasope — a full-stack developer and entrepreneur based in Lagos, Nigeria. I build AI-powered mobile and web applications under my venture, Empyreal Works.",
                "My focus is on products that solve real problems for African users — from document automation for SMEs to voice transcription tuned for West African English accents. I care about the full stack: clean architecture, great UX, and reliable infrastructure.",
                "When I'm not building, I'm thinking about the next thing to build.",
              ].map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.8,
                    color: "#9090b0",
                    marginBottom: "12px",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Core Stack", value: "Next.js · React Native · Flutter · Firebase" },
                { label: "AI Tools",   value: "Gemini · Whisper · LLM APIs" },
                { label: "Payments",   value: "Paystack · Stripe" },
                { label: "Location",   value: "Lagos, Nigeria 🇳🇬" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #252538",
                    padding: "16px",
                    background: "#18182a",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: "#505070",
                      marginBottom: "6px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 500, color: "#e2e2f0" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI Guide ──────────────────────────────────────────────── */}
        <section
          id="ai"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "80px 24px",
            borderTop: "1px solid #252538",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#505070",
                whiteSpace: "nowrap",
              }}
            >
              AI Portfolio Guide
            </h2>
            <div style={{ flex: 1, height: "1px", background: "#252538" }} />
          </div>

          <div style={{ maxWidth: "960px" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#9090b0",
                marginBottom: "24px",
                lineHeight: 1.7,
              }}
            >
              Have a question about my work, stack, or availability? Ask the AI
              guide — it knows everything about my projects and experience.
            </p>
            <AIChatGuide />
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section {
            padding: 60px 16px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          section {
            padding: 48px 12px !important;
          }
          .about-grid {
            gap: 24px !important;
          }
        }
      `}</style>
    </>
  );
}
