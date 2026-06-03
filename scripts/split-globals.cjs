const fs = require("fs");
const path = require("path");

const globalsPath = path.join(__dirname, "../app/globals.css");
let content = fs.readFileSync(globalsPath, "utf8");
content = content.replace(/^@import "tailwindcss";\s*\n/, "");
content = content.replace(/\.theme-light/g, ".theme-site");

const markers = [
  ["tokens", ":root"],
  ["base", "html {"],
  ["cards", ".frost-card"],
  ["home-sections", ".home-section-intro"],
  ["hero", ".page-hero"],
  ["header-nav", ".site-brand-title"],
  ["cta-forms", ".btn-cta-primary"],
  ["theme", ".theme-site"],
  [
    "reveal-motion",
    "@media (prefers-reduced-motion: no-preference) {\n  @supports (view-transition",
  ],
  ["responsive", "@media (max-width: 767px) {\n  html {\n    overflow-x: clip"],
];

const idx = markers.map(([name, start]) => {
  const i = content.indexOf(start);
  if (i < 0) throw new Error(`marker not found: ${name}`);
  return { name, i };
});
idx.sort((a, b) => a.i - b.i);

const stylesDir = path.join(__dirname, "../app/styles");
fs.mkdirSync(stylesDir, { recursive: true });

for (let n = 0; n < idx.length; n++) {
  const slice = content.slice(idx[n].i, n + 1 < idx.length ? idx[n + 1].i : content.length);
  fs.writeFileSync(path.join(stylesDir, `${idx[n].name}.css`), `${slice.trim()}\n`);
}

const imports = markers.map(([name]) => `@import "./styles/${name}.css";`);
const globals = `@import "tailwindcss";\n${imports.join("\n")}\n`;
fs.writeFileSync(globalsPath, globals);
console.log("split ok:", markers.map(([n]) => n).join(", "));
