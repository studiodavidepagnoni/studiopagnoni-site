/* eslint-disable no-console */
/**
 * `next start` richiede una build completata. Una cartella `.next` parziale o corrotta
 * provoca ENOENT su routes-manifest, _document.js, fallback-build-manifest, ecc.
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(process.cwd(), ".next");
const required = ["routes-manifest.json", "BUILD_ID", "server/pages/_document.js"];

const missing = required.filter((rel) => !fs.existsSync(path.join(root, rel)));

if (missing.length === 0) {
  process.exit(0);
}

console.error("");
console.error("[studio-pagnoni] La cartella .next/ è assente o incompleta.");
console.error(`    File attesi mancanti: ${missing.join(", ")}`);
console.error("");
console.error("  Produzione (npm run start):");
console.error("    npm run rebuild");
console.error("    npm run start");
console.error("");
console.error("  Sviluppo (next dev) — se vedi ENOENT su fallback-build-manifest o _document.js:");
console.error("    npm run dev:fresh");
console.error("    Attendi nel terminale \"Ready\" / compilazione prima di aprire il browser.");
console.error("");
console.error("  Se compare MODULE_NOT_FOUND './611.js' da webpack-runtime:");
console.error("    npm run clean && npm run build");
console.error("    (non mischiare next dev e next start sulla stessa .next senza rebuild)");
console.error("");
console.error("  Chiudi tutti i process node su questa cartella prima di clean.");
console.error("");
process.exit(1);
