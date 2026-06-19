import { toInternalPath } from "@/lib/utils/basePath";

/** Pathname senza basePath GitHub Pages e senza slash finale. */
export function normalizePathname(pathname: string | null): string {
  if (pathname == null) return "/";
  return toInternalPath(pathname);
}
