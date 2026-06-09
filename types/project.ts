export type ProjectStatus = "live" | "testing" | "archived";

export interface Project {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  shortDesc: string;
  status: ProjectStatus;
  platform: string;
  storeUrl?: string;
  testingLink?: string;
  isNda: boolean;
  isPublished: boolean;
  displayOrder: number;
  tags: string[];
  techStack?: string[];

  // Journey fields
  inception: string;
  journey?: string;
  challenges: string;
  outcome?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">;
