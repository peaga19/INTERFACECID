import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meu SUS Digital",
  description: "A sua plataforma moderna e acessível de saúde do SUS.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Meu SUS",
  },
};

export const viewport: Viewport = {
  themeColor: "#0056b3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <AccessibilityProvider>
          {children}
          <AccessibilityPanel />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
