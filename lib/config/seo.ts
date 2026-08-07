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
 * - studio architettura Cazzago San Martino, architettura Franciacorta
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
    "studio architettura Cazzago San Martino",
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
    "studio architettura topografia BS",
    "rilievo topografico Nord Italia",
  ],
} as const;

export const seoAreaServed =
  "Franciacorta, provincia di Brescia, Cazzago San Martino (BS), Lombardia e Nord Italia";

const ogImagePath = "/assets/stock/nuvola-punti-rilievo-laser-scanner.webp";

function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Allineato a `trailingSlash: true` dell'export statico (GitHub Pages).
  if (normalized === "/") return `${base}/`;
  const bare = normalized.replace(/\/$/, "");
  // Asset e file con estensione: niente slash finale.
  if (/\.[a-z0-9]{2,5}$/i.test(bare)) return `${base}${bare}`;
  return `${base}${bare}/`;
}

/** Alt immagine: soggetto chiaro e breve (accessibilità + SEO senza stuffing). */
export function imageAlt(
  subject: string,
  opts?: {
    service?: "slam" | "topografia" | "verde" | "edilizia" | "studio" | "architettura";
    decorative?: boolean;
  },
): string {
  if (opts?.decorative) return "";
  return subject;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Se valorizzato, usa questo come <title> (senza prefisso brand | …). */
  absoluteTitle?: string;
  /** Priorità indicizzazione landing SLAM / contatti */
  priority?: "high" | "default";
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  priority = "default",
}: PageMetaInput): Metadata {
  const canonical = absoluteUrl(path === "/" ? "/" : path);
  const ogImage = absoluteUrl(ogImagePath);
  const documentTitle = absoluteTitle ?? `${site.brandName} | ${title}`;

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
    default: `${site.brandName} | Rilievi SLAM — Brescia`,
    template: `${site.brandName} | %s`,
  },
  description:
    "Studio di architettura a Cazzago San Martino (BS): progettazione, topografia e rilievi laser scanner SLAM. Franciacorta, provincia di Brescia, Lombardia e Nord Italia.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: site.brandName,
    title: `${site.brandName} | Rilievi SLAM — Brescia`,
    description:
      "Architettura, topografia e laser scanner SLAM in Franciacorta, provincia di Brescia e Lombardia. Sopralluoghi e preventivi.",
    images: [{ url: absoluteUrl(ogImagePath), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brandName} | Rilievi SLAM — Brescia`,
    description:
      "Architettura, topografia e rilievi 3D SLAM in Franciacorta, Brescia e Lombardia. Studio Architettura Pagnoni a Cazzago San Martino (BS).",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "sE-raRFBNM462UFEAV_IfRfPVg9n4yTYxc8K9ys_gGI",
  },
  other: { "theme-color": "#051e1b" },
};

export const homeMetadata = buildPageMetadata({
  title: "Rilievi SLAM — Brescia",
  description:
    "Studio Architettura Pagnoni a Cazzago San Martino (BS): progettazione architettonica, topografia e rilievi laser SLAM in Franciacorta e provincia di Brescia.",
  path: "/",
  priority: "high",
});

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "LocalBusiness", "Architect"],
      "@id": `${site.url.replace(/\/$/, "")}/#organization`,
      name: site.brandName,
      legalName: site.legalName,
      alternateName: ["Studio Pagnoni", "Studio Architettura Pagnoni Bornato"],
      description:
        "Architettura, progettazione urbana, topografia GNSS RTK e stazione totale, rilievi laser scanner 3D SLAM, rilievi architettonici e pratiche catastali. Sede a Bornato, Frazione di Cazzago San Martino (BS).",
      url: site.url,
      email: site.email,
      telephone: site.phones.map((p) => p.tel),
      image: absoluteUrl(ogImagePath),
      logo: absoluteUrl("/icon-192.png"),
      priceRange: "$$",
      vatID: `IT${site.piva}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.streetAddress,
        addressNeighborhood: site.address.addressNeighborhood,
        addressLocality: site.address.addressLocality,
        addressRegion: site.address.addressRegion,
        postalCode: site.address.postalCode,
        addressCountry: site.address.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      hasMap: site.maps.placeUrl,
      openingHoursSpecification: site.openingHours.days.flatMap((day) =>
        site.openingHours.slots.map((slot) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: slot.opens,
          closes: slot.closes,
        })),
      ),
      areaServed: [
        { "@type": "Place", name: "Franciacorta" },
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "AdministrativeArea", name: "Lombardia" },
        { "@type": "AdministrativeArea", name: "Nord Italia" },
      ],
      knowsAbout: [
        "Architettura",
        "Progettazione architettonica",
        "Progettazione urbana",
        "Rilievi architettonici",
        "Pratiche catastali",
        "Rilievi topografici",
        "Laser scanner SLAM",
        "Rilievi laser scanner 3D",
        "Rilievi 3D per studi di architettura",
        "Nuvole di punti",
        "GNSS RTK",
        "Rilievo as-built",
        "Documentazione BIM",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servizi Studio Architettura Pagnoni",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Servizi di progettazione architettonica",
              description:
                "Progettazione architettonica per nuove costruzioni, ristrutturazioni e ampliamenti: dal concept al progetto esecutivo, con attenzione a vincoli e pratiche edilizie. Soluzioni su misura per privati e imprese a Brescia, Franciacorta e provincia.",
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rilievi Laser Scanner 3D",
              description:
                "Rilievi laser scanner 3D per architettura, topografia e cantiere: acquisizione rapida, nuvole di punti, as-built e modelli metrici precisi. Servizio a Brescia, Franciacorta e provincia.",
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rilievi 3D per studi di architettura",
              description:
                "Rilievi 3D in outsourcing per studi di architettura e geometri: nuvole di punti, DWG e as-built consegnati pronti per il progetto. Brescia, Franciacorta e Lombardia.",
              url: `${site.url.replace(/\/$/, "")}/rilievi-3d-per-studi-di-architettura/`,
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
              audience: {
                "@type": "BusinessAudience",
                name: "Studi di architettura, geometri e società di ingegneria",
              },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Rilievi Architettonici",
              description:
                "Rilievi architettonici di edifici, interni ed esterni: piante, sezioni, prospetti e stato di fatto per progetto, ristrutturazione e pratiche edilizie. Operiamo a Brescia, Franciacorta e provincia.",
              areaServed: { "@type": "Place", name: "Franciacorta" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Servizi di progettazione urbana",
              description:
                "Progettazione urbana e pianificazione del territorio: studi di fattibilità, piani di intervento, spazi pubblici e riqualificazione urbana. Coordinamento tra urbanistica, architettura e vincoli locali a Brescia, Franciacorta e provincia.",
              areaServed: { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
              provider: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Pratiche catastali",
              description:
                "Supporto per pratiche catastali e aggiornamenti: DOCFA, variazioni di consistenza, tipi mappali e allineamento tra stato di fatto e documentazione. Chiarezza operativa per privati e imprese sul territorio.",
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
                "Rilievi con GNSS RTK e stazione totale, planimetrie quotate, volumetrie e supporto a frazionamenti e cantieri in Franciacorta e provincia di Brescia.",
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
      name: `${site.brandName} | Rilievi SLAM — Brescia`,
      description:
        "Homepage: architettura, topografia e rilievi laser scanner SLAM in Franciacorta, provincia di Brescia e Lombardia.",
      isPartOf: { "@id": `${site.url.replace(/\/$/, "")}/#website` },
      about: { "@id": `${site.url.replace(/\/$/, "")}/#organization` },
      inLanguage: "it-IT",
    },
  ],
} as const;
