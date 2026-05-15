import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";
import { COOKIE_MIRROR_NAME, COOKIE_PREFS_STORAGE_KEY } from "@/lib/cookieConsent";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

const LAST_UPDATED = "9 maggio 2026";

export const metadata: Metadata = {
  title: "Privacy policy e cookie",
  description:
    "Informativa privacy GDPR (Reg. UE 2016/679), cookie e diritti degli interessati — Studio Tecnico Pagnoni, Italia.",
  alternates: { canonical: `${site.url}/privacy-policy` },
};

const toc = [
  { href: "#titolare", label: "Titolare" },
  { href: "#dati", label: "Dati trattati" },
  { href: "#finalita", label: "Finalità e basi giuridiche" },
  { href: "#destinatari", label: "Destinatari" },
  { href: "#trasferimenti", label: "Trasferimenti extra-UE" },
  { href: "#conservazione", label: "Conservazione" },
  { href: "#diritti", label: "Diritti" },
  { href: "#sicurezza", label: "Sicurezza" },
  { href: "#cookie", label: "Cookie" },
  { href: "#aggiornamenti", label: "Aggiornamenti" },
] as const;

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className={`${fontDisplay.className} scroll-mt-[calc(var(--header-h,80px)+16px)] text-2xl font-medium tracking-tight text-[var(--foreground)] sm:text-[1.65rem]`}
    >
      {children}
    </h2>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className={`section-shell min-h-[70vh] ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} py-10 sm:py-14`}>
          <header className="mb-10 max-w-[72ch] sm:mb-12">
            <p className={ui.pageEyebrow}>GDPR · Italia · 2026</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Privacy policy e cookie</h1>
            <div className={ui.pageTitleRule} aria-hidden />
            <p className={`${fontSans.className} ${ui.body} mt-6`}>
              Informativa resa ai sensi degli{" "}
              <strong className="font-semibold text-[var(--foreground)]">artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR)</strong> e degli artt.{" "}
              <strong className="font-semibold text-[var(--foreground)]">13–14 del D.Lgs. 196/2003</strong> (Codice Privacy), come modificato dal D.Lgs.{" "}
              <strong className="font-semibold text-[var(--foreground)]">101/2018</strong>. Documento redatto per professionisti e piccole imprese in Italia.
            </p>
            <p className={`${fontSans.className} mt-4 text-sm text-[var(--green-ink-muted)]`}>
              Ultimo aggiornamento: <time dateTime="2026-05-09">{LAST_UPDATED}</time>
            </p>
          </header>

          <div className="flex flex-col gap-12 lg:flex-row lg:gap-14 xl:gap-20">
            <nav
              aria-label="Indice della privacy policy"
              className={`${fontSans.className} lg:sticky lg:top-28 lg:h-fit lg:w-[min(100%,14rem)] lg:shrink-0`}
            >
              <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--green-ink-muted)]">Indice</p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-1">
                {toc.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex rounded-full border border-transparent px-3 py-1.5 text-[0.82rem] font-medium text-[var(--copy-body)] transition hover:border-[var(--green-border-muted)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] lg:block lg:rounded-lg lg:px-2 lg:py-1.5"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className={`${fontSans.className} min-w-0 flex-1 space-y-12 text-[var(--copy-body)]`}>
              <section className="rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] ring-1 ring-[var(--primary)]/[0.06] sm:p-8">
                <SectionTitle id="titolare">Titolare del trattamento</SectionTitle>
                <div className="home-section-rule mb-6 mt-4" aria-hidden />
                <div className="space-y-4 text-[0.98rem] leading-relaxed sm:text-[1.02rem]">
                  <p>
                    <strong className="text-[var(--foreground)]">{site.legalName}</strong>
                    <br />
                    {site.addressLine}
                  </p>
                  {site.piva ? (
                    <p>
                      <strong className="text-[var(--foreground)]">P. IVA:</strong> {site.piva}
                    </p>
                  ) : null}
                  <p>
                    <strong className="text-[var(--foreground)]">Email:</strong>{" "}
                    <a href={`mailto:${site.email}`} className={ui.proseLink}>
                      {site.email}
                    </a>
                  </p>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">Telefono</p>
                    <ul className="mt-2 space-y-2">
                      {site.phones.map((p) => (
                        <li key={p.tel}>
                          <span className="text-[var(--green-ink-muted)]">{p.label}</span> —{" "}
                          <a href={`tel:${p.tel}`} className={ui.proseLink}>
                            {p.display}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="rounded-xl border border-[var(--green-border-muted)] bg-[var(--muted)] px-4 py-3 text-[0.92rem] text-[var(--copy-body)]">
                    <strong className="text-[var(--foreground)]">Responsabile della protezione dei dati (DPO):</strong> non è stato nominato un DPO in quanto,
                    alla luce delle attività di trattamento effettuate tramite questo sito, non ricorrono gli obblighi di cui all&apos;{" "}
                    <strong className="text-[var(--foreground)]">art. 37 GDPR</strong>.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle id="dati">Dati personali trattati</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <div className={`${ui.body} space-y-4`}>
                  <p>
                    Attraverso il sito possono essere trattati <strong className="text-[var(--foreground)]">dati identificativi e di contatto</strong>{" "}
                    (ad es. nome e cognome, indirizzo email, numero di telefono se fornito, oggetto della richiesta, eventuali altri dati inseriti volontariamente nel testo del messaggio),{" "}
                    <strong className="text-[var(--foreground)]">dati di navigazione tecnici</strong> (ad es. indirizzo IP, timestamp, tipo di browser, pagine visitate nei limiti dei log del server / CDN),
                    nonché <strong className="text-[var(--foreground)]">dati raccolti tramite cookie e tecnologie simili</strong>, secondo quanto indicato nella sezione Cookie.
                  </p>
                  <p>
                    La compilazione del modulo di contatto è <strong className="text-[var(--foreground)]">facoltativa</strong>, ma necessaria per ricevere una risposta tramite i canali indicati nel form.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <SectionTitle id="finalita">Finalità, basi giuridiche e modalità</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={ui.innerCard + " border-[var(--green-border-muted)]"}>
                    <p className={`${fontSans.className} text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--primary-mid)]`}>Contatti</p>
                    <h3 className={`${fontDisplay.className} mt-2 text-lg font-semibold text-[var(--foreground)]`}>Rispondere alle richieste</h3>
                    <p className={`${ui.body} mt-3`}>
                      Gestione delle richieste inviate tramite modulo email / Formspree o indirizzo di posta elettronica.
                    </p>
                    <p className={`${fontSans.className} mt-4 text-[0.85rem] font-semibold text-[var(--foreground)]`}>Base giuridica</p>
                    <p className={`${ui.body} mt-1`}>Art. 6, comma 1, lett. <strong>b</strong> GDPR (misure precontrattuali su richiesta dell&apos;interessato).</p>
                  </div>
                  <div className={ui.innerCard + " border-[var(--green-border-muted)]"}>
                    <p className={`${fontSans.className} text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--primary-mid)]`}>Obblighi & sicurezza</p>
                    <h3 className={`${fontDisplay.className} mt-2 text-lg font-semibold text-[var(--foreground)]`}>Sito web e sicurezza</h3>
                    <p className={`${ui.body} mt-3`}>
                      Funzionamento tecnico del sito, gestione della sicurezza informatica, eventuali log strettamente necessari alla stabilità del servizio.
                    </p>
                    <p className={`${fontSans.className} mt-4 text-[0.85rem] font-semibold text-[var(--foreground)]`}>Base giuridica</p>
                    <p className={`${ui.body} mt-1`}>Art. 6, comma 1, lett. <strong>f</strong> GDPR (legittimo interesse del Titolare a garantire sicurezza e continuità del sito), salvo diversa disciplina per i cookie (vedi sezione Cookie).</p>
                  </div>
                  <div className={`${ui.innerCard} border-[var(--green-border-muted)] sm:col-span-2`}>
                    <p className={`${fontSans.className} text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-warm)]`}>Facoltativo</p>
                    <h3 className={`${fontDisplay.className} mt-2 text-lg font-semibold text-[var(--foreground)]`}>Google Maps (incorporamento)</h3>
                    <p className={`${ui.body} mt-3`}>
                      Visualizzazione della mappa sulla pagina Contatti. Il caricamento dell&apos;iframe comporta potenziali trattamenti da parte di Google LLC / Google Ireland Limited secondo le proprie informative.
                    </p>
                    <p className={`${fontSans.className} mt-4 text-[0.85rem] font-semibold text-[var(--foreground)]`}>Base giuridica</p>
                    <p className={`${ui.body} mt-1`}>Art. 6, comma 1, lett. <strong>a</strong> GDPR — <strong className="text-[var(--foreground)]">consenso</strong>, raccolto tramite banner cookie con possibilità di rifiuto e revoca in qualsiasi momento.</p>
                  </div>
                </div>
                <p className={`${ui.body}`}>
                  Il trattamento è effettuato con strumenti informatici e telematici, con logiche strettamente correlate alle finalità sopra indicate e secondo il principio di minimizzazione (art. 5 GDPR).
                </p>
              </section>

              <section className="space-y-4">
                <SectionTitle id="destinatari">Destinatari e responsabili del trattamento</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <ul className={`${ui.body} list-none space-y-3`}>
                  <li className="flex gap-3 rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary-mid)]" aria-hidden />
                    <span>
                      <strong className="text-[var(--foreground)]">Personale autorizzato</strong> del Titolare, nei limiti delle proprie mansioni.
                    </span>
                  </li>
                  <li className="flex gap-3 rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary-mid)]" aria-hidden />
                    <span>
                      <strong className="text-[var(--foreground)]">Fornitore di hosting / pubblicazione sito</strong> (infrastruttura che ospita i file del sito e gestisce la consegna dei contenuti), nella qualità di Responsabile del trattamento o Incaricato, a seconda dei contratti applicabili.
                    </span>
                  </li>
                  <li className="flex gap-3 rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary-mid)]" aria-hidden />
                    <span>
                      <strong className="text-[var(--foreground)]">Formspree</strong> (Element Labs, Inc.) per l&apos;invio dei messaggi dal modulo di contatto, quando il servizio è attivo: opera tipicamente come Responsabile del trattamento ai sensi dell&apos;art. 28 GDPR.{" "}
                      <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                        Privacy Policy Formspree
                      </a>
                      .
                    </span>
                  </li>
                  <li className="flex gap-3 rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)] px-4 py-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary-mid)]" aria-hidden />
                    <span>
                      <strong className="text-[var(--foreground)]">Google</strong> (Google Ireland Limited / Google LLC) per i servizi di mappe incorporate previo consenso.{" "}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                        Privacy Google
                      </a>
                      {" · "}
                      <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                        Cookie Google
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <SectionTitle id="trasferimenti">Trasferimenti verso paesi terzi</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <p className={ui.body}>
                  Alcuni fornitori (es. Formspree, Google) possono trattare dati anche tramite infrastrutture ubicate <strong className="text-[var(--foreground)]">fuori dallo Spazio Economico Europeo</strong>. In tali ipotesi il trasferimento avviene nel rispetto del Capo V GDPR, inclusi{" "}
                  <strong className="text-[var(--foreground)]">decisioni di adeguatezza della Commissione UE</strong>, ove adottate, oppure{" "}
                  <strong className="text-[var(--foreground)]">garanzie appropriate</strong> (es. Clausole Contrattuali Standard — SCC — integrate da misure supplementari ove richiesto dalla giurisprudenza e dalle linee guida).
                </p>
              </section>

              <section className="space-y-4">
                <SectionTitle id="conservazione">Conservazione dei dati</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <ul className={`${ui.body} list-disc space-y-2 pl-6`}>
                  <li>
                    <strong className="text-[var(--foreground)]">Richieste di contatto:</strong> per il tempo necessario a dare riscontro e, successivamente, per eventuali ulteriori periodi solo se sussiste un obbligo legittimo di conservazione documentale o tutela di diritti in sede contenziosa (limitazione nel tempo e proporzionata).
                  </li>
                  <li>
                    <strong className="text-[var(--foreground)]">Log tecnici:</strong> secondo i cicli di rotazione applicati dal fornitore di hosting / CDN e comunque nei limiti necessari alla sicurezza.
                  </li>
                  <li>
                    <strong className="text-[var(--foreground)]">Preferenze cookie:</strong> fino a <strong className="text-[var(--foreground)]">12 mesi</strong> dall&apos;ultimo aggiornamento, salvo rinnovo del consenso o cancellazione da parte dell&apos;utente.
                  </li>
                </ul>
              </section>

              <section className="space-y-5">
                <SectionTitle id="diritti">Diritti degli interessati</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <p className={ui.body}>Ai sensi degli artt. 15–22 GDPR, nei limiti e alle condizioni previste dalla legge, lei ha diritto di:</p>
                <ul className={`${ui.body} grid gap-2 sm:grid-cols-2`}>
                  {[
                    [
                      "Accesso",
                      "ottenere conferma dell'esistenza dei trattamenti e informazioni su finalità, categorie di dati, destinatari, conservazione.",
                    ],
                    ["Rettifica", "correggere dati inesatti o integrare dati incompleti."],
                    [
                      "Cancellazione",
                      "ottenere la cancellazione dei dati quando sussistono le condizioni previste (diritto all'oblio).",
                    ],
                    ["Limitazione", "ottenere la limitazione del trattamento nelle ipotesi di cui all'art. 18 GDPR."],
                    ["Portabilità", "ricevere i dati forniti in formato strutturato e trasmetterli ad altro titolare, ove applicabile."],
                    ["Opposizione", "opporsi al trattamento basato su legittimo interesse, salvo motivi legittimi prevalenti del titolare."],
                    [
                      "Revoca del consenso",
                      "revocare il consenso in qualsiasi momento senza pregiudicare la liceità del trattamento precedente.",
                    ],
                  ].map(([t, d]) => (
                    <li key={t} className="rounded-xl border border-[var(--green-border-muted)] bg-[var(--muted)] px-4 py-3">
                      <strong className="text-[var(--foreground)]">{t}</strong>
                      <span className="mt-1 block text-[0.9rem] leading-snug text-[var(--copy-body)]">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-[var(--primary-mid)]/30 bg-[var(--primary)]/[0.07] p-6 sm:p-8">
                  <h3 className={`${fontDisplay.className} text-lg font-semibold text-[var(--foreground)]`}>Come esercitare i diritti</h3>
                  <p className={`${ui.body} mt-3`}>
                    Può inviare una richiesta a{" "}
                    <a href={`mailto:${site.email}`} className={ui.proseLink}>
                      {site.email}
                    </a>
                    . Il Titolare risponderà entro <strong className="text-[var(--foreground)]">un mese</strong> (prorogabile di ulteriori due mesi in casi complessi, con motivazione).
                  </p>
                  <p className={`${ui.body} mt-4`}>
                    <strong className="text-[var(--foreground)]">Reclamo:</strong> ha il diritto di proporre reclamo all&apos;Autorità di controllo italiana —{" "}
                    <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                      Garante per la protezione dei dati personali
                    </a>{" "}
                    (<a href="https://www.garanteprivacy.it/home/footer/contatti" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                      contatti
                    </a>
                    ).
                  </p>
                  <div className="mt-6">
                    <CookiePreferencesButton />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <SectionTitle id="sicurezza">Sicurezza</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <p className={ui.body}>
                  Il Titolare adotta misure tecniche e organizzative appropriate (art. 32 GDPR) commisurate al rischio, inclusi protocolli HTTPS per la navigazione del sito ove implementati dal provider, aggiornamenti di sicurezza sul codice applicativo e gestione degli accessi ai sistemi di posta e ai servizi terzi utilizzati.
                </p>
                <p className={ui.body}>
                  <strong className="text-[var(--foreground)]">Automazione e profilazione:</strong> non sono effettuate decisioni interamente automatizzate che producano effetti giuridici o incidano significativamente sulla persona, né trattamenti di profilazione ai sensi dell&apos;art. 22 GDPR tramite questo sito.
                </p>
                <p className={ui.body}>
                  <strong className="text-[var(--foreground)]">Minori:</strong> il sito non è destinato a minori di 14 anni e non viene raccolta consapevolmente alcuna informazione da minori.
                </p>
              </section>

              <section id="cookie" className="scroll-mt-[calc(var(--header-h,80px)+16px)] space-y-8">
                <div>
                  <SectionTitle id="cookie-heading">Cookie e tecnologie simili</SectionTitle>
                  <div className="home-section-rule mt-4" aria-hidden />
                  <p className={`${ui.body} mt-4`}>
                    Questo sito utilizza cookie e storage locale secondo il principio di <strong className="text-[var(--foreground)]">granularità del consenso</strong>: i cookie strettamente necessari sono sempre attivi; gli incorporamenti di terze parti (Google Maps) sono attivati solo previo consenso libero, specifico e informato, revocabile in ogni momento tramite il banner o il pulsante qui sotto.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[var(--green-border-muted)] bg-[var(--card)]">
                  <table className={`${fontSans.className} w-full min-w-[560px] text-left text-[0.85rem] sm:text-[0.9rem]`}>
                    <caption className="sr-only">Elenco cookie e tecnologie di memorizzazione locale</caption>
                    <thead>
                      <tr className="border-b border-[var(--green-border-muted)] bg-[var(--muted)] text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--green-ink-muted)]">
                        <th scope="col" className="px-4 py-3 font-bold">
                          Nome / chiave
                        </th>
                        <th scope="col" className="px-4 py-3 font-bold">
                          Tipologia
                        </th>
                        <th scope="col" className="px-4 py-3 font-bold">
                          Finalità
                        </th>
                        <th scope="col" className="px-4 py-3 font-bold">
                          Durata max
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--copy-body)]">
                      <tr className="border-b border-[var(--green-border-muted)]">
                        <td className="px-4 py-3 font-mono text-[0.78rem] text-[var(--foreground)]">{COOKIE_MIRROR_NAME}</td>
                        <td className="px-4 py-3">Tecnico necessario</td>
                        <td className="px-4 py-3">Memorizza sintesi della scelta su incorporamenti (valore 0/1). Facilita lettura coerente tra sessioni.</td>
                        <td className="px-4 py-3">12 mesi</td>
                      </tr>
                      <tr className="border-b border-[var(--green-border-muted)]">
                        <td className="px-4 py-3 font-mono text-[0.78rem] text-[var(--foreground)]">{COOKIE_PREFS_STORAGE_KEY}</td>
                        <td className="px-4 py-3">Tecnico necessario (storage locale)</td>
                        <td className="px-4 py-3">Memorizza preferenze cookie (JSON). Include timestamp ultimo aggiornamento.</td>
                        <td className="px-4 py-3">12 mesi</td>
                      </tr>
                      <tr className="border-b border-[var(--green-border-muted)] bg-[var(--muted)]/40">
                        <td className="px-4 py-3 font-mono text-[0.78rem] text-[var(--foreground)]">cookie_consent_studio_pagnoni</td>
                        <td className="px-4 py-3">Legacy (deprecato)</td>
                        <td className="px-4 py-3">Chiave precedente accetta/rifiuta: viene rimossa automaticamente al salvataggio delle nuove preferenze.</td>
                        <td className="px-4 py-3">—</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-[var(--foreground)]">Cookie Google</td>
                        <td className="px-4 py-3">Terze parti</td>
                        <td className="px-4 py-3">Possono essere installati da Google quando si carica Maps; dipendono dalla configurazione del servizio e dal browser.</td>
                        <td className="px-4 py-3">Variabile (vedi policy Google)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <details className="group rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)] open:border-[var(--primary-mid)]/35 open:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <summary
                    className={`${fontDisplay.className} cursor-pointer list-none px-5 py-4 text-lg font-medium text-[var(--foreground)] transition hover:text-[var(--primary-mid)] sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      Dettaglio per tipologia
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--green-border-muted)] bg-[var(--muted)] text-[var(--primary-mid)] transition group-open:rotate-180" aria-hidden>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-[var(--green-border-muted)] px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
                    <div className="space-y-6 pt-4">
                      <div>
                        <h4 className={`${fontSans.className} font-bold text-[var(--foreground)]`}>Cookie tecnici strettamente necessari</h4>
                        <p className={`${ui.body} mt-2`}>
                          Consentono il funzionamento del sito e la memorizzazione della scelta privacy/cookie. Base giuridica:{" "}
                          <strong className="text-[var(--foreground)]">art. 6, comma 1, lett. f GDPR</strong> (legittimo interesse / erogazione del servizio richiesto) e, per quanto riguarda il cookie di consenso, anche{" "}
                          <strong className="text-[var(--foreground)]">art. 122 D.Lgs. 196/2003</strong> e linee guida del Garante Privacy.
                        </p>
                      </div>
                      <div>
                        <h4 className={`${fontSans.className} font-bold text-[var(--foreground)]`}>Terze parti — Google Maps</h4>
                        <p className={`${ui.body} mt-2`}>
                          Caricato solo dopo consenso. Può comportare trattamenti ulteriori da parte di Google (anche analytics o personalizzazione secondo policy Google). Si invita a consultare le informative aggiornate del fornitore.
                        </p>
                      </div>
                      <div>
                        <h4 className={`${fontSans.className} font-bold text-[var(--foreground)]`}>Gestione dal browser</h4>
                        <p className={`${ui.body} mt-2`}>
                          Può cancellare cookie e dati memorizzati dal browser in qualsiasi momento. La disabilitazione dei cookie tecnici può compromettere alcune funzioni (es. salvataggio preferenze).
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                <div className="flex flex-wrap gap-3">
                  <CookiePreferencesButton />
                  <Link href="/contatti" className={`${fontSans.className} ${ui.btnOutline} inline-flex min-h-[44px] items-center justify-center px-6`}>
                    Pagina Contatti
                  </Link>
                </div>
              </section>

              <section className="space-y-4 border-t border-[var(--green-border-muted)] pt-12">
                <SectionTitle id="aggiornamenti">Aggiornamenti</SectionTitle>
                <div className="home-section-rule mt-4" aria-hidden />
                <p className={ui.body}>
                  Il Titolare può modificare la presente informativa per adeguamenti normativi, aggiornamenti del sito o delle funzionalità (es. nuovi servizi di terze parti). Si consiglia di consultare periodicamente questa pagina: la data di ultimo aggiornamento è indicata in testa al documento.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
