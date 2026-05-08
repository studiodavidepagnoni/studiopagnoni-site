/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const sharp = (await import("sharp")).default;
  const pngToIco = (await import("png-to-ico")).default;

  const root = path.resolve(__dirname, "..");
  const svgPath = path.join(root, "public", "icon.svg");
  const outIcoPath = path.join(root, "public", "favicon.ico");

  const svg = fs.readFileSync(svgPath);

  // Common favicon sizes. Keep them small to improve legibility.
  const sizes = [16, 24, 32, 48, 64, 128];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(svg, { density: 320 })
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

