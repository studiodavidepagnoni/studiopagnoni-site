import { ContattiFormSection, ContattiIntro } from "@/components/contact/ContattiSlamLead";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/contatti";
const pageTitle = "Contatti — preventivi e sopralluoghi";
const pageDescription =
  "Sopralluogo o preventivo per architettura, topografia e laser SLAM. Sede a Cazzago San Martino (BS), Franciacorta e provincia di Brescia.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  priority: "high",
});

export default function ContattiPage() {
  return (
    <>
      <StaticPageHero path="/contatti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={`${layoutGutterXClass} min-w-0`}>
          <div className={`${layoutContentMaxClass} min-w-0 overflow-x-clip`}>
            <ContattiIntro />

            <div className="grid min-w-0 gap-6 sm:gap-8 lg:grid-cols-2 lg:items-start">
              <section aria-labelledby="recapiti-block" className={`${ui.innerCardStatic} min-w-0`}>
                <h2 id="recapiti-block" className={`${fontDisplay.className} ${ui.cardHeading} mb-4 sm:mb-5`}>
                  Recapiti
                </h2>
                <p className="mb-5 text-[0.95rem] font-semibold leading-snug text-[var(--foreground)] sm:text-[1.02rem]">
                  {site.name} — {site.tagline}
                </p>
                <ul className="space-y-3 text-[0.95rem] text-[var(--copy-body)] sm:space-y-4 sm:text-[1.03rem]">
                  <li>
                    <strong className="text-[var(--foreground)]">Indirizzo:</strong> {site.addressLine}
                  </li>
                  <li>
                    <strong className="text-[var(--foreground)]">Orari:</strong> {site.openingHours.labelShort}
                  </li>
                  {site.phones.map((p) => (
                    <li key={p.tel}>
                      <strong className="text-[var(--foreground)]">{p.label}:</strong>{" "}
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
                <p className="mt-5">
                  <a
                    href={site.maps.placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ui.proseLink} inline-flex min-h-[44px] items-center`}
                  >
                    Apri in Google Maps
                  </a>
                </p>
              </section>

              <section aria-labelledby="mappa-heading" className={`${ui.innerCardStatic} min-w-0`}>
                <h2 id="mappa-heading" className={`${fontDisplay.className} ${ui.cardHeading} mb-4 sm:mb-5`}>
                  Dove siamo
                </h2>
                <MapEmbed />
              </section>
            </div>

            <ContattiFormSection />
          </div>
        </div>
      </main>
    </>
  );
}
