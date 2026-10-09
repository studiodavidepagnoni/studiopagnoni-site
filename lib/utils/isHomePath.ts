import { stripLocalePrefix } from "@/lib/i18n/paths";
import { basePath } from "@/lib/utils/basePath";

/** True se il pathname corrisponde alla home IT o EN (con o senza basePath GitHub Pages). */
export function isHomePath(pathname: string | null): boolean {
  if (pathname == null) return false;
  const bare = stripLocalePrefix(pathname).replace(/\/+$/, "") || "/";
  if (bare === "/") return true;
  const base = basePath.replace(/\/+$/, "");
  if (!base) return false;
  const full = pathname.replace(/\/+$/, "") || "/";
  return full === base || full === `${base}/en`;
}
