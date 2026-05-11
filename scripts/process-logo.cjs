/* eslint-disable no-console */
/**
 * Processa logo_new.png → asset logo recolorati al primary teal del sito.
 * La sorgente è icon-only ma può avere lo sfondo non-trasparente
 * (es. pattern a scacchi grigio chiaro residuo di export SVG): in quel caso
 * facciamo alpha-keying per distanza dal bg.
 *
 * Output:
 *   - public/logo-mark.png  raster recolorato + bg trasparente, trimmed
 *   - public/logo-mark.svg  wrapper SVG con la PNG embedded base64 (scalabile)
 *   - public/icon.svg       favicon: icon-mark centrata su quadrato dark rounded
 *
 * Approccio colore: alpha-mask per "ink density" (distanza euclidea dal bg
 * sample) + fill costante = primary teal del sito.
 */
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const sharp = (await import("sharp")).default;

  const root = path.resolve(__dirname, "..");
  const inputPath = path.join(root, "logo_new.png");
  const outMarkPng = path.join(root, "public", "logo-mark.png");
  const outMarkSvg = path.join(root, "public", "logo-mark.svg");
  const outIconSvg = path.join(root, "public", "icon.svg");

  // Marchio recolor (vedi app/globals.css --primary)
  const SITE_TEAL = { r: 14, g: 63, b: 55 }; // #0e3f37
  // Sfondo favicon: nettamente più chiaro del tratto (#0e3f37) così il wireframe resta leggibile in tab 16px.
  const ICON_BG = "#3db89e";

  if (!fs.existsSync(inputPath)) {
    if (!fs.existsSync(outMarkPng)) {
      throw new Error(
        `Né ${path.relative(root, inputPath)} né ${path.relative(root, outMarkPng)} sono presenti. ` +
          `Fornisci logo_new.png per rigenerare gli asset.`
      );
    }
    console.log(`[process-logo] ${path.relative(root, inputPath)} non trovato → uso ${path.relative(root, outMarkPng)} esistente per i wrapper SVG.`);
  } else {
    await processSource({ sharp, inputPath, outMarkPng, SITE_TEAL });
  }

  await writeSvgWrappers({ sharp, outMarkPng, outMarkSvg, outIconSvg, root, iconBg: ICON_BG });
}

async function processSource({ sharp, inputPath, outMarkPng, SITE_TEAL }) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Atteso 4 canali RGBA, ottenuti ${channels}`);
  console.log(`[process-logo] Source: ${width}x${height}`);

  // Sample del bg dagli angoli e bordi (la sorgente può avere checker pattern,
  // quindi prendiamo abbastanza punti da mediare i due grigi alternati).
  const corners = [
    [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
    [12, 12], [width - 13, 12], [12, height - 13], [width - 13, height - 13],
    [Math.floor(width / 2), 4], [Math.floor(width / 2), height - 5],
    [4, Math.floor(height / 2)], [width - 5, Math.floor(height / 2)],
  ];
  let bgR = 0, bgG = 0, bgB = 0;
  for (const [x, y] of corners) {
    const i = (y * width + x) * 4;
    bgR += data[i];
    bgG += data[i + 1];
    bgB += data[i + 2];
  }
  bgR /= corners.length;
  bgG /= corners.length;
  bgB /= corners.length;
  console.log(`[process-logo] BG sample: rgb(${bgR.toFixed(0)}, ${bgG.toFixed(0)}, ${bgB.toFixed(0)})`);

  // Soglie di alpha-keying (distanza euclidea dal bg sample).
  // Ampie perché bg può variare (~grigio chiaro ↔ bianco) e ink è teal scuro.
  const T_LOW = 30;
  const T_HIGH = 110;

  const out = Buffer.alloc(data.length);
  let opaque = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const srcAlpha = data[i + 3] / 255; // se l'input ha già alpha < 1 lo rispettiamo
    const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

    let keyAlpha;
    if (dist <= T_LOW) keyAlpha = 0;
    else if (dist >= T_HIGH) keyAlpha = 1;
    else keyAlpha = (dist - T_LOW) / (T_HIGH - T_LOW);

    const finalAlpha = keyAlpha * srcAlpha;
    if (finalAlpha === 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      out[i + 3] = 0;
    } else {
      out[i] = SITE_TEAL.r;
      out[i + 1] = SITE_TEAL.g;
      out[i + 2] = SITE_TEAL.b;
      out[i + 3] = Math.round(finalAlpha * 255);
      opaque++;
    }
  }
  console.log(`[process-logo] Pixel ink: ${opaque} / ${data.length / 4} (${((opaque / (data.length / 4)) * 100).toFixed(1)}%)`);

  // La sorgente contiene tipicamente icona + wordmark + tagline affiancati.
  // Cerco la banda blank verticale che separa l'icona dal testo a destra,
  // così estraggo solo l'icona (la wordmark verrà ricreata in HTML).
  const colDensity = new Float32Array(width);
  for (let x = 0; x < width; x++) {
    let n = 0;
    for (let y = 0; y < height; y++) {
      if (out[(y * width + x) * 4 + 3] > 12) n++;
    }
    colDensity[x] = n / height;
  }
  let cropRight = width; // fallback: nessun crop trovato
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
      // gap "vero" se è largo ≥ 18px e siamo già dopo un buon pezzo di ink
      if (blankRun >= 18 && x - inkStart > width * 0.08) {
        cropRight = x;
        break;
      }
      x = xx - 1;
    }
  }
  console.log(`[process-logo] Icon ends at col ${cropRight}/${width} (~${((cropRight / width) * 100).toFixed(0)}%)`);

  // raw → PNG buffer come intermedio (sharp è inconsistente in chain dopo raw input)
  const rawPngBuffer = await sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer();

  // Step 1: estraggo la fascia sinistra che contiene solo l'icona
  const iconExtracted = await sharp(rawPngBuffer)
    .extract({ left: 0, top: 0, width: cropRight, height })
    .toBuffer();

  // Step 2: trim margini trasparenti residui → PNG finale.
  // Threshold alto perché il bg checker dell'export SVG può lasciare alpha residui
  // sotto T_LOW; vogliamo bbox aderente all'inchiostro vero.
  await sharp(iconExtracted)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 50 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outMarkPng);

  const meta = await sharp(outMarkPng).metadata();
  console.log(`[process-logo] Wrote ${path.relative(path.dirname(outMarkPng), outMarkPng)} (${meta.width}x${meta.height})`);
}

async function writeSvgWrappers({ sharp, outMarkPng, outMarkSvg, outIconSvg, root, iconBg }) {
  const markBuffer = await sharp(outMarkPng).toBuffer();
  const markMeta = await sharp(outMarkPng).metadata();
  const base64 = markBuffer.toString("base64");

  // logo-mark.svg: viewBox QUADRATO, immagine centrata.
  // Side = max(w,h) → l'asset è perfettamente square e l'icona resta centrata
  // qualunque sia l'aspect ratio nativo, così evitiamo container-side hacks.
  const side = Math.max(markMeta.width, markMeta.height);
  const ix = Math.round((side - markMeta.width) / 2);
  const iy = Math.round((side - markMeta.height) / 2);
  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}" width="${side}" height="${side}" fill="none">
  <title>Studio Tecnico Pagnoni</title>
  <image href="data:image/png;base64,${base64}" x="${ix}" y="${iy}" width="${markMeta.width}" height="${markMeta.height}"/>
</svg>
`;
  fs.writeFileSync(outMarkSvg, markSvg);
  console.log(`[process-logo] Wrote ${path.relative(root, outMarkSvg)} (square ${side}x${side}, image ${markMeta.width}x${markMeta.height} @ ${ix},${iy})`);

  // icon.svg: icon-mark centrata su quadrato 512 dark rounded (favicon source).
  const CANVAS = 512;
  const PADDING_RATIO = 0.18; // l'icona occupa ~64% del canvas
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
  <image href="data:image/png;base64,${base64}" x="${x}" y="${y}" width="${w}" height="${h}"/>
</svg>
`;
  fs.writeFileSync(outIconSvg, iconSvg);
  console.log(`[process-logo] Wrote ${path.relative(root, outIconSvg)} (icon ${w}x${h} @ ${x},${y} on ${CANVAS}px canvas)`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
