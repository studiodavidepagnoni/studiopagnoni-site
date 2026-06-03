import { expect, test } from "@playwright/test";
import { dismissCookieBanner, primeCookieConsent } from "./helpers";

test.describe("smoke", () => {
  test.beforeEach(async ({ page }) => {
    await primeCookieConsent(page);
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

  test("header — menu mobile apre e chiude", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await dismissCookieBanner(page);
    const details = page.locator("#site-header-shell .site-header-mobile-details");
    await details.locator("summary").click();
    await expect(details.getByRole("link", { name: "Servizi" })).toBeVisible();
    await details.locator("summary").click();
    await expect(details.getByRole("link", { name: "Servizi" })).toBeHidden();
  });

  test("progetti — filtro ambito e scheda", async ({ page }) => {
    await page.goto("/progetti/");
    await dismissCookieBanner(page);
    await expect(page.getByRole("navigation", { name: /Filtra progetti per ambito/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Tutti", pressed: true })).toBeVisible();
    await page.getByRole("link", { name: /Azienda vinicola/i }).first().click();
    await expect(page.locator("#main-content")).toBeVisible();
  });

  test("progetto — galleria lightbox", async ({ page }) => {
    await page.goto("/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam/");
    await dismissCookieBanner(page);
    await page.getByRole("button", { name: /Apri nella galleria/i }).first().click();
    const dialog = page.getByRole("dialog", { name: "Galleria a schermo intero" });
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden({ timeout: 10_000 });
  });

  test("contatti — validazione modulo", async ({ page }) => {
    await page.goto("/contatti/");
    await dismissCookieBanner(page);
    await page.getByRole("button", { name: "Invia messaggio" }).click();
    await expect(page.getByText(/Inserisci nome e cognome|Email non valida|Messaggio troppo breve|Accetta la privacy/i).first()).toBeVisible();
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
