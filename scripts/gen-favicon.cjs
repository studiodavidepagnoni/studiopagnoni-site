/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");

/** Sfondo allineato a icon.svg storico / UI chiara del sito. */
const BG = { r: 235, g: 234, b: 228, alpha: 1 };

async function main() {
  const sharp = (await import("sharp")).default;
  const pngToIco = (await import("png-to-ico")).default;

  const root = path.resolve(__dirname, "..");
  const markPath = path.join(root, "public", "logo-mark.svg");
  const outIconSvg = path.join(root, "public", "icon.svg");
  const outIcoPath = path.join(root, "public", "favicon.ico");
  const outPng48 = path.join(root, "public", "icon-48.png");
  const outPng192 = path.join(root, "public", "icon-192.png");
  const outPng512 = path.join(root, "public", "icon-512.png");
  const outApple = path.join(root, "public", "apple-touch-icon.png");

  if (!fs.existsSync(markPath)) {
    throw new Error(`Missing source: ${markPath}`);
  }

  const mark = fs.readFileSync(markPath);

  async function toSquarePng(size, outPath, paddingRatio = 0.14) {
    const inner = Math.round(size * (1 - paddingRatio * 2));
    const markBuf = await sharp(mark, { density: 384 })
      .resize(inner, inner, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: BG,
      },
    })
      .composite([{ input: markBuf, gravity: "centre" }])
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath);

    console.log(`[gen-favicon] Wrote ${path.relative(root, outPath)} (${size}x${size})`);
  }

  // Google Search: PNG multiplo di 48px; Organization logo ≥112px.
  await toSquarePng(48, outPng48, 0.12);
  await toSquarePng(192, outPng192, 0.14);
  await toSquarePng(180, outApple, 0.14);
  await toSquarePng(512, outPng512, 0.14);

  // icon.svg: stesso look rasterizzato (Google preferisce comunque i PNG in <link>).
  const png512 = fs.readFileSync(outPng512);
  const b64 = png512.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <title>Studio Tecnico Pagnoni</title>
  <desc>Logo mark Studio Pagnoni — favicon.</desc>
  <image href="data:image/png;base64,${b64}" width="512" height="512" x="0" y="0"/>
</svg>
`;
  fs.writeFileSync(outIconSvg, svg);
  console.log(`[gen-favicon] Wrote ${path.relative(root, outIconSvg)}`);

  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of icoSizes) {
    const tmp = path.join(root, "public", `.favicon-${size}.png`);
    await toSquarePng(size, tmp, size <= 16 ? 0.08 : 0.12);
    pngBuffers.push(fs.readFileSync(tmp));
    fs.unlinkSync(tmp);
  }

  const ico = await pngToIco(pngBuffers);
  fs.writeFileSync(outIcoPath, ico);
  console.log(`[gen-favicon] Wrote ${path.relative(root, outIcoPath)} from logo-mark.svg`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
