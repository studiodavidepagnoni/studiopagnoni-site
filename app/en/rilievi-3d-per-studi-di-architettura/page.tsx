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
    title: "3D surveys for architecture studios",
    description:
      "Outsourced SLAM laser surveys for architecture practices: point clouds, DWG and as-built — you keep the design relationship.",
    path: "/en/rilievi-3d-per-studi-di-architettura",
  }),
  alternates: localeAlternates("/rilievi-3d-per-studi-di-architettura"),
};

export default function EnRilievi3dStudiPage() {
  return (
    <>
      <StaticPageHero path="/en/rilievi-3d-per-studi-di-architettura" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-8`}>
            <section className={ui.innerCard}>
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
                We survey — you design
              </h2>
              <p className={`${fontSans.className} ${ui.body} max-w-[68ch]`}>
                For architecture practices and surveyors who need a reliable metric base without taking the field themselves:
                we deliver georeferenced point clouds, DWG/DXF and as-built notes ready for your project workflow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`${withLocalePrefix("/contatti", "en")}?oggetto=slam#form-contatti`}
                  className={`${ui.btnPrimary} inline-flex min-h-[48px] items-center justify-center`}
                >
                  Request a quote
                </Link>
                <Link
                  href={withLocalePrefix("/laser-scanner-slam", "en")}
                  className={`${ui.btnOutline} inline-flex min-h-[48px] items-center justify-center`}
                >
                  SLAM service page
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
