import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { serviceGroups } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { serviceGroupsEn } from "@/lib/i18n/content/marketing.en";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { ui } from "@/lib/ui";

type Props = { locale?: Locale };

export function ServiziCatalog({ locale = "it" }: Props) {
  const groups = locale === "en" ? serviceGroupsEn : serviceGroups;

  return (
    <div className="servizi-catalog" aria-label={locale === "en" ? "Service areas" : "Ambiti di intervento"}>
      {groups.map((group) => {
        const hasDedicatedPage = Boolean(group.cta);
        const href = hasDedicatedPage ? withLocalePrefix(group.href, locale) : null;

        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className={`servizi-catalog__section ${ui.scrollAnchor}`}
          >
            <p className={`${fontSans.className} section-kicker mb-3`}>{group.kicker}</p>
            <h3 id={`${group.id}-title`} className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>
              {group.title}
            </h3>
            <p className={`${fontSans.className} mt-4 max-w-[68ch] ${ui.body}`}>{group.description}</p>
            <ul className="servizi-catalog__points mt-6" aria-label={group.title}>
              {group.points.map((point) => (
                <li key={point} className="servizi-catalog__point">
                  <span className="servizi-catalog__mark" aria-hidden />
                  <span className={`${fontSans.className} servizi-catalog__point-text`}>{point}</span>
                </li>
              ))}
            </ul>
            {href && group.cta ? (
              <p className="mt-7">
                <Link href={href} className={`${fontSans.className} ${ui.textCta}`}>
                  {group.cta}
                </Link>
              </p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
