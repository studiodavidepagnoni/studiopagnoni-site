import { expect, test } from "@playwright/test";
import { dismissCookieBanner, primeCookieConsent } from "./helpers";

test.describe("smoke", () => {
  test.beforeEach(async ({ page }) => {
    await primeCookieConsent(page);
  });

  test("home — contenuto principale e navigazione", async ({ page }) => {
    await page.goto("/");
    await dismissCookieBanner(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("link", { name: "Vai al contenuto principale" })).toBeAttached();
    await expect(page.getByRole("navigation").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Contatti" }).first()).toBeVisible();
  });

  test("contatti — validazione e invio modulo", async ({ page }) => {
    await page.route("https://formspree.io/f/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/contatti/");
    await dismissCookieBanner(page);

    await expect(page.getByRole("heading", { name: /Recapiti/i })).toBeVisible();
    await expect(page.getByLabel("Nome e cognome")).toBeVisible();

    await page.getByRole("button", { name: "Invia messaggio" }).click();
    await expect(page.getByText(/Inserisci nome e cognome|Email non valida|Messaggio troppo breve|Accetta la privacy/i).first()).toBeVisible();

    await page.getByLabel("Nome e cognome").fill("Mario Rossi");
    await page.getByLabel("Email").fill("mario.rossi@example.com");
    await page.getByLabel("Messaggio").fill("Richiesta di preventivo per rilievo SLAM in provincia di Brescia.");
    await page.getByLabel(/Ho letto e accetto la/i).check();
    await page.getByRole("button", { name: "Invia messaggio" }).click();

    await expect(page.getByRole("status", { name: "Messaggio inviato" })).toBeVisible({
      timeout: 15_000,
    });
  });

  test("progetti — archivio e scheda caso studio", async ({ page }) => {
    await page.goto("/progetti/");
    await dismissCookieBanner(page);

    await expect(page.getByRole("link", { name: /Azienda vinicola/i }).first()).toBeVisible();
    await page.getByRole("link", { name: /Azienda vinicola/i }).first().click();
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("link", { name: "Richiedi preventivo SLAM" })).toBeVisible();
  });

  test("laser scanner SLAM — pagina servizio e CTA", async ({ page }) => {
    await page.goto("/laser-scanner-slam/");
    await dismissCookieBanner(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Preventivo rilievo laser scanner SLAM/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Richiedi preventivo SLAM" }).first()).toBeVisible();
  });

  test("landing SLAM — contenuto commerciale e CTA", async ({ page }) => {
    await page.goto("/rilievi-laser-scanner-slam-brescia/");
    await dismissCookieBanner(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Preventivo rilievo SLAM a Brescia/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Richiedi preventivo SLAM" }).first()).toBeVisible();
  });

  test("landing SLAM Lombardia — contenuto commerciale e CTA", async ({ page }) => {
    await page.goto("/rilievi-laser-scanner-slam-lombardia/");
    await dismissCookieBanner(page);

    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Preventivo rilievo SLAM in Lombardia/i })).toBeVisible();
    await expect(page.getByRole("link", { name: "Richiedi preventivo SLAM" }).first()).toBeVisible();
  });
});
