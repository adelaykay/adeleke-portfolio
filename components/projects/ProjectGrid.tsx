"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectStatus } from "@/types/project";

const FILTERS: { label: string; value: "all" | ProjectStatus }[] = [
  { label: "All",        value: "all" },
  { label: "Live",       value: "live" },
  { label: "In Testing", value: "testing" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "4px",
          borderRadius: "10px",
          background: "#18182a",
          width: "fit-content",
          marginBottom: "32px",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            style={{
              position: "relative",
              padding: "6px 16px",
              borderRadius: "7px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              background: filter === f.value ? "#13131f" : "transparent",
              color: filter === f.value ? "#e2e2f0" : "#9090b0",
              transition: "color 0.15s",
              fontFamily: "inherit",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px", color: "#505070", fontSize: "14px" }}>
          No projects match this filter.
        </div>
      )}
    </div>
  );
}
