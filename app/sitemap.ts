import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ryadstudio.com",
      lastModified: new Date(),
    },
    {
      url: "https://ryadstudio.com/designs",
      lastModified: new Date(),
    },
    {
      url: "https://ryadstudio.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://ryadstudio.com/results",
      lastModified: new Date(),
    },
    {
      url: "https://ryadstudio.com/why-us",
      lastModified: new Date(),
    },
  ];
}
