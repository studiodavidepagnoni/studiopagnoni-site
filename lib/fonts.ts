import { Manrope, Sora } from "next/font/google";

/**
 * Corpo: Manrope — sans contemporanea, pulita e leggibile su UI dense.
 */
export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * Titoli: Sora — geometrica moderna, più tech-premium e netta nei blocchi hero.
 */
export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
