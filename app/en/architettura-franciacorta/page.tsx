import Link from "next/link";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Architecture in Franciacorta",
    description:
      "Architectural design from concept to construction drawings in Franciacorta and the province of Brescia. Studio Architettura Pagnoni since 1988.",
    path: "/en/architettura-franciacorta",
  }),
  alternates: localeAlternates("/architettura-franciacorta"),
};

export default function EnArchitetturaPage() {
  return (
    <>
      <StaticPageHero path="/en/architettura-franciacorta" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-8`}>
            <section className={ui.innerCard}>
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
                Architecture with a metric base
              </h2>
              <p className={`${fontSans.className} ${ui.body} max-w-[68ch]`}>
                Full architectural design — concept, preliminary and construction drawings — coordinated with surveying and
                SLAM laser scanning when existing conditions must be measured before design. Arch. Davide Pagnoni leads the
                building process alongside the practice’s survey team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${withLocalePrefix("/contatti", "en")}#form-contatti`}
                  className={`${ui.btnPrimary} inline-flex min-h-[48px] items-center justify-center`}
                >
                  Request a quote
                </Link>
                <Link
                  href={withLocalePrefix("/servizi", "en")}
                  className={`${ui.btnOutline} inline-flex min-h-[48px] items-center justify-center`}
                >
                  All services
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
