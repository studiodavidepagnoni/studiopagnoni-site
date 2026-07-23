/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const sharp = (await import("sharp")).default;
  const pngToIco = (await import("png-to-ico")).default;

  const root = path.resolve(__dirname, "..");
  const svgPath = path.join(root, "public", "icon.svg");
  const outIcoPath = path.join(root, "public", "favicon.ico");
  const outPng48 = path.join(root, "public", "icon-48.png");
  const outPng192 = path.join(root, "public", "icon-192.png");
  const outApple = path.join(root, "public", "apple-touch-icon.png");

  const svg = fs.readFileSync(svgPath);

  async function toPng(size, outPath) {
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: "cover" })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath);
    console.log(`[gen-favicon] Wrote ${path.relative(root, outPath)} (${size}x${size})`);
  }

  // Google Search: PNG multiplo di 48px; Organization logo ≥112px.
  await toPng(48, outPng48);
  await toPng(192, outPng192);
  await toPng(180, outApple);

  const icoSizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    icoSizes.map((size) =>
      sharp(svg, { density: 384 })
        .resize(size, size, { fit: "cover" })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer(),
    ),
  );

  const ico = await pngToIco(pngBuffers);
  fs.writeFileSync(outIcoPath, ico);
  console.log(`[gen-favicon] Wrote ${path.relative(root, outIcoPath)} from ${path.relative(root, svgPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
