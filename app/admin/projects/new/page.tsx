import { ProjectEditor } from "@/components/admin/ProjectEditor";

export default function NewProjectPage() {
  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "24px", color: "#e2e2f0", marginBottom: "4px" }}>
          New Project
        </h1>
        <p style={{ fontSize: "13px", color: "#505070" }}>
          Fill in the journey details — they&apos;ll appear on the public project page.
        </p>
      </div>
      <ProjectEditor mode="create" />
    </div>
  );
}
