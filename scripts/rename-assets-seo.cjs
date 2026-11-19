/**
 * Rinomina asset usati con nomi SEO-friendly ed elimina file non referenziati.
 * Esegui: node scripts/rename-assets-seo.cjs
 * Poi: npm run sync:static && npm run build:static:fast
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");

/** [oldRelative, newRelative] — entrambi sotto assets/ */
const RENAMES = [
  // Hero video + poster
  ["rs10-hero.mp4", "laser-slam-rs10-allevamento-brescia.mp4"],
  ["rs10-hero.webm", "laser-slam-rs10-allevamento-brescia.webm"],
  ["rs10-hero-poster.webp", "laser-slam-rs10-allevamento-brescia-poster.webp"],
  ["rs10-hero-poster.jpg", "laser-slam-rs10-allevamento-brescia-poster.jpg"],
  ["hero-video-2.mp4", "nuvola-punti-rilievo-slam-brescia.mp4"],
  ["hero-video-2.webm", "nuvola-punti-rilievo-slam-brescia.webm"],
  ["hero-video-2-poster.webp", "nuvola-punti-rilievo-slam-brescia-poster.webp"],
  ["hero-video-3.mp4", "rilievo-laser-slam-interni-brescia.mp4"],
  ["hero-video-3.webm", "rilievo-laser-slam-interni-brescia.webm"],
  ["hero-video-3-poster.webp", "rilievo-laser-slam-interni-brescia-poster.webp"],
  ["hero-video-3-poster-lcp.webp", "rilievo-laser-slam-interni-brescia-poster-lcp.webp"],
  ["hero-video-3-poster-lcp.avif", "rilievo-laser-slam-interni-brescia-poster-lcp.avif"],
  // Stock
  ["site/chi-siamo-slam-hero.webp", "site/rilievo-laser-slam-operatore-brescia.webp"],
  ["site/pointcloud-data.webp", "site/nuvola-punti-rilievo-laser-scanner.webp"],
  ["site/handheld-slam-road.webp", "site/rilievo-slam-handheld-franciacorta.webp"],
  ["site/survey-site.webp", "site/rilievo-topografico-cantiere-brescia.webp"],
  ["site/gnss-rtk-quarry.webp", "site/gnss-rtk-rilievo-estrattivo-brescia.webp"],
  ["site/topographic-plan.webp", "site/piano-topografico-curve-livello-brescia.webp"],
  ["site/technical-docs.webp", "site/documentazione-tecnica-studio-pagnoni.webp"],
  ["site/total-station-field.webp", "site/stazione-totale-rilievo-cantiere-brescia.webp"],
  // Progetti — directory + file
  ["projects/appianti/appiani.webp", "projects/allevamento-slam-appianti-brescia/allevamento-slam-appianti-brescia.webp"],
  ["projects/appianti/appiani-w480.webp", "projects/allevamento-slam-appianti-brescia/allevamento-slam-appianti-brescia-w480.webp"],
  ["projects/appianti/appiani-w960.webp", "projects/allevamento-slam-appianti-brescia/allevamento-slam-appianti-brescia-w960.webp"],
  ["projects/appianti/appiani-registrazione.mp4", "projects/allevamento-slam-appianti-brescia/allevamento-slam-appianti-brescia-video.mp4"],
  ["projects/appianti/appiani-registrazione.webm", "projects/allevamento-slam-appianti-brescia/allevamento-slam-appianti-brescia-video.webm"],
  ["projects/azienda-vinicola/azienda-vinicola.webp", "projects/cantina-franciacorta-rilievo-slam/cantina-franciacorta-rilievo-slam.webp"],
  ["projects/azienda-vinicola/azienda-vinicola-w480.webp", "projects/cantina-franciacorta-rilievo-slam/cantina-franciacorta-rilievo-slam-w480.webp"],
  ["projects/azienda-vinicola/azienda-vinicola-w960.webp", "projects/cantina-franciacorta-rilievo-slam/cantina-franciacorta-rilievo-slam-w960.webp"],
  ["projects/azienda-vinicola/azienda-vinicola.cropped.mp4", "projects/cantina-franciacorta-rilievo-slam/cantina-franciacorta-rilievo-slam-video.mp4"],
  ["projects/azienda-vinicola/azienda-vinicola.cropped.webm", "projects/cantina-franciacorta-rilievo-slam/cantina-franciacorta-rilievo-slam-video.webm"],
  ["projects/terreno/terreno.webp", "projects/terreno-erbusco-rilievo-slam-brescia/terreno-erbusco-rilievo-slam-brescia.webp"],
  ["projects/terreno/terreno-w480.webp", "projects/terreno-erbusco-rilievo-slam-brescia/terreno-erbusco-rilievo-slam-brescia-w480.webp"],
  ["projects/terreno/terreno-w960.webp", "projects/terreno-erbusco-rilievo-slam-brescia/terreno-erbusco-rilievo-slam-brescia-w960.webp"],
  ["projects/terreno/terreno.mp4", "projects/terreno-erbusco-rilievo-slam-brescia/terreno-erbusco-rilievo-slam-brescia-video.mp4"],
  ["projects/terreno/terreno.webm", "projects/terreno-erbusco-rilievo-slam-brescia/terreno-erbusco-rilievo-slam-brescia-video.webm"],
];

const DELETE_REL = [
  "site/analysis-dashboard.webp",
  "site/design-drawings.webp",
  "site/gnss-rover-worker.webp",
  "site/survey-instrument-field.webp",
  "site/topography-tool.webp",
  "projects/appianti/appiani.png",
  "projects/azienda-vinicola/azienda-vinicola.jpg",
  "projects/azienda-vinicola/azienda-vinicola.png",
  "projects/azienda-vinicola/azienda-vinicola.mp4",
  "projects/azienda-vinicola/azienda-vinicola.webm",
  "projects/terreno/terreno.png",
];

function rm(rel) {
  const full = path.join(assetsDir, rel);
  if (!fs.existsSync(full)) return;
  fs.rmSync(full, { force: true });
  console.log(`[rename-assets-seo] Eliminato ${rel}`);
}

function rmCropDebug(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      rmCropDebug(full);
      continue;
    }
    if (/^_crop-check/i.test(ent.name)) rm(path.relative(assetsDir, full));
  }
}

function move(oldRel, newRel) {
  const from = path.join(assetsDir, oldRel);
  const to = path.join(assetsDir, newRel);
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  if (fs.existsSync(to)) fs.rmSync(to, { force: true });
  fs.renameSync(from, to);
  console.log(`[rename-assets-seo] ${oldRel} → ${newRel}`);
}

function rmdirIfEmpty(dir) {
  if (!fs.existsSync(dir)) return;
  if (fs.readdirSync(dir).length === 0) {
    fs.rmdirSync(dir);
    console.log(`[rename-assets-seo] Cartella vuota rimossa ${path.relative(assetsDir, dir)}`);
  }
}

function main() {
  if (!fs.existsSync(assetsDir)) {
    console.error("assets/ assente");
    process.exit(1);
  }

  rmCropDebug(assetsDir);

  for (const rel of DELETE_REL) rm(rel);

  for (const [oldRel, newRel] of RENAMES) move(oldRel, newRel);

  for (const legacy of ["projects/appianti", "projects/azienda-vinicola", "projects/terreno"]) {
    rmdirIfEmpty(path.join(assetsDir, legacy));
  }

  // JPEG stock orfani (se presenti)
  const stockDir = path.join(assetsDir, "site");
  if (fs.existsSync(stockDir)) {
    for (const ent of fs.readdirSync(stockDir)) {
      if (!/\.jpe?g$/i.test(ent)) continue;
      const webp = path.join(stockDir, ent.replace(/\.jpe?g$/i, ".webp"));
      if (fs.existsSync(webp)) rm(path.join("site", ent));
    }
  }

  console.log("\n[rename-assets-seo] Completato. Esegui: npm run sync:static");
}

main();
