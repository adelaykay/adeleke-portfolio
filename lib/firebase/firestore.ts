import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { app } from "./config";
import type { Project, ProjectFormData } from "@/types/project";

export const db = getFirestore(app);

export const projectsCol = collection(db, "projects");

// Convert Firestore doc → typed Project
function docToProject(d: QueryDocumentSnapshot<DocumentData>): Project {
  const data = d.data();
  return {
    ...(data as Omit<Project, "id" | "createdAt" | "updatedAt">),
    id: d.id,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt),
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate()
        : new Date(data.updatedAt),
  };
}

// ─── Public reads ─────────────────────────────────────────────────────────────

export async function getPublishedProjects(): Promise<Project[]> {
  const q = query(
    projectsCol,
    where("isPublished", "==", true),
    orderBy("displayOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(docToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const q = query(projectsCol, where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return docToProject(snap.docs[0]);
}

// ─── Admin reads (all projects incl. drafts) ──────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const q = query(projectsCol, orderBy("displayOrder", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(docToProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, "projects", id));
  if (!snap.exists()) return null;
  return docToProject(snap as QueryDocumentSnapshot<DocumentData>);
}

// ─── Admin writes ─────────────────────────────────────────────────────────────

export async function createProject(data: ProjectFormData): Promise<string> {
  const ref = await addDoc(projectsCol, {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<ProjectFormData>
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}
