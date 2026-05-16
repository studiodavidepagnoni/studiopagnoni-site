/**
 * Elabora video grezzi per hero (object-cover → crop centrato 1920×1294 come rs10-hero).
 *
 * Uso: node scripts/process-hero-videos.cjs
 * Richiede ffmpeg in PATH.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const rawDir = path.join(root, "documentazione", "grezza");
const assetsDir = path.join(root, "assets");

/** Stesso aspect ratio di rs10-hero.mp4 (1920×1294). */
const HERO_W = 1920;
const HERO_H = 1294;

/** Crop tipo object-cover: scala per riempire, poi taglio centrato. */
const coverCrop = `scale=${HERO_W}:${HERO_H}:force_original_aspect_ratio=increase,crop=${HERO_W}:${HERO_H}`;

const jobs = [
  {
    id: "hero-video-2",
    input: path.join(rawDir, "video2.mp4"),
    posterSec: 4,
    startSec: 2,
    maxDuration: 24,
    /** Nuvola a destra — lascia respiro per testi a sinistra. */
    objectPosition: "68% center",
    note: "Point cloud 3D — crop full frame, soggetto spostato a destra",
  },
  {
    id: "hero-video-3",
    input: path.join(rawDir, "video3.mp4"),
    posterSec: 6,
    startSec: 1,
    maxDuration: 20,
    objectPosition: "center center",
    note: "SLAM indoor — rotazione EXIF/displaymatrix automatica",
  },
];

function run(cmd) {
  console.log(`\n> ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root });
}

function probeDuration(file) {
  const out = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${file}"`,
    { encoding: "utf8" },
  ).trim();
  return parseFloat(out, 10);
}

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

for (const job of jobs) {
  if (!fs.existsSync(job.input)) {
    console.warn(`[skip] File assente: ${job.input}`);
    continue;
  }

  const outMp4 = path.join(assetsDir, `${job.id}.mp4`);
  const outPoster = path.join(assetsDir, `${job.id}-poster.jpg`);
  const dur = probeDuration(job.input);
  const clipDur = Math.min(job.maxDuration, Math.max(1, dur - job.startSec));

  console.log(`\n=== ${job.id} ===`);
  console.log(`  ${job.note}`);
  console.log(`  sorgente: ${(dur).toFixed(1)}s → clip ${clipDur.toFixed(1)}s da ${job.startSec}s`);

  run(
    `ffmpeg -y -ss ${job.startSec} -i "${job.input}" -t ${clipDur} -an -vf "${coverCrop}" -c:v libx264 -preset medium -crf 28 -pix_fmt yuv420p -movflags +faststart "${outMp4}"`,
  );

  run(
    `ffmpeg -y -ss ${job.posterSec} -i "${outMp4}" -frames:v 1 -q:v 3 "${outPoster}"`,
  );
}

console.log("\n[process-hero-videos] Fatto. Esegui: npm run sync:static");
