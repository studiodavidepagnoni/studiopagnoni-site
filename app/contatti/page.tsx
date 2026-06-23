import { ContattiFormSection, ContattiIntro } from "@/components/contact/ContattiSlamLead";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/contatti";
const pageTitle = "Contatti e preventivo rilievo SLAM";
const pageDescription =
  "Richiedi un sopralluogo o preventivo per rilievi laser scanner SLAM e topografia. Sede a Cazzago San Martino (BS), Franciacorta. Email studio@pagnoni-s.com — Geom. Sergio e Arch. Davide Pagnoni.";

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
        <div className={layoutGutterXClass}>
          <div className={layoutContentMaxClass}>
            <ContattiIntro />

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.02fr_1.28fr] lg:items-stretch">
            <section aria-labelledby="recapiti-block" className={ui.innerCardStatic}>
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
            </section>

            <section aria-labelledby="mappa-heading" className={`${ui.innerCardStatic} !p-3 sm:!p-4 md:!p-5`}>
              <h2 id="mappa-heading" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 px-1 sm:mb-4 sm:px-2`}>
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
