import Image from "next/image";
import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { progettiIndexIntro } from "@/lib/content";
import { projectPreview } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Progetti — rilievi SLAM, topografia e territorio",
  description:
    "Esempi di commesse: rilievi laser SLAM e nuvole di punti, topografia, paesaggio viticolo, edilizia. Studio Tecnico Pagnoni — Franciacorta e provincia di Brescia.",
  path: "/progetti",
});

export default function ProgettiPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <p className={`reveal-block ${ui.bodyMuted} max-w-[72ch] text-pretty`}>{progettiIndexIntro}</p>

          <div className="reveal-block mb-12 mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--green-border-muted)] sm:mt-12 sm:grid-cols-3">
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} progetti-area-label text-[0.65rem] font-semibold uppercase tracking-[0.2em]`}>Territorio</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">
                Verde, vigneti e paesaggio agricolo. In Franciacorta, importanti collaborazioni di progettazione paesaggistica con realtà vinicole.
              </p>
            </div>
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} progetti-area-label text-[0.65rem] font-semibold uppercase tracking-[0.2em]`}>Rilievi</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">GNSS, stazione totale e laser scanner SLAM per documentazione digitale.</p>
            </div>
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} progetti-area-label text-[0.65rem] font-semibold uppercase tracking-[0.2em]`}>Edilizia</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">Urbanistica, pratiche, architettura e sicurezza di cantiere.</p>
            </div>
          </div>

          <div className="fine-divider mb-10 sm:mb-12" />

          <div className="lazy-section grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projectPreview.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] transition hover:border-[var(--green-border)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.015]"
                    sizes="(min-width:1024px) min(360px, 30vw), (min-width:640px) min(50vw, 520px), min(100vw, 560px)"
                  />
                  <div className="image-unify-overlay" aria-hidden />
                </div>
                <div className="border-t border-[var(--green-border-muted)] p-4 sm:p-5">
                  <span className={`${fontDisplay.className} text-lg font-semibold leading-snug text-[var(--foreground)] sm:text-xl`}>{p.caption}</span>
                  <span className={`${fontSans.className} mt-2 block text-sm font-medium text-[var(--copy-body)]`}>Apri scheda →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
