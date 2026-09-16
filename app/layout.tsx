import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
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
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
