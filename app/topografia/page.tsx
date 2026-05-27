import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { topografiaFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/topografia";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const pageTitle = "Topografia e rilievi planoaltimetrici — Franciacorta e Brescia";
const pageDescription =
  "Rilievi topografici con GNSS RTK e stazione totale: planimetrie quotate, volumetrie, cantieri e frazionamenti. Integrazione con rilievi laser SLAM. Cazzago San Martino (BS), Franciacorta e provincia di Brescia.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const topografiaJsonLd = faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems: topografiaFaq,
});

export default function TopografiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(topografiaJsonLd) }} />
      <StaticPageHero path="/topografia" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <p className={`${ui.body} max-w-[72ch]`}>
              Un buon rilievo topografico non è solo una raccolta di punti: è il modo in cui il terreno diventa una base decisionale. Quote, confini,
              pendenze e volumi devono essere misurati con metodo, restituiti con chiarezza e collegati al linguaggio del progetto. Da{" "}
              <strong>Cazzago San Martino</strong>, in <strong>Franciacorta</strong>, lo studio opera con <strong>GNSS RTK</strong>,{" "}
              <strong>stazione totale</strong> e flussi CAD integrati.
            </p>
          <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
            <section className={ui.innerCard} aria-labelledby="topo-rilievo">
              <h2 id="topo-rilievo" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Dal terreno all&apos;elaborato
              </h2>
              <p className={ui.body}>
                Ogni incarico parte dalla domanda corretta: serve definire un confine, impostare un cantiere, verificare volumi, aggiornare una planimetria
                o dare al progettista una base quotata? Da qui si costruisce il rilievo: punti significativi, sistema di riferimento, controlli e restituzione
                in tavole, sezioni, curve di livello o tracciamenti.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-strumenti">
              <h2 id="topo-strumenti" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Strumenti scelti in base al contesto
              </h2>
              <p className={ui.body}>
                Il <strong>GNSS RTK</strong> è ideale per estensioni aperte e inquadramenti rapidi; la <strong>stazione totale</strong> resta centrale per
                punti di dettaglio, cantieri, allineamenti e aree dove il segnale satellitare è critico. La metodologia non è standardizzata a priori:
                viene definita sulla precisione richiesta, sull&apos;accessibilità e sull&apos;uso finale degli elaborati.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-zone">
              <h2 id="topo-zone" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Territorio e zone di intervento
              </h2>
              <p className={ui.body}>
                La sede in <strong>Franciacorta</strong> permette interventi rapidi in provincia di <strong>Brescia</strong>, Valle Trompia, Lago
                d&apos;Iseo e aree limitrofe. Per rilievi più strutturati programmiamo commesse in <strong>Lombardia</strong> e Nord Italia, definendo
                tempi e metodo sulla base di località, accessi e finalità dell&apos;incarico.
              </p>
            </section>

            <section className={ui.innerCard} aria-labelledby="topo-slam">
              <h2 id="topo-slam" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}>
                Passaggio al laser scanner SLAM
              </h2>
              <p className={`${ui.body} mb-6`}>
                Quando il lavoro passa dal terreno agli spazi costruiti, il rilievo topografico può essere affiancato dal{" "}
                <strong>laser scanner SLAM</strong>: una nuvola di punti densa per edifici, capannoni e impianti, collegabile ai controlli topografici.
              </p>
              <Link href="/rilievi-laser-scanner-slam-brescia" className={`${ui.btnOutline} inline-flex`}>
                Laser scanner SLAM
              </Link>
            </section>

            <FaqSection id="topografia-faq" items={topografiaFaq} />
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
