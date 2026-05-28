import { HeroHomeDeferred } from "@/components/hero/HeroHomeDeferred";
import { HeroLcpPreloadLinks } from "@/components/hero/HeroLcpPreloadLinks";
import { HomeSections } from "@/components/home/HomeSections";
import { homeMetadata } from "@/lib/config/seo";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <HeroLcpPreloadLinks />
      <main id="main-content" className="min-w-0 max-w-full overflow-x-clip">
      <HeroHomeDeferred />
      <HomeSections />
    </main>
    </>
  );
}
