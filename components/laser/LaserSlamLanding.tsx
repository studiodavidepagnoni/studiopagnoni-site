import Link from "next/link";
import { FaqSection } from "@/components/content/FaqSection";
import { fontDisplay, fontSans } from "@/lib/fonts";
import type { SlamLandingContent } from "@/lib/content/laserSlamLanding";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/config/site";
import { ui } from "@/lib/ui";

const introCopyClass = `${fontSans.className} text-[0.97rem] leading-relaxed text-[var(--copy-body)] sm:text-[1.02rem]`;

function CtaButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${className}`}>
      <Link
        href="/contatti?oggetto=slam#form-contatti"
        className={`${ui.btnPrimary} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}
      >
        Richiedi preventivo SLAM
      </Link>
      <Link href="/contatti#form-contatti" className={`${ui.btnOutline} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}>
        Contatti generali
      </Link>
    </div>
  );
}

export function LaserSlamLanding({ content }: { content: SlamLandingContent }) {
  const L = content;

  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
          <section className={ui.innerCard} aria-labelledby="slam-intro">
            <h2 id="slam-intro" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              {L.introHeading}
            </h2>
            <div className="max-w-[72ch] space-y-4">
              <p className={introCopyClass}>{L.introLead}</p>
              <p className={introCopyClass}>{L.instrumentNote}</p>
            </div>
            <CtaButtons className="mt-8" />
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-settori">
            <h2 id="slam-settori" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Settori e applicazioni
            </h2>
            <p className={`${ui.bodyMuted} mb-8 max-w-[60ch]`}>{L.sectorsIntro}</p>
            <ul className="grid list-none gap-4 sm:grid-cols-2 lg:gap-5">
              {L.sectors.map((s) => (
                <li key={s.title} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] p-5 sm:p-6">
                  <h3 className={`${fontDisplay.className} text-lg font-semibold text-[var(--foreground)]`}>{s.title}</h3>
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
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-rs10">
            <h2 id="slam-rs10" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              La strumentazione (CHCNAV RS10)
            </h2>
            <ul className="list-none space-y-3 pl-0">
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>GNSS RTK, LiDAR e SLAM visuale</strong> nella stessa piattaforma: un solo strumento per passare da esterni a interni.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>Continuità outdoor / indoor</strong> e zone con segnale satellitare debole (SFix rover).
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                <strong>SLAM in tempo reale</strong>: controllo copertura in campo prima di chiudere il sopralluogo.
              </li>
              <li className="relative pl-5 before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--primary-mid)]">
                Fino a circa <strong>320.000 punti/s</strong>, campo <strong>360°</strong>, dispositivo compatto (~1,9 kg), <strong>IP64</strong>.
              </li>
            </ul>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-deliverables">
            <h2 id="slam-deliverables" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Cosa consegniamo
            </h2>
            <div className="overflow-table -mx-1 max-w-[calc(100%+0.5rem)] overflow-x-auto px-1 sm:mx-0 sm:max-w-none sm:px-0">
              <table className="w-full min-w-0 border-collapse text-left text-sm sm:min-w-[280px]">
                <thead>
                  <tr className="border-b border-[var(--green-border-muted)]">
                    <th className={`${fontSans.className} py-3 pr-4 font-semibold text-[var(--foreground)]`}>Formato</th>
                    <th className={`${fontSans.className} py-3 font-semibold text-[var(--foreground)]`}>Utilizzo tipico</th>
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
              Come lavoriamo
            </h2>
            <ol className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {L.workflow.map((w) => (
                <li key={w.step} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] p-5 sm:p-6">
                  <span className={`${fontSans.className} text-[0.65rem] font-bold tabular-nums text-[var(--primary-mid)]`}>{w.step}</span>
                  <h3 className={`${fontDisplay.className} mt-2 text-lg font-semibold text-[var(--foreground)]`}>{w.title}</h3>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{w.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-projects">
            <h2 id="slam-projects" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Progetti
            </h2>
            <p className={`${ui.bodyMuted} max-w-[58ch]`}>{L.projectsIntro}</p>
            <Link href="/progetti" className={`${ui.btnOutline} mt-8 inline-flex min-h-[48px] items-center`}>
              Vai ai progetti
            </Link>
          </section>

          <section className={ui.innerCard} aria-labelledby="slam-compare">
            <h2 id="slam-compare" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Perché mobile SLAM vs scanner statico
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

          <FaqSection id="slam-faq" items={L.faq} />

          <section
            className="surface-inverted rounded-2xl border border-[var(--green-border-muted)] p-6 sm:p-10"
            aria-labelledby="slam-cta"
          >
            <h2 id="slam-cta" className={`${fontDisplay.className} text-2xl font-semibold text-[var(--foreground)] sm:text-3xl`}>
              {L.ctaHeading}
            </h2>
            <p className={`${ui.body} mt-4 max-w-[52ch] text-[var(--copy-body)]`}>{L.ctaBody}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/contatti?oggetto=slam#form-contatti"
                className={`${ui.btnPrimary} inline-flex w-full min-h-[48px] justify-center sm:w-auto`}
              >
                Richiedi preventivo SLAM
              </Link>
              <Link href="/contatti#form-contatti" className={ui.btnGhostOnDark}>
                Contatti generali
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
