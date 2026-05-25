/** Anno di pubblicazione del sito (range copyright: da qui all'anno corrente). */
export const SITE_COPYRIGHT_FROM_YEAR = 2024;

/** Testo anni per riga copyright (es. «2024» o «2024–2026»). */
export function formatCopyrightYearRange(now = new Date()): string {
  const year = now.getFullYear();
  if (year <= SITE_COPYRIGHT_FROM_YEAR) return String(year);
  return `${SITE_COPYRIGHT_FROM_YEAR}–${year}`;
}
