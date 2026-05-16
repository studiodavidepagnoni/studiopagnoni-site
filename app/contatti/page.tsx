import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { fontDisplay } from "@/lib/fonts";
import { buildPageMetadata, seoKeywords } from "@/lib/seo";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata = buildPageMetadata({
  title: "Contatti e preventivo rilievo SLAM",
  description:
    "Richiedi un sopralluogo o preventivo per rilievi laser scanner SLAM e topografia. Sede a Cazzago San Martino (BS), Franciacorta. Email studio@pagnoni-s.com — Geom. Sergio e Arch. Davide Pagnoni.",
  path: "/contatti",
  keywords: ["preventivo rilievo laser scanner", "sopralluogo rilievo 3D Brescia", ...seoKeywords.primary.slice(0, 3)],
  priority: "high",
});

type ContattiPageProps = {
  searchParams: Promise<{ oggetto?: string }>;
};

export default async function ContattiPage({ searchParams }: ContattiPageProps) {
  const { oggetto } = await searchParams;
  const isSlamLead = oggetto === "slam";

  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <div className="mb-10 max-w-[780px] sm:mb-12">
            <p className={ui.body}>
              {isSlamLead ? (
                <>
                  Stai richiedendo informazioni su un <strong>rilievo laser scanner SLAM</strong>. Compila il modulo con superficie indicativa e
                  formato di consegna desiderato: ti risponderemo con tempi e preventivo su misura.
                </>
              ) : (
                <>
                  Siamo disponibili per preventivi su <strong>rilievi topografici</strong>, <strong>laser scanner SLAM</strong>,{" "}
                  <strong>progettazione del verde</strong>, <strong>pratiche edilizie</strong> e <strong>coordinamento sicurezza</strong>. Indica la
                  località dell&apos;intervento e la finalità: ti risponderemo dal canale che preferisci.
                </>
              )}
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.02fr_1.28fr] lg:items-stretch">
            <section aria-labelledby="recapiti-block" className={ui.innerCard}>
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

            <section aria-labelledby="mappa-heading" className={`${ui.innerCard} !p-3 sm:!p-4 md:!p-5`}>
              <h2 id="mappa-heading" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 px-1 sm:mb-4 sm:px-2`}>
                Dove siamo
              </h2>
              <MapEmbed />
            </section>
          </div>

          <section id="form-contatti" className="mt-12 scroll-mt-[120px] sm:mt-16">
            <div className={ui.innerCard}>
              <h2 className={`${fontDisplay.className} ${ui.caseStudyTitle} mb-6 sm:mb-8`}>Scrivici</h2>
              <ContactForm
                defaultSubject={isSlamLead ? "Preventivo rilievo laser SLAM" : ""}
                defaultInquiryType={isSlamLead ? "slam" : ""}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
