import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export default function NotFound() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} py-8 text-center sm:py-12`}>
          <p className={`${fontSans.className} ${ui.pageEyebrow}`}>Errore 404</p>
          <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Pagina non trovata</h1>
          <div className={`${ui.pageTitleRule} mx-auto`} aria-hidden />
          <p className={`${fontSans.className} ${ui.body} mx-auto mt-6 max-w-[40ch]`}>
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
