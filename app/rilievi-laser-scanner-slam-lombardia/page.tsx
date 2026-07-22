import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { laserSlamLandingLombardia } from "@/lib/content/laserSlamLanding";
import { buildSlamLandingJsonLd } from "@/lib/config/slamLandingJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";

const content = laserSlamLandingLombardia;

export const metadata = buildPageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: content.path,
  priority: "high",
});

const slamLandingJsonLd = buildSlamLandingJsonLd(content);

export default function RilieviLaserScannerSlamLombardiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(slamLandingJsonLd) }} />
      <StaticPageHero path={content.path} />
      <LaserSlamLanding content={content} />
    </>
  );
}
