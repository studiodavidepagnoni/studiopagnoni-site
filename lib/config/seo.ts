import type { Metadata } from "next";
import { site } from "@/lib/config/site";

/**
 * Cluster keyword per copy e llms.txt (non esportati in meta `keywords`: Google li ignora).
 *
 * Intent commerciale B2B — Franciacorta / provincia di Brescia / Lombardia:
 * architettura e pratiche edilizie, topografia, laser scanner SLAM (CHCNAV RS10).
 *
 * Cluster primario:
 * - architetto / progettazione architettonica Brescia Franciacorta
 * - laser scanner SLAM Brescia / Lombardia
 * - rilievo laser scanner 3D, nuvola di punti, as-built
 * - topografia GNSS RTK, stazione totale, rilievo planoaltimetrico
 *
 * Cluster locale:
 * - studio tecnico Cazzago San Martino, architettura Franciacorta
 * - topografo Brescia, rilievo topografico Lombardia
 *
 * Differenziatori: CHCNAV RS10, sede Bornato/Franciacorta, dal 1988.
 */
export const seoKeywords = {
  primary: [
    "architettura Franciacorta Brescia",
    "progettazione architettonica provincia di Brescia",
    "laser scanner SLAM Brescia",
    "laser scanner SLAM Lombardia",
    "rilievo laser scanner 3D Franciacorta",
    "rilievo laser scanner 3D Lombardia",
    "nuvola di punti laser scanner",
    "rilievo as built Brescia",
    "rilievo as built Lombardia",
    "scansione 3D capannone industriale",
    "CHCNAV RS10 rilievo",
    "rilievo SLAM mobile",
  ],
  local: [
    "studio tecnico Cazzago San Martino",
    "architetto Franciacorta",
    "topografo Brescia",
    "rilievo topografico Franciacorta",
    "rilievo planoaltimetrico Lombardia",
    "laser scanner Milano Bergamo Mantova",
    "GNSS RTK rilievo Brescia",
    "stazione totale rilievo",
  ],
  supporting: [
    "documentazione BIM nuvola di punti",
    "rilievo architettonico laser scanner",
    "studio tecnico architettura topografia BS",
    "rilievo topografico Nord Italia",
  ],
} as const;

export const seoAreaServed =
  "Franciacorta, provincia di Brescia, Cazzago San Martino (BS), Lombardia e Nord Italia";

const ogImagePath = "/assets/stock/nuvola-punti-rilievo-laser-scanner.webp";

function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Alt immagine: soggetto + ambito + territorio locale, senza stuffing. */
export function imageAlt(
  subject: string,
  opts?: {
    service?: "slam" | "topografia" | "verde" | "edilizia" | "studio" | "architettura";
    decorative?: boolean;
  },
): string {
  if (opts?.decorative) return "";
  const service =
    opts?.service === "architettura"
      ? "architettura e progettazione"
      : opts?.service === "slam"
        ? "rilievo laser scanner SLAM"
        : opts?.service === "topografia"
          ? "topografia e rilievi GNSS"
          : opts?.service === "verde"
            ? "progettazione del verde e territorio"
            : opts?.service === "edilizia"
              ? "urbanistica e pratiche edilizie"
              : "studio tecnico";
  return `${subject} — ${service}, ${seoAreaServed} — ${site.brandName}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Priorità indicizzazione landing SLAM / contatti */
  priority?: "high" | "default";
};

export function buildPageMetadata({
  title,
  description,
  path,
  priority = "default",
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path === "/" ? "/" : path);
  const ogImage = absoluteUrl(ogImagePath);
  const documentTitle = `${site.brandName} - ${title}`;

  return {
    title: { absolute: documentTitle },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "it_IT",
      url: canonical,
      siteName: site.brandName,
      title: documentTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt("Documentazione 3D e base metrica per progetto architettonico", { service: "architettura" }) }],
    },
    twitter: {
      card: "summary_large_image",
      title: documentTitle,
      description,
      images: [ogImage],
    },
    robots: priority === "high" ? { index: true, follow: true, googleBot: { index: true, follow: true } } : undefined,
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brandName} - Architettura, topografia e laser SLAM`,
    template: `${site.brandName} - %s`,
  },
  description:
    "Studio tecnico a Cazzago San Martino (BS): architettura e pratiche edilizie, topografia e rilievi laser scanner SLAM. Franciacorta, provincia di Brescia, Lombardia e Nord Italia.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.brandName,
    title: `${site.brandName} — ${site.tagline}`,
    description:
      "Architettura, topografia e laser scanner SLAM in Franciacorta, provincia di Brescia e Lombardia. Sopralluoghi e preventivi.",
    images: [{ url: absoluteUrl(ogImagePath), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} — architettura, topografia e laser SLAM`,
    description:
      "Architettura, topografia e rilievi 3D SLAM in Franciacorta, Brescia e Lombardia. Studio tecnico a Cazzago San Martino (BS).",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "sE-raRFBNM462UFEAV_IfRfPVg9n4yTYxc8K9ys_gGI",
  },
  other: { "theme-color": "#051e1b" },
};

export const homeMetadata = buildPageMetadata({
  title: "Architettura, topografia e laser SLAM",
  description:
    "Studio tecnico a Cazzago San Martino (BS): architettura, topografia GNSS e laser SLAM in Franciacorta, Brescia e Lombardia.",
  path: "/",
  priority: "high",
});

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${site.url.replace(/\/$/, "")}/#organization`,
      name: site.legalName,
      alternateName: site.brandName,
      description:
        "Architettura, topografia GNSS RTK e stazione totale, rilievi laser scanner SLAM mobile e nuvole di punti. Progettazione del verde, urbanistica e pratiche edilizie. Sede a Cazzago San Martino (BS), frazione Bornato.",
      url: site.url,
      email: site.email,
      telephone: site.phones.map((p) => p.tel),
      image: absoluteUrl(ogImagePath),
      logo: absoluteUrl("/icon-192.png"),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Vittorio Emanuele III, 16",
        addressLocality: "Cazzago San Martino",
        addressRegion: "BS",
        postalCode: "25046",
        addressCountry: "IT",
      },
      areaServed: [
        { "@type": "Place", name: "Franciacorta" },
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "AdministrativeArea", name: "Lombardia" },
        { "@type": "AdministrativeArea", name: "Nord Italia" },
      ],
      knowsAbout: [
        "Architettura",
        "Progettazione architettonica",
        "Rilievi topografici",
        "Laser scanner SLAM",
        "Nuvole di punti",
        "GNSS RTK",
        "Rilievo as-built",
        "Documentazione BIM",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servizi di architettura, topografia e laser scanner",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Architettura e progettazione",
              description:
                "Progettazione architettonica dal concept alle tavole esecutive, con coordinamento di rilievi, urbanistica e cantiere in Franciacorta e provincia di Brescia.",
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Topografia e rilievi planoaltimetrici",
              description:
                "Rilievi con GNSS RTK e stazione totale, planimetrie quotate, volumetrie e supporto a frazionamenti e cantieri.",
              areaServed: { "@type": "Place", name: "Franciacorta" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rilievi laser scanner SLAM mobile",
              description:
                "Acquisizione mobile con laser scanner SLAM, nuvole di punti georiferite, as-built indoor e outdoor, restituzione CAD/BIM. Ideale per capannoni, edifici complessi e cantieri in Franciacorta e provincia di Brescia.",
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url.replace(/\/$/, "")}/#website`,
      url: site.url,
      name: site.brandName,
      description: site.tagline,
      publisher: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
      inLanguage: "it-IT",
    },
    {
      "@type": "WebPage",
      "@id": `${site.url.replace(/\/$/, "")}/#homepage`,
      url: site.url,
      name: `${site.brandName} - Architettura, topografia e laser SLAM`,
      description:
        "Homepage: architettura, topografia e rilievi laser scanner SLAM in Franciacorta, provincia di Brescia e Lombardia.",
      isPartOf: { "@id": `${site.url.replace(/\/$/, "")}/#website` },
      about: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
      inLanguage: "it-IT",
    },
  ],
} as const;
