import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { laserSlamLandingEn } from "@/lib/i18n/content/laserSlam.en";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";

const content = {
  ...laserSlamLandingEn,
  path: "/rilievi-laser-scanner-slam-lombardia",
  metaTitle: "SLAM laser surveys in Lombardy — industry and property",
  metaDescription:
    "SLAM laser surveys across Lombardy: as-built and CAD/BIM for sheds and plant rooms. Based in Brescia. Request a quote.",
  hero: {
    eyebrow: "SLAM laser scanning · Lombardy",
    title: "SLAM laser surveys in Lombardy",
    lede: "Mobile 3D scanning for architecture, industrial buildings and plant rooms across Lombardy, based in Brescia.",
  },
  areaHeading: "Lombardy coverage",
  ctaHeading: "Quote for a SLAM survey in Lombardy",
} as const;

export const metadata = {
  ...buildPageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: "/en/rilievi-laser-scanner-slam-lombardia",
  }),
  alternates: localeAlternates("/rilievi-laser-scanner-slam-lombardia"),
};

export default function EnSlamLombardiaPage() {
  return (
    <>
      <StaticPageHero path="/en/rilievi-laser-scanner-slam-lombardia" />
      <LaserSlamLanding content={content} locale="en" />
    </>
  );
}
