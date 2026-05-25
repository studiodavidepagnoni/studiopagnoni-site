import { LaserSlamLanding } from "@/components/laser/LaserSlamLanding";
import { laserSlamLanding } from "@/lib/content/laserSlamLanding";
import { buildPageMetadata, seoKeywords } from "@/lib/config/seo";
import { site } from "@/lib/config/site";

const siteUrl = site.url.replace(/\/$/, "");
const pagePath = "/rilievi-laser-scanner-slam-brescia";
const pageUrl = `${siteUrl}${pagePath}`;
const organizationId = `${siteUrl}/#organization`;
const serviceId = `${pageUrl}#service`;
const faqId = `${pageUrl}#faq`;

export const metadata = buildPageMetadata({
  title: "Rilievi laser scanner SLAM a Brescia per capannoni, edifici e impianti",
  description:
    "Rilievi laser scanner SLAM a Brescia e Franciacorta: nuvole di punti, as-built, DWG e BIM per capannoni, edifici, impianti e cantieri. Preventivo su misura.",
  path: "/rilievi-laser-scanner-slam-brescia",
  keywords: [
    "rilievi laser scanner SLAM Brescia",
    "rilievo 3D capannone Brescia",
    "nuvola di punti Brescia",
    "rilievo as built capannone",
    ...seoKeywords.primary,
  ],
  priority: "high",
});

const slamLandingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": serviceId,
      name: "Rilievi laser scanner SLAM a Brescia",
      alternateName: [
        "Rilievi 3D SLAM",
        "Rilievi laser scanner per capannoni",
        "Nuvole di punti e rilievi as-built",
      ],
      serviceType: "Rilievo laser scanner SLAM mobile",
      category: "Rilievi 3D, laser scanner, topografia e as-built",
      description:
        "Rilievi laser scanner SLAM mobile per capannoni, edifici, impianti e cantieri: nuvole di punti georiferite, as-built, DWG, DXF e supporto BIM in provincia di Brescia, Franciacorta e Lombardia.",
      provider: { "@id": organizationId },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Provincia di Brescia" },
        { "@type": "Place", name: "Franciacorta" },
        { "@type": "City", name: "Cazzago San Martino" },
        { "@type": "AdministrativeArea", name: "Lombardia" },
        { "@type": "AdministrativeArea", name: "Nord Italia" },
      ],
      audience: [
        { "@type": "BusinessAudience", audienceType: "Imprese e facility manager" },
        { "@type": "BusinessAudience", audienceType: "Studi tecnici, architetti e ingegneri" },
        { "@type": "BusinessAudience", audienceType: "Committenti con capannoni, edifici e impianti" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Output rilievo SLAM",
        itemListElement: laserSlamLanding.deliverables.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.format,
            description: item.use,
            provider: { "@id": organizationId },
          },
        })),
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "EUR",
          description:
            "Preventivo su misura in base a superficie, accessibilità, output richiesti e distanza dalla sede.",
        },
        url: `${siteUrl}/contatti?oggetto=slam#form-contatti`,
      },
      url: pageUrl,
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Rilievi laser scanner SLAM a Brescia per capannoni, edifici e impianti",
      description:
        "Landing commerciale per richiedere rilievi laser scanner SLAM, nuvole di punti e as-built in provincia di Brescia.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": serviceId },
      mainEntity: [{ "@id": serviceId }, { "@id": faqId }],
      inLanguage: "it-IT",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Rilievi 3D SLAM", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: laserSlamLanding.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
} as const;

export default function RilieviLaserScannerSlamBresciaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(slamLandingJsonLd) }} />
      <LaserSlamLanding />
    </>
  );
}
