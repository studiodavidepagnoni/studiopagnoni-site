/**
 * Risolve l'eseguibile Chrome/Chromium per Lighthouse (locale + CI).
 * In CI preferisce Chromium di Playwright (già installato per E2E).
 */
const fs = require("fs");

function tryPlaywrightChromium() {
  try {
    const { chromium } = require("playwright");
    const executablePath = chromium.executablePath();
    if (executablePath && fs.existsSync(executablePath)) return executablePath;
  } catch {
    /* playwright non disponibile */
  }
  return null;
}

/** @returns {string | null} */
function resolveChromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.CHROME_BIN,
    tryPlaywrightChromium(),
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch {
      /* ignore */
    }
  }
  return null;
}

module.exports = { resolveChromePath };
