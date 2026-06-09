import { NextRequest, NextResponse } from "next/server";
import { adminGetAllProjects, adminCreateProject, verifyIdToken } from "@/lib/firebase/admin";
import type { ProjectFormData } from "@/types/project";

export const runtime = "nodejs";

// GET /api/projects — returns all published projects (public)
export async function GET() {
  try {
    const projects = await adminGetAllProjects();
    const published = projects.filter((p) => p.isPublished);
    return NextResponse.json(published);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST /api/projects — create a new project (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await verifyIdToken(token);
    if (decoded.uid !== process.env.ADMIN_UID) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data: ProjectFormData = await req.json();
    const id = await adminCreateProject(data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
