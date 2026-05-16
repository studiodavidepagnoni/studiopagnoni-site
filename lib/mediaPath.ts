import { withBasePath } from "@/lib/basePath";

/** Path stock in WebP (generato da scripts/optimize-assets.cjs). */
export function stockImage(name: string): string {
  const base = name.replace(/\.(jpe?g|png|webp)$/i, "");
  return withBasePath(`/assets/stock/${base}.webp`);
}
