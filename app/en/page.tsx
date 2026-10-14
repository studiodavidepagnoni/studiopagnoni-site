import { HeroHomeDeferred } from "@/components/hero/HeroHomeDeferred";
import { HeroLcpPreloadLinks } from "@/components/hero/HeroLcpPreloadLinks";
import { HomeSections } from "@/components/home/HomeSections";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";

export const metadata = {
  ...buildPageMetadata({
    title: "Architect and surveyor in Franciacorta and Brescia",
    absoluteTitle: "Studio Architettura Pagnoni | Architect and surveyor in Franciacorta and Brescia",
    description:
      "Architecture and surveying practice in Bornato (Cazzago San Martino, BS): design, topography, cadastral work and SLAM laser scanning across Franciacorta and the province of Brescia.",
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
