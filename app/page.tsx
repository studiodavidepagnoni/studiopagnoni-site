import dynamic from "next/dynamic";
import { preload } from "react-dom";
import { HeroHomePlaceholder } from "@/components/HeroHomePlaceholder";
import { HomeSections } from "@/components/home/HomeSections";
import { HERO_POSTER_INDOOR_LCP } from "@/lib/heroVideos";
import { homeMetadata } from "@/lib/seo";

const HeroHome = dynamic(() => import("@/components/HeroHome").then((m) => ({ default: m.HeroHome })), {
  loading: () => <HeroHomePlaceholder />,
});

export const metadata = homeMetadata;

export default function HomePage() {
  preload(HERO_POSTER_INDOOR_LCP, { as: "image", fetchPriority: "high" });

  return (
    <main id="main-content" className="min-w-0 max-w-full overflow-x-clip">
      <HeroHome />
      <HomeSections />
    </main>
  );
}
