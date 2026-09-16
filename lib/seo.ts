import { partyCopy } from "./copy";

export const siteSeo = {
  name: "Aadil’s Matchday · The Gift Club",
  shortName: "Aadil’s Matchday",
  description:
    "Personal invitations and one-time gift passes for Mohammed Aadil’s football party.",
  socialDescription:
    "Every name. One good surprise. A personalised invitation and one-time gift pass for Aadil’s Matchday.",
  keywords: [
    "Aadil’s Matchday",
    "party gift pass",
    "QR gift pass",
    "football party",
  ],
  siteUrl: "http://localhost:3000",
  ogImage: "/opengraph-image.jpg",
  twitterImage: "/twitter-image.jpg",
} as const;

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
};

export const seoRoutes = {
  home: {
    path: "/",
    title: siteSeo.name,
    description: siteSeo.description,
  },
  desk: {
    path: "/staff",
    title: `${partyCopy.seo.deskTitle} | ${siteSeo.shortName}`,
    description: partyCopy.seo.deskDescription,
  },
  login: {
    path: "/staff/login",
    title: `${partyCopy.seo.signInTitle} | ${siteSeo.shortName}`,
    description: partyCopy.seo.signInDescription,
  },
} satisfies Record<string, SeoRoute>;
