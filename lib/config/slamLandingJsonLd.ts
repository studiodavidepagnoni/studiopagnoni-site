import type { SlamLandingContent } from "@/lib/content/laserSlamLanding";
import { site } from "@/lib/config/site";

export function buildSlamLandingJsonLd(content: SlamLandingContent) {
  const siteUrl = site.url.replace(/\/$/, "");
  const pageUrl = `${siteUrl}${content.path}`;
  const organizationId = `${siteUrl}/#organization`;
  const serviceId = `${pageUrl}#service`;
  const faqId = `${pageUrl}#faq`;
  const { jsonLd } = content;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": serviceId,
        name: jsonLd.serviceName,
        alternateName: [...jsonLd.alternateNames],
        serviceType: "Rilievo laser scanner SLAM mobile",
        category: "Rilievi 3D, laser scanner, topografia e as-built",
        description: jsonLd.serviceDescription,
        provider: { "@id": organizationId },
        areaServed: jsonLd.areaServed.map((area) => ({
          "@type": area.type,
          name: area.name,
        })),
        audience: [
          { "@type": "BusinessAudience", audienceType: "Imprese e facility manager" },
          { "@type": "BusinessAudience", audienceType: "Studi tecnici, architetti e ingegneri" },
          { "@type": "BusinessAudience", audienceType: "Committenti con capannoni, edifici e impianti" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Output rilievo SLAM",
          itemListElement: content.deliverables.map((item) => ({
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
        name: content.metaTitle,
        description: jsonLd.webpageDescription,
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
          { "@type": "ListItem", position: 2, name: "Servizi", item: `${siteUrl}/servizi` },
          { "@type": "ListItem", position: 3, name: jsonLd.breadcrumbName, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: content.faq.map((item) => ({
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
}
