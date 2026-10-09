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
    title: "Surveying in Brescia",
    description:
      "Plan and height surveys with GNSS RTK and total station in Franciacorta and the province of Brescia. Request a quote.",
    path: "/en/topografia",
  }),
  alternates: localeAlternates("/topografia"),
};

export default function EnTopografiaPage() {
  return (
    <>
      <StaticPageHero path="/en/topografia" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-8`}>
            <section className={ui.innerCard}>
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
                Surveying and field measurement
              </h2>
              <p className={`${fontSans.className} ${ui.body} max-w-[68ch]`}>
                Plan and height surveys for subdivisions, new developments, construction sites and boundary checks. We work
                with GNSS RTK and total station for traceable acquisitions, and integrate SLAM laser scanning when a dense
                3D base is required.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${withLocalePrefix("/contatti", "en")}?oggetto=topografia#form-contatti`}
                  className={`${ui.btnPrimary} inline-flex min-h-[48px] items-center justify-center`}
                >
                  Request a quote
                </Link>
                <Link
                  href={withLocalePrefix("/laser-scanner-slam", "en")}
                  className={`${ui.btnOutline} inline-flex min-h-[48px] items-center justify-center`}
                >
                  SLAM laser scanning
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
