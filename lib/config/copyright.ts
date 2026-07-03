/** Testo anno per riga copyright (es. «2026»). */
export function formatCopyrightYearRange(now = new Date()): string {
  return String(now.getFullYear());
}
