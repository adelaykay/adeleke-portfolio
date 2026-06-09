"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import type { Project, ProjectFormData } from "@/types/project";

const DEFAULT_FORM: ProjectFormData = {
  slug: "", name: "", icon: "📦", color: "#7c6af7",
  shortDesc: "", status: "testing", platform: "", storeUrl: "",
  isNda: false, isPublished: false, displayOrder: 99,
  tags: [], techStack: [],
  inception: "", journey: "", challenges: "", outcome: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#13131f", border: "1px solid #252538",
  borderRadius: "8px", color: "#e2e2f0", padding: "10px 14px",
  fontSize: "13px", outline: "none", fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "10px", fontWeight: 600,
  textTransform: "uppercase", letterSpacing: "1px",
  color: "#505070", marginBottom: "6px",
};

const sectionStyle: React.CSSProperties = {
  borderRadius: "12px", border: "1px solid #252538",
  padding: "24px", background: "#18182a", marginBottom: "16px",
};

interface ProjectEditorProps { project?: Project; mode: "create" | "edit"; }

export function ProjectEditor({ project, mode }: ProjectEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormData>(
    project ? {
      slug: project.slug, name: project.name, icon: project.icon,
      color: project.color, shortDesc: project.shortDesc, status: project.status,
      platform: project.platform, storeUrl: project.storeUrl ?? "",
      isNda: project.isNda, isPublished: project.isPublished,
      displayOrder: project.displayOrder,
      tags: project.tags, techStack: project.techStack ?? [],
      inception: project.inception, journey: project.journey ?? "",
      challenges: project.challenges, outcome: project.outcome ?? "",
    } : DEFAULT_FORM
  );
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  const set = (key: keyof ProjectFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(""); setSuccess(false);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const toArr = (v: unknown) =>
        typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : (v as string[]) ?? [];

      const payload = {
        ...form,
        tags: toArr(form.tags),
        techStack: form.isNda ? undefined : toArr(form.techStack),
      };

      const url    = mode === "create" ? "/api/projects" : `/api/projects/${project!.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? "Failed to save"); }
      setSuccess(true);
      setTimeout(() => router.push("/admin/projects"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setSaving(false); }
  }

  function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
      <div>
        <label style={labelStyle}>{label}</label>
        {children}
        {hint && <p style={{ fontSize: "11px", color: "#505070", marginTop: "4px" }}>{hint}</p>}
      </div>
    );
  }

  const textareaStyle: React.CSSProperties = { ...inputStyle, resize: "vertical", minHeight: "90px" };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "760px" }}>

      {/* Basic info */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e2f0", marginBottom: "20px" }}>
          Basic Info
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Project Name">
            <input style={inputStyle} value={form.name} required placeholder="e.g. BizDocx"
              onChange={(e) => { set("name", e.target.value); if (mode === "create") set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Slug" hint="Auto-generated from name">
            <input style={inputStyle} value={form.slug} required placeholder="e.g. bizdocx"
              onChange={(e) => set("slug", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Icon (emoji)">
            <input style={inputStyle} value={form.icon} placeholder="📄"
              onChange={(e) => set("icon", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Accent Colour">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)}
                style={{ width: "40px", height: "40px", border: "1px solid #252538", borderRadius: "6px", cursor: "pointer", background: "none" }}
              />
              <input style={{ ...inputStyle, flex: 1 }} value={form.color} placeholder="#7c6af7"
                onChange={(e) => set("color", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
                onBlur={(e)  => (e.target.style.borderColor = "#252538")}
              />
            </div>
          </Field>
          <Field label="Status">
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.status}
              onChange={(e) => set("status", e.target.value as ProjectFormData["status"])}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            >
              <option value="live">Live</option>
              <option value="testing">Testing</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
          <Field label="Platform">
            <input style={inputStyle} value={form.platform} placeholder="Google Play Store"
              onChange={(e) => set("platform", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Store URL">
            <input style={inputStyle} value={form.storeUrl ?? ""} placeholder="https://play.google.com/…"
              onChange={(e) => set("storeUrl", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Display Order">
            <input type="number" style={inputStyle} value={form.displayOrder}
              onChange={(e) => set("displayOrder", Number(e.target.value))}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <Field label="Tags" hint="Comma-separated">
            <input style={inputStyle}
              value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags as string}
              placeholder="AI, Firebase, Mobile"
              onChange={(e) => set("tags", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
          <div style={{ gridColumn: "1 / -1" }}>
            <Field label="Short Description" hint="Shown on project card">
              <textarea style={textareaStyle} rows={2} required value={form.shortDesc}
                placeholder="One-sentence description…"
                onChange={(e) => set("shortDesc", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
                onBlur={(e)  => (e.target.style.borderColor = "#252538")}
              />
            </Field>
          </div>
        </div>
        <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
          {[
            { key: "isPublished" as const, label: "Published" },
            { key: "isNda"       as const, label: "Under NDA (hides tech stack)" },
          ].map(({ key, label }) => (
            <label key={key} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#9090b0" }}>
              <input type="checkbox" checked={form[key] as boolean} onChange={(e) => set(key, e.target.checked)}
                style={{ width: "14px", height: "14px", accentColor: "#7c6af7" }}
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      {!form.isNda && (
        <div style={sectionStyle}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e2f0", marginBottom: "20px" }}>
            Technology Stack
          </h3>
          <Field label="Technologies" hint="Comma-separated">
            <input style={inputStyle}
              value={Array.isArray(form.techStack) ? form.techStack.join(", ") : ((form.techStack ?? "") as string)}
              placeholder="Next.js, Firebase, Google Gemini, Paystack"
              onChange={(e) => set("techStack", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
              onBlur={(e)  => (e.target.style.borderColor = "#252538")}
            />
          </Field>
        </div>
      )}

      {/* Journey */}
      <div style={sectionStyle}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "14px", color: "#e2e2f0", marginBottom: "20px" }}>
          Project Journey
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { key: "inception" as const, label: "✦ Inception", hint: "The problem being solved — why this was built", required: true },
            { key: "journey"   as const, label: "⟳ Journey",   hint: "The build story (optional)" },
            { key: "challenges"as const, label: "⚡ Challenges",hint: "Technical obstacles and how you solved them", required: true },
            { key: "outcome"   as const, label: "◎ Outcome",   hint: "Results, impact, learnings (optional)" },
          ].map(({ key, label, hint, required }) => (
            <Field key={key} label={label} hint={hint}>
              <textarea style={textareaStyle} rows={3} required={required}
                value={form[key] as string ?? ""}
                onChange={(e) => set(key, e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#7c6af7")}
                onBlur={(e)  => (e.target.style.borderColor = "#252538")}
              />
            </Field>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button type="submit" disabled={saving}
          style={{ padding: "10px 24px", borderRadius: "8px", border: "none", background: "#7c6af7", color: "#fff", fontSize: "13px", fontWeight: 500, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.6 : 1, fontFamily: "inherit" }}>
          {saving ? "Saving…" : mode === "create" ? "Create Project" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.push("/admin/projects")}
          style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid #252538", background: "transparent", color: "#9090b0", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
          Cancel
        </button>
        {success && <span style={{ fontSize: "13px", color: "#4ade80" }}>✓ Saved</span>}
        {error   && <span style={{ fontSize: "13px", color: "#fb923c" }}>✗ {error}</span>}
      </div>
    </form>
  );
}
