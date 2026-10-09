import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { PageClosingCta } from "@/components/content/PageClosingCta";
import { StockCoverImage } from "@/components/media/StockCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import type { SlamLandingContent } from "@/lib/content/laserSlamLanding";
import type { Locale } from "@/lib/i18n/config";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const introCopyClass = `${fontSans.className} ${ui.body}`;

function CtaButtons({ className = "", locale = "it" }: { className?: string; locale?: Locale }) {
  const quote = locale === "en" ? "Request a SLAM quote" : "Richiedi preventivo SLAM";
  const general = locale === "en" ? "General contact" : "Contatti generali";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${className}`}>
      <Link
        href={`${withLocalePrefix("/contatti", locale)}?oggetto=slam#form-contatti`}
        className={`${ui.btnPrimary} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}
      >
        {quote}
      </Link>
      <Link
        href={`${withLocalePrefix("/contatti", locale)}#form-contatti`}
        className={`${ui.btnOutline} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}
      >
        {general}
      </Link>
    </div>
  );
}

export function LaserSlamLanding({ content, locale = "it" }: { content: SlamLandingContent; locale?: Locale }) {
  const L = content;
  const sectorsTitle = locale === "en" ? "Sectors and applications" : "Settori e applicazioni";
  const instrumentTitle = locale === "en" ? "Equipment (CHCNAV RS10)" : "La strumentazione (CHCNAV RS10)";
  const deliverablesTitle = locale === "en" ? "What we deliver" : "Cosa consegniamo";
  const workflowTitle = locale === "en" ? "How we work" : "Come lavoriamo";
  const projectsTitle = locale === "en" ? "Projects" : "Progetti";
  const compareTitle =
    locale === "en" ? "Why mobile SLAM vs static scanning" : "Perché mobile SLAM vs scanner statico";
  const projectsCta = locale === "en" ? "Go to projects" : "Vai ai progetti";
  const formatLabel = locale === "en" ? "Format" : "Formato";
  const useLabel = locale === "en" ? "Typical use" : "Utilizzo tipico";
  const faqTitle = locale === "en" ? "Frequently asked questions" : "Domande frequenti";

  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
          <section className={ui.innerCard} aria-labelledby="slam-intro">
            <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2 id="slam-intro" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
                  {L.introHeading}
                </h2>
                <div className="max-w-[72ch] space-y-4">
                  <p className={introCopyClass}>{L.introLead}</p>
                  <p className={introCopyClass}>{L.instrumentNote}</p>
                </div>
              </div>
              <figure className="m-0 lg:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--muted)]">
                  <StockCoverImage
                    src={L.introImage.src}
                    alt={L.introImage.alt}
                    sizes="(min-width:1024px) min(420px, 36vw), (min-width:640px) min(70vw, 480px), 100vw"
                    loading="eager"
                    fetchPriority="high"
                    className="object-[center_20%]"
                  />
                  <div className="image-unify-overlay image-unify-overlay--subtle" aria-hidden />
                </div>
              </figure>
            </div>

            <div
              className="mt-8 grid items-start gap-8 rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] p-5 sm:p-6 lg:mt-10 lg:grid-cols-12 lg:gap-10 lg:p-8"
              aria-labelledby="slam-rs10"
            >
              <div className="lg:col-span-7">
                <h3 id="slam-rs10" className={`${fontDisplay.className} ${ui.cardHeading} ${ui.headingBodyGap}`}>
                  {instrumentTitle}
                </h3>
                <ul className="list-none space-y-3 pl-0">
                  {L.instrumentPoints.map((point) => (
                    <li
                      key={point}
                      className={`relative pl-5 ${fontSans.className} text-[0.95rem] leading-relaxed text-[var(--copy-body)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]`}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="m-0 lg:col-span-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--card)]">
                  <StockCoverImage
                    src={L.instrumentImage.src}
                    alt={L.instrumentImage.alt}
                    sizes="(min-width:1024px) min(400px, 34vw), (min-width:640px) min(70vw, 480px), 100vw"
                    loading="lazy"
                    className="object-[center_30%]"
                  />
                  <div className="image-unify-overlay image-unify-overlay--subtle" aria-hidden />
                </div>
              </figure>
            </div>

            <CtaButtons className="mt-8" locale={locale} />
          </section>

          <FaqSection id="slam-faq" items={L.faq} title={faqTitle} />

          <section className={ui.innerCard} aria-labelledby="slam-settori">
            <h2 id="slam-settori" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {sectorsTitle}
            </h2>
            <p className={`${ui.bodyMuted} mb-8 max-w-[60ch]`}>{L.sectorsIntro}</p>
            <ul className="grid list-none gap-4 sm:grid-cols-2 lg:gap-5">
              {L.sectors.map((s) => (
                <li key={s.title} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] p-5 sm:p-6">
                  <h3 className={`${fontDisplay.className} ${ui.cardHeading}`}>{s.title}</h3>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{s.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-area">
            <h2 id="slam-area" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {L.areaHeading}
            </h2>
            <p className={`${introCopyClass} mb-6 max-w-[68ch]`}>{L.areaBody}</p>
            <ul className="list-none space-y-3 pl-0">
              {L.areaPlaces.map((place) => (
                <li
                  key={place}
                  className="relative pl-5 text-[0.95rem] leading-relaxed text-[var(--copy-body)] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]"
                >
                  {place}
                </li>
              ))}
            </ul>
            {L.relatedLandings && L.relatedLandings.length > 0 ? (
              <nav className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2" aria-label="Pagine correlate">
                {L.relatedLandings.map((item) => (
                  <Link
                    key={item.href}
                    href={withLocalePrefix(item.href, locale)}
                    className={`${fontSans.className} ${ui.textCta}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-deliverables">
            <h2 id="slam-deliverables" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {deliverablesTitle}
            </h2>
            <div className="overflow-table -mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1 sm:mx-0 sm:max-w-none sm:px-0">
              <table className="w-full min-w-0 border-collapse text-left text-sm sm:min-w-[280px]">
                <thead>
                  <tr className="border-b border-[var(--green-border-muted)]">
                    <th className={`${fontSans.className} py-3 pr-4 font-semibold text-[var(--foreground)]`}>{formatLabel}</th>
                    <th className={`${fontSans.className} py-3 font-semibold text-[var(--foreground)]`}>{useLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {L.deliverables.map((d) => (
                    <tr key={d.format} className="border-b border-[var(--green-border-muted)]/60">
                      <td className="py-3 pr-4 font-medium text-[var(--primary-mid)]">{d.format}</td>
                      <td className="py-3 text-[var(--copy-body)]">{d.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="slam-workflow">
            <h2 id="slam-workflow" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} mb-6 sm:mb-8`}>
              {workflowTitle}
            </h2>
            <ol className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {L.workflow.map((w) => (
                <li key={w.title} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] p-5 sm:p-6">
                  <h3 className={`${fontDisplay.className} ${ui.cardHeading}`}>{w.title}</h3>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{w.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-projects">
            <h2 id="slam-projects" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {projectsTitle}
            </h2>
            <p className={`${ui.bodyMuted} max-w-[58ch]`}>{L.projectsIntro}</p>
            <Link
              href={withLocalePrefix("/progetti", locale)}
              className={`${ui.btnOutline} mt-8 inline-flex min-h-[48px] items-center`}
            >
              {projectsCta}
            </Link>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-compare">
            <h2 id="slam-compare" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {compareTitle}
            </h2>
            <div className="overflow-table -mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1 sm:mx-0 sm:max-w-none sm:px-0">
              <table className="w-full min-w-0 border-collapse text-left text-[0.88rem] sm:min-w-[520px] sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--green-border-muted)]">
                    {L.comparison.headers.map((h) => (
                      <th key={h} className={`${fontSans.className} py-3 pr-3 font-semibold text-[var(--foreground)] last:pr-0`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {L.comparison.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--green-border-muted)]/60">
                      {row.map((cell, ci) => (
                        <td
                          key={`${row[0]}-${ci}`}
                          className={`py-3 pr-3 align-top last:pr-0 ${ci === 0 ? "font-medium text-[var(--foreground)]" : "text-[var(--copy-body)]"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <PageClosingCta
            id="slam-cta"
            title={L.ctaHeading}
            description={L.ctaBody}
            primaryHref={`${withLocalePrefix("/contatti", locale)}?oggetto=slam#form-contatti`}
            primaryLabel={locale === "en" ? "Request a SLAM quote" : "Richiedi preventivo SLAM"}
            secondaryHref={`${withLocalePrefix("/contatti", locale)}#form-contatti`}
            secondaryLabel={locale === "en" ? "General contact" : "Contatti generali"}
          />
        </div>
      </div>
    </main>
  );
}
