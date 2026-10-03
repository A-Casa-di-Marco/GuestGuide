import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MarcoChat } from "@/components/marco-chat";

export const metadata: Metadata = {
  title: "A Casa di Marco · Guida per gli Ospiti",
  description: "Guida digitale per gli ospiti di A Casa di Marco, Garden Cottage Escape a Salerno.",
  manifest: "/manifest.webmanifest",
  themeColor: "#22331f",
  appleWebApp: {
    capable: true,
    title: "Casa di Marco",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/assets/icon-192.png",
    shortcut: "/assets/icon-192.png",
    apple: "/assets/icon-192.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <MarcoChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
