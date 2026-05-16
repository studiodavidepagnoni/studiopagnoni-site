/**
 * Ottimizza immagini (WebP + JPEG ricompressi) e video hero (ffmpeg, CRF 28).
 * Scrive in assets/; sync-static copia in public/ al build.
 *
 * Uso: node scripts/optimize-assets.cjs
 * Skip video: SKIP_VIDEO=1 node scripts/optimize-assets.cjs
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "assets");
const stockDir = path.join(assetsDir, "stock");

const WEBP_QUALITY = 82;
const JPEG_QUALITY = 82;
const MAX_EDGE = 1920;
const VIDEO_CRF = 28;
const VIDEO_PRESET = "medium";
const VIDEO_MAX_MB = 14;
const HERO_W = 1920;
const HERO_H = 1294;
const coverCrop = `scale=${HERO_W}:${HERO_H}:force_original_aspect_ratio=increase,crop=${HERO_W}:${HERO_H}`;

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

function videoNeedsReencode(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const mb = fs.statSync(filePath).size / (1024 * 1024);
  return mb > VIDEO_MAX_MB;
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
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (!ent.isFile()) continue;
      if (!/\.(jpe?g|png)$/i.test(ent.name)) continue;
      const input = path.join(dir, ent.name);
      if (seen.has(input)) continue;
      seen.add(input);

      const base = ent.name.replace(/\.(jpe?g|png)$/i, "");
      const webpOut = path.join(dir, `${base}.webp`);
      const isJpeg = /\.jpe?g$/i.test(ent.name);

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

        const jpegLarge = isJpeg && fs.statSync(input).size > 500_000;
        if (isJpeg && (jpegLarge || isNewer(input, webpOut))) {
          const tmp = `${input}.opt.tmp`;
          await pipeline.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp);
          fs.renameSync(tmp, input);
          const kb = Math.round(fs.statSync(input).size / 1024);
          console.log(`[optimize-assets] JPEG ${path.relative(root, input)} (${kb} KB)`);
        }
      } catch (err) {
        console.warn(`[optimize-assets] Skip ${path.relative(root, input)}: ${err.message}`);
      }
    }
  }
}

/** Poster da video: su Windows/ffmpeg 8 il muxer image2 su file singolo fallisce spesso → frame sequenza + rename. */
function extractPoster(videoPath, posterPath) {
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

  if (!fs.existsSync(frame001)) {
    throw new Error(`frame poster non generato: ${frame001}`);
  }
  fs.renameSync(frame001, posterPath);
  for (const ent of fs.readdirSync(dir)) {
    if (ent.startsWith(`${stem}.frame-`) && ent.endsWith(".jpg")) {
      fs.unlinkSync(path.join(dir, ent));
    }
  }
}

function reencodeVideo(input, tmpOut) {
  const inputMb = fs.statSync(input).size / (1024 * 1024);
  /** Sorgenti molto pesanti: 1280px riduce drasticamente il peso senza perdere leggibilità su hero full-bleed. */
  const vf =
    inputMb > 22
      ? `scale=1280:864:force_original_aspect_ratio=increase,crop=1280:864`
      : coverCrop;
  const cmd = [
    "ffmpeg -y",
    `-i "${input}"`,
    `-vf "${vf}"`,
    "-an",
    `-c:v libx264 -preset ${VIDEO_PRESET} -crf ${VIDEO_CRF}`,
    "-pix_fmt yuv420p",
    "-movflags +faststart",
    `"${tmpOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

function optimizePostersOnly() {
  if (!hasFfmpeg()) return;
  const names = ["rs10-hero.mp4", "hero-video-2.mp4", "hero-video-3.mp4"];
  for (const name of names) {
    const out = path.join(assetsDir, name);
    if (!fs.existsSync(out)) continue;
    const poster = out.replace(/\.mp4$/i, "-poster.jpg");
    try {
      extractPoster(out, poster);
      console.log(`[optimize-assets] Poster ${path.basename(poster)}`);
    } catch (err) {
      console.warn(`[optimize-assets] Poster fallito ${name}: ${err.message}`);
    }
  }
}

function optimizeVideos() {
  if (process.env.POSTERS_ONLY === "1") {
    console.log("[optimize-assets] POSTERS_ONLY=1 — solo poster.");
    optimizePostersOnly();
    return;
  }
  if (process.env.SKIP_VIDEO === "1") {
    console.log("[optimize-assets] SKIP_VIDEO=1, video ignorati.");
    return;
  }
  if (!hasFfmpeg()) {
    console.warn("[optimize-assets] ffmpeg assente: salto ricodifica video.");
    return;
  }

  const names = ["rs10-hero.mp4", "hero-video-2.mp4", "hero-video-3.mp4"];

  for (const name of names) {
    const out = path.join(assetsDir, name);
    if (!fs.existsSync(out)) continue;
    if (!videoNeedsReencode(out) && process.env.FORCE_VIDEO !== "1") {
      console.log(`[optimize-assets] Video OK (≤${VIDEO_MAX_MB} MB): ${name}`);
      continue;
    }

    const tmp = path.join(assetsDir, `.${name}.opt.mp4`);
    try {
      reencodeVideo(out, tmp);
      fs.renameSync(tmp, out);
      const mb = (fs.statSync(out).size / (1024 * 1024)).toFixed(2);
      console.log(`[optimize-assets] ${name} → ${mb} MB`);
      const poster = out.replace(/\.mp4$/i, "-poster.jpg");
      try {
        extractPoster(out, poster);
        console.log(`[optimize-assets] Poster ${path.basename(poster)}`);
      } catch (posterErr) {
        console.warn(`[optimize-assets] Poster non aggiornato per ${name}: ${posterErr.message}`);
      }
    } catch (err) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.warn(`[optimize-assets] Video fallito ${name}: ${err.message}`);
    }
  }
}

async function main() {
  if (!fs.existsSync(assetsDir)) {
    console.warn("[optimize-assets] Cartella assets/ assente.");
    return;
  }
  await optimizeImages();
  optimizeVideos();
  console.log("\n[optimize-assets] Completato. Esegui: npm run sync:static");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
