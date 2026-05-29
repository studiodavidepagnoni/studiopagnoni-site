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
    alt: imageAlt("Squadra di rilievo su sito industriale e territorio", { service: "topografia" }),
    lede: "Topografia, laser SLAM, verde, urbanistica e assistenza tecnica dal 1988.",
  },
  "/topografia": {
    eyebrow: "Servizi",
    title: "Topografia e rilievi",
    image: s("gnssRtk"),
    alt: imageAlt("GNSS RTK in area estrattiva per rilievo planoaltimetrico", { service: "topografia" }),
    priorityImage: true,
  },
  "/rilievi-laser-scanner-slam-brescia": {
    eyebrow: "Laser scanner mobile",
    title: "Rilievi laser SLAM",
    image: p(projectMedia.allevamento.dir, projectMedia.allevamento.cover),
    alt: imageAlt("Rilievo 3D con laser scanner SLAM in ambiente operativo", { service: "slam" }),
    lede: "Nuvole di punti, as-built e sezioni: acquisizione mobile indoor/outdoor con CHCNAV RS10.",
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
