import { PageHero } from "@/components/hero/PageHero";
import { resolveStaticPageHero } from "@/lib/config/pageHeroConfig";

export function StaticPageHero({ path }: { path: string }) {
  const config = resolveStaticPageHero(path);
  if (!config) return null;
  return <PageHero {...config} />;
}
