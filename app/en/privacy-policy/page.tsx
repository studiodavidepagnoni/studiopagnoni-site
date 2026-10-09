import Link from "next/link";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { layoutContentMaxClass, layoutGutterXClass, site } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Privacy policy and cookies",
    description: "Privacy information and cookie preferences for studiopagnoni.com (GDPR).",
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
          <div className={`${layoutContentMaxClass} max-w-[72ch] space-y-6`}>
            <h2 className={`${fontDisplay.className} ${ui.sectionHeadingAccent}`}>Summary (English)</h2>
            <p className={`${fontSans.className} ${ui.body}`}>
              Studio Architettura Pagnoni ({site.addressLine}) processes contact-form data and essential site cookies to
              operate this website. Optional third-party services (Google Maps embeds and reCAPTCHA) load only with your
              consent. The full legal notice is maintained in Italian.
            </p>
            <p className={`${fontSans.className} ${ui.body}`}>
              Data controller contact:{" "}
              <a href={`mailto:${site.email}`} className={ui.proseLink}>
                {site.email}
              </a>
              . For the complete Italian privacy policy and cookie details, open the Italian version.
            </p>
            <p>
              <Link href="/privacy-policy" className={`${fontSans.className} ${ui.textCta}`} hrefLang="it">
                Full privacy policy (Italian) →
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
