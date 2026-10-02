import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Casa di Marco · Gestione guida",
  description: "Guide personalizzate per gli ospiti di A Casa di Marco.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">{children}</body>
    </html>
  );
}
