"use client";

import { usePathname } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { isHomePath } from "@/lib/isHomePath";
import { resolveStaticPageHero } from "@/lib/pageHeroConfig";

/** Hero immagine per le pagine statiche (le route dinamiche usano `<PageHero />` in pagina). */
export function PageHeroRouter() {
  const pathname = usePathname();
  if (isHomePath(pathname)) return null;

  const config = resolveStaticPageHero(pathname);
  if (!config) return null;

  return <PageHero {...config} />;
}
