/**
 * Audit Lighthouse (mobile 4G simulato + desktop).
 * Richiede build + server su PORT (default 3010).
 *
 * Uso: npm run lighthouse
 */
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..");
const port = process.env.LH_PORT || "3010";
const url = `http://127.0.0.1:${port}/`;
const outDir = path.join(root, ".lighthouse");
const nextBin = require.resolve("next/dist/bin/next");
const npmExecPath = process.env.npm_execpath;
const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function makeTmpDir() {
  const candidates = [
    process.env.LH_TMP,
    path.join(path.parse(root).root, "Temp", "studio-pagnoni-lighthouse"),
    path.join(process.env.TEMP || outDir, "studio-pagnoni-lighthouse"),
  ].filter(Boolean);
  for (const dir of candidates) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      return dir;
    } catch {
      /* try next */
    }
  }
  fs.mkdirSync(path.join(outDir, "tmp"), { recursive: true });
  return path.join(outDir, "tmp");
}

const tmpDir = makeTmpDir();

function npmExecCommand(args) {
  if (npmExecPath) {
    return { cmd: process.execPath, args: [npmExecPath, "exec", "--yes", "--", ...args] };
  }
  return { cmd: process.platform === "win32" ? "npx.cmd" : "npx", args };
}

function findChromePath() {
  return chromeCandidates.find((candidate) => {
    try {
      return fs.existsSync(candidate);
    } catch {
      return false;
    }
  });
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

function hasProjectDevServer() {
  if (process.platform !== "win32") return false;
  try {
    const escapedRoot = root.replace(/'/g, "''");
    const script = [
      "$root = '" + escapedRoot + "'",
      "Get-CimInstance Win32_Process | Where-Object {",
      "  $_.CommandLine -and",
      "  $_.CommandLine -like \"*$root*\" -and",
      "  ($_.CommandLine -like '*next* dev*' -or $_.CommandLine -like '*start-server.js*')",
      "} | Select-Object -First 1 -ExpandProperty ProcessId",
    ].join("; ");
    return execSync("powershell -NoProfile -Command " + JSON.stringify(script), {
      cwd: root,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim().length > 0;
  } catch {
    return false;
  }
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"], shell: false, ...opts });
    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
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
    let done = false;
    const finish = (ok) => {
      if (done) return;
      done = true;
      resolve(ok);
    };
    const req = http.get(targetUrl, (res) => {
      res.resume();
      finish(Boolean(res.statusCode && res.statusCode < 500));
    });
    req.on("error", () => finish(false));
    req.setTimeout(1200, () => {
      req.destroy();
      finish(false);
    });
  });
}

async function waitForServer(maxMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    if (await canReadUrl(url)) {
      return;
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  throw new Error(`Server non raggiungibile su ${url}`);
}

async function lighthouseRun(id, extraArgs) {
  const outputBase = path.join(outDir, id);
  const report = path.join(outDir, `${id}.report.html`);
  const json = path.join(outDir, `${id}.report.json`);
  const chromeProfileDir = path.join(tmpDir, `chrome-${id}`);
  const chromeDebugPort = String(Number(process.env.LH_CHROME_PORT || 9222) + (id === "desktop" ? 1 : 0));
  const chromePath = findChromePath();
  let chrome = null;
  fs.rmSync(chromeProfileDir, { recursive: true, force: true });
  fs.mkdirSync(chromeProfileDir, { recursive: true });
  if (chromePath) {
    chrome = spawn(
      chromePath,
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        `--remote-debugging-port=${chromeDebugPort}`,
        `--user-data-dir=${chromeProfileDir}`,
        "about:blank",
      ],
      { stdio: "ignore", detached: process.platform !== "win32" },
    );
    if (process.platform !== "win32") chrome.unref();
    const chromeReady = `http://127.0.0.1:${chromeDebugPort}/json/version`;
    const start = Date.now();
    while (!(await canReadUrl(chromeReady))) {
      if (Date.now() - start > 15_000) throw new Error(`Chrome non raggiungibile su ${chromeReady}`);
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  const lighthouse = npmExecCommand([
    "lighthouse",
    url,
    "--quiet",
    chrome ? `--port=${chromeDebugPort}` : `--chrome-flags=--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage --disable-extensions`,
    `--output-path=${outputBase}`,
    "--output=html",
    "--output=json",
    ...extraArgs,
  ]);
  try {
    await run(
      lighthouse.cmd,
      lighthouse.args,
      { env: { ...process.env, TEMP: tmpDir, TMP: tmpDir, TMPDIR: tmpDir } },
    );
  } catch (err) {
    if (!String(err.output || "").includes("EPERM") || !fs.existsSync(json)) throw err;
    console.warn("[lighthouse] Chrome cleanup EPERM ignorato: report JSON generato correttamente.");
  } finally {
    killProcessTree(chrome);
  }
  console.log(`\n[lighthouse] ${id}: ${report}`);
  if (fs.existsSync(json)) {
    const data = JSON.parse(fs.readFileSync(json, "utf8"));
    const perf = data.categories?.performance?.score;
    const cls = data.audits?.["cumulative-layout-shift"]?.displayValue;
    const lcp = data.audits?.["largest-contentful-paint"]?.displayValue;
    console.log(`  Performance: ${perf != null ? Math.round(perf * 100) : "n/a"}`);
    console.log(`  LCP: ${lcp ?? "n/a"} | CLS: ${cls ?? "n/a"}`);
  }
}

async function main() {
  if (process.env.LH_SKIP_BUILD !== "1") {
    if (hasProjectDevServer()) {
      throw new Error(
        "Chiudi prima `next dev` su questa cartella: Lighthouse esegue una build fresca e non deve cancellare .next mentre il dev server e' attivo.",
      );
    }
    console.log("[lighthouse] Build fresca per evitare artefatti .next incoerenti…");
    execSync("npm run clean", { cwd: root, stdio: "inherit" });
    execSync("npm run build", { cwd: root, stdio: "inherit" });
  } else if (!fs.existsSync(path.join(root, ".next"))) {
    console.log("[lighthouse] Build assente, eseguo npm run build…");
    execSync("npm run build", { cwd: root, stdio: "inherit" });
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(tmpDir, { recursive: true });

  let serverOutput = "";
  const server = spawn(process.execPath, [nextBin, "start", "-p", port], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    detached: process.platform !== "win32",
  });
  server.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });
  if (process.platform !== "win32") server.unref();

  try {
    try {
      await waitForServer();
    } catch (err) {
      if (serverOutput.trim()) console.error(serverOutput.trim());
      throw err;
    }
    await lighthouseRun("mobile", [
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",
      "--throttling.cpuSlowdownMultiplier=4",
    ]);
    await lighthouseRun("desktop", ["--preset=desktop", "--screenEmulation.mobile=false"]);
    console.log("\n[lighthouse] Report in .lighthouse/");
  } finally {
    killProcessTree(server);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
