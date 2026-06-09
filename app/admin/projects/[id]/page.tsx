"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { getProjectById } from "@/lib/firebase/firestore";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import type { Project } from "@/types/project";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getProjectById(id)
      .then((p) => {
        if (!p) setNotFound(true);
        else setProject(p);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-sm animate-pulse" style={{ color: "var(--text3)" }}>
        Loading project…
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="text-sm" style={{ color: "var(--testing)" }}>
        Project not found.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="font-display font-bold text-2xl tracking-tight mb-1"
          style={{ color: "var(--text)" }}
        >
          Edit — {project.name}
        </h1>
        <p className="text-sm" style={{ color: "var(--text3)" }}>
          Changes are published immediately after saving.
        </p>
      </div>
      <ProjectEditor mode="edit" project={project} />
    </div>
  );
}
