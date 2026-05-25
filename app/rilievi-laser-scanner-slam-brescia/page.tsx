import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { buildPageMetadata, seoKeywords } from "@/lib/config/seo";

export const metadata = buildPageMetadata({
  title: "Rilievi laser scanner SLAM a Brescia per capannoni, edifici e impianti",
  description:
    "Rilievi laser scanner SLAM a Brescia e Franciacorta: nuvole di punti, as-built, DWG e BIM per capannoni, edifici, impianti e cantieri. Preventivo su misura.",
  path: "/rilievi-laser-scanner-slam-brescia",
  keywords: [
    "rilievi laser scanner SLAM Brescia",
    "rilievo 3D capannone Brescia",
    "nuvola di punti Brescia",
    "rilievo as built capannone",
    ...seoKeywords.primary,
  ],
  priority: "high",
});

export default function RilieviLaserScannerSlamBresciaPage() {
  return <LaserSlamLanding />;
}
