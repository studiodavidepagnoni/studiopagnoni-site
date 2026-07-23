import { withBasePath } from "@/lib/utils/basePath";

/** Path stock in WebP — `seoBase` senza estensione (vedi assetPaths.stockImages). */
export function stockImage(seoBase: string): string {
  const base = seoBase.replace(/\.(jpe?g|png|webp)$/i, "");
  return withBasePath(`/assets/stock/${base}.webp`);
}

/**
 * Path per media di progetto in `assets/projects/**` → `public/assets/projects/**`.
 * Accetta un path relativo (con o senza slash iniziale).
 */
export function projectAsset(relPath: string): string {
  const cleaned = relPath.replace(/^\/+/, "").replace(/\.(png|jpe?g)$/i, ".webp");
  return withBasePath(`/assets/projects/${cleaned}`);
}

/** Video progetto (`assets/projects/{dir}/{base}.mp4|webm`). */
export function projectVideoAsset(dir: string, base: string, ext: "mp4" | "webm"): string {
  return withBasePath(`/assets/projects/${dir}/${base}.${ext}`);
}

/** Srcset per card/griglia (varianti `-w{N}.webp` da optimize-assets). */
export function projectAssetSrcSet(relPath: string, widths: readonly number[] = [480, 960]): string {
  const src = projectAsset(relPath);
  const base = src.replace(/\.webp(\?.*)?$/i, "");
  return widths.map((w) => `${base}-w${w}.webp ${w}w`).join(", ");
}

/** Srcset da URL pubblico stock (`stockImage`). Normalizza base senza suffisso `-wN`. */
export function stockImageSrcSet(coverUrl: string, widths: readonly number[] = [480, 960]): string {
  if (!coverUrl.includes("/assets/stock/")) return "";
  const base = coverUrl.replace(/-w\d+(?=\.webp(?:\?.*)?)?$/i, "").replace(/\.webp(\?.*)?$/i, "");
  return widths.map((w) => `${base}-w${w}.webp ${w}w`).join(", ");
}

/** Srcset da URL pubblico già risolto con `projectAsset`. */
export function projectCoverSrcSet(coverUrl: string, widths: readonly number[] = [480, 960]): string {
  const rel = coverUrl.split("/projects/")[1]?.split("?")[0] ?? "";
  if (!rel) return "";
  const base = projectAsset(rel.replace(/\.webp$/i, ".png")).replace(/\.webp(\?.*)?$/i, "");
  return widths.map((w) => `${base}-w${w}.webp ${w}w`).join(", ");
}

/** Poster hero: preferisce WebP, fallback JPG nel markup se mancante. */
export function heroPosterImage(jpgName: string): string {
  const base = jpgName.replace(/\.(jpe?g|webp)$/i, "");
  return withBasePath(`/assets/${base}.webp`);
}
