import { stockImage } from "@/lib/media/mediaPath";
import { normalizePathname } from "@/lib/utils/normalizePathname";
import { imageAlt } from "@/lib/config/seo";

const a = (name: string) => stockImage(name);

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
    image: a("handheld-slam-road.jpg"),
    alt: imageAlt("Percorso di acquisizione SLAM handheld in ambiente esterno", { service: "slam" }),
  },
  "/servizi": {
    eyebrow: "Cosa facciamo",
    title: "Servizi",
    image: a("survey-site.jpg"),
    alt: imageAlt("Squadra di rilievo su sito industriale e territorio", { service: "topografia" }),
    lede: "Topografia, laser SLAM, verde, urbanistica e assistenza tecnica dal 1988.",
  },
  "/topografia": {
    eyebrow: "Servizi",
    title: "Topografia e rilievi",
    image: a("gnss-rtk-quarry.jpg"),
    alt: imageAlt("GNSS RTK in area estrattiva per rilievo planoaltimetrico", { service: "topografia" }),
    priorityImage: true,
  },
  "/progetti": {
    eyebrow: "Portfolio",
    title: "Progetti",
    image: a("topographic-plan.jpg"),
    alt: imageAlt("Carta topografica con curve di livello e quotature da rilievo planoaltimetrico", {
      service: "topografia",
    }),
  },
  "/contatti": {
    eyebrow: "Contatto",
    title: "Contatti",
    image: a("total-station-field.jpg"),
    alt: imageAlt("Stazione totale in cantiere — punto di contatto operativo", { service: "topografia" }),
  },
  "/privacy-policy": {
    eyebrow: "GDPR · Italia · 2026",
    title: "Privacy policy e cookie",
    image: a("technical-docs.jpg"),
    alt: imageAlt("Documentazione tecnica e informativa privacy", { service: "studio" }),
    priorityImage: false,
  },
};

export function resolveStaticPageHero(pathname: string | null): PageHeroData | null {
  const key = normalizePathname(pathname);
  return staticPageHeroes[key] ?? null;
}
