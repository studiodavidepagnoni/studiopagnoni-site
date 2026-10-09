import type { Metadata } from "next";
import { site } from "@/lib/config/site";
import { withLocalePrefix } from "@/lib/i18n/paths";

/** Alternates hreflang IT/EN per pagina. */
export function localeAlternates(path: string): NonNullable<Metadata["alternates"]> {
  const bare = path.startsWith("/") ? path : `/${path}`;
  const origin = site.url.replace(/\/$/, "");
  const itPath = bare === "/" ? "/" : bare;
  const enPath = withLocalePrefix(bare, "en");
  return {
    canonical: bare.startsWith("/en") ? `${origin}${enPath}` : `${origin}${itPath}`,
    languages: {
      it: `${origin}${itPath === "/" ? "/" : itPath}`,
      en: `${origin}${enPath === "/en" ? "/en/" : `${enPath}/`}`.replace(/([^:]\/)\/+/g, "$1"),
      "x-default": `${origin}${itPath === "/" ? "/" : itPath}`,
    },
  };
}
