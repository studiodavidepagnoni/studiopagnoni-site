import localFont from "next/font/local";
import { Manrope } from "next/font/google";

/**
 * Corpo: Manrope — sans contemporanea, pulita e leggibile su UI dense.
 * `optional`: non tiene il first paint in attesa del woff2 (fuori dal critical path LCP).
 */
export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "optional",
  weight: ["400", "500", "600", "700"],
  preload: false,
  adjustFontFallback: true,
});

/**
 * Titoli: Sora 500 self-hosted — un solo file latino (accenti IT inclusi in U+00xx).
 * Preload esplicito in layout: con `inlineCss` i preload di next/font google spesso non compaiono.
 */
export const fontDisplay = localFont({
  src: [{ path: "../public/fonts/sora-500-latin.woff2", weight: "500", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

/** Menu e marchio: Manrope bold uppercase (ex Montserrat / Plus Jakarta — una famiglia in meno). */
export const fontNav = fontSans;

/** Path stabile per `<link rel="preload" as="font">` (critical path LCP hero). */
export const FONT_DISPLAY_PRELOAD_HREF = "/fonts/sora-500-latin.woff2";
