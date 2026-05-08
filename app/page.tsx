import { HeroHome } from "@/components/HeroHome";
import { HomeSections } from "@/components/home/HomeSections";
import { homeAiSummary } from "@/lib/content";

export default function HomePage() {
  return (
    <main id="main-content">
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
