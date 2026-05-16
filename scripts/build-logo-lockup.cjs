/* eslint-disable no-console */
/**
 * Rigenera logo.png (lockup icona + testo).
 * Tagline in segmenti posizionati (no letter-spacing SVG / no overlap), colore uniforme.
 */
const fs = require("node:fs");
const path = require("node:path");

const COLORS = {
  bg: "#0a1412",
  title: "#f6f4ef",
  /** --brand-tagline */
  tagline: "#b8d8cf",
};

/** Margine conservativo vs system-ui semibold caps (librsvg tende a disegnare più largo della stima stretta). */
function measureText(text, fontSize) {
  return text.length * fontSize * 0.62;
}

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

async function main() {
  const sharp = (await import("sharp")).default;
  const root = path.resolve(__dirname, "..");
  const markPath = path.join(root, "public", "logo-mark.png");
  const outPath = path.join(root, "logo.png");

  if (!fs.existsSync(markPath)) {
    throw new Error(`Manca ${path.relative(root, markPath)}. Esegui: node scripts/process-logo.cjs`);
  }

  const TITLE_SIZE = 28;
  const TAGLINE_SIZE = 10;
  const ICON_H = 80;
  const GAP = 14;
  const PAD_X = 0;
  const PAD_Y = 4;

  const titleText = "Studio Pagnoni";
  const taglineSegments = ["TOPOGRAFIA", " · ", "ARCHITETTURA", " · ", "SLAM"];

  const titleW = Math.ceil(measureText(titleText, TITLE_SIZE));
  let taglineW = 0;
  for (const seg of taglineSegments) taglineW += measureText(seg, TAGLINE_SIZE);
  taglineW = Math.ceil(taglineW);

  const textBlockH = TITLE_SIZE + 10 + TAGLINE_SIZE;
  const H = Math.max(ICON_H, textBlockH) + PAD_Y * 2;
  const markMeta = await sharp(markPath).metadata();
  const markW = Math.round((markMeta.width / markMeta.height) * ICON_H);
  const textW = Math.ceil(Math.max(titleW, taglineW));
  const W = PAD_X + markW + GAP + textW + PAD_X;

  const markBuf = await sharp(markPath).resize(markW, ICON_H).png().toBuffer();
  const markB64 = markBuf.toString("base64");

  const textX = PAD_X + markW + GAP;
  const textY = (H - textBlockH) / 2;
  const titleY = textY + TITLE_SIZE;
  const taglineY = titleY + 10 + TAGLINE_SIZE * 0.85;

  let segX = textX;
  const taglineTexts = taglineSegments
    .map((seg) => {
      const x = segX;
      segX += measureText(seg, TAGLINE_SIZE);
      return `<text x="${x}" y="${taglineY}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${TAGLINE_SIZE}" font-weight="600" fill="${COLORS.tagline}">${escapeXml(seg)}</text>`;
    })
    .join("\n  ");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${COLORS.bg}"/>
  <image href="data:image/png;base64,${markB64}" x="${PAD_X}" y="${(H - ICON_H) / 2}" width="${markW}" height="${ICON_H}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${textX}" y="${titleY}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${TITLE_SIZE}" font-weight="600" fill="${COLORS.title}">${escapeXml(titleText)}</text>
  ${taglineTexts}
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outPath);
  const meta = await sharp(outPath).metadata();
  console.log(`[build-logo-lockup] Wrote ${path.relative(root, outPath)} (${meta.width}x${meta.height})`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
