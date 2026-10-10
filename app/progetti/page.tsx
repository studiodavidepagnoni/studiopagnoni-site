import { PageClosingCta } from "@/components/content/PageClosingCta";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProgettiArchive } from "@/components/projects/ProgettiArchive";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Progetti — rilievi SLAM e territorio",
  description:
    "Casi studio di rilievi laser SLAM e interventi sul territorio in Franciacorta e provincia di Brescia.",
  path: "/progetti",
});

export default function ProgettiPage() {
  return (
    <>
      <StaticPageHero path="/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <div className={`${ui.body} max-w-[62ch] space-y-4`}>
              <p>
                Qui pubblichiamo i rilievi 3D più recenti: una cantina in Franciacorta, un terreno a Erbusco, un
                allevamento in provincia di Brescia. Ogni scheda ha video di scansione e una nota di metodo.
              </p>
              <p>
                Architettura, pratiche e topografia restano il lavoro quotidiano dello studio. Quei lavori si
                discutono di persona: per un progetto o un sopralluogo, scriveteci.
              </p>
            </div>
            <ProgettiArchive />
            <PageClosingCta
              id="progetti-cta"
              title="Parliamo del vostro progetto"
              description="Sopralluogo, rilievo o progetto: indicate zona e obiettivo, vi rispondiamo con tempi e una prima valutazione."
              primaryHref="/contatti#form-contatti"
              primaryLabel="Scriveteci"
              secondaryHref="/servizi"
              secondaryLabel="Tutti i servizi"
            />
          </div>
        </div>
      </main>
    </>
  );
}
