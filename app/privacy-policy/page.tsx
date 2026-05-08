import type { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";
import { fontDisplay } from "@/lib/fonts";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali e cookie — Studio Tecnico Pagnoni.",
  alternates: { canonical: `${site.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={layoutContentMaxClass}>
          <article className="max-w-[860px]">
            <p className={ui.pageEyebrow}>Legale</p>
            <h1 className={`${fontDisplay.className} ${ui.pageTitle} mb-4 sm:mb-5`}>Privacy policy</h1>
            <div className={ui.pageTitleRule} aria-hidden />

            <p className={`${ui.body} mb-8 sm:mb-10`}>
              <strong>Titolare del trattamento:</strong> {site.legalName} – {site.addressLine}
              {site.piva ? (
                <>
                  {" "}
                  – P.IVA {site.piva}
                </>
              ) : null}{" "}
              – Email:{" "}
              <a href={`mailto:${site.email}`} className={ui.proseLink}>
                {site.email}
              </a>
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Finalità del trattamento</h2>
            <p className={ui.body}>
              I dati personali raccolti tramite il modulo di contatto (nome, email e messaggio) vengono utilizzati esclusivamente per rispondere alle
              richieste inviate dagli utenti.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Base giuridica</h2>
            <p className={ui.body}>Il trattamento è basato sul consenso esplicito dell&apos;interessato.</p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Modalità di trattamento</h2>
            <p className={ui.body}>
              I dati vengono inviati via email e non sono salvati su database o condivisi con terze parti.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Conservazione dei dati</h2>
            <p className={ui.body}>I dati saranno conservati solo per il tempo necessario a evadere la richiesta.</p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Diritti dell&apos;interessato</h2>
            <p className={ui.body}>
              L&apos;utente può in qualsiasi momento richiedere l&apos;accesso, la rettifica o la cancellazione dei propri dati scrivendo a{" "}
              <strong>
                <a href={`mailto:${site.email}`} className={ui.proseLink}>
                  {site.email}
                </a>
              </strong>
              .
            </p>
            <p className={`${ui.body} mt-4`}>
              Hai inoltre il diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali (Italia) se ritieni che il trattamento
              violi la normativa applicabile.
            </p>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Trasferimenti e fornitori terzi</h2>
            <p className={ui.body}>
              Alcuni fornitori tecnici (es. Google Maps, Formspree) possono trattare dati anche al di fuori dello Spazio Economico Europeo. In tali casi il
              trattamento avviene secondo le garanzie previste dal GDPR (es. clausole contrattuali standard e misure supplementari ove applicabili), come
              indicate nelle policy dei rispettivi fornitori.
            </p>

            <h2 id="cookie" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-14 scroll-mt-[120px]`}>
              Cookie
            </h2>
            <p className={`${ui.body} mb-10`}>
              Questo sito utilizza cookie per garantire il corretto funzionamento e migliorare l&apos;esperienza di navigazione. Di seguito trovi tutte le
              informazioni sulle tipologie di cookie utilizzate e su come gestirle, in conformità con il Regolamento Generale sulla Protezione dei Dati
              (GDPR) e la normativa italiana in materia.
            </p>

            <div className="space-y-6 sm:space-y-8">
              <div className={ui.innerCard}>
                <h3 className={`${fontDisplay.className} mb-3 text-lg font-semibold text-[var(--foreground)]`}>Cookie tecnici (necessari)</h3>
                <p className={`${ui.body} mb-3`}>
                  Cookie strettamente necessari per il funzionamento del sito. Questi cookie non richiedono il consenso dell&apos;utente secondo la normativa
                  vigente (art. 122 del D.Lgs. 196/2003) e non possono essere disabilitati:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-[var(--copy-body)]">
                  <li>
                    <strong>Cookie di sessione</strong>: utilizzati per mantenere la sessione durante la navigazione. Durata: sessione (eliminati alla
                    chiusura del browser)
                  </li>
                  <li>
                    <strong>Cookie di preferenze</strong>: utilizzati per ricordare le preferenze dell&apos;utente (es. consenso cookie). Nome:{" "}
                    <code className="rounded-sm bg-[var(--muted)] px-1.5 py-0.5 text-sm text-[var(--foreground)]">cookie_consent_studio_pagnoni</code>. Durata: 365 giorni
                  </li>
                </ul>
                <p className={`${ui.body} mt-3`}>
                  <strong>Base giuridica:</strong> Interesse legittimo del titolare (art. 6, comma 1, lett. f GDPR)
                </p>
              </div>

              <div className={ui.innerCard}>
                <h3 className={`${fontDisplay.className} mb-3 text-lg font-semibold text-[var(--foreground)]`}>Cookie di terze parti</h3>
                <p className={`${ui.body} mb-3`}>
                  In alcune pagine del sito (pagina Contatti) viene utilizzato <strong>Google Maps</strong> per visualizzare la mappa della nostra sede.
                  Google Maps può impostare cookie di terze parti per il funzionamento del servizio, tra cui:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-[var(--copy-body)]">
                  <li>Cookie di funzionalità per la visualizzazione della mappa</li>
                  <li>Cookie di preferenze per personalizzare la visualizzazione</li>
                  <li>Cookie analitici per statistiche di utilizzo (se abilitati da Google)</li>
                </ul>
                <p className={`${ui.body} mt-3`}>
                  Questi cookie vengono caricati <strong>solo dopo aver accettato</strong> l&apos;informativa sui cookie tramite il banner di consenso. La
                  durata dei cookie di Google Maps varia in base al tipo (da sessione a 2 anni).
                </p>
                <p className={`${ui.body} mt-3`}>
                  Per maggiori informazioni consulta la{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                    Privacy Policy di Google
                  </a>{" "}
                  e la{" "}
                  <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                    Cookie Policy di Google
                  </a>
                  .
                </p>
                <p className={`${ui.body} mt-3`}>
                  <strong>Base giuridica:</strong> Consenso dell&apos;interessato (art. 6, comma 1, lett. a GDPR)
                </p>
              </div>

              <div className={ui.innerCard}>
                <h3 className={`${fontDisplay.className} mb-3 text-lg font-semibold text-[var(--foreground)]`}>Form di contatto</h3>
                <p className={`${ui.body} mb-3`}>
                  Il form di contatto utilizza il servizio <strong>Formspree</strong> per l&apos;invio delle email. Formspree utilizza esclusivamente cookie
                  tecnici necessari per il corretto funzionamento del servizio di invio form. Questi cookie non vengono utilizzati per finalità di
                  profilazione o marketing.
                </p>
                <p className={ui.body}>
                  I dati inviati tramite il form vengono processati da Formspree in conformità con la loro privacy policy. Per maggiori informazioni consulta
                  la{" "}
                  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                    Privacy Policy di Formspree
                  </a>
                  .
                </p>
                <p className={`${ui.body} mt-3`}>
                  <strong>Base giuridica:</strong> Esecuzione di un contratto o misure precontrattuali (art. 6, comma 1, lett. b GDPR)
                </p>
              </div>

              <div className="rounded-lg border border-[var(--primary)] bg-[var(--primary)] p-5 text-[#04100e] sm:p-7">
                <h3 className={`${fontDisplay.className} mb-3 text-lg font-semibold text-[#04100e]`}>Gestione dei cookie</h3>
                <p className="mb-3 text-[0.98rem] leading-relaxed text-[#04100e]/90 sm:text-[1.05rem]">
                  È possibile gestire le preferenze sui cookie attraverso il banner che appare al primo accesso al sito. I cookie tecnici non possono essere
                  disabilitati in quanto necessari al funzionamento del sito.
                </p>
                <p className="mb-3 text-[0.98rem] leading-relaxed text-[#04100e]/90 sm:text-[1.05rem]">
                  Per modificare le preferenze sui cookie, è possibile cancellare i cookie del browser e ricaricare la pagina. In alternativa, è possibile
                  gestire i cookie direttamente dalle impostazioni del browser utilizzato. Per maggiori informazioni sui cookie e su come gestirli, è
                  possibile consultare il sito{" "}
                  <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                    www.allaboutcookies.org
                  </a>
                  .
                </p>
                <p className="text-[0.98rem] text-[#04100e]/90 sm:text-[1.05rem]">
                  <strong>Nota:</strong> La disabilitazione dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.
                </p>
                <div className="mt-5">
                  <CookiePreferencesButton />
                </div>
              </div>
            </div>

            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-4 mt-12`}>Aggiornamenti dell&apos;informativa</h2>
            <p className={ui.body}>
              Questa informativa può essere aggiornata per allineamento normativo o evoluzione tecnica del sito. Data ultimo aggiornamento:{" "}
              <strong>06/04/2026</strong>.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
