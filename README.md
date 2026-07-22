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

## Test e performance (CI)

Dopo `npm run build:static` (per il test del form serve `NEXT_PUBLIC_FORMSPREE_ID=e2e-ci-mock` in build, come in CI):

```bash
npm run test:e2e          # smoke Playwright (home, contatti, invio form)
npm run lighthouse:ci     # soglie LCP/CLS su export statico (mobile)
```

In CI (`/.github/workflows/ci.yml`): lint, typecheck, build statico, E2E e Lighthouse con soglie predefinite (`LH_MAX_LCP_MS=4500`, `LH_MAX_CLS=0.15`). Audit locale completo (mobile + desktop): `npm run lighthouse`.

### Asset e performance

- `npm run optimize:assets` — WebP stock, poster WebP, video MP4 1280px + WebM, rimozione JPEG duplicati (richiede ffmpeg, **solo in locale**).
- `npm run optimize:posters` — rigenera solo i poster dai video.
- `FORCE_VIDEO=1 npm run optimize:assets` — forza ricodifica video.
- `build:static` esegue `optimize:assets` prima dell'export; `prebuild` solo `sync:static`.
- **CI / GitHub Pages** usano `SKIP_VIDEO=1`: i video in `assets/` vanno già ottimizzati e committati; non ricodificare su Actions (lento e costoso).
- Copia `.env.example` in `.env.local` e imposta `NEXT_PUBLIC_FORMSPREE_ID` per il modulo contatti.
- Deploy GitHub Pages: workflow `.github/workflows/deploy-github-pages.yml` (build su ogni push; deploy condizionato).
- Secret repository `NEXT_PUBLIC_FORMSPREE_ID` per il form in produzione su Pages.

### GitHub Pages (quando sei pronto)

Il job **deploy** fallisce con 404 finché Pages non è attivo. Fino ad allora il workflow esegue solo il **build** (verde in Actions).

1. **Settings → Pages** del repository: **Build and deployment** → Source **GitHub Actions** (non “Deploy from branch”).
2. Repository variable **`PAGES_DEPLOY_ENABLED`** = `true` (Settings → Secrets and variables → Actions → Variables).
3. Secret **`NEXT_PUBLIC_FORMSPREE_ID`** se usi il form contatti.
4. Variables consigliate per dominio custom: `NEXT_PUBLIC_SITE_URL` = `https://www.studiopagnoni.com`, `NEXT_PUBLIC_BASE_PATH` vuoto (sito in root, non in `/repo`).
5. Push su `master` / `main` oppure **Run workflow** manuale.
6. In **Settings → Pages → Custom domain** inserisci `www.studiopagnoni.com` e abilita **Enforce HTTPS**.

Sito produzione: `https://www.studiopagnoni.com`.
- **Header di sicurezza (CSP, HSTS):** con `build:static` Next non invia gli header di `next.config.ts`. Il file `public/_headers` vale su Netlify/Cloudflare Pages; su GitHub Pages configurare header su CDN o reverse proxy. In locale con `npm start` (build non static) gli header Next sono attivi.
