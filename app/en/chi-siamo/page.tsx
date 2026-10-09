import { StockCoverImage } from "@/components/media/StockCoverImage";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { chiSiamoPageImage } from "@/lib/media/images";
import { chiSiamoPageEn } from "@/lib/i18n/content/marketing.en";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "About us",
    absoluteTitle: "Studio Architettura Pagnoni - About us",
    description:
      "Studio Architettura Pagnoni in Cazzago San Martino (BS): architecture, surveying and SLAM laser scanning in Franciacorta and the province of Brescia since 1988.",
    path: "/en/chi-siamo",
  }),
  alternates: localeAlternates("/chi-siamo"),
};

export default function EnChiSiamoPage() {
  return (
    <>
      <StaticPageHero path="/en/chi-siamo" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} overflow-x-hidden`}>
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-14">
              <div className={`md:col-span-7 ${ui.body} space-y-5 sm:space-y-6`}>
                {chiSiamoPageEn.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="relative md:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] md:aspect-[3/4]">
                  <StockCoverImage
                    src={chiSiamoPageImage.src}
                    alt={chiSiamoPageImage.alt}
                    sizes="(min-width:768px) min(440px, 40vw), min(100vw, 720px)"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="image-unify-overlay image-unify-overlay--subtle" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
