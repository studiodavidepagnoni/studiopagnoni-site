import type { Page } from "@playwright/test";

/** Chiude il banner cookie se visibile (export statico / primo accesso). */
export async function dismissCookieBanner(page: Page) {
  const necessary = page.getByRole("button", { name: "Solo necessari" });
  if (await necessary.isVisible({ timeout: 2500 }).catch(() => false)) {
    await necessary.click();
    await necessary.waitFor({ state: "hidden", timeout: 5000 }).catch(() => undefined);
  }
}
