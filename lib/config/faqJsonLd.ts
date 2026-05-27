import { site } from "@/lib/config/site";
import type { FaqItem } from "@/lib/content/pageFaqs";

const websiteId = `${site.url.replace(/\/$/, "")}/#website`;

export function faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems,
}: {
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  faqItems: readonly FaqItem[];
}) {
  const faqId = `${pageUrl}#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": faqId },
        inLanguage: "it-IT",
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        mainEntity: faqItems.map((item) => ({
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
