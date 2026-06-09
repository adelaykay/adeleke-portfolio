import { NextRequest, NextResponse } from "next/server";
import { adminCreateProject, adminGetAllProjects, verifyIdToken } from "@/lib/firebase/admin";
import { SEED_PROJECTS } from "@/lib/seed-data";

export const runtime = "nodejs";

// POST /api/seed — one-time seed of projects into Firestore (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await verifyIdToken(token);
    if (decoded.uid !== process.env.ADMIN_UID) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Only seed if collection is empty
    const existing = await adminGetAllProjects();
    if (existing.length > 0) {
      return NextResponse.json(
        { message: `Skipped — ${existing.length} projects already exist.` },
        { status: 200 }
      );
    }

    const ids = await Promise.all(SEED_PROJECTS.map(adminCreateProject));
    return NextResponse.json({ seeded: ids.length, ids }, { status: 201 });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
