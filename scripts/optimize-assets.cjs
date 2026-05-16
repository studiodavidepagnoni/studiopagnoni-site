/**
 * Ottimizza immagini (WebP), poster hero (WebP), video (MP4 1280 + WebM).
 * Rimuove JPEG stock duplicati se esiste WebP equivalente.
 *
 * Uso: node scripts/optimize-assets.cjs
 * FORCE_VIDEO=1 — ricodifica tutti i video
 * SKIP_VIDEO=1 — salta video
 * KEEP_JPEG=1 — non elimina i JPEG stock dopo WebP
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const stockDir = path.join(assetsDir, "stock");

const WEBP_QUALITY = 80;
const LCP_POSTER_W = 960;
const LCP_POSTER_QUALITY = 72;
const MAX_EDGE = 1920;
const HERO_LCP_POSTER = "hero-video-3-poster.webp";
const VIDEO_CRF = 30;
const VIDEO_PRESET = "medium";
const VIDEO_MAX_MB = 8;
const HERO_LITE_W = 1280;
const HERO_LITE_H = 864;
const liteCrop = `scale=${HERO_LITE_W}:${HERO_LITE_H}:force_original_aspect_ratio=increase,crop=${HERO_LITE_W}:${HERO_LITE_H}`;

const HERO_VIDEOS = ["rs10-hero.mp4", "hero-video-2.mp4", "hero-video-3.mp4"];

function hasFfmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function isNewer(src, dest) {
  if (!fs.existsSync(dest)) return true;
  return fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs;
}

function videoNeedsWork(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const mb = fs.statSync(filePath).size / (1024 * 1024);
  if (mb > VIDEO_MAX_MB) return true;
  const webm = filePath.replace(/\.mp4$/i, ".webm");
  if (!fs.existsSync(webm)) return true;
  if (process.env.FORCE_VIDEO === "1") return true;
  return isNewer(filePath, webm);
}

function cleanOrphans(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!ent.isFile()) continue;
    if (/\.opt\.mp4$/i.test(ent.name) || /\.frame-\d+\.jpg$/i.test(ent.name)) {
      fs.unlinkSync(path.join(dir, ent.name));
      console.log(`[optimize-assets] Rimosso ${path.relative(root, path.join(dir, ent.name))}`);
    }
  }
}

async function posterToWebp(jpgPath) {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    return;
  }
  const webpPath = jpgPath.replace(/\.jpe?g$/i, ".webp");
  if (!fs.existsSync(jpgPath)) return;
  await sharp(jpgPath).rotate().webp({ quality: 82, effort: 4 }).toFile(webpPath);
  const kb = Math.round(fs.statSync(webpPath).size / 1024);
  console.log(`[optimize-assets] Poster WebP ${path.relative(root, webpPath)} (${kb} KB)`);
  await posterToLcp(webpPath);
}

/** Poster leggero per LCP hero (prima slide). */
async function posterToLcp(webpPath) {
  if (path.basename(webpPath) !== HERO_LCP_POSTER) return;
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    return;
  }
  if (!fs.existsSync(webpPath)) return;
  const lcpPath = webpPath.replace(/\.webp$/i, "-lcp.webp");
  await sharp(webpPath)
    .resize(LCP_POSTER_W, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: LCP_POSTER_QUALITY, effort: 4 })
    .toFile(lcpPath);
  const kb = Math.round(fs.statSync(lcpPath).size / 1024);
  console.log(`[optimize-assets] Poster LCP ${path.relative(root, lcpPath)} (${kb} KB)`);
}

/** Poster da video: frame sequenza + rename (ffmpeg 8 / Windows). */
function extractPosterJpg(videoPath, posterPath) {
  const dir = path.dirname(posterPath);
  const stem = path.basename(posterPath, ".jpg");
  const framePattern = path.join(dir, `${stem}.frame-%03d.jpg`);
  const frame001 = path.join(dir, `${stem}.frame-001.jpg`);

  for (const ent of fs.readdirSync(dir)) {
    if (ent.startsWith(`${stem}.frame-`) && ent.endsWith(".jpg")) {
      fs.unlinkSync(path.join(dir, ent));
    }
  }
  if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);

  const cmd = [
    "ffmpeg -y -nostdin -hide_banner -loglevel warning",
    `-ss 2 -i "${videoPath}"`,
    "-frames:v 1 -q:v 3",
    `-f image2 "${framePattern}"`,
  ].join(" ");
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });

  if (!fs.existsSync(frame001)) throw new Error(`poster frame assente: ${frame001}`);
  fs.renameSync(frame001, posterPath);
  for (const ent of fs.readdirSync(dir)) {
    if (ent.startsWith(`${stem}.frame-`) && ent.endsWith(".jpg")) {
      fs.unlinkSync(path.join(dir, ent));
    }
  }
}

function encodeMp4(input, tmpOut) {
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    `-vf "${liteCrop}"`,
    "-an",
    `-c:v libx264 -preset ${VIDEO_PRESET} -crf ${VIDEO_CRF}`,
    "-pix_fmt yuv420p",
    "-movflags +faststart",
    `"${tmpOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

function encodeWebm(input, webmOut) {
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    `-vf "${liteCrop}"`,
    "-an",
    "-c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1",
    "-pix_fmt yuv420p",
    `"${webmOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

async function optimizeImages() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.warn("[optimize-assets] sharp non disponibile, skip immagini.");
    return;
  }

  const dirs = [stockDir, assetsDir].filter((d) => fs.existsSync(d));
  const seen = new Set();

  for (const dir of dirs) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isFile()) continue;
      if (!/\.(jpe?g|png)$/i.test(ent.name)) continue;
      if (/-poster\.(jpe?g|png)$/i.test(ent.name)) continue;
      const input = path.join(dir, ent.name);
      if (seen.has(input)) continue;
      seen.add(input);

      const base = ent.name.replace(/\.(jpe?g|png)$/i, "");
      const webpOut = path.join(dir, `${base}.webp`);

      try {
        let pipeline = sharp(input).rotate();
        const meta = await pipeline.metadata();
        if (meta.width && meta.width > MAX_EDGE) {
          pipeline = pipeline.resize({ width: MAX_EDGE, withoutEnlargement: true });
        }
        if (isNewer(input, webpOut)) {
          await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(webpOut);
          const kb = Math.round(fs.statSync(webpOut).size / 1024);
          console.log(`[optimize-assets] WebP ${path.relative(root, webpOut)} (${kb} KB)`);
        }
      } catch (err) {
        console.warn(`[optimize-assets] Skip ${path.relative(root, input)}: ${err.message}`);
      }
    }
  }
}

function pruneDuplicateJpegs() {
  if (process.env.KEEP_JPEG === "1") {
    console.log("[optimize-assets] KEEP_JPEG=1 — JPEG stock conservati.");
    return;
  }
  const dirs = [stockDir, assetsDir].filter((d) => fs.existsSync(d));
  for (const dir of dirs) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isFile() || !/\.jpe?g$/i.test(ent.name)) continue;
      if (/-poster\.jpe?g$/i.test(ent.name)) continue;
      const jpg = path.join(dir, ent.name);
      const webp = path.join(dir, ent.name.replace(/\.jpe?g$/i, ".webp"));
      if (!fs.existsSync(webp)) continue;
      if (fs.statSync(webp).size >= fs.statSync(jpg).size) continue;
      fs.unlinkSync(jpg);
      console.log(`[optimize-assets] Rimosso duplicato ${path.relative(root, jpg)}`);
    }
  }
}

async function optimizeVideos() {
  if (process.env.POSTERS_ONLY === "1") {
    if (!hasFfmpeg()) return;
    for (const name of HERO_VIDEOS) {
      const mp4 = path.join(assetsDir, name);
      if (!fs.existsSync(mp4)) continue;
      const posterJpg = mp4.replace(/\.mp4$/i, "-poster.jpg");
      try {
        extractPosterJpg(mp4, posterJpg);
        await posterToWebp(posterJpg);
      } catch (err) {
        console.warn(`[optimize-assets] Poster ${name}: ${err.message}`);
      }
    }
    return;
  }

  if (process.env.SKIP_VIDEO === "1") {
    console.log("[optimize-assets] SKIP_VIDEO=1, video ignorati.");
    return;
  }
  if (!hasFfmpeg()) {
    console.warn("[optimize-assets] ffmpeg assente: salto video.");
    return;
  }

  for (const name of HERO_VIDEOS) {
    const mp4 = path.join(assetsDir, name);
    if (!fs.existsSync(mp4)) continue;
    const webm = mp4.replace(/\.mp4$/i, ".webm");
    const tmpMp4 = path.join(assetsDir, `.${name}.opt.mp4`);

    if (!videoNeedsWork(mp4)) {
      console.log(`[optimize-assets] Video OK: ${name}`);
      continue;
    }

    try {
      encodeMp4(mp4, tmpMp4);
      fs.renameSync(tmpMp4, mp4);
      const mb = (fs.statSync(mp4).size / (1024 * 1024)).toFixed(2);
      console.log(`[optimize-assets] ${name} → ${mb} MB`);

      encodeWebm(mp4, webm);
      const wmb = (fs.statSync(webm).size / (1024 * 1024)).toFixed(2);
      console.log(`[optimize-assets] ${path.basename(webm)} → ${wmb} MB`);

      const posterJpg = mp4.replace(/\.mp4$/i, "-poster.jpg");
      try {
        extractPosterJpg(mp4, posterJpg);
        await posterToWebp(posterJpg);
      } catch (posterErr) {
        console.warn(`[optimize-assets] Poster ${name}: ${posterErr.message}`);
      }
    } catch (err) {
      if (fs.existsSync(tmpMp4)) fs.unlinkSync(tmpMp4);
      console.warn(`[optimize-assets] Video fallito ${name}: ${err.message}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    console.warn("[optimize-assets] Cartella assets/ assente.");
    return;
  }
  cleanOrphans(assetsDir);
  cleanOrphans(stockDir);
  await optimizeImages();
  pruneDuplicateJpegs();
  await optimizeVideos();
  console.log("\n[optimize-assets] Completato. Esegui: npm run sync:static");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
