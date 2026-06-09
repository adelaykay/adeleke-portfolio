"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/types/project";

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.48, ease: "easeOut" },
  },
};

const shimmerVariants: Variants = {
  initial: { x: "-100%", opacity: 0 },
  hover: {
    x: "100%",
    opacity: 0.07,
    transition: { duration: 0.55, ease: "easeInOut" },
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <motion.article
          className="relative overflow-hidden rounded-xl border h-full p-5 cursor-pointer"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          whileHover="hover"
          initial="initial"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = project.color + "60";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          {/* Shimmer sweep on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
            variants={shimmerVariants}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                style={{ background: project.color + "18", border: `1px solid ${project.color}35` }}
              >
                {project.icon}
              </div>
              <StatusBadge status={project.status} />
            </div>

            <h3 className="font-display font-bold text-base tracking-tight mb-2" style={{ color: "var(--text)" }}>
              {project.name}
            </h3>

            <p className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2" style={{ color: "var(--text2)" }}>
              {project.shortDesc}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text3)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
        status === "live" ? "badge-live" : "badge-testing"
      }`}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: "currentColor" }} />
      {status === "live" ? "Live" : "Testing"}
    </span>
  );
}
