"use client";

import { usePathname } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { isHomePath } from "@/lib/isHomePath";
import { resolveStaticPageHero } from "@/lib/pageHeroConfig";

/** Fallback client per export statico (senza middleware). */
export function PageHeroRouterClient() {
  const pathname = usePathname();
  if (isHomePath(pathname)) return null;

  const config = resolveStaticPageHero(pathname);
  if (!config) return null;

  return <PageHero {...config} />;
}
