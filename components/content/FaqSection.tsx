import { fontDisplay, fontSans } from "@/lib/fonts";
import type { FaqItem } from "@/lib/content/pageFaqs";
import { ui } from "@/lib/ui";

type FaqSectionProps = {
  id: string;
  items: readonly FaqItem[];
  title?: string;
  className?: string;
};

export function FaqSection({ id, items, title = "Domande frequenti", className }: FaqSectionProps) {
  return (
    <section className={className ?? ui.innerCard} aria-labelledby={id}>
      <h2 id={id} className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] open:bg-[var(--card)]"
          >
            <summary
              className={`${fontDisplay.className} cursor-pointer list-none px-5 py-4 text-base font-medium text-[var(--foreground)] marker:content-none sm:text-lg [&::-webkit-details-marker]:hidden`}
            >
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span className="shrink-0 text-[var(--primary-mid)] transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p
              className={`${fontSans.className} border-t border-[var(--green-border-muted)] px-5 pb-4 pt-3 text-sm leading-relaxed text-[var(--copy-body)]`}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
