import Link from "next/link";
import { StaticPageHero } from "@/components/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { buildPageMetadata, seoKeywords } from "@/lib/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Topografia e rilievi planoaltimetrici — Franciacorta e Brescia",
  description:
    "Rilievi topografici con GNSS RTK e stazione totale: planimetrie quotate, volumetrie, cantieri e frazionamenti. Integrazione con rilievi laser SLAM. Cazzago San Martino (BS), Franciacorta e provincia di Brescia.",
  path: "/topografia",
  keywords: seoKeywords.local,
});

export default function TopografiaPage() {
  return (
    <>
      <StaticPageHero path="/topografia" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
          <p className={`${ui.body} max-w-[72ch]`}>
              La <strong>topografia applicata</strong> è la base per progettare in sicurezza, definire confini e volumi e allineare il progetto al
              terreno reale. Lo Studio Tecnico Pagnoni ha sede a <strong>Cazzago San Martino</strong> (frazione Bornato, provincia di{" "}
              <strong>Brescia</strong>), con interventi in <strong>Franciacorta</strong>, <strong>Lombardia</strong> e{" "}
              <strong>Nord Italia</strong>, con strumentazione da mercato professionale: <strong>GNSS/GPS</strong>,{" "}
              <strong>stazione totale</strong> e integrazione con i flussi di lavoro CAD.
            </p>
          <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
            <section className={ui.innerCard} aria-labelledby="topo-rilievo">
              <h2 id="topo-rilievo" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Cosa intendiamo per rilievo topografico
              </h2>
              <p className={ui.body}>
                In ambito professionale il <strong>rilievo topografico</strong> (o <strong>rilievo planoaltimetrico</strong>) è l&apos;insieme delle
                misure sul campo che consentono di restituire la forma del terreno, delle opere e dei punti significativi in coordinate coerenti con il
                sistema di riferimento richiesto dal lavoro (catasto, progetto, cantieristica). A seconda dell&apos;incarico si producono mappe quotate,
                sezioni, curve di livello, volumi e tracciamenti per impianti.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-strumenti">
              <h2 id="topo-strumenti" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Strumenti: GNSS e stazione totale
              </h2>
              <p className={ui.body}>
                I ricevitori <strong>GNSS in modalità RTK</strong> (Real Time Kinematic) permettono coordinate planoaltimetriche ad alta precisione in
                tempi contenuti, ideali per grandi estensioni e punti di dettaglio. La <strong>stazione totale</strong> integra misure angolari e
                distanze per rilievi di dettaglio, cantieri e ambienti dove il segnale satellitare è critico. La scelta della metodologia segue il tipo
                di commessa e la precisione richiesta.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-zone">
              <h2 id="topo-zone" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Territorio e zone di intervento
              </h2>
              <p className={ui.body}>
                Lavoriamo con continuità in <strong>Franciacorta</strong>, in <strong>provincia di Brescia</strong> e nelle aree limitrofe — tra cui{" "}
                <strong>Valle Trompia</strong> e il <strong>Lago d&apos;Iseo</strong> — con incarichi anche in <strong>Lombardia</strong> e, quando serve,
                nel <strong>Nord Italia</strong>. Per una stima di tempi e metodo è utile indicare la località precisa dell&apos;intervento e la finalità
                (es. frazionamento, cantiere, aggiornamento planimetrico): ti rispondiamo dai recapiti in home e nella pagina contatti.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-slam">
              <h2 id="topo-slam" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Passaggio al laser scanner SLAM
              </h2>
              <p className={`${ui.body} mb-6`}>
                Per edifici e siti complessi il rilievo tradizionale può essere integrato o affiancato al{" "}
                <strong>laser scanner SLAM</strong> per ottenere nuvole di punti dense. Vedi la pagina dedicata:
              </p>
              <Link href="/laser-scanner-slam" className={`${ui.btnOutline} inline-flex`}>
                Laser scanner SLAM
              </Link>
            </section>
          </div>

          <p className={`${ui.body} max-w-[72ch]`}>
            <Link href="/contatti" className={ui.proseLink}>
              Richiedi un preventivo
            </Link>{" "}
            per il tuo rilievo: indicando località e finalità (es. frazionamento, cantiere, progettazione) possiamo proporre metodo e tempistiche.
          </p>
          </div>
        </div>
      </main>
    </>
  );
}
