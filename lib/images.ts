/** Path pubblici: cartella `assets/` → `public/assets/` (sync-static). */

import type { HeroVideoSources } from "@/lib/heroVideos";
import {
  HERO_POSTER_DEFAULT,
  HERO_POSTER_INDOOR,
  HERO_POSTER_POINTCLOUD,
  HERO_VIDEO_DEFAULT_SOURCES,
  HERO_VIDEO_INDOOR_SOURCES,
  HERO_VIDEO_POINTCLOUD_SOURCES,
} from "@/lib/heroVideos";
import { stockImage } from "@/lib/mediaPath";
import { imageAlt } from "@/lib/seo";

export {
  HERO_POSTER_DEFAULT,
  HERO_POSTER_INDOOR,
  HERO_POSTER_POINTCLOUD,
  HERO_VIDEO_DEFAULT,
  HERO_VIDEO_INDOOR,
  HERO_VIDEO_POINTCLOUD,
} from "@/lib/heroVideos";

const a = (name: string) => stockImage(name);

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
  video?: HeroVideoSources;
  poster?: string;
  videoObjectPosition?: string;
};

/** Slide hero: testo ciclico. Prima slide = messaggio commerciale SLAM / RS10. */
export const heroSlides: readonly HeroSlide[] = [
  {
    src: a("chi-siamo-slam-hero.jpg"),
    alt: imageAlt("Operatore con laser scanner SLAM mobile CHCNAV RS10 sul campo", { service: "slam" }),
    line1: "Rilievi 3D con laser SLAM",
    line2: "CHCNAV RS10 · indoor e outdoor",
    body: "Terreni, vigneti, edifici, capannoni e impianti: acquisizione mobile, nuvole di punti georiferite e as-built in tempi contenuti. Meno passaggi in cantiere, base metrica per progetto e BIM.",
    primaryCtaHref: "/laser-scanner-slam",
    primaryCtaLabel: "Scopri il servizio SLAM",
    ctaHref: "/contatti?oggetto=slam",
    ctaLabel: "Richiedi preventivo",
    video: HERO_VIDEO_INDOOR_SOURCES,
    poster: HERO_POSTER_INDOOR,
    videoObjectPosition: "center center",
  },
  {
    src: a("pointcloud-data.jpg"),
    alt: imageAlt("Visualizzazione nuvola di punti da rilievo laser scanner", { service: "slam" }),
    line1: "Nuvola di punti",
    line2: "dalla scansione agli elaborati",
    body: "Restituzione in formati operativi: nuvole dense, sezioni, CAD e modelli BIM. Controlli in campo sulla copertura prima di chiudere il rilievo.",
    ctaHref: "/progetti/rilievi-digitalizzazione/capannone-logistico-slam-rs10",
    ctaLabel: "Esempio di progetto",
    video: HERO_VIDEO_POINTCLOUD_SOURCES,
    poster: HERO_POSTER_POINTCLOUD,
    videoObjectPosition: "68% center",
  },
  {
    src: a("gnss-rtk-quarry.jpg"),
    alt: imageAlt("Ricevitore GNSS RTK e rilievo geodetico sul campo", { service: "topografia" }),
    line1: "Topografia e rilievi",
    line2: "GNSS RTK · stazione totale",
    body: "Rilievi planoaltimetrici integrati al laser SLAM: coordinate affidabili per frazionamenti, cantieri e allineamento del modello 3D.",
    ctaHref: "/topografia",
    ctaLabel: "Topografia",
    video: HERO_VIDEO_DEFAULT_SOURCES,
    poster: HERO_POSTER_DEFAULT,
  },
];

export const homeChiSiamoImages = {
  team: {
    src: a("chi-siamo-slam-hero.jpg"),
    alt: imageAlt("Team in attività di rilievo laser SLAM con nuvola di punti", { service: "slam" }),
  },
  cantiere: {
    src: a("total-station-field.jpg"),
    alt: imageAlt("Stazione totale in cantiere per rilievo planoaltimetrico", { service: "topografia" }),
  },
} as const;

export const chiSiamoPageImage = {
  src: a("handheld-slam-road.jpg"),
  alt: imageAlt("Acquisizione SLAM handheld lungo strada di campagna", { service: "slam" }),
} as const;

export const projectPreview = [
  {
    href: "/progetti/territorio-verde",
    title: "Territorio e paesaggio",
    caption: "Territorio e paesaggio viticolo",
    image: a("survey-site.jpg"),
    alt: imageAlt("Rilievo topografico su territorio collinare e vigneti", { service: "verde" }),
  },
  {
    href: "/progetti/rilievi-digitalizzazione",
    title: "Rilievi e digitalizzazione",
    caption: "Rilievi e digitalizzazione",
    image: a("pointcloud-data.jpg"),
    alt: imageAlt("Elaborazione nuvola di punti e dati 3D da laser scanner", { service: "slam" }),
  },
  {
    href: "/progetti/edilizia-urbanistica",
    title: "Edilizia e urbanistica",
    caption: "Edilizia e pratiche",
    image: a("technical-docs.jpg"),
    alt: imageAlt("Tavole tecniche e documentazione per pratiche edilizie", { service: "edilizia" }),
  },
] as const;
