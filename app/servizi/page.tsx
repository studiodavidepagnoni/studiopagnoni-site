import type { Metadata } from "next";
import Link from "next/link";
import { fontDisplay } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Servizi di topografia, laser SLAM e progettazione",
  description:
    "Topografia e rilievi GNSS, laser scanner SLAM, progettazione del verde, urbanistica, architettura, pratiche edilizie, CSP/CSE e assistenza immobiliare — Studio Tecnico Pagnoni, Cazzago San Martino (BS), Franciacorta e provincia di Brescia. Nord Italia.",
  alternates: { canonical: `${site.url}/servizi` },
  keywords: [
    "servizi topografici Brescia",
    "rilievo planoaltimetrico Lombardia",
    "laser scanner edifici",
    "coordinamento sicurezza cantieri CSP CSE",
    "pratiche edilizie Cazzago San Martino",
  ],
};

export default function ServiziPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
          <header className="w-full">
            <p className={ui.pageEyebrow}>Cosa facciamo</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Servizi</h1>
            <div className={ui.pageTitleRule} aria-hidden />
            <p className={`${ui.body} max-w-5xl`}>
              Lo <strong>Studio Tecnico Pagnoni</strong> affianca privati, imprese e professionisti su <strong>misura del territorio</strong>,{" "}
              <strong>digitalizzazione laser</strong> e <strong>iter edilizio</strong>. La progettazione strutturale non è svolta in proprio: quando
              serve, si integrano <strong>collaboratori esterni</strong> (ingegneri strutturisti), con un referente unico se la commessa lo richiede.
            </p>
          </header>

          <section aria-labelledby="intro-topografia-slam">
            <h2 id="intro-topografia-slam" className={`${fontDisplay.className} ${ui.cardHeading} mb-3 sm:mb-4`}>
              Cos&apos;è la topografia · Cos&apos;è il laser SLAM
            </h2>
            <p className={`${ui.bodyMuted} mb-8 max-w-5xl`}>
              Qui sotto, in breve, cosa si intende per queste due attività; più sotto trovi l&apos;elenco completo dei servizi per ambito, con gli stessi
              link usati dalla home.
            </p>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <Link
                href="/topografia"
                className="group flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary-mid)] bg-[var(--card)] p-6 transition hover:border-[var(--green-border)] hover:border-t-[var(--accent-warm)] sm:p-8"
              >
                <span className={`${fontDisplay.className} text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-mid)]`}>
                  Topografia e rilievi
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[var(--copy-body)]">
                  La <strong>topografia</strong> applicata ai cantieri e alla progettazione è la disciplina che, partendo da misure sul campo, restituisce
                  la forma del terreno e la posizione degli elementi in coordinate affidabili: rilievi <strong>planoaltimetrici</strong>, curve di livello,
                  confini, volumi e tracciamenti. In studio si usano ricevitori <strong>GPS/GNSS</strong> (anche in modalità di alta precisione) e{" "}
                  <strong>stazione totale</strong> per allineare la documentazione a catasto, progetto e cantieristica.
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--accent-warm)] group-hover:underline">Approfondisci la topografia →</span>
              </Link>
              <Link
                href="/laser-scanner-slam"
                className="group flex flex-col rounded-lg border border-[var(--green-border-muted)] border-t-4 border-t-[var(--primary)] bg-[var(--card)] p-6 transition hover:border-[var(--green-border)] hover:border-t-[var(--accent-warm)] sm:p-8"
              >
                <span className={`${fontDisplay.className} text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary-mid)]`}>
                  Laser scanner SLAM
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-[var(--copy-body)]">
                  Il <strong>laser scanner</strong> misura migliaia di punti al secondo generando una <strong>nuvola di punti</strong> 3D dello spazio
                  rilevato. Con la tecnologia <strong>SLAM</strong> (localizzazione e mappa in tempo reale) lo strumento ricostruisce la geometria mentre si
                  percorre l&apos;ambiente, senza dover piantare la strumentazione come negli scanner statici: è utile per edifici complessi, impianti e
                  grandi volumi da documentare in tempi contenuti, spesso integrando il rilievo topografico classico.
                </p>
                <span className="mt-6 text-sm font-semibold text-[var(--accent-warm)] group-hover:underline">Approfondisci il laser SLAM →</span>
              </Link>
            </div>
          </section>

          <article className={ui.innerCard}>
            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-8 border-b border-[var(--green-border-muted)] pb-4`}>
              Elenco per ambito
            </h2>

            <h3 id="topografia-rilievi" className={`${fontDisplay.className} ${ui.cardHeading} mt-2 scroll-mt-[120px]`}>
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

            <h3 id="laser-slam" className={`${fontDisplay.className} ${ui.cardHeading} mt-14 scroll-mt-[120px]`}>
              Laser scanner SLAM e nuvole di punti
            </h3>
            <p className={`${ui.body} mb-4`}>
              Il <strong>laser scanner basato su tecnologia SLAM</strong> consente di documentare edifici e spazi complessi con dense{" "}
              <strong>nuvole di punti</strong>, utili per rilievi as-built, impianti e comunicazione dello stato dei luoghi.
            </p>
            <p className="mt-4">
              <Link href="/laser-scanner-slam" className={ui.proseLink}>
                Pagina dedicata: laser scanner SLAM
              </Link>
            </p>

            <h3 id="verde-paesaggio" className={`${fontDisplay.className} ${ui.cardHeading} mt-14 scroll-mt-[120px]`}>
              Progettazione e modellazione del verde
            </h3>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Vigneti, parchi, strade di montagna, sentieri</strong> e interventi di riqualificazione del verde, anche con supporto agronomico.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                Collaborazioni con realtà viticole in <strong>Franciacorta</strong> (es. <strong>Ca&apos; del Bosco</strong>) su percorsi di progettazione
                paesaggistica.
              </li>
            </ul>

            <h3 id="urbanistica-pratiche" className={`${fontDisplay.className} ${ui.cardHeading} mt-14 scroll-mt-[120px]`}>
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

            <h3 id="architettura" className={`${fontDisplay.className} ${ui.cardHeading} mt-14 scroll-mt-[120px]`}>
              Progettazione architettonica
            </h3>
            <p className={ui.body}>
              Progettazione architettonica lungo le fasi del processo edilizio, dal concept alle tavole coordinate con le altre discipline. La parte
              strutturale è affidata a professionisti esterni di fiducia.
            </p>

            <h3 id="sicurezza-assistenza" className={`${fontDisplay.className} ${ui.cardHeading} mt-14 scroll-mt-[120px]`}>
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
        </div>
      </div>
    </main>
  );
}
