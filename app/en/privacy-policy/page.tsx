import Link from "next/link";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { COOKIE_MIRROR_NAME, COOKIE_PREFS_STORAGE_KEY } from "@/lib/privacy/cookieConsent";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { PRIVACY_CONSENT_VERSION } from "@/lib/security/csp";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Privacy policy and cookies",
    description:
      "GDPR privacy notice and cookies for studiopagnoni.com — Studio Architettura Pagnoni, Cazzago San Martino (BS).",
    path: "/en/privacy-policy",
  }),
  alternates: localeAlternates("/privacy-policy"),
};

export default function EnPrivacyPage() {
  return (
    <>
      <StaticPageHero path="/en/privacy-policy" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} max-w-[72ch] space-y-8 py-10 sm:py-14`}>
            <header className="space-y-3">
              <p className={`${fontSans.className} ${ui.body}`}>
                Notice under Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR) and the Italian Privacy Code. The
                Italian page is the controlling text if the two versions ever diverge.
              </p>
              <p className={`${fontSans.className} text-sm text-[var(--green-ink-muted)]`}>
                Last updated: <time dateTime="2026-11-22">22 November 2026</time> ({PRIVACY_CONSENT_VERSION})
              </p>
            </header>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Controller</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                <strong className="text-[var(--foreground)]">{site.legalName}</strong>, {site.addressLine}.
                {site.piva ? ` VAT no. ${site.piva}.` : ""} Email{" "}
                <a href={`mailto:${site.email}`} className={ui.proseLink}>
                  {site.email}
                </a>
                . No data protection officer has been appointed: Article 37 GDPR does not apply to the processing done
                through this site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Data we process</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Contact details you type into the form (name, email, subject, town, type of request and, for a SLAM
                survey, approximate area and deliverable, plus the message). Technical logs (IP address, time, browser,
                pages) kept by GitHub Pages and the Fastly CDN. Cookies and similar storage, as listed below. The form
                is optional; we need it only to reply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Purposes and legal bases</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Replies to enquiries: Article 6(1)(b) GDPR (steps before a contract, at your request). Running and
                securing the site, including host logs: Article 6(1)(f) (legitimate interest). Google Maps on the
                contact page, including the fonts and place data the map itself loads: Article 6(1)(a), consent, which
                you can refuse or withdraw. We do not run analytics, advertising pixels or reCAPTCHA.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Recipients</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Staff of the controller. <strong className="text-[var(--foreground)]">GitHub, Inc.</strong> (GitHub
                Pages) publishes the static files. <strong className="text-[var(--foreground)]">Fastly, Inc.</strong> is
                the CDN GitHub Pages uses; pages are often served from an edge in the EEA (Frankfurt). Both process
                technical logs, including the IP address.{" "}
                <strong className="text-[var(--foreground)]">Formspree</strong> (Element Labs, Inc.) receives the form
                only when that service is connected. Without a Formspree id the message opens in your own mail program
                and does not pass through Formspree. <strong className="text-[var(--foreground)]">Google</strong>{" "}
                (Google Ireland Limited / Google LLC) receives data only after you allow the map. Hosts loaded with the
                embed: maps.google.com, maps.gstatic.com, maps.googleapis.com, fonts.googleapis.com, fonts.gstatic.com,
                places.googleapis.com.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Transfers outside the EEA</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                GitHub, Fastly, Formspree (if active) and Google may process data outside the European Economic Area.
                Those transfers rely on an EU adequacy decision or on standard contractual clauses, with extra measures
                where the law requires them.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>How long we keep data</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Contact requests: 24 months from our reply, or from the end of the job if one follows. A longer period
                applies only when a legal duty or a dispute requires it. Technical logs: for the rotation period set by
                GitHub Pages and Fastly. Cookie preferences: up to 12 months from the last update.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Your rights</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Access, rectification, erasure, restriction, portability, objection, and withdrawal of consent. Write to{" "}
                <a href={`mailto:${site.email}`} className={ui.proseLink}>
                  {site.email}
                </a>
                . We answer within one month. You may lodge a complaint with the Italian authority, the{" "}
                <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer" className={ui.proseLink}>
                  Garante per la protezione dei dati personali
                </a>
                . This site does not take solely automated decisions and is not aimed at children under 14.
              </p>
              <CookiePreferencesButton label="Review cookie preferences" />
            </section>

            <section id="cookie" className="scroll-anchor space-y-3">
              <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Cookies</h2>
              <p className={`${fontSans.className} ${ui.body}`}>
                Essential storage is always on. Google Maps loads only after consent. The choice stores the date and
                this notice version on your device ({COOKIE_PREFS_STORAGE_KEY} and the cookie {COOKIE_MIRROR_NAME}).
                The site has no application server, so the controller does not receive a separate copy of that choice.
                If a message is sent through Formspree, the privacy-consent time and version travel with the message.
              </p>
              <ul className={`${fontSans.className} ${ui.body} list-disc space-y-2 pl-5`}>
                <li>
                  <span className="font-mono text-[0.85em]">{COOKIE_MIRROR_NAME}</span> — essential, 12 months. Stores 0
                  or 1 for the map choice.
                </li>
                <li>
                  <span className="font-mono text-[0.85em]">{COOKIE_PREFS_STORAGE_KEY}</span> — essential local storage,
                  12 months. Preferences, timestamp and policy version.
                </li>
                <li>NID — Google, up to 6 months, map preferences. Set only after consent, and only if the browser allows third-party cookies.</li>
                <li>Other Google cookies (for example SOCS) follow Google&apos;s own policy. They are not site analytics.</li>
              </ul>
              <p className={`${fontSans.className} ${ui.body}`}>
                <Link href="/privacy-policy" className={ui.proseLink} hrefLang="it">
                  Full Italian notice
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
