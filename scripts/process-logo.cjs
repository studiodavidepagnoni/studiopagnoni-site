/* eslint-disable no-console */
/**
 * Processa logo.jpeg → asset logo con sfondo trasparente.
 * La sorgente è un lockup orizzontale (icona + «STUDIO PAGNONI» + tagline) su bianco.
 *
 * Output:
 *   - public/logo-lockup.png  lockup completo, bg trasparente (scuri → bianco per chrome scuro)
 *   - public/logo-lockup.svg  wrapper SVG aspect-ratio nativo
 *   - public/logo-mark.png    solo icona, recolorata teal (favicon / mark su sezioni chiare)
 *   - public/logo-mark.svg    wrapper SVG quadrato dell'icona
 *   - public/icon.svg         favicon
 */
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const sharp = (await import("sharp")).default;

  const root = path.resolve(__dirname, "..");
  const inputPath = path.join(root, "logo.jpeg");
  const outLockupPng = path.join(root, "public", "logo-lockup.png");
  const outLockupSvg = path.join(root, "public", "logo-lockup.svg");
  const outMarkPng = path.join(root, "public", "logo-mark.png");
  const outMarkSvg = path.join(root, "public", "logo-mark.svg");
  const outIconSvg = path.join(root, "public", "icon.svg");

  const SITE_TEAL = { r: 14, g: 63, b: 55 }; // #0e3f37
  const ICON_BG = "#ebeae4";
  const ICON_INK = { r: 5, g: 30, b: 27 }; // #051e1b

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Manca ${path.relative(root, inputPath)} — necessario per rigenerare gli asset.`);
  }

  const { lockupBuffer, markBuffer, lockupMeta, markMeta } = await processSource({
    sharp,
    inputPath,
    outLockupPng,
    outMarkPng,
    SITE_TEAL,
  });

  await writeSvgWrappers({
    sharp,
    lockupBuffer,
    lockupMeta,
    markBuffer,
    markMeta,
    outLockupSvg,
    outMarkSvg,
    outIconSvg,
    root,
    iconBg: ICON_BG,
    iconInk: ICON_INK,
  });
}

function sampleBackground(data, width, height) {
  const corners = [
    [2, 2],
    [width - 3, 2],
    [2, height - 3],
    [width - 3, height - 3],
    [12, 12],
    [width - 13, 12],
    [12, height - 13],
    [width - 13, height - 13],
    [Math.floor(width / 2), 4],
    [Math.floor(width / 2), height - 5],
    [4, Math.floor(height / 2)],
    [width - 5, Math.floor(height / 2)],
  ];
  let bgR = 0;
  let bgG = 0;
  let bgB = 0;
  for (const [x, y] of corners) {
    const i = (y * width + x) * 4;
    bgR += data[i];
    bgG += data[i + 1];
    bgB += data[i + 2];
  }
  return { bgR: bgR / corners.length, bgG: bgG / corners.length, bgB: bgB / corners.length };
}

function findIconCropRight(alphaBuf, width, height) {
  const colDensity = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    let n = 0;
    for (let y = 0; y < height; y++) {
      if (alphaBuf[(y * width + x) * 4 + 3] > 12) n++;
    }
    colDensity[x] = n / height;
  }

  let cropRight = Math.round(width * 0.42);
  let inInk = false;
  let inkStart = 0;
  for (let x = 0; x < width; x++) {
    if (!inInk && colDensity[x] > 0.04) {
      inInk = true;
      inkStart = x;
    } else if (inInk && colDensity[x] < 0.004) {
      let blankRun = 0;
      let xx = x;
      while (xx < width && colDensity[xx] < 0.004) {
        blankRun++;
        xx++;
      }
      if (blankRun >= 12 && x - inkStart > width * 0.12 && x < width * 0.55) {
        cropRight = x;
        break;
      }
      x = xx - 1;
    }
  }
  return cropRight;
}

async function processSource({ sharp, inputPath, outLockupPng, outMarkPng, SITE_TEAL }) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Atteso 4 canali RGBA, ottenuti ${channels}`);
  console.log(`[process-logo] Source: ${width}x${height}`);

  const { bgR, bgG, bgB } = sampleBackground(data, width, height);
  console.log(`[process-logo] BG sample: rgb(${bgR.toFixed(0)}, ${bgG.toFixed(0)}, ${bgB.toFixed(0)})`);

  const T_LOW = 28;
  const T_HIGH = 95;
  /** Sotto questa luminanza l'inchiostro è trattato come nero tipografico → bianco (leggibile su header scuro). */
  const DARK_LUMA = 48;
  /** Teal/tagline su chrome scuro: mint brand leggibile (tokens brandMarkTint #6ee7c8). */
  const CHROME_TEAL = { r: 110, g: 231, b: 200 };

  const lockup = Buffer.alloc(data.length);
  const markInk = Buffer.alloc(data.length);
  let opaque = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const srcAlpha = data[i + 3] / 255;
    const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

    let keyAlpha;
    if (dist <= T_LOW) keyAlpha = 0;
    else if (dist >= T_HIGH) keyAlpha = 1;
    else keyAlpha = (dist - T_LOW) / (T_HIGH - T_LOW);

    const finalAlpha = keyAlpha * srcAlpha;
    if (finalAlpha === 0) {
      lockup[i] = 0;
      lockup[i + 1] = 0;
      lockup[i + 2] = 0;
      lockup[i + 3] = 0;
      markInk[i] = 0;
      markInk[i + 1] = 0;
      markInk[i + 2] = 0;
      markInk[i + 3] = 0;
      continue;
    }

    opaque++;
    const a = Math.round(finalAlpha * 255);
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Lockup chrome: neri tipografici → bianco; teal/tagline → mint brillante.
    if (luma <= DARK_LUMA) {
      lockup[i] = 255;
      lockup[i + 1] = 255;
      lockup[i + 2] = 255;
    } else {
      lockup[i] = CHROME_TEAL.r;
      lockup[i + 1] = CHROME_TEAL.g;
      lockup[i + 2] = CHROME_TEAL.b;
    }
    lockup[i + 3] = a;

    markInk[i] = SITE_TEAL.r;
    markInk[i + 1] = SITE_TEAL.g;
    markInk[i + 2] = SITE_TEAL.b;
    markInk[i + 3] = a;
  }

  console.log(
    `[process-logo] Pixel ink: ${opaque} / ${data.length / 4} (${((opaque / (data.length / 4)) * 100).toFixed(1)}%)`,
  );

  const cropRight = findIconCropRight(markInk, width, height);
  console.log(`[process-logo] Icon ends at col ${cropRight}/${width} (~${((cropRight / width) * 100).toFixed(0)}%)`);

  const lockupRaw = await sharp(lockup, { raw: { width, height, channels: 4 } }).png().toBuffer();
  await sharp(lockupRaw)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 40 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outLockupPng);

  const markRaw = await sharp(markInk, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const iconExtracted = await sharp(markRaw)
    .extract({ left: 0, top: 0, width: Math.max(8, cropRight), height })
    .toBuffer();
  await sharp(iconExtracted)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 50 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outMarkPng);

  const lockupMeta = await sharp(outLockupPng).metadata();
  const markMeta = await sharp(outMarkPng).metadata();
  console.log(`[process-logo] Wrote logo-lockup.png (${lockupMeta.width}x${lockupMeta.height})`);
  console.log(`[process-logo] Wrote logo-mark.png (${markMeta.width}x${markMeta.height})`);

  return {
    lockupBuffer: await sharp(outLockupPng).toBuffer(),
    markBuffer: await sharp(outMarkPng).toBuffer(),
    lockupMeta,
    markMeta,
  };
}

async function recolorMarkInkForFavicon({ sharp, markBuffer, toRgb }) {
  const { data, info } = await sharp(markBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error("Expected RGBA");
  const aMin = 28;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < aMin) continue;
    data[i] = toRgb.r;
    data[i + 1] = toRgb.g;
    data[i + 2] = toRgb.b;
  }
  return sharp(data, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
}

async function writeSvgWrappers({
  sharp,
  lockupBuffer,
  lockupMeta,
  markBuffer,
  markMeta,
  outLockupSvg,
  outMarkSvg,
  outIconSvg,
  root,
  iconBg,
  iconInk,
}) {
  const lockupB64 = lockupBuffer.toString("base64");
  const lockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lockupMeta.width} ${lockupMeta.height}" width="${lockupMeta.width}" height="${lockupMeta.height}" fill="none">
  <title>Studio Pagnoni</title>
  <image href="data:image/png;base64,${lockupB64}" x="0" y="0" width="${lockupMeta.width}" height="${lockupMeta.height}"/>
</svg>
`;
  fs.writeFileSync(outLockupSvg, lockupSvg);
  console.log(
    `[process-logo] Wrote ${path.relative(root, outLockupSvg)} (${lockupMeta.width}x${lockupMeta.height})`,
  );

  const markB64 = markBuffer.toString("base64");
  const side = Math.max(markMeta.width, markMeta.height);
  const ix = Math.round((side - markMeta.width) / 2);
  const iy = Math.round((side - markMeta.height) / 2);
  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${side}" height="${side}" fill="none">
  <title>Studio Tecnico Pagnoni</title>
  <image href="data:image/png;base64,${markB64}" x="${ix}" y="${iy}" width="${markMeta.width}" height="${markMeta.height}"/>
</svg>
`;
  fs.writeFileSync(outMarkSvg, markSvg);
  console.log(`[process-logo] Wrote ${path.relative(root, outMarkSvg)} (square ${side}x${side})`);

  const iconMarkBuffer = await recolorMarkInkForFavicon({ sharp, markBuffer, toRgb: iconInk });
  const iconMarkB64 = iconMarkBuffer.toString("base64");
  const CANVAS = 512;
  const PADDING_RATIO = 0.18;
  const targetMaxSide = Math.round(CANVAS * (1 - PADDING_RATIO * 2));
  const scale = targetMaxSide / Math.max(markMeta.width, markMeta.height);
  const w = Math.round(markMeta.width * scale);
  const h = Math.round(markMeta.height * scale);
  const x = Math.round((CANVAS - w) / 2);
  const y = Math.round((CANVAS - h) / 2);

  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}" fill="none">
  <title>Studio Tecnico Pagnoni</title>
  <desc>Logo Studio Pagnoni — point cloud / wireframe.</desc>
  <rect width="${CANVAS}" height="${CANVAS}" rx="112" fill="${iconBg}"/>
  <image href="data:image/png;base64,${iconMarkB64}" x="${x}" y="${y}" width="${w}" height="${h}"/>
</svg>
`;
  fs.writeFileSync(outIconSvg, iconSvg);
  console.log(`[process-logo] Wrote ${path.relative(root, outIconSvg)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
