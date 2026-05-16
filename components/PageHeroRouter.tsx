import { PageHeroFromPath } from "@/components/PageHeroFromPath";
import { PageHeroRouterShell } from "@/components/PageHeroRouterShell";

const isStaticExport = process.env.STATIC_EXPORT === "1";

/**
 * Hero bandiera pagine interne.
 * Shell client: su home smonta subito (evita foto pagina precedente sopra al video).
 * - Dev / Node: SSR via `PageHeroFromPath` nel children.
 * - Export statico: risoluzione client.
 */
export function PageHeroRouter() {
  if (isStaticExport) {
    return <PageHeroRouterShell mode="client" />;
  }

  return (
    <PageHeroRouterShell mode="server">
      <PageHeroFromPath />
    </PageHeroRouterShell>
  );
}
