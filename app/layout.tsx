import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const displayFont = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const bodyFont = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Party Gift Pass",
  description: "One-time gift tickets for a joyful party experience.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
