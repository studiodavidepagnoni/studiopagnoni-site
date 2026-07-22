import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { serviceGroups } from "@/lib/content";
import { serviziFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/servizi";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const pageTitle = "Servizi — architettura, topografia e laser SLAM";
const pageDescription =
  "Architettura, topografia, laser scanner SLAM, verde, urbanistica, sicurezza cantieri e assistenza tecnica. Studio tecnico in Franciacorta e provincia di Brescia dal 1988.";

export const metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

const serviziJsonLd = faqPageGraph({
  pageUrl,
  pageTitle,
  pageDescription,
  faqItems: serviziFaq,
});

export default function ServiziPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviziJsonLd) }} />
      <StaticPageHero path="/servizi" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
            <p className={`${ui.body} max-w-5xl`}>
              Misura, progetto e pratiche tecniche non sono fasi separate: per una commessa ben impostata servono dati affidabili, lettura normativa e
              continuità tra campo, studio e cantiere. Lo <strong>Studio Tecnico Pagnoni</strong>, attivo <strong>dal 1988</strong>, affianca privati,
              imprese e professionisti su <strong>architettura</strong>, <strong>topografia</strong>, <strong>laser SLAM</strong>, verde, urbanistica e
              sicurezza. La parte strutturale viene coordinata con professionisti esterni quando richiesta.
            </p>

            <section aria-labelledby="servizi-elenco">
              <h2 id="servizi-elenco" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 sm:mb-4`}>
                Ambiti di intervento
              </h2>
              <p className={`${ui.bodyMuted} mb-8 max-w-5xl`}>
                Sei gruppi di servizio, ciascuno con il proprio perimetro operativo. Dove esiste una pagina dedicata puoi approfondire metodo e
                strumenti; per gli altri ambiti trovi qui la sintesi operativa.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:gap-8" aria-label="Schede servizi">
                {serviceGroups.map((group) => {
                  const hasDedicatedPage = Boolean(group.cta);
                  return (
                    <article
                      key={group.id}
                      id={group.id}
                      className={`interactive-card flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary-mid)] bg-[var(--card)] p-6 sm:p-8 ${ui.scrollAnchor}`}
                    >
                      <p className={`${fontSans.className} section-kicker mb-3`}>{group.kicker}</p>
                      <h3 className={`${fontDisplay.className} text-xl font-semibold text-[var(--foreground)]`}>{group.title}</h3>
                      <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--copy-body)]">{group.description}</p>
                      {group.points.length > 0 ? (
                        <ul className="mt-5 list-none space-y-3 pl-0">
                          {group.points.map((point) => (
                            <li
                              key={point}
                              className="relative pl-5 text-[0.92rem] leading-relaxed text-[var(--copy-body)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {hasDedicatedPage ? (
                        <Link
                          href={group.href}
                          className={`${fontSans.className} mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--primary-mid)] transition-colors hover:underline`}
                        >
                          {group.cta} →
                        </Link>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </section>

            <FaqSection id="servizi-faq" items={serviziFaq} />
          </div>
        </div>
      </main>
    </>
  );
}
