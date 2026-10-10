import { FaqSection } from "@/components/content/FaqSection";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { ServiziCatalog } from "@/components/content/ServiziCatalog";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { serviziFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/servizi";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const pageTitle = "Architettura, topografia e SLAM a Brescia";
const pageDescription =
  "Progettazione architettonica, topografia, pratiche del geometra (divisioni, successioni, catasto) e laser scanner SLAM in Franciacorta e provincia di Brescia.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const serviziJsonLd = faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems: serviziFaq,
});

export default function ServiziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviziJsonLd) }} />
      <StaticPageHero path="/servizi" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
            <p className={`${ui.body} max-w-[68ch]`}>
              Misura, progetto e pratiche tecniche non sono fasi separate: per una commessa ben impostata servono dati affidabili, lettura normativa e
              continuità tra campo, studio e cantiere. Lo <strong>Studio Architettura Pagnoni</strong>, attivo <strong>dal 1988</strong>, affianca privati,
              imprese e professionisti su <strong>architettura</strong>, <strong>topografia</strong>, <strong>pratiche del geometra</strong>,{" "}
              <strong>laser SLAM</strong>, verde, urbanistica e sicurezza. La parte strutturale viene coordinata con professionisti esterni quando richiesta.
            </p>

            <section aria-labelledby="servizi-elenco">
              <h2 id="servizi-elenco" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-3 sm:mb-4`}>
                Ambiti di intervento
              </h2>
              <p className={`${ui.bodyMuted} mb-8 max-w-[68ch]`}>
                Dall&apos;architettura alle pratiche del geometra, dal laser SLAM al verde e alle procedure di cantiere: gli ambiti in cui
                interveniamo, con link alle pagine dedicate dove servono metodo e strumenti nel dettaglio.
              </p>

              <ServiziCatalog locale="it" />
            </section>

            <FaqSection id="servizi-faq" items={serviziFaq} />

            <PageClosingCta
              id="servizi-cta"
              title="Parliamo del vostro incarico"
              description="Indicate località, obiettivo (rilievo, divisione, successione, progetto o cantiere) e documentazione utile: rispondiamo con metodo, tempi e preventivo."
              primaryHref="/contatti#form-contatti"
              primaryLabel="Richiedi preventivo"
              secondaryHref="/contatti"
              secondaryLabel="Tutti i contatti"
            />
          </div>
        </div>
      </main>
    </>
  );
}
