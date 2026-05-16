import { Manrope, Montserrat, Plus_Jakarta_Sans, Sora } from "next/font/google";

/**
 * Corpo: Manrope — sans contemporanea, pulita e leggibile su UI dense.
 */
export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  /** Corpo: carica dopo il primo paint — LCP guidato da Sora (hero). */
  preload: false,
  adjustFontFallback: true,
});

/**
 * Titoli: Sora — geometrica moderna, più tech-premium e netta nei blocchi hero.
 */
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: true,
});

/**
 * Marchio header/footer: Plus Jakarta Sans — più morbida e “studio” rispetto a Sora,
 * resta contemporanea con Manrope e i titoli geometrici.
 */
/**
 * Menu principale: Montserrat 700 — come TheGem / Drone Surveying (14px, uppercase, bianco).
 */
export const fontNav = Montserrat({
  subsets: ["latin"],
  variable: "--font-nav",
  display: "swap",
  weight: ["700"],
  preload: false,
  adjustFontFallback: true,
});

export const fontBrand = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
  weight: ["500", "600", "700"],
  preload: false,
  adjustFontFallback: true,
});
