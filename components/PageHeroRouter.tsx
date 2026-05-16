import { Suspense } from "react";
import { PageHeroFromPath } from "@/components/PageHeroFromPath";
import { PageHeroRouterClient } from "@/components/PageHeroRouterClient";

const isStaticExport = process.env.STATIC_EXPORT === "1";

/**
 * Hero bandiera pagine interne.
 * - Dev / Node: SSR via `PageHeroFromPath` (immagine nel HTML, menu overlay subito).
 * - Export statico: client (`usePathname`).
 */
export function PageHeroRouter() {
  if (isStaticExport) {
    return <PageHeroRouterClient />;
  }

  return (
    <Suspense fallback={null}>
      <PageHeroFromPath />
    </Suspense>
  );
}
