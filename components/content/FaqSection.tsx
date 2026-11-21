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
            className="group border-b border-[var(--green-border-muted)] bg-transparent open:bg-transparent"
          >
            <summary
              className={`${fontDisplay.className} cursor-pointer list-none py-4 pl-0 pr-2 text-base font-medium text-[var(--foreground)] marker:content-none sm:text-lg [&::-webkit-details-marker]:hidden`}
            >
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span className="shrink-0 text-[var(--primary-mid)] transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p
              className={`${fontSans.className} pb-4 pt-0 text-sm leading-relaxed text-[var(--copy-body)]`}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
