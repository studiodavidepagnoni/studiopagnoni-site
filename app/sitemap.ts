import type { MetadataRoute } from "next";
import { projectAreas, projectCategories } from "@/lib/content/projects";
import {
  lastModifiedForProjectArea,
  lastModifiedForProjectCase,
  lastModifiedForStaticPath,
} from "@/lib/config/sitemapDates";
import { site } from "@/lib/config/site";
import { withLocalePrefix } from "@/lib/i18n/paths";

/** Obbligatorio con `output: export` (GitHub Pages / hosting statico). */
export const dynamic = "force-static";

const base = site.url.replace(/\/$/, "");

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** Pagine statiche con mirror `/en/…`. */
const staticPaths: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/servizi", changeFrequency: "monthly", priority: 0.9 },
  { path: "/architettura-franciacorta", changeFrequency: "monthly", priority: 0.95 },
  { path: "/topografia", changeFrequency: "monthly", priority: 0.95 },
  { path: "/laser-scanner-slam", changeFrequency: "weekly", priority: 1 },
  { path: "/rilievi-3d-per-studi-di-architettura", changeFrequency: "monthly", priority: 0.9 },
  { path: "/rilievi-laser-scanner-slam-brescia", changeFrequency: "weekly", priority: 0.95 },
  { path: "/rilievi-laser-scanner-slam-lombardia", changeFrequency: "weekly", priority: 0.95 },
  { path: "/contatti", changeFrequency: "monthly", priority: 0.9 },
  { path: "/chi-siamo", changeFrequency: "monthly", priority: 0.8 },
  { path: "/progetti", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

function locUrl(path: string): string {
  if (path === "" || path === "/") return `${base}/`;
  const bare = path.startsWith("/") ? path : `/${path}`;
  return `${base}${bare}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of staticPaths) {
    const lastModified = lastModifiedForStaticPath(path);
    entries.push({
      url: locUrl(path),
      lastModified,
      changeFrequency,
      priority,
    });
    const enPath = withLocalePrefix(path === "" ? "/" : path, "en");
    entries.push({
      url: locUrl(enPath),
      lastModified,
      changeFrequency,
      priority: Math.max(0.2, Number((priority - 0.05).toFixed(2))),
    });
  }

  for (const area of projectAreas) {
    const areaLastMod = lastModifiedForProjectArea(area);
    entries.push({
      url: `${base}/progetti/${area}/`,
      lastModified: areaLastMod,
      changeFrequency: "monthly",
      priority: 0.75,
    });
    entries.push({
      url: `${base}/en/progetti/${area}/`,
      lastModified: areaLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const c of projectCategories[area].cases) {
      const caseLastMod = lastModifiedForProjectCase(area, c.slug);
      entries.push({
        url: `${base}/progetti/${area}/${c.slug}/`,
        lastModified: caseLastMod,
        changeFrequency: "monthly",
        priority: 0.72,
      });
      entries.push({
        url: `${base}/en/progetti/${area}/${c.slug}/`,
        lastModified: caseLastMod,
        changeFrequency: "monthly",
        priority: 0.67,
      });
    }
  }

  return entries;
}
