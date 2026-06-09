// ⚠️  SERVER ONLY — never import this in client components or pages without "use server"
import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { Project, ProjectFormData } from "@/types/project";

function getAdminApp(): App {
  const existing = getApps().find((a) => a.name === "admin");
  if (existing) return existing;

  return initializeApp(
    {
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "admin"
  );
}

export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());

// ─── Verify session cookie / ID token ────────────────────────────────────────

export async function verifyIdToken(token: string) {
  return adminAuth().verifyIdToken(token);
}

// ─── Server-side project reads (bypasses security rules) ─────────────────────

export async function adminGetAllProjects(): Promise<Project[]> {
  const snap = await adminDb()
    .collection("projects")
    .orderBy("displayOrder", "asc")
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...(data as Omit<Project, "id" | "createdAt" | "updatedAt">),
      id: d.id,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
    };
  });
}

export async function adminGetProjectBySlug(slug: string): Promise<Project | null> {
  const snap = await adminDb()
    .collection("projects")
    .where("slug", "==", slug)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  return {
    ...(data as Omit<Project, "id" | "createdAt" | "updatedAt">),
    id: d.id,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
  };
}

export async function adminCreateProject(data: ProjectFormData): Promise<string> {
  const ref = await adminDb()
    .collection("projects")
    .add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  return ref.id;
}

export async function adminUpdateProject(
  id: string,
  data: Partial<ProjectFormData>
): Promise<void> {
  await adminDb()
    .collection("projects")
    .doc(id)
    .update({ ...data, updatedAt: new Date() });
}

export async function adminDeleteProject(id: string): Promise<void> {
  await adminDb().collection("projects").doc(id).delete();
}
