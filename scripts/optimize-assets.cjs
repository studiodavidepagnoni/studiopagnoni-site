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
const projectsDir = path.join(assetsDir, "projects");

const WEBP_QUALITY = 80;
const LCP_POSTER_W = 768;
const LCP_POSTER_QUALITY = 68;
const LCP_AVIF_QUALITY = 48;
const MAX_EDGE = 1920;
const HERO_LCP_POSTER = "hero-video-3-poster.webp";
const VIDEO_CRF = 30;
const VIDEO_PRESET = "medium";
const VIDEO_MAX_MB = 8;
const WEBM_CRF = 38;
/** Loop hero: taglia clip oltre questa durata (secondi) — stesso effetto in carousel. */
const VIDEO_MAX_DURATION_SEC = 18;
const VIDEO_CRF_BY_NAME = {
  "rs10-hero.mp4": 32,
  "hero-video-2.mp4": 35,
};
/** Sotto questa soglia (MB) il video viene ricodificato. */
const VIDEO_TARGET_MB_BY_NAME = {
  "hero-video-2.mp4": 2.5,
};
const VIDEO_MAX_DURATION_BY_NAME = {
  "hero-video-2.mp4": 14,
};
const HERO_LITE_W = 1280;
const HERO_LITE_H = 864;
const liteCrop = `scale=${HERO_LITE_W}:${HERO_LITE_H}:force_original_aspect_ratio=increase,crop=${HERO_LITE_W}:${HERO_LITE_H}`;

const HERO_VIDEOS = ["rs10-hero.mp4", "hero-video-2.mp4", "hero-video-3.mp4"];

function listProjectMp4s() {
  if (!fs.existsSync(projectsDir)) return [];
  const out = [];
  const stack = [projectsDir];
  while (stack.length) {
    const dir = stack.pop();
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) stack.push(full);
      else if (ent.isFile() && /\.mp4$/i.test(ent.name)) out.push(full);
    }
  }
  return out;
}

function encodeProjectMp4(input, tmpOut) {
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    // Mantieni aspect ratio, riduci a max 1280px in larghezza.
    '-vf "scale=1280:-2:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"',
    "-an",
    `-c:v libx264 -preset ${VIDEO_PRESET} -crf ${VIDEO_CRF}`,
    "-pix_fmt yuv420p",
    "-movflags +faststart",
    `"${tmpOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

function encodeProjectWebm(input, webmOut) {
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    '-vf "scale=1280:-2:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2"',
    "-an",
    `-c:v libvpx-vp9 -crf ${WEBM_CRF} -b:v 0 -row-mt 1 -deadline good -cpu-used 2`,
    "-pix_fmt yuv420p",
    `"${webmOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

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
  const name = path.basename(filePath);
  const mb = fs.statSync(filePath).size / (1024 * 1024);
  const targetMb = VIDEO_TARGET_MB_BY_NAME[name];
  if (targetMb && mb > targetMb) return true;
  if (mb > VIDEO_MAX_MB) return true;
  const webm = filePath.replace(/\.mp4$/i, ".webm");
  if (!fs.existsSync(webm)) return true;
  if (process.env.FORCE_VIDEO === "1") return true;
  if (process.env.FORCE_VIDEO_NAME && process.env.FORCE_VIDEO_NAME === name) return true;
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
  const pipeline = sharp(webpPath).resize(LCP_POSTER_W, null, { withoutEnlargement: true, fit: "inside" });
  await pipeline.clone().webp({ quality: LCP_POSTER_QUALITY, effort: 4 }).toFile(lcpPath);
  const lcpAvifPath = lcpPath.replace(/\.webp$/i, ".avif");
  await pipeline.clone().avif({ quality: LCP_AVIF_QUALITY, effort: 4 }).toFile(lcpAvifPath);
  const kb = Math.round(fs.statSync(lcpPath).size / 1024);
  const avifKb = Math.round(fs.statSync(lcpAvifPath).size / 1024);
  console.log(`[optimize-assets] Poster LCP ${path.relative(root, lcpPath)} (${kb} KB)`);
  console.log(`[optimize-assets] Poster LCP AVIF ${path.relative(root, lcpAvifPath)} (${avifKb} KB)`);
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

function encodeMp4(input, tmpOut, fileName) {
  const crf = VIDEO_CRF_BY_NAME[fileName] ?? VIDEO_CRF;
  const maxDuration = VIDEO_MAX_DURATION_BY_NAME[fileName] ?? VIDEO_MAX_DURATION_SEC;
  const duration = maxDuration > 0 ? `-t ${maxDuration}` : "";
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    duration,
    `-vf "${liteCrop}"`,
    "-an",
    `-c:v libx264 -preset ${VIDEO_PRESET} -crf ${crf}`,
    "-pix_fmt yuv420p",
    "-movflags +faststart",
    `"${tmpOut}"`,
  ]
    .filter(Boolean)
    .join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

function encodeWebm(input, webmOut) {
  const cmd = [
    "ffmpeg -y -nostdin -hide_banner",
    `-i "${input}"`,
    `-vf "${liteCrop}"`,
    "-an",
    `-c:v libvpx-vp9 -crf ${WEBM_CRF} -b:v 0 -row-mt 1 -deadline good -cpu-used 2`,
    "-pix_fmt yuv420p",
    `"${webmOut}"`,
  ].join(" ");
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

/** WebM più pesante del MP4 non va servito (il browser scaricherebbe di più). */
function pruneOversizedWebm() {
  for (const name of HERO_VIDEOS) {
    const mp4 = path.join(assetsDir, name);
    const webm = mp4.replace(/\.mp4$/i, ".webm");
    if (!fs.existsSync(mp4) || !fs.existsSync(webm)) continue;
    if (fs.statSync(webm).size <= fs.statSync(mp4).size) continue;
    fs.unlinkSync(webm);
    console.log(
      `[optimize-assets] Rimosso WebM più pesante del MP4: ${path.basename(webm)}`,
    );
  }
}

/** Poster serviti solo come WebP in produzione. */
function prunePosterJpgs() {
  for (const name of HERO_VIDEOS) {
    const jpg = path.join(assetsDir, name.replace(/\.mp4$/i, "-poster.jpg"));
    const webp = jpg.replace(/\.jpe?g$/i, ".webp");
    if (!fs.existsSync(jpg) || !fs.existsSync(webp)) continue;
    fs.unlinkSync(jpg);
    console.log(`[optimize-assets] Rimosso poster JPG: ${path.basename(jpg)}`);
  }
}

function writeVideoManifest() {
  const manifest = {};
  for (const name of HERO_VIDEOS) {
    const base = name.replace(/\.mp4$/i, "");
    const mp4 = path.join(assetsDir, name);
    const webm = mp4.replace(/\.mp4$/i, ".webm");
    const mp4Bytes = fs.existsSync(mp4) ? fs.statSync(mp4).size : 0;
    const webmBytes = fs.existsSync(webm) ? fs.statSync(webm).size : 0;
    const order = [];
    if (webmBytes > 0 && webmBytes < mp4Bytes) order.push("webm");
    if (mp4Bytes > 0) order.push("mp4");
    if (!order.length) order.push("mp4");
    manifest[base] = { order, mp4Bytes, webmBytes };
  }
  const out = path.join(root, "lib", "media", "heroVideoManifest.json");
  fs.writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`[optimize-assets] Manifest ${path.relative(root, out)}`);
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
    if (process.env.FORCE_VIDEO_NAME && process.env.FORCE_VIDEO_NAME !== name) continue;
    const mp4 = path.join(assetsDir, name);
    if (!fs.existsSync(mp4)) continue;
    const webm = mp4.replace(/\.mp4$/i, ".webm");
    const tmpMp4 = path.join(assetsDir, `.${name}.opt.mp4`);

    if (!videoNeedsWork(mp4)) {
      console.log(`[optimize-assets] Video OK: ${name}`);
      continue;
    }

    try {
      encodeMp4(mp4, tmpMp4, name);
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

  // Video progetti (assets/projects/**): MP4 ridotto + WebM, senza crop.
  for (const inputMp4 of listProjectMp4s()) {
    const name = path.basename(inputMp4);
    const webm = inputMp4.replace(/\.mp4$/i, ".webm");
    const tmpMp4 = inputMp4.replace(/\.mp4$/i, ".opt.mp4");

    if (!videoNeedsWork(inputMp4)) {
      console.log(`[optimize-assets] Video OK: ${path.relative(root, inputMp4)}`);
      continue;
    }

    try {
      encodeProjectMp4(inputMp4, tmpMp4);
      fs.renameSync(tmpMp4, inputMp4);
      const mb = (fs.statSync(inputMp4).size / (1024 * 1024)).toFixed(2);
      console.log(`[optimize-assets] ${path.relative(root, inputMp4)} → ${mb} MB`);

      encodeProjectWebm(inputMp4, webm);
      const wmb = (fs.statSync(webm).size / (1024 * 1024)).toFixed(2);
      console.log(`[optimize-assets] ${path.relative(root, webm)} → ${wmb} MB`);
    } catch (err) {
      if (fs.existsSync(tmpMp4)) fs.unlinkSync(tmpMp4);
      console.warn(`[optimize-assets] Video fallito ${path.relative(root, inputMp4)}: ${err.message}`);
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
  pruneOversizedWebm();
  prunePosterJpgs();
  writeVideoManifest();
  console.log("\n[optimize-assets] Completato. Esegui: npm run sync:static");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
