import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { progettiIndexIntro } from "@/lib/content";
import { projectPreview } from "@/lib/images";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Progetti",
  description:
    "Territorio e paesaggio, rilievi geomatici e laser SLAM, edilizia e urbanistica — Studio Tecnico Pagnoni, Cazzago San Martino (BS), Franciacorta e provincia di Brescia. Commesse in Lombardia e Nord Italia.",
  alternates: { canonical: `${site.url}/progetti` },
};

export default function ProgettiPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <header className="mb-10 max-w-[72ch] sm:mb-12">
            <p className={ui.pageEyebrow}>Portfolio</p>
            <h1 className={`${fontDisplay.className} reveal-title ${ui.pageTitle} mb-4 sm:mb-5`}>Progetti e ambiti</h1>
            <div className={ui.pageTitleRule} aria-hidden />
            <p className={`reveal-block ${ui.bodyMuted} text-pretty`}>{progettiIndexIntro}</p>
          </header>

          <div className="reveal-block mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--green-border-muted)] sm:grid-cols-3">
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-warm)]`}>Territorio</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">Verde, vigneti, paesaggio agricolo e collaborazioni in Franciacorta.</p>
            </div>
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-warm)]`}>Rilievi</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--copy-body)]">GNSS, stazione totale e laser scanner SLAM per documentazione digitale.</p>
            </div>
            <div className="bg-[var(--card)] p-6 sm:p-7">
              <p className={`${fontSans.className} text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-warm)]`}>Edilizia</p>
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
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
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
