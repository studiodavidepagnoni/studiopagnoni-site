import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { normalizePathname } from "@/lib/utils/normalizePathname";

/** Path senza prefisso locale (`/en/servizi` → `/servizi`). */
export function stripLocalePrefix(pathname: string | null | undefined): string {
  const path = normalizePathname(pathname ?? null);
  if (path === "/en" || path.startsWith("/en/")) {
    const rest = path.slice(3) || "/";
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return path;
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const path = normalizePathname(pathname ?? null);
  if (path === "/en" || path.startsWith("/en/")) return "en";
  return defaultLocale;
}

/** Aggiunge `/en` se serve; IT resta senza prefisso. */
export function withLocalePrefix(path: string, locale: Locale): string {
  const bare = stripLocalePrefix(path);
  if (locale === "en") {
    return bare === "/" ? "/en" : `/en${bare}`;
  }
  return bare;
}

/** Alterna IT ↔ EN mantenendo la stessa pagina. */
export function switchLocalePath(pathname: string | null | undefined, target: Locale): string {
  return withLocalePrefix(stripLocalePrefix(pathname), target);
}

export function isEnglishPath(pathname: string | null | undefined): boolean {
  return getLocaleFromPathname(pathname) === "en";
}
