import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: For Firebase Hosting with API routes, deploy via Cloud Run.
  // For static-only (no API routes), set output: "export" and remove /app/api routes.
  // Default: standard Next.js build for Cloud Run deployment.
  
  images: {
    unoptimized: true,
  },

  trailingSlash: false,
};

export default nextConfig;
