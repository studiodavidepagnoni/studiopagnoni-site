import { HeroHome } from "@/components/HeroHome";
import { HomeSections } from "@/components/home/HomeSections";
import { homeAiSummary } from "@/lib/content";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <main id="main-content" className="min-w-0 max-w-full overflow-x-clip">
      <div className="sr-only" aria-hidden>
        <h2>{homeAiSummary.title}</h2>
        {homeAiSummary.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
      <HeroHome />
      <HomeSections />
    </main>
  );
}
