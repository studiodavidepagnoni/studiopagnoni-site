import type { ProjectArea } from "@/lib/content/projects";

/**
 * Date ultimo aggiornamento contenuti (ISO YYYY-MM-DD).
 * Aggiornare la voce quando modificate testi, immagini o SEO della pagina.
 */
export const staticPageLastModified: Record<string, string> = {
  "": "2026-05-21",
  "/servizi": "2026-04-10",
  "/topografia": "2026-04-10",
  "/laser-scanner-slam": "2026-07-23",
  "/rilievi-laser-scanner-slam-brescia": "2026-07-22",
  "/rilievi-laser-scanner-slam-lombardia": "2026-07-22",
  "/contatti": "2026-05-21",
  "/chi-siamo": "2026-04-01",
  "/progetti": "2026-04-15",
  "/privacy-policy": "2026-05-21",
};

export const projectAreaLastModified: Record<ProjectArea, string> = {
  "rilievi-digitalizzazione": "2026-05-15",
};

/** Chiave `area/slug` — solo casi aggiornati dopo la data dell'area. */
export const projectCaseLastModified: Partial<Record<`${ProjectArea}/${string}`, string>> = {
  "rilievi-digitalizzazione/cantina-franciacorta-slam": "2026-05-28",
  "rilievi-digitalizzazione/allevamento-appianti-slam": "2026-05-28",
  "rilievi-digitalizzazione/rilievo-terreno-maddalena-brescia": "2026-05-28",
};

const DEFAULT_PAGE_DATE = "2026-04-01";

export function parseSitemapDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function lastModifiedForStaticPath(path: string): Date {
  return parseSitemapDate(staticPageLastModified[path] ?? DEFAULT_PAGE_DATE);
}

export function lastModifiedForProjectArea(area: ProjectArea): Date {
  return parseSitemapDate(projectAreaLastModified[area]);
}

export function lastModifiedForProjectCase(area: ProjectArea, slug: string): Date {
  const key = `${area}/${slug}` as `${ProjectArea}/${string}`;
  const iso = projectCaseLastModified[key] ?? projectAreaLastModified[area];
  return parseSitemapDate(iso);
}
