import type { Metadata } from "next";
import "./globals.css";
import { FirebaseProvider } from "@/components/providers/FirebaseProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://adeleke.empyrealworks.com"),
  title: "Adeleke Olasope — Full-Stack Developer",
  description:
    "Full-stack developer and entrepreneur building AI-powered products for African and global markets. Founder of Empyreal Works.",
  keywords: [
    "Adeleke Olasope",
    "Empyreal Works",
    "Full-Stack Developer",
    "AI Portfolio",
    "React Native",
    "Next.js",
    "Firebase",
    "Nigeria",
    "Lagos",
  ],
  authors: [{ name: "Adeleke Olasope", url: "https://adeleke.empyrealworks.com" }],
  openGraph: {
    title: "Adeleke Olasope — Full-Stack Developer",
    description: "Building AI-powered products for African and global markets.",
    url: "https://adeleke.empyrealworks.com",
    siteName: "Adeleke Olasope",
    type: "website",
    images: [
      {
        url: "/portrait.png",
        width: 1200,
        height: 1200,
        alt: "Portrait of Adeleke Olasope",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeleke Olasope — Full-Stack Developer",
    description: "Building AI-powered products for African and global markets.",
    images: ["/portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
