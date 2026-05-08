import Image from "next/image";
import type { Metadata } from "next";
import { fontDisplay } from "@/lib/fonts";
import { chiSiamoPage } from "@/lib/content";
import { chiSiamoPageImage } from "@/lib/images";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Geometra e architetto a Bornato (Cazzago San Martino, Brescia): Studio Tecnico Pagnoni, topografia, laser SLAM e progettazione del territorio.",
  alternates: { canonical: `${site.url}/chi-siamo` },
};

export default function ChiSiamoPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} overflow-x-hidden`}>
          <header className="mb-10 max-w-[72ch] sm:mb-12">
            <p className={ui.pageEyebrow}>Lo studio</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>{chiSiamoPage.title}</h1>
            <div className={ui.pageTitleRule} aria-hidden />
          </header>

          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-14">
            <div className={`md:col-span-7 ${ui.body} space-y-5 sm:space-y-6`}>
              {chiSiamoPage.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="relative md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-[var(--primary-mid)]/10 md:aspect-[3/4]">
                <Image
                  src={chiSiamoPageImage.src}
                  alt={chiSiamoPageImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width:768px) 38vw, 100vw"
                  priority
                />
                <div className="image-unify-overlay" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
