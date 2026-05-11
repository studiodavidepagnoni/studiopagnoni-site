import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export default function NotFound() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} py-8 text-center sm:py-12`}>
          <p className={`${fontSans.className} section-kicker mb-3 text-[var(--primary-mid)]`}>Errore 404</p>
          <h1 className={`${fontDisplay.className} section-title text-[clamp(1.75rem,4vw,2.5rem)] font-medium text-[var(--foreground)]`}>
            Pagina non trovata
          </h1>
          <div className="home-section-rule mx-auto mt-5 max-w-[4rem]" aria-hidden />
          <p className={`${fontSans.className} mx-auto mt-6 max-w-[40ch] text-[0.98rem] leading-relaxed text-[var(--copy-body)]`}>
            Il link potrebbe essere errato o la pagina è stata spostata. {site.name} — topografia e progettazione in{" "}
            <strong className="font-semibold text-[var(--foreground)]">Franciacorta</strong>,{" "}
            <strong className="font-semibold text-[var(--foreground)]">provincia di Brescia</strong> e{" "}
            <strong className="font-semibold text-[var(--foreground)]">Nord Italia</strong>.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/" className={`${ui.btnPrimary} inline-flex min-h-[48px] w-full max-w-xs justify-center sm:w-auto`}>
              Torna alla home
            </Link>
            <Link href="/contatti" className={`${ui.btnOutline} inline-flex min-h-[48px] w-full max-w-xs justify-center sm:w-auto`}>
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
