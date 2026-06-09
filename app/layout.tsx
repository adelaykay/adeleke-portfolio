import type { Metadata } from "next";
import "./globals.css";
import { FirebaseProvider } from "@/components/providers/FirebaseProvider";

export const metadata: Metadata = {
  title: "Adeleke Olasope — Full-Stack Developer",
  description:
    "Full-stack developer and entrepreneur building AI-powered products for African and global markets. Founder of Empyreal Works.",
  keywords: [
    "Adeleke Olasope",
    "Empyreal Works",
    "Full-Stack Developer",
    "React Native",
    "Next.js",
    "Firebase",
    "Nigeria",
    "Lagos",
  ],
  authors: [{ name: "Adeleke Olasope", url: "https://adeleke.web.app" }],
  openGraph: {
    title: "Adeleke Olasope — Full-Stack Developer",
    description: "Building AI-powered products for African and global markets.",
    url: "https://adeleke.web.app",
    siteName: "Adeleke Olasope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeleke Olasope — Full-Stack Developer",
    description: "Building AI-powered products for African and global markets.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via <link> to avoid PostCSS @import conflicts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
