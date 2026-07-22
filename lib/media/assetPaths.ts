/**
 * Path canonici asset (nomi file SEO-friendly, allineati a servizi e territorio).
 * Sorgente in `assets/` → `public/assets/` via sync-static.
 */

/** Video hero home (base name senza estensione). */
export const heroVideoBases = {
  indoor: "rilievo-laser-slam-interni-brescia",
  pointcloud: "nuvola-punti-rilievo-slam-brescia",
  operational: "laser-slam-rs10-allevamento-brescia",
} as const;

/** Immagini stock (`assets/stock/{name}.webp`). */
export const stockImages = {
  slamHero: "rilievo-laser-slam-operatore-brescia",
  pointcloud: "nuvola-punti-rilievo-laser-scanner",
  handheldSlam: "rilievo-slam-handheld-franciacorta",
  surveySite: "progettazione-tecnica-tavolo-brescia",
  gnssRtk: "gnss-rtk-rilievo-estrattivo-brescia",
  topoPlan: "piano-topografico-curve-livello-brescia",
  technicalDocs: "documentazione-tecnica-studio-pagnoni",
  totalStation: "stazione-totale-rilievo-cantiere-brescia",
} as const;

/** Progetti (`assets/projects/{dir}/...`). */
export const projectMedia = {
  allevamento: {
    dir: "allevamento-slam-appianti-brescia",
    cover: "allevamento-slam-appianti-brescia",
    video: "allevamento-slam-appianti-brescia-video",
  },
  cantina: {
    dir: "cantina-franciacorta-rilievo-slam",
    cover: "cantina-franciacorta-rilievo-slam",
    video: "cantina-franciacorta-rilievo-slam-video",
  },
  terreno: {
    dir: "terreno-maddalena-rilievo-slam-brescia",
    cover: "terreno-maddalena-rilievo-slam-brescia",
    video: "terreno-maddalena-rilievo-slam-brescia-video",
  },
} as const;
