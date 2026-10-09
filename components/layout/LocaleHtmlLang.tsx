"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLocaleFromPathname } from "@/lib/i18n/paths";

/** Allinea `document.documentElement.lang` alle route `/en` (root layout resta `lang="it"`). */
export function LocaleHtmlLang() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
