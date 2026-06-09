import { NextRequest, NextResponse } from "next/server";
import {
  adminUpdateProject,
  adminDeleteProject,
  verifyIdToken,
} from "@/lib/firebase/admin";
import type { ProjectFormData } from "@/types/project";

export const runtime = "nodejs";

async function getAdminUid(req: NextRequest): Promise<string | null> {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  try {
    const decoded = await verifyIdToken(token);
    return decoded.uid === process.env.ADMIN_UID ? decoded.uid : null;
  } catch {
    return null;
  }
}

// PATCH /api/projects/[id] — update project fields
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const uid = await getAdminUid(req);
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data: Partial<ProjectFormData> = await req.json();
    await adminUpdateProject(id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — delete project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const uid = await getAdminUid(req);
  if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await adminDeleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
