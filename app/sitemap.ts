import { MetadataRoute } from "next";

const BASE = "https://ryadstudio.com";

// Pages secteur — cibles du référencement local, priorité juste sous la home
const SECTOR_PATHS = [
  "/site-web-restaurant",
  "/site-web-coiffeur",
  "/site-web-artisan",
  "/site-web-ecommerce",
  "/site-web-immobilier",
  "/site-web-location-voiture",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE}/creation-site-internet`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SECTOR_PATHS.map((path) => ({
      url: `${BASE}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/realisations`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tarifs`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/why-us`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/results`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
