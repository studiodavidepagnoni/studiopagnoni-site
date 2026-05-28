import { withBasePath } from "@/lib/utils/basePath";

/** Path stock in WebP (generato da scripts/optimize-assets.cjs). */
export function stockImage(name: string): string {
  const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
  return withBasePath(`/assets/stock/${base}.webp`);
}

/**
 * Path per media di progetto in `assets/projects/**` → `public/assets/projects/**`.
 * Accetta un path relativo (con o senza slash iniziale).
 */
export function projectAsset(relPath: string): string {
  const cleaned = relPath.replace(/^\/+/, "");
  return withBasePath(`/assets/projects/${cleaned}`);
}

/** Poster hero: preferisce WebP, fallback JPG nel markup se mancante. */
export function heroPosterImage(jpgName: string): string {
  const base = jpgName.replace(/\.(jpe?g|webp)$/i, "");
  return withBasePath(`/assets/${base}.webp`);
}
