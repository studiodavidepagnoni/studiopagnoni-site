import type { CSSProperties } from "react";
import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { homeServiceCards } from "@/lib/content";
import { ui } from "@/lib/ui";

const visibleServiceCards = homeServiceCards.slice(0, 4);

export function HomeServiceCards() {
  return (
    <div className="service-cards-grid grid gap-4 sm:gap-5 lg:grid-cols-2" aria-label="Schede servizi">
      {visibleServiceCards.map((card, index) => (
        <article
          key={card.title}
          className="service-card service-card--enter frost-card group flex flex-col p-5 sm:p-6"
          style={{ "--service-card-delay": `${180 + index * 200}ms` } as CSSProperties}
        >
          <span className="service-card__accent-line" aria-hidden />
          <p className={`${fontSans.className} section-kicker mb-3`}>{card.kicker}</p>
          <h3 className={`${fontDisplay.className} ${ui.cardHeading} mb-2 leading-snug`}>{card.title}</h3>
          <p className={`copy-rhythm mb-5 flex-1 ${ui.bodySm}`}>{card.description}</p>
          <Link href={card.href} className={`${fontSans.className} service-card__cta ${ui.textCta} mt-auto gap-2 text-base sm:text-sm`}>
            Approfondisci
            <span
              className="service-card__cta-arrow text-[1.1em] leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
