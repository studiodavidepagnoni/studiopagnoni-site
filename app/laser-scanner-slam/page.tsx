import type { Metadata } from "next";
import { fontDisplay } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Laser scanner SLAM — rilievo 3D e nuvola di punti (Lombardia)",
  description:
    "Rilievi con sistema mobile SLAM + GNSS RTK (RS10): nuvole di punti dense, continuità indoor/outdoor, as-built e BIM. Studio Tecnico Pagnoni, Cazzago San Martino (BS), Franciacorta e provincia di Brescia. Nord Italia.",
  alternates: { canonical: `${site.url}/laser-scanner-slam` },
  keywords: [
    "laser scanner SLAM",
    "rilievo laser scanner 3D",
    "CHCNAV RS10",
    "nuvola di punti edificio",
    "rilievo as built",
    "digitalizzazione edifici Lombardia",
    "LiDAR SLAM rilievo",
    "scanner 3D interni esterni",
    "GNSS RTK SLAM mobile",
  ],
};

export default function LaserSlamPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
          <header className="max-w-[72ch]">
            <p className={ui.pageEyebrow}>Servizi</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Laser scanner SLAM</h1>
            <div className={ui.pageTitleRule} aria-hidden />
          </header>

          <div className="space-y-8 sm:space-y-10">
            <section className={ui.innerCard} aria-labelledby="slam-rs10">
              <h2 id="slam-rs10" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap} scroll-mt-[120px]`}>
                La strumentazione
              </h2>
              <ul className="list-none space-y-3 pl-0">
                <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                  <strong>GNSS RTK, LiDAR e SLAM visuale</strong> nella stessa piattaforma: un solo strumento per
                  passare da esterni a interni mantenendo coerenza geometrica e riducendo i passaggi manuali tra
                  strumenti diversi.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                  <strong>Continuità outdoor / indoor</strong>: stesso impianto di coordinate dove possibile, con
                  transizione tra ambienti con segnale satellitare debole o assente (centri urbani densi, capannoni,
                  sotterranei) gestita dal sistema in modo integrato rispetto al solo RTK classico.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                  <strong>SLAM in tempo reale</strong>: nuvola georiferita e controlli in campo per verificare copertura
                  e completezza prima di chiudere il sopralluogo — meno sorprese in ufficio.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                  <strong>Workflow senza obbligo di &quot;loop&quot; tradizionale</strong>: percorsi più liberi sul
                  terreno o in edificio, con riduzione dei vincoli tipici di alcuni scanner handheld che richiedono
                  chiusure ad anello complesse.
                </li>
                <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                  <strong>Misure a offset da scena</strong> (modalità tipo &quot;Vi‑LiDAR&quot; del costruttore): punti
                  selezionati nell&apos;immagine con coordinate ricavate dall&apos;incrocio tra raggio RTK e nuvola —
                  utile per dettagli difficili da raggiungere con il palo, entro distanze operative dichiarate dal
                  produttore.
                </li>
              </ul>
            </section>

            <section className={ui.innerCard} aria-labelledby="slam-numeri">
              <h2 id="slam-numeri" className="sr-only">
                Dati tecnici dichiarati dal costruttore (RS10)
              </h2>
              <dl className="grid gap-4 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <dt className={`${ui.body} font-semibold text-[var(--foreground)]`}>Precisione assoluta dichiarata</dt>
                  <dd className={`${ui.body} mt-1 text-[var(--copy-body)]`}>
                    Indicativamente fino a circa <strong>5 cm</strong> in misura assoluta combinando RTK, laser e SLAM
                    visuale, nelle condizioni di prova dichiarate dal produttore.
                  </dd>
                </div>
                <div>
                  <dt className={`${ui.body} font-semibold text-[var(--foreground)]`}>Ambiente senza GNSS</dt>
                  <dd className={`${ui.body} mt-1 text-[var(--copy-body)]`}>
                    Tecnologia <strong>SFix</strong> (rover): stima di coordinate in zone con segnale satellitare
                    assente o molto debole, combinando LiDAR e SLAM visuale — utile per indoor e &quot;urban
                    canyon&quot;, con tempi di convergenza dichiarati dal costruttore.
                  </dd>
                </div>
                <div>
                  <dt className={`${ui.body} font-semibold text-[var(--foreground)]`}>Acquisizione laser</dt>
                  <dd className={`${ui.body} mt-1 text-[var(--copy-body)]`}>
                    Fino a circa <strong>320.000 punti/s</strong>, campo orizzontale <strong>360°</strong>; portata
                    dipendente da canale e riflettività.
                  </dd>
                </div>
                <div>
                  <dt className={`${ui.body} font-semibold text-[var(--foreground)]`}>Operatività in campo</dt>
                  <dd className={`${ui.body} mt-1 text-[var(--copy-body)]`}>
                    Dispositivo compatto (ordine di grandezza <strong>1,9 kg</strong> con batteria e RTK), protezione{" "}
                    <strong>IP64</strong>, batteria con sostituzione a caldo e autonomia tipica intorno a{" "}
                    <strong>un&apos;ora</strong> per batteria; storage integrato fino a <strong>512 GB</strong>.
                  </dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
