import type { Metadata, Viewport } from "next";

import { siteSeo } from "./seo";

function normalizeSiteUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Prefer APP_URL, then Vercel deployment URLs, then the local SEO fallback.
 * Wrong metadataBase makes crawlers request localhost share images.
 */
function resolveSiteUrl(): string {
  const configured = process.env.APP_URL?.trim();
  if (configured) {
    return normalizeSiteUrl(new URL(configured).origin);
  }

  const vercelHost =
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;
  if (vercelHost) {
    return normalizeSiteUrl(`https://${vercelHost}`);
  }

  return normalizeSiteUrl(siteSeo.siteUrl);
}

function getMetadataBase(): URL {
  return new URL(resolveSiteUrl());
}

function absoluteAsset(path: string): string {
  return new URL(path, getMetadataBase()).toString();
}

export function createSiteMetadata(): Metadata {
  const openGraphImage = {
    url: absoluteAsset(siteSeo.ogImage),
    width: 2400,
    height: 1260,
    alt: "Aadil’s Matchday football party gift pass",
  } as const;

  const twitterImageUrl = absoluteAsset(siteSeo.twitterImage);

  return {
    metadataBase: getMetadataBase(),
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
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSeo.name,
      description: siteSeo.socialDescription,
      images: [twitterImageUrl],
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
