import { expect, test } from "@playwright/test";
import { dismissCookieBanner } from "./helpers";

test.describe("smoke", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await dismissCookieBanner(page);
  });

  test("home — contenuto principale e navigazione", async ({ page }) => {
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("link", { name: "Vai al contenuto principale" })).toBeAttached();
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Contatti" }).first()).toBeVisible();
  });

  test("contatti — modulo visibile", async ({ page }) => {
    await page.goto("/contatti/");
    await dismissCookieBanner(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Recapiti/i })).toBeVisible();
    await expect(page.getByLabel("Nome e cognome")).toBeVisible();
    await expect(page.getByRole("button", { name: "Invia messaggio" })).toBeVisible();
  });

  test("contatti — invio modulo (Formspree mock)", async ({ page }) => {
    await page.route("https://formspree.io/f/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contatti/");
    await dismissCookieBanner(page);

    await page.getByLabel("Nome e cognome").fill("Mario Rossi");
    await page.getByLabel("Email").fill("mario.rossi@example.com");
    await page.getByLabel("Messaggio").fill("Richiesta di preventivo per rilievo SLAM in provincia di Brescia.");
    await page.getByLabel(/Ho letto e accetto la/i).check();

    await page.getByRole("button", { name: "Invia messaggio" }).click();

    await expect(page.getByRole("status", { name: "Messaggio inviato" })).toBeVisible({
      timeout: 15_000,
    });
  });
});
