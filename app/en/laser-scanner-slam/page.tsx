import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { laserSlamLandingEn } from "@/lib/i18n/content/laserSlam.en";
import { buildSlamLandingJsonLd } from "@/lib/config/slamLandingJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";

const content = laserSlamLandingEn;

export const metadata = {
  ...buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/en/laser-scanner-slam",
    priority: "high",
  }),
  alternates: localeAlternates("/laser-scanner-slam"),
};

const slamLandingJsonLd = buildSlamLandingJsonLd(content);

export default function EnLaserScannerSlamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(slamLandingJsonLd) }} />
      <StaticPageHero path="/en/laser-scanner-slam" />
      <LaserSlamLanding content={content} locale="en" />
    </>
  );
}
