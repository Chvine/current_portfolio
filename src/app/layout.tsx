import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sharmaine A. Jacob — IT Student & Aspiring Software Developer",
  description:
    "Portfolio of Sharmaine A. Jacob — Information Technology student specializing in System Development. Building practical software solutions and web applications.",
  keywords: [
    "Sharmaine Jacob",
    "Software Developer",
    "Information Technology",
    "System Development",
    "Portfolio",
    "Web Developer",
    "Philippines",
  ],
  authors: [{ name: "Sharmaine A. Jacob" }],
  openGraph: {
    title: "Sharmaine A. Jacob — IT Student & Aspiring Software Developer",
    description:
      "Portfolio of Sharmaine A. Jacob — Information Technology student specializing in System Development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground font-body antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
