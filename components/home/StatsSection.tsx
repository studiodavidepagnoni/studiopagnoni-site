import { fontDisplay, fontSans } from "@/lib/fonts";
import { homeFacts } from "@/lib/content";

export function StatsSection() {
  return (
    <section
      className="lazy-section overflow-x-hidden border-y border-[var(--green-border-muted)] bg-[var(--background)] px-4 py-12 sm:px-5 sm:py-16 md:px-10"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-6 sm:mb-8">
          <h2 id="stats-heading" className={`${fontDisplay.className} section-title home-section-title`}>
            Dal 1988 a Bornato
          </h2>
        </div>
        <div className="home-stats-rail">
          {homeFacts.map((fact) => (
            <div key={fact.title} className="home-stats-rail__item">
              <p className={`${fontDisplay.className} text-base font-medium leading-snug text-[var(--foreground)] sm:text-lg md:text-xl`}>
                {fact.title}
              </p>
              <p className={`${fontSans.className} mt-2 text-[0.8rem] leading-relaxed text-[var(--green-ink-muted)] sm:text-sm`}>
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
