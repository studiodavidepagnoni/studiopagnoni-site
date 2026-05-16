import Image from "next/image";
import Link from "next/link";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { laserSlamLanding } from "@/lib/laserSlamLanding";
import { stockImage } from "@/lib/mediaPath";
import { layoutContentMaxClass, layoutGutterXClass } from "@/lib/site";
import { imageAlt } from "@/lib/seo";
import { ui } from "@/lib/ui";

const L = laserSlamLanding;

const slamIntroImage = stockImage("handheld-slam-road.jpg");

const caseImages = [
  {
    src: stockImage("survey-instrument-field.jpg"),
    alt: imageAlt("Strumentazione geodetica in campo per rilievo planoaltimetrico di supporto al SLAM", {
      service: "topografia",
    }),
    step: L.caseStudyTeaser.steps[0],
  },
  {
    src: stockImage("pointcloud-data.jpg"),
    alt: imageAlt("Nuvola di punti georiferita del capannone — vista 3D", { service: "slam" }),
    step: L.caseStudyTeaser.steps[1],
  },
  {
    src: stockImage("design-drawings.jpg"),
    alt: imageAlt("Piante e sezioni CAD ricavate dal rilievo SLAM", { service: "slam" }),
    step: L.caseStudyTeaser.steps[2],
  },
] as const;

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

export function LaserSlamLanding() {
  return (
    <main id="main-content" className={`section-shell ${ui.pageBg}`}>
      <div className={layoutGutterXClass}>
        <div className={`${layoutContentMaxClass} space-y-12 sm:space-y-16`}>
          {/* Hero */}
          <header className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <div className="max-w-[52ch] space-y-4">
                <p className={introCopyClass}>{L.introLead}</p>
                <p className={introCopyClass}>{L.instrumentNote}</p>
              </div>
              <CtaButtons className="mt-8" />
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-[var(--green-border-muted)] bg-[var(--card)] sm:max-w-lg sm:aspect-[16/10] lg:mx-0 lg:max-w-none lg:aspect-[16/10]">
                <Image
                  src={slamIntroImage}
                  alt={imageAlt("Operatore con laser scanner mobile SLAM in acquisizione outdoor", { service: "slam" })}
                  fill
                  className="object-cover object-[72%_center]"
                  sizes="(min-width: 1024px) min(420px, 42vw), (min-width: 640px) min(90vw, 480px), 100vw"
                  priority
                />
                <div className="image-unify-overlay opacity-30" aria-hidden />
              </div>
            </div>
          </header>

          {/* Settori */}
          <section className={ui.innerCard} aria-labelledby="slam-settori">
            <h2 id="slam-settori" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Settori e applicazioni
            </h2>
            <p className={`${ui.bodyMuted} mb-8 max-w-[60ch]`}>
              Il rilievo SLAM mobile è pensato per chi deve decidere su base metrica affidabile: imprese, studi di progettazione, facility e
              committenti con immobili complessi.
            </p>
            <ul className="grid list-none gap-4 sm:grid-cols-2 lg:gap-5">
              {L.sectors.map((s) => (
                <li key={s.title} className="rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] p-5 sm:p-6">
                  <h3 className={`${fontDisplay.className} text-lg font-semibold text-[var(--foreground)]`}>{s.title}</h3>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{s.body}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Strumentazione (sintesi tecnica) */}
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

          {/* Cosa consegniamo */}
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

          {/* Come lavoriamo */}
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

          {/* Caso studio */}
          <section className={ui.innerCard} aria-labelledby="slam-case">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`${fontSans.className} section-kicker`}>{L.caseStudyTeaser.title}</p>
                <h2 id="slam-case" className={`${fontDisplay.className} mt-2 text-2xl font-semibold text-[var(--foreground)] sm:text-3xl`}>
                  {L.caseStudyTeaser.subtitle}
                </h2>
                <p className={`${ui.bodyMuted} mt-3 max-w-[58ch]`}>
                  Esempio rappresentativo (commessa anonimizzata) del flusso campo → nuvola → elaborati. Le immagini saranno aggiornate con
                  materiali reali della commessa.
                </p>
              </div>
              <Link href={L.caseStudyTeaser.href} className={`${ui.btnOutline} shrink-0`}>
                Leggi il caso studio
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
              {caseImages.map((img, i) => (
                <figure key={img.step.label} className="overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)]">
                  <div className="relative aspect-[4/3]">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 640px) 33vw, 100vw" />
                    <div className="image-unify-overlay opacity-40" aria-hidden />
                    <span
                      className={`${fontSans.className} absolute left-3 top-3 rounded-md bg-[color-mix(in_srgb,var(--surface-chrome-deep)_75%,transparent)] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white`}
                    >
                      {String(i + 1).padStart(2, "0")} · {img.step.label}
                    </span>
                  </div>
                  <figcaption className={`${fontSans.className} p-3 text-sm text-[var(--copy-body)]`}>{img.step.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Confronto mobile vs statico */}
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

          {/* FAQ */}
          <section className={ui.innerCard} aria-labelledby="slam-faq">
            <h2 id="slam-faq" className={`${fontDisplay.className} ${ui.sectionHeadingAccent} ${ui.headingBodyGap}`}>
              Domande frequenti
            </h2>
            <div className="space-y-3">
              {L.faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-lg border border-[var(--green-border-muted)] bg-[var(--muted)] open:bg-[var(--card)]"
                >
                  <summary
                    className={`${fontDisplay.className} cursor-pointer list-none px-5 py-4 text-base font-medium text-[var(--foreground)] marker:content-none sm:text-lg [&::-webkit-details-marker]:hidden`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      {item.q}
                      <span className="shrink-0 text-[var(--primary-mid)] transition group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </span>
                  </summary>
                  <p className={`${fontSans.className} border-t border-[var(--green-border-muted)] px-5 pb-4 pt-3 text-sm leading-relaxed text-[var(--copy-body)]`}>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA finale */}
          <section
            className="surface-inverted rounded-2xl border border-[var(--green-border-muted)] p-6 sm:p-10"
            aria-labelledby="slam-cta"
          >
            <h2 id="slam-cta" className={`${fontDisplay.className} text-2xl font-semibold text-[var(--foreground)] sm:text-3xl`}>
              Pianifichiamo il tuo rilievo SLAM
            </h2>
            <p className={`${ui.body} mt-4 max-w-[52ch] text-[var(--copy-body)]`}>
              Indica zona, superficie indicativa e cosa ti serve in consegna: ti rispondiamo con tempi e preventivo su misura.
            </p>
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
