import type { Metadata, Viewport } from "next";

import { siteSeo } from "./seo";

const baseUrl = () => {
  const configured = process.env.APP_URL?.trim();
  return new URL(configured || siteSeo.siteUrl);
};

export function createSiteMetadata(): Metadata {
  return {
    metadataBase: baseUrl(),
    title: {
      default: siteSeo.name,
      template: `%s | ${siteSeo.shortName}`,
    },
    description: siteSeo.description,
    applicationName: siteSeo.shortName,
    keywords: [...siteSeo.keywords],
    authors: [{ name: siteSeo.shortName }],
    creator: siteSeo.shortName,
    publisher: siteSeo.shortName,
    alternates: { canonical: "/" },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "/",
      siteName: siteSeo.shortName,
      title: siteSeo.name,
      description: siteSeo.socialDescription,
      images: [
        {
          url: siteSeo.ogImage,
          width: 2400,
          height: 1260,
          alt: "Aadil’s Matchday football party gift pass",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.name,
      description: siteSeo.socialDescription,
      images: [siteSeo.twitterImage],
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/apple-icon.png",
    },
    referrer: "no-referrer",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#df1f26",
  colorScheme: "light",
};
