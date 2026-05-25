import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { buildPageMetadata, seoKeywords } from "@/lib/config/seo";

export const metadata = buildPageMetadata({
  title: "Rilievi laser scanner SLAM mobile CHCNAV RS10 — Franciacorta e Brescia",
  description:
    "Rilievi con laser scanner SLAM mobile: nuvole di punti georiferite, as-built indoor e outdoor, DWG e BIM. Capannoni, edifici e cantieri in Franciacorta e provincia di Brescia. Sopralluogo e preventivo.",
  path: "/laser-scanner-slam",
  keywords: seoKeywords.primary,
  priority: "high",
});

export default function LaserSlamPage() {
  return <LaserSlamLanding />;
}
