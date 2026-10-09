import { HeroHomeDeferred } from "@/components/hero/HeroHomeDeferred";
import { HeroLcpPreloadLinks } from "@/components/hero/HeroLcpPreloadLinks";
import { HomeSections } from "@/components/home/HomeSections";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";

export const metadata = {
  ...buildPageMetadata({
    title: "Architecture and 3D surveys — Franciacorta / Brescia",
    absoluteTitle: "Studio Architettura Pagnoni | Architecture and 3D surveys — Franciacorta / Brescia",
    description:
      "Architecture practice in Franciacorta since 1988: surveying, SLAM laser scanning, design and building procedures in the province of Brescia.",
    path: "/en",
  }),
  alternates: localeAlternates("/"),
};

export default function EnHomePage() {
  return (
    <>
      <HeroLcpPreloadLinks />
      <main id="main-content" className="min-w-0 max-w-full overflow-x-clip">
        <HeroHomeDeferred />
        <HomeSections locale="en" />
      </main>
    </>
  );
}
