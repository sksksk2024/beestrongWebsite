// app/sitemap.ts
import { MetadataRoute } from "next";
import { produseVestimentare, produseAlimentare } from "@/components/utils/StaticImages";

const BASE = "https://beestrong-website-sigma.vercel.app";

function productUrlFrom(p: { id: string; nume?: string }) {
  return `${BASE}/produse/${encodeURIComponent(p.id)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE + "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: BASE + "/sign-in",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2, // Low priority because it's functional, not SEO content
    },
  ];

  const products: MetadataRoute.Sitemap = [
    ...produseVestimentare,
    ...produseAlimentare,
  ].map((p) => ({
    url: productUrlFrom(p),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...products];
}
