import { PageClosingCta } from "@/components/content/PageClosingCta";
import { StaticPageHero } from "@/components/hero/StaticPageHero";
import { ProgettiArchive } from "@/components/projects/ProgettiArchive";
import { buildPageMetadata } from "@/lib/config/seo";
import { localeAlternates } from "@/lib/i18n/metadata";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

export const metadata = {
  ...buildPageMetadata({
    title: "Projects and case studies",
    description: "Recent digital surveys and case studies in Franciacorta and the province of Brescia.",
    path: "/en/progetti",
  }),
  alternates: localeAlternates("/progetti"),
};

export default function EnProgettiPage() {
  return (
    <>
      <StaticPageHero path="/en/progetti" />
      <main id="main-content" className={`section-shell ${ui.pageBg}`}>
        <div className={layoutGutterXClass}>
          <div className={`${layoutContentMaxClass} space-y-10 sm:space-y-12`}>
            <div className={`${ui.body} max-w-[62ch] space-y-4`}>
              <p>
                Recent 3D surveys: a winery in Franciacorta, a plot in Erbusco, a livestock facility in the province of
                Brescia. Each case includes a scan video and a short method note.
              </p>
              <p>
                Architecture, procedures and surveying remain the studio’s day-to-day work. Those briefs are discussed in
                person — write to us for a project or a site visit.
              </p>
            </div>
            <ProgettiArchive locale="en" />
            <PageClosingCta
              id="progetti-cta"
              title="Let’s talk about your project"
              description="Site visit, survey or design: tell us location and objective, and we reply with timing and a first assessment."
              primaryHref={`${withLocalePrefix("/contatti", "en")}#form-contatti`}
              primaryLabel="Contact us"
              secondaryHref={withLocalePrefix("/servizi", "en")}
              secondaryLabel="All services"
            />
          </div>
        </div>
      </main>
    </>
  );
}
