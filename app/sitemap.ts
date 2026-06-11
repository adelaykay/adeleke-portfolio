import { MetadataRoute } from "next";
import { adminGetAllProjects } from "@/lib/firebase/admin";

const BASE_URL = "https://adeleke.empyrealworks.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  try {
    const projects = await adminGetAllProjects();
    sitemap.push(
      ...projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  } catch {
    // Build with whatever was available; project pages may be omitted until Firebase is configured.
  }

  return sitemap;
}
