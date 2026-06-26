import type { Metadata } from "next";
import { site } from "@/lib/config/site";

/**
 * Cluster keyword per copy e llms.txt (non esportati in meta `keywords`: Google li ignora).
 *
 * Ricerca keyword (intent commerciale B2B, maggio 2026)
 * — obiettivo: committenti alto livello in Franciacorta / provincia di Brescia
 *   per rilievi topografici e scansioni laser SLAM (CHCNAV RS10).
 *
 * Cluster primario (alta intenzione, da privilegiare in title/H1/SLAM):
 * - laser scanner SLAM Brescia / Franciacorta
 * - rilievo laser scanner 3D Brescia
 * - nuvola di punti laser scanner
 * - rilievo as built / scansione 3D capannone edificio
 * - geometra topografo laser scanner provincia di Brescia
 * - rilievo SLAM mobile indoor outdoor
 *
 * Cluster locale (trust + map pack):
 * - topografo Brescia, geometra Cazzago San Martino, rilievo topografico Franciacorta
 * - rilievo planoaltimetrico Lombardia, GNSS RTK Brescia, stazione totale
 *
 * Long-tail conversione (pagine servizi / contatti):
 * - preventivo rilievo laser scanner, sopralluogo rilievo 3D
 * - documentazione BIM da nuvola di punti, controllo interferenze impianti 3D
 * - monitoraggio avanzamento lavori rilievo laser
 *
 * Differenziatori da mantenere nel copy: CHCNAV RS10, sede Bornato/Franciacorta, dal 1988.
 */
export const seoKeywords = {
  primary: [
    "laser scanner SLAM Brescia",
    "rilievo laser scanner 3D Franciacorta",
    "nuvola di punti laser scanner",
    "rilievo as built Brescia",
    "geometra laser scanner provincia di Brescia",
    "scansione 3D capannone industriale",
    "CHCNAV RS10 rilievo",
    "rilievo SLAM mobile",
  ],
  local: [
    "topografo Brescia",
    "rilievo topografico Franciacorta",
    "geometra topografo Cazzago San Martino",
    "rilievo planoaltimetrico Lombardia",
    "GNSS RTK rilievo Brescia",
    "stazione totale rilievo",
  ],
  supporting: [
    "documentazione BIM nuvola di punti",
    "rilievo architettonico laser scanner",
    "studio tecnico geometra architetto BS",
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

/** Alt immagine: descrittivo, locale, senza keyword stuffing. */
export function imageAlt(
  subject: string,
  opts?: { service?: "slam" | "topografia" | "verde" | "edilizia" | "studio"; decorative?: boolean },
): string {
  if (opts?.decorative) return "";
  const service =
    opts?.service === "slam"
      ? "rilievo laser scanner SLAM"
      : opts?.service === "topografia"
        ? "rilievi topografici GNSS e stazione totale"
        : opts?.service === "verde"
          ? "progettazione del verde e territorio"
          : opts?.service === "edilizia"
            ? "urbanistica e pratiche edilizie"
            : "servizi tecnici";
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt("Nuvola di punti da rilievo laser scanner SLAM", { service: "slam" }) }],
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
    default: `${site.brandName} - Rilievi laser scanner SLAM e topografia — Franciacorta, Brescia`,
    template: `${site.brandName} - %s`,
  },
  description:
    "Rilievi con laser scanner SLAM mobile (CHCNAV RS10) e topografia professionale: nuvole di punti georiferite, as-built e planimetrie per imprese e studi. Sede a Cazzago San Martino (BS) — Franciacorta, provincia di Brescia, Lombardia e Nord Italia.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.brandName,
    title: `${site.brandName} — ${site.tagline}`,
    description:
      "Laser scanner SLAM, nuvole di punti e topografia in Franciacorta e provincia di Brescia. Sopralluoghi e preventivi per capannoni, edifici, cantieri e territorio.",
    images: [{ url: absoluteUrl(ogImagePath), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} — laser SLAM e topografia`,
    description:
      "Rilievi 3D SLAM e topografia in Franciacorta e Brescia. Studio tecnico a Cazzago San Martino (BS).",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#051e1b" },
};

export const homeMetadata = buildPageMetadata({
  title: "Laser scanner SLAM e topografia in Franciacorta",
  description:
    "Studio tecnico a Cazzago San Martino (BS): rilievi laser scanner SLAM mobile, nuvole di punti georiferite e topografia GNSS per imprese e professionisti in Franciacorta e provincia di Brescia.",
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
        "Rilievi laser scanner SLAM mobile, nuvole di punti, topografia GNSS RTK e stazione totale. Progettazione del verde, urbanistica e pratiche edilizie. Sede a Cazzago San Martino (BS), frazione Bornato.",
      url: site.url,
      email: site.email,
      telephone: site.phones.map((p) => p.tel),
      image: absoluteUrl(ogImagePath),
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
        "Laser scanner SLAM",
        "Nuvole di punti",
        "Rilievi topografici",
        "GNSS RTK",
        "Rilievo as-built",
        "Documentazione BIM",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Rilievi geomatici e laser scanner",
        itemListElement: [
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
      name: `Laser scanner SLAM e topografia — ${site.brandName}`,
      description:
        "Homepage: rilievi laser scanner SLAM, nuvole di punti e topografia in Franciacorta e provincia di Brescia.",
      isPartOf: { "@id": `${site.url.replace(/\/$/, "")}/#website` },
      about: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
      inLanguage: "it-IT",
    },
  ],
} as const;
