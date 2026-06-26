import { StockCoverImage } from "@/components/media/StockCoverImage";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { chiSiamoPage } from "@/lib/content";
import { chiSiamoPageImage } from "@/lib/media/images";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Chi siamo — geometra e architetto a Franciacorta",
  description:
    "Dal 1988 a Cazzago San Martino (BS): Geom. Sergio Pagnoni e Arch. Davide Pagnoni. Rilievi laser SLAM, topografia e progettazione per Franciacorta, provincia di Brescia e Nord Italia.",
  path: "/chi-siamo",
});

export default function ChiSiamoPage() {
  return (
    <>
      <StaticPageHero path="/chi-siamo" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} overflow-x-hidden`}>
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-14">
              <div className={`md:col-span-7 ${ui.body} space-y-5 sm:space-y-6`}>
                {chiSiamoPage.paragraphs.map((p, i) => (
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
