"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fontSans } from "@/lib/fonts";
import { getLocaleFromPathname, switchLocalePath } from "@/lib/i18n/paths";
import { t } from "@/lib/i18n/messages";

type Props = {
  className?: string;
  /** Contrasto su header scuro / chiaro */
  tone?: "chrome" | "ink";
};

/** Switch IT | EN minimale — stessa pagina, prefisso `/en` solo per inglese. */
export function LanguageSwitcher({ className = "", tone = "chrome" }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = t(locale);
  const inactive =
    tone === "chrome"
      ? "text-[var(--header-text-muted)] hover:text-[var(--header-nav-hover)]"
      : "text-[var(--green-ink-muted)] hover:text-[var(--foreground)]";
  const active =
    tone === "chrome" ? "text-[var(--header-nav-text)]" : "text-[var(--foreground)]";

  return (
    <nav
      className={`${fontSans.className} inline-flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-[0.12em] ${className}`}
      aria-label={copy.langSwitchAria}
    >
      <Link
        href={switchLocalePath(pathname, "it")}
        hrefLang="it"
        className={`transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45 ${
          locale === "it" ? active : inactive
        }`}
        aria-current={locale === "it" ? "true" : undefined}
      >
        {copy.langIt}
      </Link>
      <span className={inactive} aria-hidden>
        |
      </span>
      <Link
        href={switchLocalePath(pathname, "en")}
        hrefLang="en"
        className={`transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-mid)]/45 ${
          locale === "en" ? active : inactive
        }`}
        aria-current={locale === "en" ? "true" : undefined}
      >
        {copy.langEn}
      </Link>
    </nav>
  );
}
