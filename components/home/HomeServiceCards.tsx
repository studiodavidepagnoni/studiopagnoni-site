import type { CSSProperties } from "react";
import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { homeServiceCards } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { serviceGroupsEn } from "@/lib/i18n/content/marketing.en";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { t } from "@/lib/i18n/messages";
import { homeServiceCardImages } from "@/lib/media/images";
import { StockCoverImage } from "@/components/media/StockCoverImage";
import { ui } from "@/lib/ui";

type Props = { locale?: Locale };

export function HomeServiceCards({ locale = "it" }: Props) {
  const copy = t(locale);
  const homePreviewIds = ["architettura", "topografia-rilievi", "laser-slam", "verde-paesaggio"] as const;
  const cards =
    locale === "en"
      ? homePreviewIds.map((id) => {
          const g = serviceGroupsEn.find((item) => item.id === id)!;
          return {
            id: g.id,
            title: g.title,
            description: g.description,
            href: withLocalePrefix(g.href, locale),
          };
        })
      : homeServiceCards.map((g) => ({
          ...g,
          href: withLocalePrefix(g.href, locale),
        }));

  return (
    <div
      className="service-cards-grid grid gap-4 sm:gap-5 lg:grid-cols-2"
      aria-label={locale === "en" ? "Service cards" : "Schede servizi"}
    >
      {cards.map((card, index) => {
        const media = homeServiceCardImages[card.id as keyof typeof homeServiceCardImages];

        return (
          <article
            key={card.title}
            className="service-card service-card--enter frost-card group flex flex-col p-0"
            style={{ "--service-card-delay": `${180 + index * 200}ms` } as CSSProperties}
          >
            <span className="service-card__accent-line" aria-hidden />
            {media ? (
              <div className="service-card__media">
                <StockCoverImage
                  src={media.src}
                  alt={media.alt}
                  sizes="(min-width:1024px) min(540px, 46vw), (min-width:640px) min(90vw, 720px), 100vw"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className={`${fontDisplay.className} ${ui.cardHeading} mb-2 leading-snug`}>{card.title}</h3>
              <p className={`copy-rhythm mb-5 flex-1 ${ui.bodySm}`}>{card.description}</p>
              <Link href={card.href} className={`${fontSans.className} service-card__cta ${ui.textCta} mt-auto gap-2 text-base sm:text-sm`}>
                {copy.cta.learnMore}
                <span
                  className="service-card__cta-arrow text-[1.1em] leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
