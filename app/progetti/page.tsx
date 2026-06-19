import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProgettiArchive } from "@/components/projects/ProgettiArchive";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Progetti — rilievi SLAM, topografia e territorio",
  description:
    "Esempi di commesse: rilievi laser SLAM e nuvole di punti per ambienti complessi, aziende e terreni. Studio Tecnico Pagnoni — Franciacorta e provincia di Brescia.",
  path: "/progetti",
});

export default function ProgettiPage() {
  return (
    <>
      <StaticPageHero path="/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={layoutContentMaxClass}>
            <ProgettiArchive />
          </div>
        </div>
      </main>
    </>
  );
}
