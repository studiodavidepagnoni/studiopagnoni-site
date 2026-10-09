"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/lib/i18n/paths";
import { t } from "@/lib/i18n/messages";

export function SkipToContent() {
  const locale = getLocaleFromPathname(usePathname());
  return (
    <a href="#main-content" className="skip-link">
      {t(locale).skipToContent}
    </a>
  );
}
