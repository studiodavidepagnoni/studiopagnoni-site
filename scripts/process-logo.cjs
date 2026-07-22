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

  // Rimuove la tagline raster originale a destra dell'icona (mint sotto il wordmark).
  clearWordmarkTagline(lockup, width, height, cropRight, CHROME_TEAL);

  const lockupRaw = await sharp(lockup, { raw: { width, height, channels: 4 } }).png().toBuffer();
  const trimmedLockup = await sharp(lockupRaw)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 40 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  const withTagline = await compositeLockupTagline({ sharp, pngBuffer: trimmedLockup, chromeTeal: CHROME_TEAL });
  await sharp(withTagline).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outLockupPng);

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

/** Cancella la tagline raster a destra dell'icona (tutto sotto il wordmark bianco). */
function clearWordmarkTagline(lockup, width, height, cropRight, _chromeTeal) {
  const rowWhite = new Float32Array(height);
  const rowInk = new Float32Array(height);
  for (let y = 0; y < height; y++) {
    let white = 0;
    let ink = 0;
    for (let x = cropRight; x < width; x++) {
      const i = (y * width + x) * 4;
      if (lockup[i + 3] < 40) continue;
      ink++;
      if (lockup[i] > 220 && lockup[i + 1] > 220 && lockup[i + 2] > 220) white++;
    }
    rowWhite[y] = white;
    rowInk[y] = ink;
  }

  // Banda del titolo = run continuo di righe con molto bianco tipografico.
  let titleTop = -1;
  let titleBottom = -1;
  let bestLen = 0;
  let runStart = -1;
  for (let y = 0; y <= height; y++) {
    const ok = y < height && rowWhite[y] > 40;
    if (ok && runStart < 0) runStart = y;
    if (!ok && runStart >= 0) {
      const len = y - runStart;
      if (len > bestLen) {
        bestLen = len;
        titleTop = runStart;
        titleBottom = y - 1;
      }
      runStart = -1;
    }
  }
  if (titleBottom < 0) {
    console.log("[process-logo] Nessun wordmark bianco trovato — skip clear tagline");
    return;
  }

  const clearFromY = titleBottom + Math.max(6, Math.round((titleBottom - titleTop + 1) * 0.12));
  let cleared = 0;
  for (let y = clearFromY; y < height; y++) {
    for (let x = cropRight; x < width; x++) {
      const i = (y * width + x) * 4;
      if (lockup[i + 3] < 12) continue;
      lockup[i] = 0;
      lockup[i + 1] = 0;
      lockup[i + 2] = 0;
      lockup[i + 3] = 0;
      cleared++;
    }
  }
  console.log(
    `[process-logo] Wordmark y=${titleTop}-${titleBottom}; cleared tagline from y=${clearFromY} (${cleared} px)`,
  );
}

/**
 * Ricompone la tagline: «Architettura – Topografia – Laser Scanning» in mint,
 * larga esattamente quanto «STUDIO PAGNONI».
 */
async function compositeLockupTagline({ sharp, pngBuffer, chromeTeal }) {
  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const colDens = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    let n = 0;
    for (let y = 0; y < height; y++) {
      if (data[(y * width + x) * 4 + 3] > 20) n++;
    }
    colDens[x] = n / height;
  }

  let textLeft = Math.round(width * 0.36);
  for (let x = Math.round(width * 0.15); x < width * 0.7; x++) {
    if (colDens[x] < 0.01) {
      let run = 0;
      let xx = x;
      while (xx < width && colDens[xx] < 0.01) {
        run++;
        xx++;
      }
      if (run >= 6) {
        let found = false;
        for (let x2 = xx; x2 < width && !found; x2++) {
          for (let y = 0; y < height; y++) {
            const i = (y * width + x2) * 4;
            if (data[i + 3] > 40 && data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
              textLeft = x2;
              found = true;
              break;
            }
          }
        }
        break;
      }
      x = xx;
    }
  }

  let titleTop = height;
  let titleBottom = 0;
  // Densità bianco per colonna nella sola fascia del wordmark (ignora pixel sparsi).
  const titleColWhite = new Int32Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = textLeft; x < width; x++) {
      const i = (y * width + x) * 4;
      if (data[i + 3] < 40) continue;
      if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
        titleTop = Math.min(titleTop, y);
        titleBottom = Math.max(titleBottom, y);
        titleColWhite[x]++;
      }
    }
  }
  if (titleBottom <= titleTop) {
    titleTop = Math.round(height * 0.28);
    titleBottom = Math.round(height * 0.62);
  }

  const minCol = Math.max(3, Math.round((titleBottom - titleTop + 1) * 0.08));
  let textRight = textLeft;
  for (let x = width - 1; x >= textLeft; x--) {
    if (titleColWhite[x] >= minCol) {
      textRight = x;
      break;
    }
  }

  const titleH = titleBottom - titleTop + 1;
  const titleW = Math.max(40, textRight - textLeft + 1);
  const fill = `rgb(${chromeTeal.r},${chromeTeal.g},${chromeTeal.b})`;
  const label = "ARCHITETTURA – TOPOGRAFIA – LASER SCANNING";

  const measureTagline = async (fontSize, letterSpacing) => {
    const pad = Math.ceil(fontSize * 2);
    const svgW = Math.max(titleW * 3, Math.ceil(label.length * fontSize * 1.2) + pad * 2);
    const svgH = Math.ceil(fontSize * 3) + pad;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}">
  <text x="${pad}" y="${pad + fontSize}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}" fill="${fill}">${label}</text>
</svg>`;
    const rendered = await sharp(Buffer.from(svg)).png().toBuffer();
    const trimmed = await sharp(rendered)
      .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
      .png()
      .toBuffer();
    const meta = await sharp(trimmed).metadata();
    return { width: meta.width || 0, height: meta.height || 0, buffer: trimmed };
  };

  // 1) font-size massimo che non supera la larghezza del wordmark
  let lo = 8;
  let hi = Math.max(10, Math.round(titleH * 0.55));
  let fontSize = Math.max(12, Math.round(titleH * 0.28));
  for (let i = 0; i < 12; i++) {
    const mid = Math.round((lo + hi) / 2);
    const { width: w } = await measureTagline(mid, 0);
    if (w <= titleW) {
      fontSize = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  // 2) letter-spacing per riempire esattamente titleW
  const base = await measureTagline(fontSize, 0);
  const gaps = Math.max(1, label.length - 1);
  let letterSpacing = (titleW - base.width) / gaps;
  // rifinisci se arrotondamenti SVG spostano di qualche px
  for (let step = 0; step < 6; step++) {
    const { width: w } = await measureTagline(fontSize, letterSpacing);
    const err = titleW - w;
    if (Math.abs(err) <= 1) break;
    letterSpacing += err / gaps;
  }

  const finalGlyph = await measureTagline(fontSize, letterSpacing);
  const gap = Math.max(16, Math.round(titleH * 0.32));
  const taglineTop = titleBottom + gap;
  const padBottom = Math.max(8, Math.round(finalGlyph.height * 0.35));
  const newHeight = Math.max(height, taglineTop + finalGlyph.height + padBottom);

  const canvas =
    newHeight > height
      ? await sharp(pngBuffer)
          .extend({
            top: 0,
            bottom: newHeight - height,
            left: 0,
            right: 0,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer()
      : pngBuffer;

  // Scala orizzontale di 1px se ancora fuori di poco (senza cambiare altezza).
  let tagBuf = finalGlyph.buffer;
  let tagW = finalGlyph.width;
  let tagH = finalGlyph.height;
  if (tagW !== titleW && tagW > 0) {
    tagBuf = await sharp(tagBuf)
      .resize(titleW, tagH, { fit: "fill", kernel: "lanczos3" })
      .png()
      .toBuffer();
    tagW = titleW;
  }

  const out = await sharp(canvas)
    .composite([{ input: tagBuf, top: taglineTop, left: textLeft }])
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 20 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  console.log(
    `[process-logo] Tagline «${label}» matched wordmark ${titleW}px @ x=${textLeft}–${textRight}, size=${fontSize}px spacing=${letterSpacing.toFixed(2)}`,
  );
  return out;
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
