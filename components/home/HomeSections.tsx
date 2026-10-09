import Link from "next/link";
import { StockCoverImage } from "@/components/media/StockCoverImage";
import { fontDisplay, fontSans } from "@/lib/fonts";
import {
  certifications,
  homeChiSiamo,
  homeStrumentazione,
  zoneContent,
  zoneDescription,
  zoneFooter,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import {
  certificationsEn,
  homeCertsEn,
  homeChiSiamoEn,
  homeContactEn,
  homeProcessEn,
  homeStrumentazioneEn,
  homeZoneEn,
} from "@/lib/i18n/content/marketing.en";
import { withLocalePrefix } from "@/lib/i18n/paths";
import { t } from "@/lib/i18n/messages";
import { homeChiSiamoImages } from "@/lib/media/images";
import { ProjectCoverImage } from "@/components/media/ProjectCoverImage";
import { featuredProjects } from "@/lib/content/projects";
import { site } from "@/lib/config/site";
import { ui } from "@/lib/ui";
import { SiteBrandMark } from "@/components/layout/SiteBrandMark";
import { HomeServiceCards } from "@/components/home/HomeServiceCards";
import { PlateFrame } from "@/components/home/SurveyGraphics";
import { StatsSection } from "@/components/home/StatsSection";

const titleCls = `${fontDisplay.className} section-title home-section-title reveal-title`;

const processStepsIt = [
  {
    kicker: "Acquisizione",
    title: "SLAM in movimento",
    body: "Acquisizione continua in spazi complessi: corridoi, impianti, volumi densi.",
  },
  {
    kicker: "Controllo metrico",
    title: "GNSS e rete",
    body: "Georeferenziazione RTK e controlli planoaltimetrici con tolleranze definite.",
  },
  {
    kicker: "Consegna",
    title: "Elaborati",
    body: "Nuvola di punti, sezioni, CAD/BIM e tavole pronte per cantiere e committente.",
  },
] as const;

type Props = { locale?: Locale };

export function HomeSections({ locale = "it" }: Props) {
  const copy = t(locale);
  const chi = locale === "en" ? homeChiSiamoEn : homeChiSiamo;
  const strum = locale === "en" ? homeStrumentazioneEn : homeStrumentazione;
  const processSteps = locale === "en" ? homeProcessEn.steps : processStepsIt;
  const certs = locale === "en" ? certificationsEn : certifications;
  const zoneTitle = locale === "en" ? homeZoneEn.title : zoneContent.title;
  const zoneHeading = locale === "en" ? homeZoneEn.subtitle : zoneContent.heading;
  const zoneBody =
    locale === "en" ? (
      <>
        Our office in <strong>Bornato, Cazzago San Martino</strong> is well placed for work across{" "}
        <strong>Franciacorta</strong>, Valle Trompia, Lake Iseo and the province of <strong>Brescia</strong>. We also take
        commissions across Lombardy and, by project type, Northern Italy.
      </>
    ) : (
      zoneDescription
    );
  const zoneFoot =
    locale === "en" ? (
      <>
        For timing and availability,{" "}
        <Link href={withLocalePrefix("/contatti", locale)} className={ui.proseLink}>
          contact us
        </Link>
        . Explore SLAM laser surveys in the{" "}
        <Link href={withLocalePrefix("/rilievi-laser-scanner-slam-brescia", locale)} className={ui.proseLink}>
          province of Brescia
        </Link>{" "}
        and{" "}
        <Link href={withLocalePrefix("/rilievi-laser-scanner-slam-lombardia", locale)} className={ui.proseLink}>
          Lombardy
        </Link>
        , or the{" "}
        <Link href={withLocalePrefix("/topografia", locale)} className={ui.proseLink}>
          surveying
        </Link>{" "}
        page. For architecture practices:{" "}
        <Link href={withLocalePrefix("/rilievi-3d-per-studi-di-architettura", locale)} className={ui.proseLink}>
          outsourced 3D surveys
        </Link>
        .
      </>
    ) : (
      zoneFooter
    );
  const certsTitle = locale === "en" ? homeCertsEn.title : "Abilitazioni professionali";
  const serviziTitle = locale === "en" ? "Services" : "Servizi";
  const progettiTitle = locale === "en" ? "Projects" : "Progetti";
  const processTitle = locale === "en" ? homeProcessEn.title : "Dal campo agli elaborati";
  const contactTitle = locale === "en" ? homeContactEn.title : "Contatti";

  return (
    <>
      {/* ── Chi siamo — SOTA editorial: 5/7 split, immagine unica forte, testo compatto ── */}
      <section className="lazy-section section-shell overflow-x-hidden bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{chi.title}</h2>
          </div>

          <div className="reveal-block mt-8 grid items-stretch gap-8 sm:mt-10 sm:gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-14">
            {/* ── Testo (sinistra) ── */}
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <SiteBrandMark className="shrink-0 self-start" />
                <div className="min-w-0">
                  <p className={`${fontSans.className} home-chi-siamo-lede hidden text-[1.02rem] leading-[1.75] text-[var(--copy-body)] sm:block`}>
                    <span className="sr-only">Studio Architettura Pagnoni. </span>
                    {chi.short}
                  </p>
                  <p className={`${fontSans.className} home-chi-siamo-lede text-[1.02rem] leading-[1.7] tracking-[0.01em] text-[var(--foreground)]/80 sm:hidden`}>
                    <span className="sr-only">Studio Architettura Pagnoni. </span>
                    {chi.shortMobile}
                  </p>
                </div>
              </div>
              <ul className="home-chi-siamo-list mt-8 space-y-0 sm:mt-8" aria-label="Ambiti principali">
                {chi.highlights.map((h) => (
                  <li key={h.label} className="home-chi-siamo-list__item">
                    <span className="home-chi-siamo-list__mark" aria-hidden />
                    <span className={`${fontSans.className} home-chi-siamo-list__label`}>
                      <span className="sm:hidden">{h.labelMobile ?? h.label}</span>
                      <span className="hidden sm:inline">{h.label}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 sm:mt-10">
                <Link href={withLocalePrefix("/chi-siamo", locale)} className={`${fontSans.className} ${ui.textCta}`}>
                  {locale === "en" ? "About the practice" : "Scheda dello studio"}
                </Link>
              </p>
            </div>

            {/* ── Media (destra): full-bleed su mobile, proporzionata su desktop ── */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="home-chi-siamo-media--mobile relative aspect-[16/10] overflow-hidden rounded-[var(--radius-media)] border border-[var(--green-border-muted)] bg-[var(--card)] max-sm:aspect-[4/3] lg:aspect-[16/10]">
                <StockCoverImage
                  src={homeChiSiamoImages.team.src}
                  alt={homeChiSiamoImages.team.alt}
                  className="object-center"
                  sizes="(min-width:1024px) min(580px, 50vw), (min-width:640px) min(90vw, 720px), 100vw"
                  loading="lazy"
                />
                <div className="image-unify-overlay image-unify-overlay--subtle" aria-hidden />
                <div className="absolute bottom-4 left-4">
                  <div className="rounded-md bg-[color-mix(in_srgb,var(--surface-chrome-deep)_72%,transparent)] px-3 py-1.5 backdrop-blur-sm">
                    <p className={`${fontSans.className} section-kicker text-white`}>
                      Franciacorta · Provincia di Brescia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Servizi ── */}
      <section className="home-section-servizi lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--background)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{serviziTitle}</h2>
          </div>

          <HomeServiceCards locale={locale} />

          <div
            id="strumentazione"
            aria-labelledby="strumentazione-heading"
            className="home-kit-panel surface-inverted reveal-block-solid mt-8 rounded-xl border border-[var(--green-border-muted)] p-5 sm:mt-10 sm:p-6"
          >
            {/* Stessa misura per kicker + titolo + lede (evita “colonna stretta” sotto titolo largo). */}
            <div className="max-w-[min(62ch,100%)]">
              <p className={`${fontSans.className} section-kicker`}>SLAM e geomatica</p>
              <h3
                id="strumentazione-heading"
                className={`${fontDisplay.className} ${ui.cardHeading} mt-2 tracking-tight`}
              >
                {strum.title}
              </h3>
              <div className={`${fontSans.className} mt-4 ${ui.body} text-pretty sm:mt-5`}>
                {strum.lede}
              </div>
            </div>
            <ul className="home-kit-list">
              {strum.items.map((item) => (
                <li key={item.label} className="home-kit-list__item">
                  <p className={`${fontSans.className} section-kicker`}>{item.label}</p>
                  <p className={`${fontSans.className} mt-2 text-sm leading-relaxed text-[var(--copy-body)]`}>{item.text}</p>
                </li>
              ))}
            </ul>
            <nav
              aria-label="Approfondimenti su strumentazione e servizi"
              className={`${fontSans.className} mt-6 border-t border-[var(--green-border-muted)] pt-5 sm:mt-7 sm:pt-6`}
            >
              <p className={`${fontSans.className} section-kicker mb-3`}>Schede servizio</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href="/topografia" className={ui.proseLink}>
                  Topografia e rilievi
                </Link>
                <Link href="/laser-scanner-slam" className={ui.proseLink}>
                  Laser scanner SLAM
                </Link>
                <Link href="/rilievi-3d-per-studi-di-architettura" className={ui.proseLink}>
                  Rilievi 3D per studi di architettura
                </Link>
              </div>
            </nav>
          </div>

          <p className="mt-8 sm:mt-10">
            <Link href={withLocalePrefix("/servizi", locale)} className={`${fontSans.className} ${ui.textCta}`}>
              Elenco completo dei servizi
            </Link>
          </p>
        </div>
      </section>

      {/* ── Progetti (feed) ── */}
      <section className="home-section-progetti lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{progettiTitle}</h2>
          </div>
          <div className="home-projects-mosaic">
            {featuredProjects.slice(0, 3).map((p, index) => (
              <Link
                key={p.href}
                href={p.href}
                className={`group block w-full min-w-0 overflow-hidden rounded-lg border border-[var(--green-border-muted)] bg-[var(--card)] ${index === 0 ? "home-projects-mosaic__lead" : "home-projects-mosaic__item"}`}
              >
                <div className="home-projects-mosaic__media">
                  <ProjectCoverImage
                    cover={p.cover}
                    alt={p.alt}
                    className="h-full w-full transition duration-500 group-hover:scale-[1.015]"
                    sizes={
                      index === 0
                        ? "(min-width:1024px) min(760px, 66vw), (min-width:640px) min(90vw, 720px), min(100vw, 560px)"
                        : "(min-width:1024px) min(360px, 30vw), (min-width:640px) min(50vw, 520px), min(100vw, 560px)"
                    }
                  />
                  <div className="image-unify-overlay image-unify-overlay--editorial" aria-hidden />
                </div>
                <div className="home-projects-mosaic__body">
                  <span className={`${fontSans.className} section-kicker`}>{p.label}</span>
                  <span className={`${fontDisplay.className} home-projects-mosaic__caption mt-1 block font-medium text-[var(--foreground)]`}>
                    {p.caption}
                  </span>
                  <span className={`${fontSans.className} ${ui.textCta} mt-1`}>{copy.cta.viewProject}</span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 sm:mt-10">
            <Link href={withLocalePrefix("/progetti", locale)} className={`${fontSans.className} ${ui.textCta}`}>
              {copy.cta.archiveProjects}
            </Link>
          </p>
        </div>
      </section>

      {/* ── Processo ── */}
      <section id="processo" className="surface-inverted lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{processTitle}</h2>
          </div>
          <ul className="home-process-rail mt-8">
            {processSteps.map((s) => (
              <li key={s.kicker} className="home-process-rail__item reveal-block">
                <p className={`${fontSans.className} section-kicker`}>{s.kicker}</p>
                <h3 className={`${fontDisplay.className} ${ui.cardHeading} mt-2`}>{s.title}</h3>
                <p className={`${fontSans.className} mt-2 ${ui.bodySm}`}>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Abilitazioni professionali ── */}
      <section id="certificazioni" className="lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{certsTitle}</h2>
          </div>
          <ul className="home-certs-list">
            {certs.map((c) => (
              <li key={c.title} className="home-certs-list__item reveal-block">
                <h3 className="home-certs-list__title">{c.title}</h3>
                <p className={`${ui.bodySm}`}>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Dove operiamo ── */}
      <section id="zone-servite" className="lazy-section section-shell scroll-anchor overflow-x-hidden min-w-0 bg-[var(--background)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="reveal-block max-w-[62ch]">
            <h2 className={titleCls}>{zoneTitle}</h2>
            <p className={`${fontDisplay.className} mt-4 text-[1.05rem] font-medium leading-snug text-[var(--foreground)] sm:text-lg`}>
              {zoneHeading}
            </p>
            <div className={`${fontSans.className} home-section-intro__lede mt-4`}>{zoneBody}</div>
            <p className={`${fontSans.className} mt-4 ${ui.bodySm}`}>{site.addressLine}</p>
            <p className={`${fontSans.className} mt-6 ${ui.bodySm}`}>{zoneFoot}</p>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* ── Contatti ── */}
      <section className="lazy-section section-shell overflow-x-hidden min-w-0 bg-[var(--muted)] px-4 sm:px-5 md:px-10">
        <div className="mx-auto max-w-[1140px]">
          <div className="home-section-intro reveal-block">
            <h2 className={titleCls}>{contactTitle}</h2>
          </div>
          <div className="home-contact-rail">
            <PlateFrame />
            <div className="home-contact-rail__cols">
              <article className="home-contact-rail__item reveal-block">
                <h3 className={`${fontDisplay.className} home-contact-rail__label`}>Email</h3>
                <a
                  href={`mailto:${site.email}`}
                  className="home-contact-rail__value inline-block max-w-full break-words underline-offset-2 transition hover:text-[var(--primary-mid)] hover:underline"
                >
                  {site.email}
                </a>
              </article>
              <article className="home-contact-rail__item reveal-block">
                <h3 className={`${fontDisplay.className} home-contact-rail__label`}>Telefono</h3>
                <ul className="home-contact-rail__phones">
                  {site.phones.map((phone) => (
                    <li key={phone.tel}>
                      <span className="home-contact-rail__phone-label">{phone.label}</span>
                      <a
                        href={`tel:${phone.tel}`}
                        className="home-contact-rail__value inline-block min-h-[40px] py-0.5 underline-offset-2 transition hover:text-[var(--primary-mid)] hover:underline"
                      >
                        {phone.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="home-contact-rail__item reveal-block">
                <h3 className={`${fontDisplay.className} home-contact-rail__label`}>Sede</h3>
                <p className="home-contact-rail__value max-w-[36ch] text-pretty leading-relaxed">{site.addressLine}</p>
              </article>
            </div>
          </div>
          <p className="mt-8 sm:mt-10">
            <Link href={`${withLocalePrefix("/contatti", locale)}#form-contatti`} className={`${fontSans.className} ${ui.textCta}`}>
              {locale === "en" ? "Contact form" : "Modulo di contatto"}
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA finale — premium closing ── */}
      <section className="home-cta-finale lazy-section overflow-x-hidden min-w-0 border-t border-[var(--green-border-muted)] px-4 py-20 text-left sm:px-5 sm:py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1140px] reveal-block">
          <div className="home-cta-finale__rule mb-6" aria-hidden />
          <h2 className={`${fontDisplay.className} text-[clamp(1.65rem,7vw,2.5rem)] font-medium leading-[1.06] tracking-tight text-[var(--foreground)]`}>
            Parliamo del vostro progetto
          </h2>
          <p className={`${fontSans.className} mt-5 max-w-[42ch] text-[0.93rem] leading-[1.7] text-[var(--foreground)]`}>
            Sopralluogo, preventivo o consulenza tecnica: scriveteci per una prima valutazione.
          </p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/contatti#form-contatti" className={`${ui.btnPrimary} w-full sm:w-auto`}>
              Richiedi preventivo
            </Link>
            <Link href="/contatti" className={`${ui.btnGhostOnDark} w-full sm:w-auto`}>
              Tutti i contatti
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
