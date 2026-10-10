import { ContattiFormSection } from "@/components/contact/ContattiSlamLead";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { LinkedInLink } from "@/components/ui/LinkedInLink";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Contact — quotes and site visits",
    description:
      "Request a site visit or quotation for architecture, surveying (geometra) and SLAM laser scanning in Franciacorta. Office in Cazzago San Martino (BS).",
    path: "/en/contatti",
    priority: "high",
  }),
  alternates: localeAlternates("/contatti"),
};

const phoneLabelsEn: Record<string, string> = {
  Studio: "Office",
  "Architetto Davide Pagnoni": "Architect Davide Pagnoni",
  "Geometra Sergio Pagnoni": "Surveyor Sergio Pagnoni",
};

export default function EnContattiPage() {
  return (
    <>
      <StaticPageHero path="/en/contatti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={`${layoutGutterXClass} min-w-0`}>
          <div className={`${layoutContentMaxClass} min-w-0 overflow-x-clip`}>
            <section className={`${ui.innerCard} mb-10 sm:mb-12`} aria-labelledby="contatti-intro">
              <h2 id="contatti-intro" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
                How to reach us
              </h2>
              <p className={`${fontSans.className} ${ui.body} max-w-[68ch]`}>
                Write for a site visit, quotation or technical advice on architecture, surveying and SLAM laser scanning.
                Tell us location, approximate area and the outputs you need — we reply with timing and next steps.
              </p>
            </section>

            <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-stretch">
              <section aria-labelledby="recapiti-block" className={`${ui.innerCardStatic} h-full min-w-0`}>
                <h2 id="recapiti-block" className={`${fontDisplay.className} ${ui.cardHeading} mb-4 sm:mb-5`}>
                  Details
                </h2>
                <p className="mb-5 text-[0.95rem] font-semibold leading-snug text-[var(--foreground)] sm:text-[1.02rem]">
                  {site.name}. Architecture, surveying and laser scanning
                </p>
                <ul className="space-y-3 text-[0.95rem] text-[var(--copy-body)] sm:space-y-4 sm:text-[1.03rem]">
                  <li>
                    <strong className="text-[var(--foreground)]">Address:</strong> {site.addressLine}
                  </li>
                  <li>
                    <strong className="text-[var(--foreground)]">Hours:</strong> {site.openingHours.labelShort}
                  </li>
                  {site.phones.map((p) => (
                    <li key={p.tel}>
                      <strong className="text-[var(--foreground)]">{phoneLabelsEn[p.label] ?? p.label}:</strong>{" "}
                      <a href={`tel:${p.tel}`} className={`${ui.proseLink} inline-block min-h-[44px] py-1`}>
                        {p.display}
                      </a>
                    </li>
                  ))}
                  <li>
                    <strong className="text-[var(--foreground)]">Email:</strong>{" "}
                    <a href={`mailto:${site.email}`} className={`${ui.proseLink} inline-block min-h-[44px] py-1`}>
                      {site.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
                  <a
                    href={site.maps.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ui.proseLink} inline-flex min-h-[44px] items-center`}
                  >
                    Open in Google Maps
                  </a>
                  <LinkedInLink label="Studio on LinkedIn" />
                </div>
              </section>

              <section aria-labelledby="mappa-heading" className={`${ui.innerCardStatic} flex h-full min-w-0 flex-col`}>
                <h2 id="mappa-heading" className={`${fontDisplay.className} ${ui.cardHeading} mb-4 sm:mb-5`}>
                  Where we are
                </h2>
                <div className="min-h-0 flex-1">
                  <MapEmbed />
                </div>
              </section>
            </div>

            <ContattiFormSection />
          </div>
        </div>
      </main>
    </>
  );
}
