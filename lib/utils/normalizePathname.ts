import { basePath } from "@/lib/utils/basePath";

/** Pathname senza basePath GitHub Pages e senza slash finale. */
export function normalizePathname(pathname: string | null): string {
  if (pathname == null) return "/";
  let normalized = pathname.replace(/\/+$/, "") || "/";
  const base = basePath.replace(/\/+$/, "");
  if (base.length > 0 && (normalized === base || normalized.startsWith(`${base}/`))) {
    normalized = normalized.slice(base.length) || "/";
  }
  return normalized;
}
