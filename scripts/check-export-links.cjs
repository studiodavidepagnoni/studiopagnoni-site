/**
 * Verifica che l'export statico non contenga link con basePath duplicato.
 * Usato in CI/Pages quando NEXT_PUBLIC_BASE_PATH è impostato.
 */
const fs = require("node:fs");
const path = require("node:path");

const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/+$/, "");
if (!base) {
  console.log("[check-export-links] basePath assente, skip.");
  process.exit(0);
}

const outDir = path.join(__dirname, "..", "out");
const doublePrefix = `${base}${base}/`;
let failed = false;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(full, "utf8");
      if (html.includes(doublePrefix)) {
        console.error(`[check-export-links] doppio basePath in ${path.relative(outDir, full)}`);
        failed = true;
      }
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error("[check-export-links] cartella out/ assente.");
  process.exit(1);
}

walk(outDir);

if (failed) {
  console.error(`[check-export-links] trovato href con prefisso duplicato (${doublePrefix}).`);
  process.exit(1);
}

console.log("[check-export-links] OK");
