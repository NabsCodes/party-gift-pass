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
  ogImage: "/opengraph-image.png",
  twitterImage: "/twitter-image.png",
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
  staff: {
    path: "/staff",
    title: `Gift desk | ${siteSeo.shortName}`,
    description:
      "Private staff workspace for sharing passes and checking collection status.",
  },
  login: {
    path: "/staff/login",
    title: `Staff access | ${siteSeo.shortName}`,
    description: "Private staff access for the party gift desk.",
  },
} satisfies Record<string, SeoRoute>;
