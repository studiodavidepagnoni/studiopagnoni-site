import { projectMedia, stockImages } from "@/lib/media/assetPaths";
import { projectAsset, stockImage } from "@/lib/media/mediaPath";
import { normalizePathname } from "@/lib/utils/normalizePathname";
import { imageAlt } from "@/lib/config/seo";

const s = (key: keyof typeof stockImages) => stockImage(stockImages[key]);
const p = (dir: string, base: string) => projectAsset(`${dir}/${base}.webp`);

export type PageHeroData = {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  lede?: string;
  /** LCP: true solo su landing principali; false su privacy ecc. */
  priorityImage?: boolean;
};

const staticPageHeroes: Record<string, PageHeroData> = {
  "/chi-siamo": {
    eyebrow: "Lo studio",
    title: "Chi siamo",
    image: s("handheldSlam"),
    alt: imageAlt("Percorso di acquisizione SLAM handheld in ambiente esterno", { service: "slam" }),
  },
  "/servizi": {
    eyebrow: "Cosa facciamo",
    title: "Servizi",
    image: s("surveySite"),
    alt: imageAlt("Progettazione tecnica e tavole di lavoro in studio", { service: "studio" }),
    lede: "Architettura, topografia, laser SLAM, verde, urbanistica e assistenza tecnica dal 1988.",
  },
  "/topografia": {
    eyebrow: "Servizi",
    title: "Topografia e rilievi",
    image: s("gnssRtk"),
    alt: imageAlt("GNSS RTK in area estrattiva per rilievo planoaltimetrico", { service: "topografia" }),
    priorityImage: true,
  },
  "/rilievi-laser-scanner-slam-brescia": {
    eyebrow: "Laser scanner SLAM · Brescia",
    title: "Rilievi laser SLAM a Brescia",
    image: p(projectMedia.allevamento.dir, projectMedia.allevamento.cover),
    alt: imageAlt("Rilievo 3D con laser scanner SLAM in ambiente operativo a Brescia", { service: "slam" }),
    lede: "Nuvole di punti e as-built in provincia di Brescia e Franciacorta con CHCNAV RS10 mobile.",
    priorityImage: true,
  },
  "/rilievi-laser-scanner-slam-lombardia": {
    eyebrow: "Laser scanner SLAM · Lombardia",
    title: "Rilievi laser SLAM in Lombardia",
    image: p(projectMedia.cantina.dir, projectMedia.cantina.cover),
    alt: imageAlt("Rilievo 3D con laser scanner SLAM per immobili in Lombardia", { service: "slam" }),
    lede: "Scansione 3D mobile per capannoni, immobili e impianti su tutta la regione — base operativa Brescia.",
    priorityImage: true,
  },
  "/progetti": {
    eyebrow: "Portfolio",
    title: "Progetti",
    image: s("topoPlan"),
    alt: imageAlt("Carta topografica con curve di livello e quotature da rilievo planoaltimetrico", {
      service: "topografia",
    }),
  },
  "/contatti": {
    eyebrow: "Contatto",
    title: "Contatti",
    image: s("totalStation"),
    alt: imageAlt("Stazione totale in cantiere — punto di contatto operativo", { service: "topografia" }),
  },
  "/privacy-policy": {
    eyebrow: "GDPR · Italia · 2026",
    title: "Privacy policy e cookie",
    image: s("technicalDocs"),
    alt: imageAlt("Documentazione tecnica e informativa privacy", { service: "studio" }),
    priorityImage: false,
  },
};

export function resolveStaticPageHero(pathname: string | null): PageHeroData | null {
  const key = normalizePathname(pathname);
  return staticPageHeroes[key] ?? null;
}
