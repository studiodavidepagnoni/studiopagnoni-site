/**
 * Chrome/Chromium per Lighthouse: risoluzione path e avvio CDP.
 * In CI usa Playwright launchServer (affidabile su GitHub Actions).
 */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

function tryPlaywright() {
  for (const mod of ["playwright", "@playwright/test"]) {
    try {
      return require(mod);
    } catch {
      /* ignore */
    }
  }
  return null;
}

function tryPlaywrightChromiumPath() {
  const pw = tryPlaywright();
  if (!pw) return null;
  try {
    const executablePath = pw.chromium.executablePath();
    if (executablePath && fs.existsSync(executablePath)) return executablePath;
  } catch {
    /* ignore */
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

  const playwright = tryPlaywrightChromiumPath();
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

function isPlaywrightChrome(chromePath) {
  return chromePath.includes("ms-playwright");
}

function chromeSpawnEnv(chromePath) {
  const env = { ...process.env };
  if (process.platform !== "linux" || !isPlaywrightChrome(chromePath)) return env;
  const chromeDir = path.dirname(chromePath);
  env.LD_LIBRARY_PATH = [chromeDir, env.LD_LIBRARY_PATH].filter(Boolean).join(":");
  return env;
}

/**
 * Avvia browser con CDP per Lighthouse.
 * @returns {Promise<{ debugPort: string, close: () => Promise<void> | void }>}
 */
async function launchChromeForLighthouse({ profileDir, debugPort = process.env.LH_CHROME_PORT || "9222" }) {
  const pw = tryPlaywright();
  if (isCi() && pw) {
    const server = await pw.chromium.launchServer({
      headless: true,
      args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--disable-extensions"],
    });
    const port = new URL(server.wsEndpoint()).port;
    return {
      debugPort: port,
      close: async () => {
        await server.close();
      },
    };
  }

  const chromePath = resolveChromePath();
  if (!chromePath) {
    throw new Error("Chrome/Chromium non trovato per Lighthouse.");
  }

  fs.rmSync(profileDir, { recursive: true, force: true });
  fs.mkdirSync(profileDir, { recursive: true });

  const chromeDir = path.dirname(chromePath);
  const proc = spawn(
    chromePath,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${profileDir}`,
      "about:blank",
    ],
    {
      stdio: "ignore",
      detached: process.platform !== "win32",
      env: chromeSpawnEnv(chromePath),
      cwd: isPlaywrightChrome(chromePath) ? chromeDir : undefined,
    },
  );
  if (process.platform !== "win32") proc.unref();

  return {
    debugPort: String(debugPort),
    close: () => {
      if (!proc?.pid) return;
      if (process.platform === "win32") {
        try {
          require("child_process").execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: "ignore" });
        } catch {
          proc.kill();
        }
        return;
      }
      try {
        process.kill(-proc.pid);
      } catch {
        proc.kill();
      }
    },
  };
}

module.exports = {
  resolveChromePath,
  launchChromeForLighthouse,
  tryPlaywrightChromiumPath,
  isCi,
};
