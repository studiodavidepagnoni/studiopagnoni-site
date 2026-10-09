import type { HeroSlide } from "@/lib/media/images";
import { heroSlides } from "@/lib/media/images";

/** Stesse media/CTA href IT; copy EN. */
export const heroSlidesEn: readonly HeroSlide[] = [
  {
    ...heroSlides[0],
    line1: "Architecture and 3D surveys in Franciacorta",
    line2: "Architecture practice · surveying and laser scanning",
    body: "Land, vineyards, buildings, sheds and plant rooms: mobile capture, georeferenced point clouds and as-built in contained time. Fewer site visits, a metric base for architectural design and BIM.",
    primaryCtaLabel: "Request a site visit",
    primaryCtaLabelMobile: "Request a site visit",
    ctaLabel: "Explore services",
  },
  {
    ...heroSlides[1],
    line1: "3D laser scanner surveys",
    line2: "from scan to deliverables",
    body: "Delivery in working formats: dense clouds, sections, CAD and BIM models. On-site coverage checks before closing the survey.",
    ctaLabel: "Project example",
  },
  {
    ...heroSlides[2],
    line1: "Cadastral procedures",
    line2: "registrations · variations · mapping types",
    body: "Support for cadastral updates: DOCFA, area variations, mapping types and alignment between existing conditions and documentation. Clear process for private clients and businesses.",
    ctaLabel: "Request information",
  },
];
