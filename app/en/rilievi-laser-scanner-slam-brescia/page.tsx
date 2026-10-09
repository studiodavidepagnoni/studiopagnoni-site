import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { laserSlamLandingEn } from "@/lib/i18n/content/laserSlam.en";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";

const content = {
  ...laserSlamLandingEn,
  path: "/rilievi-laser-scanner-slam-brescia",
  metaTitle: "SLAM laser surveys in Brescia — point clouds and as-built",
  metaDescription:
    "SLAM laser surveys in Brescia and Franciacorta: point clouds, as-built and CAD/BIM. Request a quote.",
  hero: {
    eyebrow: "SLAM laser scanning · Brescia",
    title: "SLAM laser surveys in Brescia",
    lede: "Point clouds and as-built documentation for architectural design across the province of Brescia and Franciacorta.",
  },
  areaHeading: "Brescia and Franciacorta",
  ctaHeading: "Quote for a SLAM survey in Brescia",
} as const;

export const metadata = {
  ...buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/en/rilievi-laser-scanner-slam-brescia",
  }),
  alternates: localeAlternates("/rilievi-laser-scanner-slam-brescia"),
};

export default function EnSlamBresciaPage() {
  return (
    <>
      <StaticPageHero path="/en/rilievi-laser-scanner-slam-brescia" />
      <LaserSlamLanding content={content} locale="en" />
    </>
  );
}
