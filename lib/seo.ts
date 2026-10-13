import { partyCopy } from "./copy";
import { party } from "./event";

export const siteSeo = {
  name: `${party.title} · The Gift Club`,
  shortName: party.title,
  description: `Personal invitations and one-time gift passes for ${party.celebrant}’s birthday.`,
  socialDescription: `Every name. One good surprise. A personalised invitation and one-time gift pass for ${party.title}.`,
  keywords: [party.title, "party gift pass", "QR gift pass", "birthday party"],
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
