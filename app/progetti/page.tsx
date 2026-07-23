import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProgettiArchive } from "@/components/projects/ProgettiArchive";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Progetti — architettura, topografia e rilievi SLAM",
  description:
    "Casi studio di architettura, topografia e laser scanner SLAM in Franciacorta, provincia di Brescia e Lombardia. Studio Tecnico Pagnoni.",
  path: "/progetti",
});

export default function ProgettiPage() {
  return (
    <>
      <StaticPageHero path="/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <p className={`${ui.body} max-w-5xl`}>
              Una selezione di commesse recenti: rilievi laser <strong>SLAM</strong>, nuvole di punti e interventi sul territorio in{" "}
              <strong>Franciacorta</strong> e provincia di <strong>Brescia</strong>. Ogni scheda mostra contesto, metodo e risultato operativo.
            </p>
            <ProgettiArchive />
          </div>
        </div>
      </main>
    </>
  );
}
