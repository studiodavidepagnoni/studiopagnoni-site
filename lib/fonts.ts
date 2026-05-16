import { Manrope, Sora } from "next/font/google";

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

/** Menu e marchio: Manrope bold uppercase (ex Montserrat / Plus Jakarta — una famiglia in meno). */
export const fontNav = fontSans;
