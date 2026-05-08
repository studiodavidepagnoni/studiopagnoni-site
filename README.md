# Studio Tecnico Pagnoni — sito web (Next.js)

Repository del sito web di **Studio Tecnico Pagnoni** (Bornato · Cazzago San Martino, Brescia): topografia e rilievi, laser scanner SLAM, nuvola di punti, pratiche e territorio.

Il sito fornisce informazioni sui servizi offerti, i progetti realizzati, i contatti e l'approccio tecnico-professionale dello studio.

## Struttura del progetto (Next.js)

- **`app/`** — App Router: pagine, layout, metadata e route.
- **`components/`** — Componenti React riutilizzabili (header, footer, form, ecc.).
- **`lib/`** — Dati e utilità condivisi.
- **`public/`** — Asset serviti staticamente (immagini, `robots.txt`, `sitemap.xml`, ecc.).
- **`scripts/sync-static.cjs`** — Copia `assets/` in `public/assets/` e file di root in `public/` prima di dev/build (vedi `package.json`).

Stili globali e Tailwind sono configurati nel progetto Next (vedi `app/globals.css` e `postcss.config.mjs`).

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Build produzione

```bash
npm run build
npm start
```

Per export statico (hosting senza Node): `npm run build:static` (variabile `STATIC_EXPORT=1`).
