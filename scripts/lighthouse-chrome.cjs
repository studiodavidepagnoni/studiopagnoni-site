/**
 * Risolve l'eseguibile Chrome/Chromium per Lighthouse (locale + CI).
 * In CI preferisce Chromium di Playwright (già installato per E2E).
 */
const fs = require("fs");

function tryPlaywrightChromium() {
  for (const mod of ["playwright", "@playwright/test"]) {
    try {
      const { chromium } = require(mod);
      const executablePath = chromium.executablePath();
      if (executablePath && fs.existsSync(executablePath)) return executablePath;
    } catch {
      /* modulo assente */
    }
  }
  return null;
}

function isCi() {
  return (
    process.env.GITHUB_ACTIONS === "true" ||
    process.env.CI === "true" ||
    process.env.CI === "1"
  );
}

function firstExisting(paths) {
  for (const candidate of paths) {
    if (!candidate) continue;
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch {
      /* ignore */
    }
  }
  return null;
}

/** @returns {string | null} */
function resolveChromePath() {
  const forced = process.env.LH_CHROME_PATH?.trim();
  if (forced) return firstExisting([forced]);

  const playwright = tryPlaywrightChromium();

  // GitHub Actions espone spesso CHROME_PATH=/usr/bin/google-chrome (stub): non usabile da Lighthouse.
  if (isCi() && playwright) return playwright;

  return firstExisting([
    process.env.CHROME_PATH,
    process.env.CHROME_BIN,
    playwright,
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ]);
}

module.exports = { resolveChromePath };
