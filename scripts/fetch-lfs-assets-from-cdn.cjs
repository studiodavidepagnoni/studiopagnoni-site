/**
 * Sostituisce i pointer Git LFS sotto assets/ scaricando i file reali
 * dal sito già online. Usato in CI/Pages con checkout `lfs: false`
 * per non consumare bandwidth Git LFS a ogni push.
 *
 * Env:
 *   ASSET_CDN_BASE — es. https://studiopagnoni.com (no trailing slash)
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const base = String(process.env.ASSET_CDN_BASE || "https://studiopagnoni.com").replace(
  /\/$/,
  "",
);

const VIDEO_RE = /\.(mp4|webm|mov)$/i;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (VIDEO_RE.test(ent.name)) out.push(p);
  }
  return out;
}

function isLfsPointer(filePath) {
  const fd = fs.openSync(filePath, "r");
  try {
    const buf = Buffer.alloc(64);
    const n = fs.readSync(fd, buf, 0, 64, 0);
    return buf.slice(0, n).toString("utf8").startsWith("version https://git-lfs.github.com/spec/v1");
  } finally {
    fs.closeSync(fd);
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const type = res.headers.get("content-type") || "";
  if (type.includes("text/html")) {
    throw new Error(`Got HTML instead of media for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) {
    throw new Error(`Suspiciously small download (${buf.length} B) for ${url}`);
  }
  if (buf.slice(0, 40).toString("utf8").startsWith("version https://git-lfs.github.com/spec/v1")) {
    throw new Error(`Downloaded another LFS pointer from ${url}`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    console.warn("[fetch-lfs-assets] assets/ assente — skip");
    return;
  }

  const files = walk(assetsDir);
  const targets = files.filter((f) => isLfsPointer(f));

  if (targets.length === 0) {
    console.log("[fetch-lfs-assets] Nessun pointer LFS da sostituire.");
    return;
  }

  console.log(
    `[fetch-lfs-assets] Scarico ${targets.length} file da ${base} (niente bandwidth LFS)`,
  );

  let ok = 0;
  for (const filePath of targets) {
    const rel = path.relative(root, filePath).split(path.sep).join("/");
    const url = `${base}/${rel}`;
    process.stdout.write(`  ${rel} ... `);
    const bytes = await download(url, filePath);
    console.log(`${(bytes / 1024 / 1024).toFixed(2)} MB`);
    ok += 1;
  }

  console.log(`[fetch-lfs-assets] Completato: ${ok}/${targets.length}`);
}

main().catch((err) => {
  console.error("[fetch-lfs-assets] ERRORE:", err.message || err);
  process.exit(1);
});
