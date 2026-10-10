import { FaqSection } from "@/components/content/FaqSection";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { ServiziCatalog } from "@/components/content/ServiziCatalog";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/en/servizi";

export const metadata = {
  ...buildPageMetadata({
    title: "Architecture, surveying and SLAM in Brescia",
    description:
      "Architectural design, surveying, surveyor procedures (subdivisions, succession, cadastre) and SLAM laser scanning in Franciacorta and the province of Brescia.",
    path: pagePath,
  }),
  alternates: localeAlternates("/servizi"),
};

const serviziFaqEn = [
  {
    q: "What services does Studio Architettura Pagnoni offer?",
    a: "Architecture; surveying; surveyor procedures (cadastral subdivisions, splits, succession, DOCFA, map types and boundary checks); SLAM laser scanning; landscape design; planning and building procedures; site safety coordination (CSP/CSE) and technical advice. Structural design is coordinated with external professionals when required.",
  },
  {
    q: "Do you handle subdivisions, succession and cadastral procedures?",
    a: "Yes. As surveyors we handle cadastral subdivisions and land/building splits, property succession and hereditary divisions, DOCFA and cadastral updates, plus boundary verification and ascertainment. Metric survey remains the base when documentation must match as-built conditions.",
  },
  {
    q: "Where do you work?",
    a: "Primarily Franciacorta and the province of Brescia; by appointment also Lombardy and Northern Italy.",
  },
  {
    q: "How do I request a quotation?",
    a: "Use the contact form with location, approximate area and required outputs. We reply with timing and a tailored proposal.",
  },
];

export default function EnServiziPage() {
  return (
    <>
      <StaticPageHero path="/en/servizi" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
            <p className={`${ui.body} max-w-[68ch]`}>
              Measurement, design and technical procedures are not separate stages: a well-set commission needs reliable data,
              a clear reading of regulations, and continuity between field, office and site.{" "}
              <strong>Studio Architettura Pagnoni</strong>, active <strong>since 1988</strong>, supports private clients,
              businesses and professionals across <strong>architecture</strong>, <strong>surveying</strong>,{" "}
              <strong>surveyor procedures</strong>, <strong>SLAM laser scanning</strong>, landscape, planning and site safety.
              Structural design is coordinated with external professionals when required.
            </p>

            <section aria-labelledby="servizi-elenco">
              <h2 id="servizi-elenco" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-3 sm:mb-4`}>
                Areas of work
              </h2>
              <p className={`${ui.bodyMuted} mb-8 max-w-[68ch]`}>
                From architecture to surveyor procedures, from SLAM laser scanning to landscape and site workflows: the areas we
                cover, with links to dedicated pages where method and equipment need more detail.
              </p>

              <ServiziCatalog locale="en" />
            </section>

            <FaqSection id="servizi-faq" items={serviziFaqEn} title="Frequently asked questions" />

            <PageClosingCta
              id="servizi-cta"
              title="Let’s discuss your brief"
              description="Tell us the location, the goal (survey, subdivision, succession, design or site work) and useful documents: we reply with method, timing and a quotation."
              primaryHref={withLocalePrefix("/contatti", "en") + "#form-contatti"}
              primaryLabel="Request a quotation"
              secondaryHref={withLocalePrefix("/contatti", "en")}
              secondaryLabel="All contacts"
            />
          </div>
        </div>
      </main>
    </>
  );
}
