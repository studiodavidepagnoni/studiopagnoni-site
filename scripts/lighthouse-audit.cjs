/**
 * Audit Lighthouse (mobile 4G simulato + desktop).
 * Richiede build + server su PORT (default 3010).
 *
 * Uso: npm run lighthouse
 */
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const port = process.env.LH_PORT || "3010";
const url = `http://127.0.0.1:${port}/`;
const outDir = path.join(root, ".lighthouse");

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}`))));
  });
}

async function waitForServer(maxMs = 60_000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      execSync(`curl -s -o NUL -w "%{http_code}" "${url}"`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 800));
    }
  }
  throw new Error(`Server non raggiungibile su ${url}`);
}

async function lighthouseRun(id, extraArgs) {
  const report = path.join(outDir, `${id}.html`);
  const json = path.join(outDir, `${id}.json`);
  await run("npx", [
    "lighthouse",
    url,
    "--quiet",
    "--chrome-flags=--headless --no-sandbox",
    `--output-path=${path.join(outDir, id)}`,
    "--output=html",
    "--output=json",
    ...extraArgs,
  ]);
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
  if (!fs.existsSync(path.join(root, ".next"))) {
    console.log("[lighthouse] Build assente, eseguo npm run build…");
    execSync("npm run build", { cwd: root, stdio: "inherit" });
  }

  fs.mkdirSync(outDir, { recursive: true });

  const server = spawn("npx", ["next", "start", "-p", port], {
    cwd: root,
    stdio: "ignore",
    shell: true,
    detached: true,
  });

  try {
    await waitForServer();
    await lighthouseRun("mobile", [
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",
      "--throttling.cpuSlowdownMultiplier=4",
    ]);
    await lighthouseRun("desktop", ["--preset=desktop", "--screenEmulation.mobile=false"]);
    console.log("\n[lighthouse] Report in .lighthouse/");
  } finally {
    try {
      process.kill(-server.pid);
    } catch {
      server.kill();
    }
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
