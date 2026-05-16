import { normalizePathname } from "@/lib/normalizePathname";

/** Voce di menu attiva (senza box di focus persistente al click). */
export function isNavItemActive(pathname: string | null, href: string): boolean {
  const current = normalizePathname(pathname);
  const target = normalizePathname(href);
  if (target === "/") return current === "/";
  if (target === "/progetti") {
    return current === "/progetti" || current.startsWith("/progetti/");
  }
  return current === target || current.startsWith(`${target}/`);
}
