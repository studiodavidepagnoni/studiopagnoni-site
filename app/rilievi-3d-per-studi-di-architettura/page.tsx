import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { rilievi3dStudiFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { withBasePath } from "@/lib/utils/basePath";
import { ui } from "@/lib/ui";

const pagePath = "/rilievi-3d-per-studi-di-architettura";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const orgId = `${site.url.replace(/\/$/, "")}/#organization`;
const pageTitle = "Studio Architettura Pagnoni | Rilievi 3D per studi di architettura";
const pageDescription =
  "Rilievi 3D in outsourcing per studi di architettura e geometri: nuvole di punti, DWG e as-built consegnati pronti per il progetto. Brescia, Franciacorta e Lombardia.";

const SAMPLE_LAZ = withBasePath("/downloads/esempio-nuvola-di-punti-edificio.laz");
const SAMPLE_FULL_URL = "https://zenodo.org/records/19678608/files/Anoeta_RS10_out.laz?download=1";
const SAMPLE_SOURCE_URL = "https://zenodo.org/records/19678608";

export const metadata = buildPageMetadata({
  title: "Rilievi 3D per studi di architettura",
  description: pageDescription,
  path: pagePath,
  priority: "high",
});

const faqGraph = faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems: rilievi3dStudiFaq,
});

const rilievi3dJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...faqGraph["@graph"],
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Rilievi 3D per studi di architettura",
      serviceType: "Surveying",
      description: pageDescription,
      provider: { "@id": orgId },
      audience: {
        "@type": "BusinessAudience",
        name: "Studi di architettura, geometri e società di ingegneria",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "Place", name: "Franciacorta" },
        { "@type": "AdministrativeArea", name: "Lombardia" },
      ],
      url: pageUrl,
    },
  ],
};

export default function Rilievi3dStudiArchitetturaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rilievi3dJsonLd) }}
      />
      <StaticPageHero path={pagePath} />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <p className={`${ui.body} max-w-[72ch]`}>
              Se il tuo studio progetta ma non possiede un laser scanner, il rilievo dello stato di fatto diventa un
              collo di bottiglia: giornate in campo, misure a mano, basi incomplete. Noi eseguiamo il{" "}
              <strong>rilievo 3D con laser scanner SLAM (CHCNAV RS10)</strong> e consegniamo elaborati pronti per il
              vostro progetto — <strong>il rapporto con il cliente resta vostro</strong>. Sede a Bornato, in
              Franciacorta: interventi rapidi in provincia di Brescia.
            </p>

            <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
              <section className={ui.innerCard} aria-labelledby="b2b-consegna">
                <h2
                  id="b2b-consegna"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Cosa ricevi
                </h2>
                <p className={ui.body}>
                  Nuvola di punti <strong>E57 / LAS / LAZ</strong> georiferita, piante e sezioni{" "}
                  <strong>DWG / DXF</strong> secondo le vostre convenzioni di layer e quota, report PDF di sintesi e,
                  quando la commessa lo richiede, supporto a flussi <strong>BIM (IFC / RVT)</strong>. Prima del rilievo
                  concordiamo formati, sistemi di riferimento e livello di dettaglio, così gli elaborati entrano nel
                  vostro flusso di lavoro senza rilavorazioni.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="b2b-esempio">
                <h2
                  id="b2b-esempio"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Scarica una nuvola di punti di esempio
                </h2>
                <p className={`${ui.body} mb-6`}>
                  Vuoi valutare il flusso di lavoro prima di affidarci un incarico? Scarica una nuvola di punti di un
                  edificio reale e aprila in <strong>CloudCompare</strong> (gratuito), Autodesk ReCap o nel tuo
                  software abituale. Il campione leggero si apre in pochi secondi; la versione completa è acquisita con{" "}
                  <strong>CHCNAV RS10</strong>, lo stesso laser scanner che usiamo in campo.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a href={SAMPLE_LAZ} download className={`${ui.btnOutline} inline-flex`}>
                    Scarica il campione (LAZ, 0,8 MB)
                  </a>
                  <a
                    href={SAMPLE_FULL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ui.btnOutline} inline-flex`}
                  >
                    Versione completa RS10 (LAZ, ~100 MB)
                  </a>
                </div>
                <p className={`${ui.bodyMuted} mt-5 text-sm`}>
                  Dati di esempio open-source dal progetto europeo{" "}
                  <a href={SAMPLE_SOURCE_URL} target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                    SUM4Re — CINTECX, Universidade de Vigo
                  </a>{" "}
                  (licenza{" "}
                  <a
                    href="https://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ui.proseLink}
                  >
                    CC BY 4.0
                  </a>
                  ), non un rilievo dello studio: le consegne dei nostri incarichi restano riservate ai committenti.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="b2b-processo">
                <h2
                  id="b2b-processo"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Come funziona la collaborazione
                </h2>
                <p className={ui.body}>
                  Ci inviate indirizzo, metratura indicativa e output desiderati: rispondiamo con quotazione e finestra
                  di campo. L&apos;acquisizione SLAM copre edifici e capannoni in poche ore, indoor e outdoor nella
                  stessa sessione; quando servono coordinate di progetto o inquadramento catastale integriamo{" "}
                  <strong>GNSS RTK e stazione totale</strong>. Consegniamo al vostro studio, con la riservatezza
                  concordata sull&apos;incarico.
                </p>
              </section>

              <section className={ui.innerCard} aria-labelledby="b2b-perche">
                <h2
                  id="b2b-perche"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Perché conviene esternalizzare il rilievo
                </h2>
                <p className={`${ui.body} mb-6`}>
                  Uno scanner professionale costa decine di migliaia di euro e richiede pratica su acquisizione ed
                  elaborazione. Affidando il rilievo a chi lo fa ogni settimana, lo studio paga solo le commesse reali:
                  niente investimento, niente giornate perse in campo, e una base metrica affidabile che riduce
                  varianti e contestazioni in cantiere.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/laser-scanner-slam" className={`${ui.btnOutline} inline-flex`}>
                    Come lavora il laser scanner SLAM
                  </Link>
                  <Link href="/progetti" className={`${ui.btnOutline} inline-flex`}>
                    Casi studio recenti
                  </Link>
                </div>
              </section>

              <section className={ui.innerCard} aria-labelledby="b2b-zone">
                <h2
                  id="b2b-zone"
                  className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} ${ui.scrollAnchor}`}
                >
                  Dove operiamo
                </h2>
                <p className={ui.body}>
                  Interventi rapidi in <strong>Franciacorta e provincia di Brescia</strong> (Cazzago San Martino,
                  Erbusco, Iseo, Rovato, Brescia città e hinterland). Su programmazione seguiamo studi e società di
                  ingegneria in <strong>Lombardia</strong> e Nord Italia, con logistica definita in offerta.
                </p>
              </section>

              <FaqSection id="rilievi-3d-studi-faq" items={rilievi3dStudiFaq} />
            </div>

            <PageClosingCta
              id="rilievi-3d-studi-cta"
              title="Il prossimo stato di fatto lo rileviamo noi"
              description="Indicate comune, metratura indicativa e formati di consegna: rispondiamo con quotazione e prima data utile di campo."
              primaryHref="/contatti?oggetto=slam#form-contatti"
              primaryLabel="Richiedi una quotazione"
              secondaryHref="/laser-scanner-slam"
              secondaryLabel="Il servizio SLAM"
            />
          </div>
        </div>
      </main>
    </>
  );
}
