import type { Metadata } from "next";
import Link from "next/link";
import { fontDisplay } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Laser scanner SLAM — rilievo 3D e nuvola di punti (Lombardia)",
  description:
    "Servizi di rilievo con laser scanner SLAM: documentazione 3D, nuvole di punti, as-built per edifici e siti industriali. Studio Tecnico Pagnoni, Bornato (BS).",
  alternates: { canonical: `${site.url}/laser-scanner-slam` },
  keywords: [
    "laser scanner SLAM",
    "rilievo laser scanner 3D",
    "nuvola di punti edificio",
    "rilievo as built",
    "digitalizzazione edifici Lombardia",
    "LiDAR SLAM rilievo",
    "scanner 3D interni esterni",
  ],
};

export default function LaserSlamPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <article className={ui.innerCard}>
            <p className={ui.pageEyebrow}>Servizi</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Laser scanner SLAM</h1>
            <div className={ui.pageTitleRule} aria-hidden />

            <p className={ui.body}>
              Il <strong>laser scanner</strong> misura migliaia di punti al secondo generando una <strong>nuvola di punti</strong> tridimensionale del
              luogo rilevato. I sistemi <strong>SLAM</strong> (Simultaneous Localization and Mapping) combinano sensori di movimento e misure laser
              per ricostruire la geometria mentre l&apos;operatore percorre l&apos;ambiente: sono particolarmente efficaci per grandi volumi, corridoi,
              impianti industriali e contesti in cui serve rapidità di acquisizione rispetto ai rilievi puntuali tradizionali.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              A cosa serve nella pratica professionale
            </h2>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>As-built</strong> e verifica interferenze tra progetto e stato di fatto.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Documentazione</strong> per ristrutturazioni, sicurezza e manutenzione.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Comunicazione</strong> al cliente o alle maestranze tramite modelli densi e comprensibili.
              </li>
            </ul>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Integrazione con topografia classica
            </h2>
            <p className={ui.body}>
              Il laser SLAM non sostituisce sempre il <strong>rilievo topografico planoaltimetrico</strong> con GNSS/stazione totale: spesso le due
              metodologie si integrano (punti di ancoraggio, riferimenti altimetrici, allineamento a coordinate catastali o di progetto). Lo studio
              valuta il mix migliore in base a obiettivi, precisione richiesta e tempi.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Integrazione con il rilievo sul territorio
            </h2>
            <p className={`${ui.body} mb-6`}>
              Il laser SLAM si combina spesso con il <strong>rilievo topografico classico</strong> (punti di ancoraggio, riferimenti planoaltimetrici,
              allineamento a catasto e progetto). Per contesti diffusi in ambito industriale, residenziale o paesaggistico valutiamo insieme output
              attesi — nuvola, sezioni, supporto a tavole — e tempistiche. Per il quadro su misure GNSS e stazione totale vedi anche:
            </p>
            <Link href="/topografia" className={`${ui.btnOutline} inline-flex`}>
              Topografia e rilievi
            </Link>

            <p className={`${ui.body} mt-10`}>
              <Link href="/contatti" className={ui.proseLink}>
                Contattaci
              </Link>{" "}
              per raccontare il sito da rilevare: superficie, accessi e output desiderato (nuvola, sezioni, integrazione CAD).
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
