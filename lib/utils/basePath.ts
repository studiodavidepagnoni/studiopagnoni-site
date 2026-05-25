/**
 * Prefisso GitHub Pages (`/nome-repo`) quando il sito non è in root.
 * Impostare `NEXT_PUBLIC_BASE_PATH` uguale al nome del repository (con slash iniziale).
 */

const raw = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";

/** Es. `/studio-pagnoni` oppure stringa vuota in root. */
export const basePath = raw === "" || raw === "/" ? "" : raw.startsWith("/") ? raw : `/${raw}`;

/** Path assoluto dal dominio per file in `public/` (es. `/repo/logo.svg`). */
export function withBasePath(href: string): string {
  const path = href.startsWith("/") ? href : `/${href}`;
  return basePath ? `${basePath}${path}` : path;
}
