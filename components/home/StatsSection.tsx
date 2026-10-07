import { fontDisplay, fontSans } from "@/lib/fonts";
import { homeFacts } from "@/lib/content";

export function StatsSection() {
  return (
    <section
      className="home-section-break surface-inverted lazy-section overflow-x-hidden border-y border-[var(--green-border-muted)] px-4 py-14 sm:px-5 sm:py-20 md:px-10"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-[1140px]">
        <div className="mb-8 sm:mb-12">
          <h2 id="stats-heading" className={`${fontDisplay.className} section-title home-section-title`}>
            Dal 1988 a Bornato
          </h2>
        </div>
        <div className="home-stats-rail">
          {homeFacts.map((fact) => (
            <div key={fact.title} className="home-stats-rail__item">
              <p className={`${fontDisplay.className} text-lg font-medium leading-snug text-[var(--foreground)] sm:text-xl md:text-2xl`}>
                {fact.title}
              </p>
              <p className={`${fontSans.className} mt-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--green-ink-muted)] sm:text-sm`}>
                {fact.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
