import { PageHero } from "@/components/PageHero";
import { resolveStaticPageHero } from "@/lib/pageHeroConfig";

export function StaticPageHero({ path }: { path: string }) {
  const config = resolveStaticPageHero(path);
  if (!config) return null;
  return <PageHero {...config} />;
}
