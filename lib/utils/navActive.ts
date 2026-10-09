import { stripLocalePrefix } from "@/lib/i18n/paths";

/** Voce di menu attiva (senza box di focus persistente al click). */
export function isNavItemActive(pathname: string | null, href: string): boolean {
  const current = stripLocalePrefix(pathname);
  const target = stripLocalePrefix(href);
  if (target === "/") return current === "/";
  if (target === "/progetti") {
    return current === "/progetti" || current.startsWith("/progetti/");
  }
  return current === target || current.startsWith(`${target}/`);
}
