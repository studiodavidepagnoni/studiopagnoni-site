/**
 * Sincronizza contenuti statici per Next.js:
 * - assets/ → public/assets/
 * - robots.txt, sitemap.xml, llms.txt se presenti
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const assetsSrc = path.join(root, "assets");
const assetsDest = path.join(root, "public", "assets");
if (fs.existsSync(assetsSrc)) {
  fs.mkdirSync(path.dirname(assetsDest), { recursive: true });
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
  console.log("[sync-static] assets/ → public/assets/");
} else {
  console.warn("[sync-static] Cartella assets/ assente.");
}

for (const extra of ["favicon.ico", "robots.txt", "sitemap.xml", "llms.txt", "CNAME"]) {
  const p = path.join(root, extra);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(root, "public", extra));
    console.log(`[sync-static] ${extra} → public/${extra}`);
  }
}

console.log("[sync-static] Completato.");
