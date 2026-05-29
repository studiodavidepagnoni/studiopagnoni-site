import Link from "next/link";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { progettiIndexIntro } from "@/lib/content";
import { projectCategories } from "@/lib/content/projects";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
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
  const c = projectCategories["rilievi-digitalizzazione"];

  return (
    <>
      <StaticPageHero path="/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={layoutContentMaxClass}>
          <p className={`reveal-block ${ui.bodyMuted} max-w-[72ch] text-pretty`}>{progettiIndexIntro}</p>

          <div className="reveal-block mb-12 mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--green-border-muted)] sm:mt-12 sm:grid-cols-1">
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} progetti-area-label text-[0.65rem] font-semibold uppercase tracking-[0.2em]`}>Rilievi</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">
                Laser scanner SLAM e documentazione 3D: esempi reali di acquisizione in movimento e restituzione operativa.
              </p>
              <p className="mt-5">
                <Link href="/progetti/rilievi-digitalizzazione" className={`${ui.btnOutline} inline-flex w-full justify-center sm:w-auto`}>
                  Vai ai progetti → rilievi e digitalizzazione
                </Link>
              </p>
            </div>
          </div>

          <div className="fine-divider mb-10 sm:mb-12" />

          <h2 className={`${fontDisplay.className} reveal-title ${ui.gallerySectionTitle} mb-8`}>Progetti in evidenza</h2>
          <div className="lazy-section grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {c.cases.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="group project-preview-card block overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)]"
              >
                <div className="relative aspect-[4/3]">
                  <ProjectCoverImage
                    cover={p.cover}
                    alt={p.alt}
                    className="project-preview-card__image"
                    sizes="(min-width:1024px) min(360px, 30vw), (min-width:640px) min(50vw, 520px), min(100vw, 560px)"
                  />
                  <div className="image-unify-overlay" aria-hidden />
                </div>
                <div className="border-t border-[var(--green-border-muted)] p-4 sm:p-5">
                  <span className={`${fontDisplay.className} text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl`}>{p.caption}</span>
                  <span className={`${fontSans.className} mt-2 block text-sm font-medium text-[var(--copy-body)]`}>Scheda →</span>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </main>
    </>
  );
}
