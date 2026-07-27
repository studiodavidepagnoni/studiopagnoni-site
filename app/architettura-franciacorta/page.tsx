import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { architetturaFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/architettura-franciacorta";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const orgId = `${site.url.replace(/\/$/, "")}/#organization`;
const pageTitle = "Architettura Franciacorta — progetto e pratiche";
const pageDescription =
  "Progettazione architettonica in Franciacorta e provincia di Brescia: concept, esecutivo, pratiche edilizie. Studio Tecnico Pagnoni, Bornato (BS).";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  priority: "high",
});

const faqGraph = faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems: architetturaFaq,
});

const architetturaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...faqGraph["@graph"],
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Progettazione architettonica in Franciacorta",
      serviceType: "ArchitecturalDesign",
      description: pageDescription,
      provider: { "@id": orgId },
      areaServed: [
        { "@type": "Place", name: "Franciacorta" },
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "AdministrativeArea", name: "Lombardia" },
      ],
      url: pageUrl,
    },
  ],
};

export default function ArchitetturaFranciacortaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(architetturaJsonLd) }}
      />
      <StaticPageHero path="/architettura-franciacorta" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <p className={`${ui.body} max-w-[72ch]`}>
              Progettare in <strong>Franciacorta</strong> richiede attenzione al contesto: paesaggio, vincoli,
              tessuto edilizio e esigenze della committenza. Lo <strong>Studio Tecnico Pagnoni</strong>, con sede a{" "}
              <strong>Bornato, Frazione di Cazzago San Martino</strong>, segue la progettazione architettonica dal concept
              alle tavole esecutive, in continuità con misura del territorio e pratiche edilizie.{" "}
              <strong>Arch. Davide Pagnoni</strong> coordina le fasi del processo edilizio quando il progetto deve
              dialogare con rilievo, urbanistica e cantiere.
            </p>

            <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
              <section className={ui.innerCard} aria-labelledby="arch-ambito">
                <h2
                  id="arch-ambito"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Ambito della progettazione
                </h2>
                <p className={ui.body}>
                  Affianchiamo nuove costruzioni, ampliamenti, ristrutturazioni e interventi sull&apos;esistente —
                  residenziale, produttivo e spazi legati al territorio. Ogni incarico parte dalla lettura del sito e
                  dell&apos;obiettivo: non una soluzione standard, ma un percorso documentato tra anteprogetto,
                  definitivo ed esecutivo, con scelte coerenti rispetto a vincoli e programma funzionale.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="arch-processo">
                <h2
                  id="arch-processo"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Dal concept alla consegna
                </h2>
                <p className={ui.body}>
                  Il metodo è lineare: rilievo e stato di fatto quando servono, concept e anteprogetto, progetto
                  definitivo ed esecutivo, supporto alle pratiche e coordinamento con le discipline di cantiere. Le
                  strutture, se necessarie, sono affidate a professionisti esterni di fiducia: lo studio mantiene il
                  focus su architettura, misura e iter autorizzativi.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="arch-territorio">
                <h2
                  id="arch-territorio"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Franciacorta e provincia di Brescia
                </h2>
                <p className={ui.body}>
                  Operiamo con priorità su <strong>Franciacorta</strong> (Bornato / Cazzago San Martino, Erbusco, Adro, Corte
                  Franca, Iseo, Rovato e comuni limitrofi) e sulla rete della provincia di <strong>Brescia</strong>.
                  Per incarichi più ampi valutiamo Lombardia, definendo tempi e modalità di sopralluogo in base a
                  località e complessità.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="arch-rilievi">
                <h2
                  id="arch-rilievi"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Rilievo e progetto nello stesso studio
                </h2>
                <p className={`${ui.body} mb-6`}>
                  Quando lo stato di fatto non è affidabile a occhio, integriamo{" "}
                  <strong>topografia</strong> (GNSS RTK, stazione totale) e, su edifici o impianti,{" "}
                  <strong>laser scanner SLAM</strong>: una base metrica condivisa riduce varianti e incomprensioni in
                  cantiere.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/topografia" className={`${ui.btnOutline} inline-flex`}>
                    Topografia e rilievi
                  </Link>
                  <Link href="/laser-scanner-slam" className={`${ui.btnOutline} inline-flex`}>
                    Laser scanner SLAM
                  </Link>
                </div>
              </section>

              <section className={ui.innerCard} aria-labelledby="arch-pratiche">
                <h2
                  id="arch-pratiche"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Urbanistica e pratiche
                </h2>
                <p className={ui.body}>
                  Accanto al progetto seguiamo la lettura degli strumenti urbanistici e le pratiche edilizie necessarie
                  (SCIA, CILA, permessi dove previsti), con attenzione al dialogo documentale con gli enti. L&apos;obiettivo
                  è un percorso coerente tra disegno, titolo abilitativo e realizzazione.
                </p>
              </section>

              <FaqSection id="architettura-faq" items={architetturaFaq} />
            </div>

            <PageClosingCta
              id="architettura-cta"
              title="Parliamo del vostro progetto in Franciacorta"
              description="Indicate comune, tipo di intervento e obiettivo: rispondiamo con modalità di sopralluogo e preventivo su misura."
              primaryHref="/contatti#form-contatti"
              primaryLabel="Richiedi un sopralluogo"
              secondaryHref="/servizi"
              secondaryLabel="Tutti i servizi"
            />
          </div>
        </div>
      </main>
    </>
  );
}
