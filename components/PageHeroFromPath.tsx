import { headers } from "next/headers";
import { PageHero } from "@/components/PageHero";
import { isHomePath } from "@/lib/isHomePath";
import { normalizePathname } from "@/lib/normalizePathname";
import { resolveStaticPageHero } from "@/lib/pageHeroConfig";

/** Hero pagine interne in SSR (pathname da middleware `x-pathname`). */
export async function PageHeroFromPath() {
  const h = await headers();
  const pathname = normalizePathname(h.get("x-pathname"));
  if (isHomePath(pathname)) return null;

  const config = resolveStaticPageHero(pathname);
  if (!config) return null;

  return <PageHero key={pathname} {...config} />;
}
