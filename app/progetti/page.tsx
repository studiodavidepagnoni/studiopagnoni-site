import Link from "next/link";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProgettiArchive } from "@/components/projects/ProgettiArchive";
import { fontSans } from "@/lib/fonts";
import { progettiIndexIntro } from "@/lib/content";
import { projectAreas, projectCategories } from "@/lib/content/projects";
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
            <p className={`reveal-block ${ui.bodyMuted} max-w-[72ch] text-pretty`}>{progettiIndexIntro}</p>

            <div className="reveal-block mb-10 mt-10 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 lg:gap-5">
              {projectAreas.map((area) => {
                const c = projectCategories[area];
                return (
                  <div key={area} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] p-6 sm:p-7">
                    <p className={`${fontSans.className} progetti-area-label text-[0.65rem] font-semibold uppercase tracking-[0.2em]`}>
                      Ambito
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-[var(--foreground)] sm:text-xl">{c.heading}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">
                      {c.cases.length} {c.cases.length === 1 ? "caso studio" : "casi studio"} in archivio.
                    </p>
                    <p className="mt-5">
                      <Link href={`/progetti/${area}`} className={`${ui.btnOutline} inline-flex w-full justify-center sm:w-auto`}>
                        Vai a {c.heading} →
                      </Link>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="fine-divider mb-10 sm:mb-12" />

            <h2 className={`reveal-title ${ui.gallerySectionTitle} mb-8`}>Archivio progetti</h2>
            <ProgettiArchive />
          </div>
        </div>
      </main>
    </>
  );
}
