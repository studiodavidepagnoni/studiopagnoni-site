import localFont from "next/font/local";

/**
 * Corpo: Manrope self-hosted — evita next/font/google (URL gstatic extensionless
 * che in CI/build fanno crashare il loader: Cannot read properties of null).
 * `optional`: non tiene il first paint in attesa del woff2 (fuori dal critical path LCP).
 */
export const fontSans = localFont({
  src: [
    { path: "../public/fonts/manrope-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/manrope-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "optional",
  preload: false,
  adjustFontFallback: "Arial",
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
