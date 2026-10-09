import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { serviceGroupsEn } from "@/lib/i18n/content/marketing.en";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/en/servizi";

export const metadata = {
  ...buildPageMetadata({
    title: "Architecture, surveying and SLAM in Brescia",
    description:
      "Architectural design, surveying and SLAM laser scanning in Franciacorta and the province of Brescia. Architecture practice since 1988.",
    path: pagePath,
  }),
  alternates: localeAlternates("/servizi"),
};

const serviziFaqEn = [
  {
    q: "What services does Studio Architettura Pagnoni offer?",
    a: "Architecture, surveying (GNSS RTK and total station), SLAM laser scanning, landscape design, planning/building procedures, site safety coordination and technical advice.",
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
            <p className={`${ui.body} max-w-5xl`}>
              Measurement, design and technical procedures are not separate stages: a well-set commission needs reliable data,
              a clear reading of regulations, and continuity between field, office and site.{" "}
              <strong>Studio Architettura Pagnoni</strong>, active <strong>since 1988</strong>, supports private clients,
              businesses and professionals across <strong>architecture</strong>, <strong>surveying</strong>,{" "}
              <strong>SLAM laser scanning</strong>, landscape, planning and site safety. Structural design is coordinated with
              external professionals when required.
            </p>

            <section aria-labelledby="servizi-elenco">
              <h2 id="servizi-elenco" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 sm:mb-4`}>
                Areas of work
              </h2>
              <p className={`${ui.bodyMuted} mb-8 max-w-5xl`}>
                From architecture to surveying, from SLAM laser scanning to landscape and site procedures: the areas we cover,
                with links to dedicated pages where method and equipment need more detail.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:gap-8" aria-label="Service cards">
                {serviceGroupsEn.map((group) => {
                  const hasDedicatedPage = Boolean(group.cta);
                  return (
                    <article
                      key={group.id}
                      id={group.id}
                      className={`interactive-card flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary-mid)] bg-[var(--card)] p-6 sm:p-8 ${ui.scrollAnchor}`}
                    >
                      <p className={`${fontSans.className} section-kicker mb-3`}>{group.kicker}</p>
                      <h3 className={`${fontDisplay.className} ${ui.cardHeading}`}>{group.title}</h3>
                      <p className={`mt-4 flex-1 ${ui.bodySm}`}>{group.description}</p>
                      {hasDedicatedPage ? (
                        <Link
                          href={withLocalePrefix(group.href, "en")}
                          className={`${fontSans.className} ${ui.textCta} mt-6`}
                        >
                          {group.cta} →
                        </Link>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>

            <FaqSection id="servizi-faq" items={serviziFaqEn} title="Frequently asked questions" />
          </div>
        </div>
      </main>
    </>
  );
}
