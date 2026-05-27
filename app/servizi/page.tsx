import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay } from "@/lib/fonts";
import { faqPageGraph } from "@/lib/config/faqJsonLd";
import { buildPageMetadata } from "@/lib/config/seo";
import { serviziFaq } from "@/lib/content/pageFaqs";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const pagePath = "/servizi";
const pageUrl = `${site.url.replace(/\/$/, "")}${pagePath}`;
const pageTitle = "Servizi — laser SLAM, topografia e progettazione";
const pageDescription =
  "Laser scanner SLAM e nuvole di punti, topografia GNSS, verde, urbanistica, architettura, sicurezza cantieri e perizie. Studio tecnico in Franciacorta e provincia di Brescia dal 1988.";

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
              imprese e professionisti su <strong>topografia</strong>, <strong>rilievi laser SLAM</strong>, verde, urbanistica e sicurezza. La parte
              strutturale viene coordinata con professionisti esterni quando richiesta.
            </p>

          <section className="mt-10 sm:mt-12" aria-labelledby="intro-topografia-slam">
            <h2 id="intro-topografia-slam" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 sm:mb-4`}>
              Due basi operative: misura e documentazione 3D
            </h2>
            <p className={`${ui.bodyMuted} mb-8 max-w-5xl`}>
              Prima di progettare, regolarizzare o intervenire su un immobile serve capire con precisione lo stato di fatto. Topografia e SLAM rispondono
              allo stesso obiettivo con scale diverse: il territorio e le coordinate da un lato, gli spazi costruiti e la nuvola di punti dall&apos;altro.
            </p>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <Link
                href="/topografia"
                className="interactive-card group flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary-mid)] bg-[var(--card)] p-6 sm:p-8"
              >
                <span className={`${fontDisplay.className} text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-mid)]`}>
                  Topografia e rilievi
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[var(--copy-body)]">
                  Quando il progetto dipende da quote, confini, pendenze o tracciamenti, il rilievo topografico porta il terreno dentro elaborati leggibili:
                  coordinate, curve di livello, volumi e punti di controllo. GNSS RTK e stazione totale vengono scelti in base al contesto, non per routine.
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--primary-mid)] group-hover:underline">Approfondisci la topografia →</span>
              </Link>
              <Link
                href="/rilievi-laser-scanner-slam-brescia"
                className="interactive-card group flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary-mid)] bg-[var(--card)] p-6 sm:p-8"
              >
                <span className={`${fontDisplay.className} text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-mid)]`}>
                  Laser scanner SLAM
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[var(--copy-body)]">
                  Negli edifici, nei capannoni e negli impianti, lo SLAM consente di acquisire geometrie dense camminando nello spazio. La nuvola di punti
                  diventa base per as-built, sezioni, CAD/BIM e verifiche, spesso integrata con controlli topografici dove servono coordinate di progetto.
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--primary-mid)] group-hover:underline">Approfondisci il laser SLAM →</span>
              </Link>
            </div>
          </section>

          <article className={ui.innerCard}>
            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-8 border-b border-[var(--green-border-muted)] pb-4`}>
              Elenco per ambito
            </h2>

            <h3 id="topografia-rilievi" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-2 ${ui.scrollAnchor}`}>
              Topografia e rilievi
            </h3>
            <p className={`${ui.body} mb-4`}>
              Rilievi planoaltimetrici per frazionamenti, nuovi insediamenti, cantieri e verifiche di confine. Strumentazione{" "}
              <strong>GPS/GNSS</strong> e <strong>stazione totale</strong> per acquisizioni tracciabili e compatibili con le esigenze catastali e
              progettuali.
            </p>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Rilievi planoaltimetrici e quotati</strong> per progettazione, cantieristica e contenziosi tecnici.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Supporto a perizie e stime</strong> quando la misura dello stato di fatto è parte dell&apos;incarico.
              </li>
            </ul>
            <p className="mt-4">
              <Link href="/topografia" className={ui.proseLink}>
                Pagina dedicata: topografia e rilievi
              </Link>
            </p>

            <h3 id="laser-slam" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-14 ${ui.scrollAnchor}`}>
              Laser scanner SLAM e nuvole di punti
            </h3>
            <p className={`${ui.body} mb-4`}>
              Il <strong>laser scanner basato su tecnologia SLAM</strong> consente di documentare edifici e spazi complessi con dense{" "}
              <strong>nuvole di punti</strong>, utili per rilievi as-built, impianti e comunicazione dello stato dei luoghi.
            </p>
            <p className="mt-4">
              <Link href="/rilievi-laser-scanner-slam-brescia" className={ui.proseLink}>
                Pagina dedicata: laser scanner SLAM
              </Link>
            </p>

            <h3 id="verde-paesaggio" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-14 ${ui.scrollAnchor}`}>
              Progettazione e modellazione del verde
            </h3>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Vigneti, parchi, strade di montagna, sentieri</strong> e interventi di riqualificazione del verde, anche con supporto agronomico.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                In <strong>Franciacorta</strong>, importanti collaborazioni di progettazione paesaggistica con realtà vinicole.
              </li>
            </ul>

            <h3 id="urbanistica-pratiche" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-14 ${ui.scrollAnchor}`}>
              Urbanistica, sanatorie e pratiche edilizie
            </h3>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Lettura dei piani regolatori</strong> e degli strumenti urbanistici comunali e sovracomunali.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Sanatorie e regolarizzazioni</strong>, quando i presupposti normativi sono rispettati.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Pratiche edilizie</strong> (SCIA, CILA, permessi dove previsti) e coordinamento documentale.
              </li>
            </ul>

            <h3 id="architettura" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-14 ${ui.scrollAnchor}`}>
              Progettazione architettonica
            </h3>
            <p className={ui.body}>
              Progettazione architettonica lungo le fasi del processo edilizio, dal concept alle tavole coordinate con le altre discipline. La parte
              strutturale è affidata a professionisti esterni di fiducia.
            </p>

            <h3 id="sicurezza-assistenza" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap} mt-14 ${ui.scrollAnchor}`}>
              Sicurezza cantieri e assistenza tecnica
            </h3>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Coordinamento della sicurezza</strong> in fase di progettazione ed esecuzione (CSP e CSE).
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Assistenza immobiliare</strong>, perizie, stime e consulenze tecniche.
              </li>
            </ul>
          </article>

          <FaqSection id="servizi-faq" items={serviziFaq} />
          </div>
        </div>
      </main>
    </>
  );
}
