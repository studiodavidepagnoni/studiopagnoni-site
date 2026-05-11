import type { Metadata } from "next";
import Link from "next/link";
import { fontDisplay } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Topografia e rilievi planoaltimetrici — Franciacorta, provincia di Brescia, Nord Italia",
  description:
    "Rilievi topografici professionali con GNSS RTK e stazione totale: planimetrie quotate, volumetrie, cantieri e frazionamenti. Studio Tecnico Pagnoni a Cazzago San Martino (BS), Franciacorta e provincia di Brescia. Lombardia e Nord Italia.",
  alternates: { canonical: `${site.url}/topografia` },
  keywords: [
    "topografo Brescia",
    "rilievo topografico Franciacorta",
    "rilievo planoaltimetrico Lombardia",
    "geometra topografo provincia di Brescia",
    "stazione totale rilievo",
    "GPS RTK rilievo",
    "mappa topografica catastale Nord Italia",
  ],
};

export default function TopografiaPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <article className={ui.innerCard}>
            <p className={ui.pageEyebrow}>Servizi</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Topografia e rilievi</h1>
            <div className={ui.pageTitleRule} aria-hidden />

            <p className={ui.body}>
              La <strong>topografia applicata</strong> è la base per progettare in sicurezza, definire confini e volumi e allineare il progetto al
              terreno reale. Lo Studio Tecnico Pagnoni ha sede a <strong>Cazzago San Martino</strong> (frazione Bornato, provincia di{" "}
              <strong>Brescia</strong>), con interventi in <strong>Franciacorta</strong>, <strong>Lombardia</strong> e{" "}
              <strong>Nord Italia</strong>, con strumentazione da
              mercato professionale: <strong>GNSS/GPS</strong>, <strong>stazione totale</strong> e integrazione con i flussi di lavoro CAD.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Cosa intendiamo per rilievo topografico
            </h2>
            <p className={ui.body}>
              In ambito professionale il <strong>rilievo topografico</strong> (o <strong>rilievo planoaltimetrico</strong>) è l&apos;insieme delle
              misure sul campo che consentono di restituire la forma del terreno, delle opere e dei punti significativi in coordinate coerenti con il
              sistema di riferimento richiesto dal lavoro (catasto, progetto, cantieristica). A seconda dell&apos;incarico si producono mappe quotate,
              sezioni, curve di livello, volumi e tracciamenti per impianti.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Strumenti: GNSS e stazione totale
            </h2>
            <p className={ui.body}>
              I ricevitori <strong>GNSS in modalità RTK</strong> (Real Time Kinematic) permettono coordinate planoaltimetriche ad alta precisione in
              tempi contenuti, ideali per grandi estensioni e punti di dettaglio. La <strong>stazione totale</strong> integra misure angolari e
              distanze per rilievi di dettaglio, cantieri e ambienti dove il segnale satellitare è critico. La scelta della metodologia segue il tipo
              di commessa e la precisione richiesta.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Territorio e zone di intervento
            </h2>
            <p className={ui.body}>
              Lavoriamo con continuità in <strong>Franciacorta</strong>, in <strong>provincia di Brescia</strong> e nelle aree limitrofe — tra cui{" "}
              <strong>Valle Trompia</strong> e il <strong>Lago d&apos;Iseo</strong> — con incarichi anche in <strong>Lombardia</strong> e, quando serve,
              nel <strong>Nord Italia</strong>. Per una stima di tempi e metodo è utile indicare la località precisa dell&apos;intervento e la finalità
              (es. frazionamento, cantiere, aggiornamento planimetrico): ti rispondiamo dai recapiti in home e nella pagina contatti.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mt-12 scroll-mt-[120px]`}>
              Passaggio al laser scanner SLAM
            </h2>
            <p className={`${ui.body} mb-6`}>
              Per edifici e siti complessi il rilievo tradizionale può essere integrato o affiancato al{" "}
              <strong>laser scanner SLAM</strong> per ottenere nuvole di punti dense. Vedi la pagina dedicata:
            </p>
            <Link href="/laser-scanner-slam" className={`${ui.btnOutline} inline-flex`}>
              Laser scanner SLAM
            </Link>

            <p className={`${ui.body} mt-10`}>
              <Link href="/contatti" className={ui.proseLink}>
                Richiedi un preventivo
              </Link>{" "}
              per il tuo rilievo: indicando località e finalità (es. frazionamento, cantiere, progettazione) possiamo proporre metodo e tempistiche.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
