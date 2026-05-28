/**
 * Lighthouse in CI: serve `out/` (export statico), audit mobile, soglie LCP/CLS.
 *
 * Env:
 *   LH_MAX_LCP_MS — default 4500
 *   LH_MAX_CLS    — default 0.15
 *   LH_PORT       — default 3011
 */
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");
const { resolveChromePath } = require("./lighthouse-chrome.cjs");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const port = process.env.LH_PORT || "3011";
const url = `http://127.0.0.1:${port}/`;
const reportDir = path.join(root, ".lighthouse");
const tmpDir = path.join(reportDir, "tmp");
const maxLcpMs = Number(process.env.LH_MAX_LCP_MS ?? "4500");
const maxCls = Number(process.env.LH_MAX_CLS ?? "0.15");
const npmExecPath = process.env.npm_execpath;

fs.mkdirSync(tmpDir, { recursive: true });

function npmExecCommand(args) {
  if (npmExecPath) {
    return { cmd: process.execPath, args: [npmExecPath, "exec", "--yes", "--", ...args] };
  }
  return { cmd: process.platform === "win32" ? "npx.cmd" : "npx", args };
}

function killProcessTree(proc) {
  if (!proc?.pid) return;
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /pid ${proc.pid} /T /F`, { stdio: "ignore" });
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
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"], shell: false, ...opts });
    let output = "";
    child.stdout?.on("data", (chunk) => {
      output += chunk;
      process.stdout.write(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      output += chunk;
      process.stderr.write(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(output);
        return;
      }
      const err = new Error(`${cmd} exit ${code}`);
      err.output = output;
      reject(err);
    });
  });
}

function canReadUrl(targetUrl) {
  return new Promise((resolve) => {
    const req = http.get(targetUrl, (res) => {
      res.resume();
      resolve(Boolean(res.statusCode && res.statusCode < 500));
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(maxMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (await canReadUrl(url)) return;
    await new Promise((r) => setTimeout(r, 600));
  }
  throw new Error(`Server non raggiungibile su ${url}`);
}

async function runLighthouse() {
  fs.mkdirSync(reportDir, { recursive: true });
  const outputBase = path.join(reportDir, "ci-mobile");
  const jsonPath = path.join(reportDir, "ci-mobile.report.json");
  const chromePath = resolveChromePath();

  if (!chromePath) {
    throw new Error(
      "[lighthouse:ci] Chrome/Chromium non trovato. Imposta CHROME_PATH o installa Playwright (npx playwright install chromium).",
    );
  }
  console.log(`[lighthouse:ci] Chrome: ${chromePath}`);

  const lighthouse = npmExecCommand([
    "lighthouse",
    url,
    "--quiet",
    `--chrome-path=${chromePath}`,
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage",
    `--output-path=${outputBase}`,
    "--output=json",
    "--only-categories=performance",
    "--form-factor=mobile",
    "--screenEmulation.mobile=true",
    "--throttling.cpuSlowdownMultiplier=4",
  ]);

  try {
    await run(lighthouse.cmd, lighthouse.args, {
      env: {
        ...process.env,
        CHROME_PATH: chromePath,
        CI: process.env.CI ?? "1",
        TEMP: tmpDir,
        TMP: tmpDir,
        TMPDIR: tmpDir,
      },
    });
  } catch (err) {
    const output = String(err.output || err.message || "");
    if (!(output.includes("EPERM") && fs.existsSync(jsonPath))) throw err;
    console.warn("[lighthouse:ci] Cleanup Chrome EPERM ignorato: report JSON presente.");
  }

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Report Lighthouse mancante: ${jsonPath}`);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const lcpMs = data.audits?.["largest-contentful-paint"]?.numericValue;
  const cls = data.audits?.["cumulative-layout-shift"]?.numericValue;
  const perf = data.categories?.performance?.score;

  console.log("\n[lighthouse:ci] Risultati (mobile)");
  console.log(`  Performance score: ${perf != null ? Math.round(perf * 100) : "n/a"}`);
  console.log(`  LCP: ${lcpMs != null ? `${Math.round(lcpMs)} ms` : "n/a"} (max ${maxLcpMs} ms)`);
  console.log(`  CLS: ${cls != null ? cls.toFixed(3) : "n/a"} (max ${maxCls})`);

  const failures = [];
  if (lcpMs == null) failures.push("LCP non disponibile nel report");
  else if (lcpMs > maxLcpMs) failures.push(`LCP ${Math.round(lcpMs)} ms > ${maxLcpMs} ms`);

  if (cls == null) failures.push("CLS non disponibile nel report");
  else if (cls > maxCls) failures.push(`CLS ${cls.toFixed(3)} > ${maxCls}`);

  if (failures.length > 0) {
    console.error("\n[lighthouse:ci] Soglie non rispettate:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  console.log("\n[lighthouse:ci] Soglie LCP/CLS OK.");
}

async function main() {
  if (!fs.existsSync(outDir)) {
    console.error("[lighthouse:ci] Cartella out/ assente. Eseguire prima: npm run build:static");
    process.exit(1);
  }

  const serve = npmExecCommand(["serve", "out", "-l", port]);
  const server = spawn(serve.cmd, serve.args, {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    detached: process.platform !== "win32",
  });
  if (process.platform !== "win32") server.unref();

  try {
    await waitForServer();
    await runLighthouse();
  } finally {
    killProcessTree(server);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
