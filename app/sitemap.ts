import type { MetadataRoute } from "next";
import { projectAreas, projectCategories } from "@/lib/content/projects";
import {
  lastModifiedForProjectArea,
  lastModifiedForProjectCase,
  lastModifiedForStaticPath,
} from "@/lib/config/sitemapDates";
import { site } from "@/lib/config/site";

/** Obbligatorio con `output: export` (GitHub Pages / hosting statico). */
export const dynamic = "force-static";

const base = site.url.replace(/\/$/, "");

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/servizi", changeFrequency: "monthly", priority: 0.9 },
    { path: "/topografia", changeFrequency: "monthly", priority: 0.95 },
    { path: "/rilievi-laser-scanner-slam-brescia", changeFrequency: "weekly", priority: 1 },
    { path: "/rilievi-laser-scanner-slam-lombardia", changeFrequency: "weekly", priority: 0.98 },
    { path: "/contatti", changeFrequency: "monthly", priority: 0.9 },
    { path: "/chi-siamo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/progetti", changeFrequency: "monthly", priority: 0.8 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: lastModifiedForStaticPath(path),
    changeFrequency,
    priority,
  }));

  for (const area of projectAreas) {
    entries.push({
      url: `${base}/progetti/${area}`,
      lastModified: lastModifiedForProjectArea(area),
      changeFrequency: "monthly",
      priority: 0.75,
    });
    for (const c of projectCategories[area].cases) {
      entries.push({
        url: `${base}/progetti/${area}/${c.slug}`,
        lastModified: lastModifiedForProjectCase(area, c.slug),
        changeFrequency: "monthly",
        priority: 0.72,
      });
    }
  }

  return entries;
}
