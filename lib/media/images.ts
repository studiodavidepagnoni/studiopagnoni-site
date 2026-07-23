/** Path pubblici: cartella `assets/` → `public/assets/` (sync-static). */

import type { HeroVideoSources } from "@/lib/media/heroVideos";
import { projectMedia, stockImages } from "@/lib/media/assetPaths";
import {
  HERO_POSTER_DEFAULT,
  HERO_POSTER_INDOOR,
  HERO_POSTER_POINTCLOUD,
  HERO_VIDEO_DEFAULT_SOURCES,
  HERO_VIDEO_INDOOR_SOURCES,
  HERO_VIDEO_POINTCLOUD_SOURCES,
} from "@/lib/media/heroVideos";
import { projectAsset, stockImage, stockImageSrcSet } from "@/lib/media/mediaPath";
import { imageAlt } from "@/lib/config/seo";

export {
  HERO_POSTER_DEFAULT,
  HERO_POSTER_INDOOR,
  HERO_POSTER_POINTCLOUD,
} from "@/lib/media/heroVideos";

const s = (key: keyof typeof stockImages) => stockImage(stockImages[key]);
const p = (dir: string, base: string) => projectAsset(`${dir}/${base}.webp`);

/** Immagine fissa hero home (mobile + poster slide 1): distinta dalla sezione Chi siamo. */
export const HERO_INTRO_STILL = s("slamHero");
export const HERO_INTRO_STILL_W960 = HERO_INTRO_STILL.replace(/\.webp(\?.*)?$/i, "-w960.webp");
export const HERO_INTRO_STILL_ALT = imageAlt("Rilievo laser scanner SLAM con nuvola di punti in ambiente indoor", {
  service: "slam",
});

export function heroIntroStillSrcSet(): string {
  return stockImageSrcSet(HERO_INTRO_STILL);
}

export type HeroSlide = {
  /** Immagine fallback (mobile e quando il video non parte). */
  src: string;
  alt: string;
  line1: string;
  line2: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  /** Etichetta breve per mobile (evita overflow nel bottone hero). */
  primaryCtaLabelMobile?: string;
  video?: HeroVideoSources;
  poster?: string;
  videoObjectPosition?: string;
};

/** Slide hero: testo ciclico. Prima slide = messaggio commerciale SLAM / RS10. */
export const heroSlides: readonly HeroSlide[] = [
  {
    src: s("slamHero"),
    alt: imageAlt("Operatore con laser scanner SLAM mobile CHCNAV RS10 sul campo", { service: "slam" }),
    line1: "Rilievi 3D con laser SLAM",
    line2: "CHCNAV RS10 · indoor e outdoor",
    body: "Terreni, vigneti, edifici, capannoni e impianti: acquisizione mobile, nuvole di punti georiferite e as-built in tempi contenuti. Meno passaggi in cantiere, base metrica per progetto e BIM.",
    primaryCtaHref: "/contatti?oggetto=slam#form-contatti",
    primaryCtaLabel: "Richiedi preventivo rilievo laser scanner SLAM",
    primaryCtaLabelMobile: "Richiedi preventivo SLAM",
    ctaHref: "/rilievi-laser-scanner-slam-brescia",
    ctaLabel: "Scopri il servizio SLAM",
    video: HERO_VIDEO_INDOOR_SOURCES,
    poster: HERO_POSTER_INDOOR,
    videoObjectPosition: "center center",
  },
  {
    src: s("pointcloud"),
    alt: imageAlt("Visualizzazione nuvola di punti da rilievo laser scanner", { service: "slam" }),
    line1: "Nuvola di punti",
    line2: "dalla scansione agli elaborati",
    body: "Restituzione in formati operativi: nuvole dense, sezioni, CAD e modelli BIM. Controlli in campo sulla copertura prima di chiudere il rilievo.",
    ctaHref: "/progetti/rilievi-digitalizzazione/cantina-franciacorta-slam",
    ctaLabel: "Esempio di progetto",
    video: HERO_VIDEO_POINTCLOUD_SOURCES,
    poster: HERO_POSTER_POINTCLOUD,
    videoObjectPosition: "68% center",
  },
  {
    src: p(projectMedia.allevamento.dir, projectMedia.allevamento.cover),
    alt: imageAlt("Rilievo 3D con laser scanner SLAM in ambiente operativo", { service: "slam" }),
    line1: "Rilievi SLAM in ambienti operativi",
    line2: "as-built rapido · base metrica condivisa",
    body: "Acquisizione in movimento in spazi complessi: una nuvola di punti utile per layout, verifiche e documentazione dello stato di fatto, con tempi in campo contenuti.",
    ctaHref: "/progetti/rilievi-digitalizzazione/allevamento-appianti-slam",
    ctaLabel: "Esempio di progetto",
    video: HERO_VIDEO_DEFAULT_SOURCES,
    poster: HERO_POSTER_DEFAULT,
  },
];

export const homeChiSiamoImages = {
  team: {
    src: s("slamHero"),
    alt: imageAlt("Team in attività di rilievo laser SLAM con nuvola di punti", { service: "slam" }),
  },
  cantiere: {
    src: s("totalStation"),
    alt: imageAlt("Stazione totale in cantiere per rilievo planoaltimetrico", { service: "topografia" }),
  },
} as const;

export const chiSiamoPageImage = {
  src: s("topoPlan"),
  alt: imageAlt("Piano topografico con curve di livello e scala grafica", { service: "topografia" }),
} as const;

export const projectPreview = [
  {
    href: "/progetti/rilievi-digitalizzazione",
    title: "Rilievi e digitalizzazione",
    caption: "Rilievi e digitalizzazione",
    image: s("pointcloud"),
    alt: imageAlt("Elaborazione nuvola di punti e dati 3D da laser scanner", { service: "slam" }),
  },
] as const;
