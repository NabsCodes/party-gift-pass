import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { createSiteMetadata, viewport } from "@/lib/metadata";

const displayFont = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = createSiteMetadata();
export { viewport };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="bg-cream text-ink min-w-80 antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
