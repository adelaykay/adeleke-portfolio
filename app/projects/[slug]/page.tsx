import { notFound } from "next/navigation";
import Link from "next/link";
import { adminGetProjectBySlug, adminGetAllProjects } from "@/lib/firebase/admin";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatusBadge } from "@/components/projects/ProjectCard";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await adminGetAllProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await adminGetProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.name} — Adeleke Olasope`,
      description: project.shortDesc,
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let project = null;

  try {
    project = await adminGetProjectBySlug(slug);
  } catch {
    // Firebase not configured
  }

  if (!project) notFound();

  const journeySteps = [
    {
      label: "✦ Inception",
      sublabel: "The problem being solved",
      content: project.inception,
    },
    ...(project.journey
      ? [{ label: "⟳ Journey", sublabel: "The build story", content: project.journey }]
      : []),
    {
      label: "⚡ Challenges",
      sublabel: "Technical obstacles & solutions",
      content: project.challenges,
    },
    ...(project.outcome
      ? [{ label: "◎ Outcome", sublabel: "Results & impact", content: project.outcome }]
      : []),
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: "var(--text3)" }}
        >
          ← All Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: project.color + "18",
                border: `1px solid ${project.color}35`,
              }}
            >
              {project.icon}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="font-display font-extrabold text-3xl tracking-tight"
                  style={{ color: "var(--text)" }}
                >
                  {project.name}
                </h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-sm" style={{ color: "var(--text3)" }}>
                {project.platform}
              </p>
            </div>
          </div>

          <p
            className="text-base leading-relaxed max-w-2xl"
            style={{ color: "var(--text2)" }}
          >
            {project.shortDesc}
          </p>

          {project.storeUrl && (
            <a
              href={project.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ background: project.color }}
            >
              View on {project.platform} ↗
            </a>
          )}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{ background: "var(--border)" }}
        />

        {/* Journey */}
        <div className="space-y-6 mb-14">
          <h2
            className="font-display font-bold text-xs tracking-widest uppercase mb-8"
            style={{ color: "var(--text3)" }}
          >
            Project Journey
          </h2>

          {journeySteps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border p-6"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="mb-1">
                <span
                  className="font-display font-bold text-sm"
                  style={{ color: project.color }}
                >
                  {step.label}
                </span>
                <span
                  className="text-xs ml-2"
                  style={{ color: "var(--text3)" }}
                >
                  — {step.sublabel}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mt-3"
                style={{ color: "var(--text2)" }}
              >
                {step.content}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div
          className="rounded-xl border p-6"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <h3
            className="font-display font-bold text-sm mb-4"
            style={{ color: "var(--text)" }}
          >
            🛠 Technologies Used
          </h3>

          {project.isNda ? (
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium mb-3"
                style={{
                  background: "rgba(246,173,85,0.1)",
                  border: "1px solid rgba(246,173,85,0.25)",
                  color: "var(--accent3)",
                }}
              >
                🔒 Under NDA — technology stack not disclosed
              </div>
              <p className="text-sm" style={{ color: "var(--text2)" }}>
                This project was built under a strict NDA for a UK-based
                company. The technology stack, architecture decisions, and
                implementation details remain confidential by contractual
                agreement.
              </p>
            </div>
          ) : project.techStack && project.techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg font-medium"
                  style={{
                    background: project.color + "12",
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: "var(--text3)" }}>
              No tech stack listed.
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t flex items-center justify-between"
          style={{ borderColor: "var(--border)" }}>
          <Link
            href="/#projects"
            className="text-sm transition-colors"
            style={{ color: "var(--text3)" }}
          >
            ← All Projects
          </Link>
          <Link
            href="/#ai"
            className="text-sm transition-colors"
            style={{ color: "var(--text3)" }}
          >
            Ask the AI Guide ✦
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
