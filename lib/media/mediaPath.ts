import { withBasePath } from "@/lib/utils/basePath";

/** Path stock in WebP (generato da scripts/optimize-assets.cjs). */
export function stockImage(name: string): string {
  const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
  return withBasePath(`/assets/stock/${base}.webp`);
}

/** Poster hero: preferisce WebP, fallback JPG nel markup se mancante. */
export function heroPosterImage(jpgName: string): string {
  const base = jpgName.replace(/\.(jpe?g|webp)$/i, "");
  return withBasePath(`/assets/${base}.webp`);
}
