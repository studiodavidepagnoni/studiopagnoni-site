"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { isHomePath } from "@/lib/isHomePath";
import { resolveStaticPageHero } from "@/lib/pageHeroConfig";

type Props =
  | { mode: "server"; children: ReactNode }
  | { mode: "client" };

/**
 * Nasconde subito la bandiera pagina interna su home (pathname client),
 * così non resta sopra al video hero durante la navigazione.
 */
export function PageHeroRouterShell(props: Props) {
  const pathname = usePathname();

  if (isHomePath(pathname)) return null;

  if (props.mode === "client") {
    const config = resolveStaticPageHero(pathname);
    if (!config) return null;
    return <PageHero key={pathname} {...config} />;
  }

  return (
    <Suspense key={pathname} fallback={null}>
      {props.children}
    </Suspense>
  );
}
