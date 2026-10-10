import { StockCoverImage } from "@/components/media/StockCoverImage";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { chiSiamoPage } from "@/lib/content";
import { chiSiamoPageImage } from "@/lib/media/images";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Chi siamo",
  absoluteTitle: "Studio Architettura Pagnoni - Chi siamo",
  description:
    "Studio di architettura e geometra in Franciacorta a Bornato (Cazzago San Martino, BS) dal 1988: progettazione, topografia, pratiche e laser SLAM in provincia di Brescia.",
  path: "/chi-siamo",
});

export default function ChiSiamoPage() {
  const [first, ...rest] = chiSiamoPage.paragraphs;

  return (
    <>
      <StaticPageHero path="/chi-siamo" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} overflow-x-hidden`}>
            <div className="grid items-start gap-8 md:grid-cols-12 md:gap-x-12 md:gap-y-6 lg:gap-x-14">
              <p className={`${ui.body} md:col-span-7 md:col-start-1 md:row-start-1`}>{first}</p>

              <div className="relative md:col-span-5 md:col-start-8 md:row-span-6 md:row-start-1">
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

              <div className={`${ui.body} space-y-5 sm:space-y-6 md:col-span-7 md:col-start-1`}>
                {rest.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
