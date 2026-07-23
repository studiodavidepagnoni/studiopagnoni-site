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
    image: s("technicalDocs"),
    alt: imageAlt("Architettura contemporanea — dettaglio di prospetto", { service: "architettura" }),
  },
  "/servizi": {
    eyebrow: "Cosa facciamo",
    title: "Servizi",
    image: s("surveySite"),
    alt: imageAlt("Tavole di progettazione architettonica e tecnica in studio", { service: "architettura" }),
    lede: "Architettura, topografia, laser SLAM, verde, urbanistica e assistenza tecnica dal 1988.",
  },
  "/topografia": {
    eyebrow: "Servizi",
    title: "Topografia e rilievi",
    image: s("gnssRtk"),
    alt: imageAlt("GNSS RTK in area estrattiva — base metrica per progetto architettonico", {
      service: "topografia",
    }),
    priorityImage: true,
  },
  "/rilievi-laser-scanner-slam-brescia": {
    eyebrow: "Laser scanner SLAM · Brescia",
    title: "Rilievi laser SLAM a Brescia",
    image: p(projectMedia.allevamento.dir, projectMedia.allevamento.cover),
    alt: imageAlt("Rilievo 3D SLAM a Brescia — as-built per architettura e impianti", { service: "slam" }),
    lede: "Nuvole di punti e as-built per progetto architettonico in provincia di Brescia e Franciacorta.",
    priorityImage: true,
  },
  "/rilievi-laser-scanner-slam-lombardia": {
    eyebrow: "Laser scanner SLAM · Lombardia",
    title: "Rilievi laser SLAM in Lombardia",
    image: p(projectMedia.cantina.dir, projectMedia.cantina.cover),
    alt: imageAlt("Rilievo 3D SLAM in Lombardia — immobili e base per progetto", { service: "slam" }),
    lede: "Scansione 3D mobile per architettura, capannoni e impianti in Lombardia — base operativa Brescia.",
    priorityImage: true,
  },
  "/laser-scanner-slam": {
    eyebrow: "Laser scanner mobile",
    title: "Rilievi laser SLAM",
    image: s("pointcloud"),
    alt: imageAlt("Nuvola di punti da laser scanner — base metrica per architettura", { service: "slam" }),
    lede: "Nuvole di punti e as-built per progetto architettonico, edifici, capannoni e impianti — CHCNAV RS10.",
    priorityImage: true,
  },
  "/progetti": {
    eyebrow: "Portfolio",
    title: "Progetti",
    image: s("topoPlan"),
    alt: imageAlt("Carta topografica con curve di livello — supporto a progetto architettonico", {
      service: "topografia",
    }),
  },
  "/contatti": {
    eyebrow: "Contatto",
    title: "Contatti",
    image: s("totalStation"),
    alt: imageAlt("Stazione totale in cantiere — preventivi per architettura e rilievi", {
      service: "topografia",
    }),
    lede: "Sopralluoghi e preventivi per architettura, topografia e laser scanner SLAM — Franciacorta e provincia di Brescia.",
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
