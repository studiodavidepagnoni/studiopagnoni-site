import { basePath } from "@/lib/utils/basePath";

/** True se il pathname corrisponde alla home (con o senza basePath GitHub Pages). */
export function isHomePath(pathname: string | null): boolean {
  if (pathname == null) return false;
  const normalized = pathname.replace(/\/+$/, "") || "/";
  if (normalized === "/") return true;
  const base = basePath.replace(/\/+$/, "");
  return base.length > 0 && normalized === base;
}
