// app/sitemap
import { MetadataRoute } from "next";
import { produseVestimentare, produseAlimentare } from "@/components/utils/StaticImages";

const BASE = "https://beestrong-website-sigma.vercel.app"

function productUrlFrom(p: { id: string; nume?: string }) {
    // Use an existing route pattern. Here I assume you'll make product pages at /produse/[id]
    return `${BASE}/produse/${encodeURIComponent(p.id)}`
}

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        { url: BASE + "/", lastModified: new Date() },
        { url: BASE + "/sign-in", lastModified: new Date() },
    ]

    const products = [
        ...produseVestimentare,
        ...produseAlimentare,
    ].map((p) => ({
        url: productUrlFrom(p),
        lastModified: new Date(),
    }))

    return [...staticPages, ...products]
}