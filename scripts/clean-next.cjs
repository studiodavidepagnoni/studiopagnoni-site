/* eslint-disable no-console */
/**
 * Rimuove output Next e cache dei bundler.
 * Build interrotte o cartelle su Desktop/OneDrive possono lasciare .next incoerente
 * (es. webpack-runtime che cerca ./611.js invece di ./chunks/611.js → MODULE_NOT_FOUND).
 */
const fs = require("node:fs");
const path = require("node:path");

function rm(p) {
  try {
    fs.rmSync(p, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}

const root = process.cwd();
rm(path.join(root, ".next"));
rm(path.join(root, "node_modules", ".cache"));
rm(path.join(root, ".turbo"));

console.log("[clean-next] Rimossi .next/, node_modules/.cache/, .turbo/ (se presenti).");
