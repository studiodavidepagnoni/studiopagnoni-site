import type { Page } from "@playwright/test";

const COOKIE_PREFS_KEY = "studio_pagnoni_cookie_prefs_v2";

/** Imposta consenso cookie prima del caricamento — evita banner e inert su body in E2E/CI. */
export async function primeCookieConsent(page: Page) {
  await page.addInitScript((key) => {
    localStorage.setItem(key, JSON.stringify({ v: 2, embeds: false, updatedAt: Date.now() }));
  }, COOKIE_PREFS_KEY);
}

/** Chiude il banner cookie se ancora visibile (fallback). */
export async function dismissCookieBanner(page: Page) {
  const banner = page.getByRole("dialog", { name: /privacy e cookie/i });
  if (await banner.isVisible({ timeout: 2000 }).catch(() => false)) {
    await page.getByRole("button", { name: "Solo necessari" }).click();
    await banner.waitFor({ state: "hidden", timeout: 5000 });
  }
  await page.evaluate(() => {
    document.querySelectorAll("[inert]").forEach((el) => el.removeAttribute("inert"));
  });
}
